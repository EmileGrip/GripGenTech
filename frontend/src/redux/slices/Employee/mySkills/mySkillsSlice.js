import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSkillsData,
  fetchSkillsRecommendationData,
  fetchSkillsWishlistData,
} from "./mySkillsActions";

const initialSkillsState = {
  skillsDataLoading: false,
  skillsRecommendationLoading: false,
  skillsWishlistLoading: false,
  skills: [],
  skillsRecommendation: [],
  skillsWishlist: [],
  error: null,
};

const mySkillsSlice = createSlice({
  name: "mySkills",
  initialState: initialSkillsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkillsData.pending, (state) => {
      state.skillsDataLoading = true;
      state.skills = [];
      state.error = null;
    });
    builder.addCase(fetchSkillsData.fulfilled, (state, action) => {
      state.skillsDataLoading = false;
      state.skills = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSkillsData.rejected, (state, action) => {
      state.skillsDataLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSkillsRecommendationData.pending, (state) => {
      state.skillsRecommendationLoading = true;
      state.skillsRecommendation = [];
      state.error = null;
    });
    builder.addCase(
      fetchSkillsRecommendationData.fulfilled,
      (state, action) => {
        state.skillsRecommendationLoading = false;
        state.skillsRecommendation = action.payload;
        state.error = null;
      }
    );
    builder.addCase(fetchSkillsRecommendationData.rejected, (state, action) => {
      state.skillsRecommendationLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSkillsWishlistData.pending, (state) => {
      state.skillsWishlistLoading = true;
      state.skillsWishlist = [];
      state.error = null;
    });
    builder.addCase(fetchSkillsWishlistData.fulfilled, (state, action) => {
      state.skillsWishlistLoading = false;
      state.skillsWishlist = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSkillsWishlistData.rejected, (state, action) => {
      state.skillsWishlistLoading = false;
      state.error = action.payload;
    });
  },
});

export default mySkillsSlice.reducer;
