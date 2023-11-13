import { createSlice } from "@reduxjs/toolkit";
import {
  // addSkillProfile,
  // deleteSkillProfile,
  // editSkillProfile,
  fetchSkillProfile,
  fetchSkillProfileRecommendationData,
} from "./skillProfileActions";

const skillProfileSlice = createSlice({
  name: "skillProfile",
  initialState: {
    skillsDataLoading: false,
    skillProfileRecommendationsLoading: false,
    skillProfile: [],
    skillProfileRecommendations: [],
    selectedJob: null,
    selectedTitle: null,
  },
  reducers: {
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setSelectedTitle: (state, action) => {
      state.selectedTitle = action.payload;
    },
    setDefaultSkills: (state) => {
      state.skillProfileRecommendations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillProfile.pending, (state) => {
        state.skillsDataLoading = true;
      })
      .addCase(fetchSkillProfile.fulfilled, (state, action) => {
        state.skillsDataLoading = false;
        state.skillProfile = action.payload;
      })
      .addCase(fetchSkillProfile.rejected, (state) => {
        state.skillsDataLoading = false;
      });

    builder
      .addCase(fetchSkillProfileRecommendationData.pending, (state) => {
        state.skillProfileRecommendationsLoading = true;
      })
      .addCase(
        fetchSkillProfileRecommendationData.fulfilled,
        (state, action) => {
          state.skillProfileRecommendationsLoading = false;
          state.skillProfileRecommendations = action.payload;
        }
      )
      .addCase(fetchSkillProfileRecommendationData.rejected, (state) => {
        state.skillProfileRecommendationsLoading = false;
      });

    // builder
    //   .addCase(addSkillProfile.pending, (state) => {
    //     state.skillsDataLoading = true;
    //   })
    //   .addCase(addSkillProfile.fulfilled, (state, action) => {
    //     state.skillsDataLoading = false;
    //     state.skillProfile = action.payload;
    //   })
    //   .addCase(addSkillProfile.rejected, (state) => {
    //     state.skillsDataLoading = false;
    //   });

    // builder
    //   .addCase(deleteSkillProfile.pending, (state) => {
    //     state.skillsDataLoading = true;
    //   })
    //   .addCase(deleteSkillProfile.fulfilled, (state, action) => {
    //     state.skillsDataLoading = false;
    //   })
    //   .addCase(deleteSkillProfile.rejected, (state) => {
    //     state.skillsDataLoading = false;
    //   });

    // builder
    //   .addCase(editSkillProfile.pending, (state) => {
    //     state.skillsDataLoading = true;
    //   })
    //   .addCase(editSkillProfile.fulfilled, (state, action) => {
    //     state.skillsDataLoading = false;
    //     state.skillProfile = action.payload;
    //   })
    //   .addCase(editSkillProfile.rejected, (state) => {
    //     state.skillsDataLoading = false;
    //   });
  },
});

export const { setSelectedJob, setSelectedTitle, setDefaultSkills } =
  skillProfileSlice.actions;
export default skillProfileSlice.reducer;
