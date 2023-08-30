import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./authentication/authSlice";
import userInfoReducer from "./userInfoSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userInfo"], // Specify the reducers you want to persist
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
