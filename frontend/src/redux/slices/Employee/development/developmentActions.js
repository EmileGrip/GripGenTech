import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";

export const fetchCareerPathData = createAsyncThunk(
  "development/fetchCareerPathData",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const response = await axiosInstance.get(`career_path`, config);
    return response.data.payload;
  }
);

export const fetchCareerPathDataByUserId = createAsyncThunk(
  "development/fetchCareerPathDataByUserId",
  async (user_id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        user_id,
      },
    };
    const response = await axiosInstance.get(`career_path`, config);

    return response.data.payload;
  }
);

export const fetchCareerPathOverviewDataById = createAsyncThunk(
  "development/fetchCareerPathOverviewDataById",
  async (id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id,
      },
    };
    const response = await axiosInstance.get(`career_path`, config);

    return response.data.payload;
  }
);

export const fetchJobsRecommendationData = createAsyncThunk(
  "mySkills/fetchJobsRecommendationData",
  async (user_id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        type: "careerpath",
        value: user_id,
      },
    };
    const response = await axiosInstance.get(`recommendations`, config);
    return response.data.payload;
  }
);
