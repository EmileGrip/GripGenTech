// Create authentication slice

import { createSlice } from "@reduxjs/toolkit";
import { userLogin, logout } from "./authActions";
import jwtDecode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: true,
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
    expireAccessToken: null,
    expireRefreshToken: null,
    authMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.authMessage = null;
      state.isAuth = false;
      state.loading = true;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log(jwtDecode(action.payload.accessToken).exp);
      // set time expiration duration 15 min for access token
      state.expireAccessToken = jwtDecode(action.payload.accessToken).exp;
      // set time expiration duration 7 days for refresh token
      console.log(jwtDecode(action.payload.refreshToken).exp);
      state.expireRefreshToken = jwtDecode(action.payload.refreshToken).exp;
      state.isAuth = !!state.accessToken;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuth = false;
      state.loading = false;
      state.error = action.payload.error;
      state.accessToken = null;
      state.refreshToken = null;
      state.authMessage = state.error.message;
    });
    builder.addCase(logout.pending, (state) => {
      state.isAuth = true;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.loading = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuth = true;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
