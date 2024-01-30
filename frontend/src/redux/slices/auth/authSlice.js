import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLoginWithGoogleOrMicrosoft,
  userRecover,
  userReset,
} from "./authActions";
import jwt_decode from "jwt-decode";

const initialAuthState = {
  isAuth: false,
  loading: false,
  userInfo: null,
  token: null,
  error: null,
  expireIn: null,
  response: {
    success: false,
    message: "",
  }, // recover page
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.loading = null;
      state.userInfo = null;
      state.token = null;
      state.error = null;
      state.expireIn = null;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setLoginInformation: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      const decodedToken = jwt_decode(state.token);
      state.userInfo = decodedToken.user;
      state.isAuth = !!state.userInfo;
      state.expireIn = decodedToken.expire_in;
      state.error = null;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.userInfo = null;
      state.isAuth = false;
      state.token = null;
      state.error = null;
      state.expireIn = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.payload.token;
      const decodedToken = jwt_decode(state.token);
      state.userInfo = decodedToken.user;
      state.isAuth = !!state.userInfo;
      state.expireIn = decodedToken.expire_in;
      state.error = null;
      console.log(state.userInfo);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuth = false;
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = action.payload;
      state.expireIn = null;
    });

    builder.addCase(userLoginWithGoogleOrMicrosoft.pending, (state) => {
      state.loading = true;
      state.userInfo = null;
      state.isAuth = false;
      state.token = null;
      state.error = null;
      state.expireIn = null;
    });
    builder.addCase(
      userLoginWithGoogleOrMicrosoft.fulfilled,
      (state, action) => {
        const redirectUrl = new URL(
          action.payload.authorization_url,
          window.location.href
        );
        window.location.href = redirectUrl.href;
      }
    );
    builder.addCase(
      userLoginWithGoogleOrMicrosoft.rejected,
      (state, action) => {
        state.isAuth = false;
        state.loading = false;
        state.userInfo = null;
        state.token = null;
        state.error = action.payload;
        state.expireIn = null;
      }
    );

    builder.addCase(userReset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userReset.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    });
    builder.addCase(userReset.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
    });

    builder.addCase(userRecover.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRecover.fulfilled, (state, action) => {
      state.recoverMessage = action.payload.message;
      state.loading = false;
    });
    builder.addCase(userRecover.rejected, (state, action) => {
      state.recoverMessage = action.payload;
      state.loading = false;
    });
  },
});

export const { logout, setResponse, setLoginInformation } = authSlice.actions;
export default authSlice.reducer;
