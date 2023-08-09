import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";

const fetchJobProfiles = createAsyncThunk(
  "jobProfile/fetchData",
  async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const response = await axiosInstance.get(`job_profile`, config);
    console.log(response.data.payload);
    return response.data.payload;
  }
);

const jobProfileSlice = createSlice({
  name: "jobProfile",
  initialState: {
    loading: false,
    jobProfile: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.jobProfile = action.payload;
      })
      .addCase(fetchJobProfiles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default jobProfileSlice.reducer;
export { fetchJobProfiles };
