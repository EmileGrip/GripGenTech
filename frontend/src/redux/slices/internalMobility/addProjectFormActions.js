import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";

export const fetchProjects = createAsyncThunk(
  "fetchProjects/fetchData",
  async (filter = "all", { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        filter,
      },
    };
    const response = await axiosInstance.get(`project_vacancy`, config);
    console.log("response projects", response.data.payload);
    return response.data.payload;
  }
);
