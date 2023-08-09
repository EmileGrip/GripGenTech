import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./slices/auth/authSlice";
import sideBarSliceReducer from "./slices/sideBarSlice";
import companyProfileSliceReducer from "./slices/admin/companyProfile/companyProfileSlice";
import organigramSliceReducer from "./slices/admin/organigram/organigramSlice";
import usersSliceReducer from "./slices/admin/users/usersSlice";
import jobProfileSliceReducer from "./slices/admin/jobProfile/jobProfileSlice";
import skillProfileSliceReducer from "./slices/admin/skillProfile/skillProfileSlice";
import mySkillsSliceReducer from "./slices/Employee/mySkills/mySkillsSlice";
import developmentSliceReducer from "./slices/Employee/development/developmentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  sideBar: sideBarSliceReducer,
  companyProfile: companyProfileSliceReducer,
  organigram: organigramSliceReducer,
  users: usersSliceReducer,
  jobProfile: jobProfileSliceReducer,
  skillProfile: skillProfileSliceReducer,
  mySkills: mySkillsSliceReducer,
  development: developmentSliceReducer,
  // ...
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
