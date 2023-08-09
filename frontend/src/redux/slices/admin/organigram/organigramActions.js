import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";

export const fetchData = createAsyncThunk(
  "organigram/fetchData",
  async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const response = await axiosInstance.get(`role`, config);
    return response.data.payload;
  }
);
