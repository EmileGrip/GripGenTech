// create skill profile async thunk

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";

export const fetchSkillProfile = createAsyncThunk(
  "skillProfile/fetchData",
  async (jobProfileId, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        job_profile_id: jobProfileId,
      },
    };
    const response = await axiosInstance.get(`skill_profile`, config);
    console.log("respone skills", response.data.payload);
    return response.data.payload;
  }
);

export const fetchSkillProfileRecommendationData = createAsyncThunk(
  "mySkills/fetchSkillProfileRecommendationData",
  async (job_profile_id, { getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        type: "job_skills",
        value: job_profile_id,
      },
    };
    const response = await axiosInstance.get(`recommendations`, config);
    return response.data.payload;
  }
);

// export const addSkillProfile = createAsyncThunk(
//   "skillProfile/addData",
//   async (token, body) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await axiosInstance.post(`skill_profile`, body, config);
//     console.log(response.data.payload);
//     return response.data.payload;
//   }
// );

// export const deleteSkillProfile = createAsyncThunk(
//   "skillProfile/deleteData",
//   async (token, skillId) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       params: {
//         id: skillId,
//       },
//     };

//     const response = await axiosInstance.delete(`skill_profile`, config);
//     console.log(response);
//     return response;
//   }
// );

// export const editSkillProfile = createAsyncThunk(
//   "skillProfile/editData",
//   async (token, skillId, level) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       params: {
//         id: skillId,
//       },
//     };

//     const body = {
//       level,
//     };
//     const response = await axiosInstance.put(`skill_profile`, body, config);
//     console.log(response.payload);
//   }
// );
