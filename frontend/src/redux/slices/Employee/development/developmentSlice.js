import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCareerPathData,
  fetchCareerPathDataByUserId,
  fetchCareerPathOverviewDataById,
} from "./developmentActions";

const developmentSlice = createSlice({
  name: "development",
  initialState: {
    success: null,
    loading: false,
    profileDataLoading: false,
    overviewDataLoading: false,
    openSnack: false,
    message: "",
    data: {
      jobs: [],
      edges: [],
    },
    profileData: {
      jobs: [],
      edges: [],
    },
    overviewData: null,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOpenSnack: (state, action) => {
      state.openSnack = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerPathData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCareerPathData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCareerPathData.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.openSnack = true;
      });

    builder
      .addCase(fetchCareerPathDataByUserId.pending, (state) => {
        state.profileDataLoading = true;
      })
      .addCase(fetchCareerPathDataByUserId.fulfilled, (state, action) => {
        state.profileDataLoading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchCareerPathDataByUserId.rejected, (state) => {
        state.profileDataLoading = false;
      });

    builder
      .addCase(fetchCareerPathOverviewDataById.pending, (state) => {
        state.overviewDataLoading = true;
      })
      .addCase(fetchCareerPathOverviewDataById.fulfilled, (state, action) => {
        state.overviewDataLoading = false;
        state.overviewData = action.payload;
      })
      .addCase(fetchCareerPathOverviewDataById.rejected, (state) => {
        state.overviewDataLoading = false;
      });
  },
});

export const { setSuccess, setLoading, setOpenSnack, setMessage, setData } =
  developmentSlice.actions;

export default developmentSlice.reducer;
