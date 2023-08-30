// create userInfo slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
export const getUserInfo = createAsyncThunk(
  "userInfo",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(`/users/me`, config);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue({ error: e.response.data });
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    userInfoMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.userInfo = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      console.log(state.userInfo);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.userInfo = null;
      state.loading = false;
      state.error = action.payload.error;
      state.userInfoMessage = state.error.message;
    });
  },
});

export default userInfoSlice.reducer;
