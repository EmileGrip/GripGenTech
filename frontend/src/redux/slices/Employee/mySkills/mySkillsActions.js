import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";

export const fetchSkillsData = createAsyncThunk(
  "mySkills/fetchSkillsData",
  async (user_id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        user_id,
      },
    };
    const response = await axiosInstance.get(`skill_proficiency`, config);
    return response.data.payload;
  }
);

export const fetchSkillsRecommendationData = createAsyncThunk(
  "mySkills/fetchSkillsRecommendationData",
  async (user_id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        type: "user_skills",
        value: user_id,
      },
    };
    const response = await axiosInstance.get(`recommendations`, config);
    return response.data.payload;
  }
);

export const fetchSkillsWishlistData = createAsyncThunk(
  "mySkills/fetchSkillsWishlistData",
  async (user_id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        user_id,
      },
    };
    const response = await axiosInstance.get(`skill_wish`, config);
    return response.data.payload;
  }
);
