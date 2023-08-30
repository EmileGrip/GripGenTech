// create asyncthunk action creator for logging in

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axiosInstance.post(
        `/users/login`,
        { email, password },
        config
      );

      if (response.statusText === "OK") {
        console.log("response.data", response.data);
        return response.data;
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return rejectWithValue({ error: e.response.data });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(`/users/logout`, config);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue({ error: e.response.data });
    }
  }
);
