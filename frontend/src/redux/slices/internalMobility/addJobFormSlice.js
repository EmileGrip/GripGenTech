import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";

export const fetchJobs = createAsyncThunk(
  "fetchJobs/fetchData",
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
    const response = await axiosInstance.get(`job_vacancy`, config);
    console.log("response jobs", response.data.payload);
    return response.data.payload;
  }
);

const addJobFormSlice = createSlice({
  name: "addJobForm",
  initialState: {
    jobs: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    });
    builder.addCase(fetchJobs.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default addJobFormSlice.reducer;
