// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import jwt_decode from "jwt-decode";

const initialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  token: localStorage.getItem("token") || null,
  error: null,
  expireIn: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      state.userInfo = null;
      state.token = null;
      state.error = null;
      state.expireIn = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload.payload.token;
      const decodedToken = jwt_decode(state.token);
      state.userInfo = decodedToken.user;
      state.expireIn = decodedToken.expire_in;
      state.error = null;
      console.log(state.userInfo);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
