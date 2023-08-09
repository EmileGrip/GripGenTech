import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./organigramActions";

const organigramSlice = createSlice({
  name: "organigram",
  initialState: {
    success: null,
    loading: false,
    openSnack: false,
    data: {
      roles: [],
      edges: [],
    },
    detectedPosition: "",
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
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDetectedPosition: (state, action) => {
      state.detectedPosition = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.openSnack = true;
      });
  },
});

export const {
  setSuccess,
  setLoading,
  setOpenSnack,
  setData,
  setDetectedPosition,
} = organigramSlice.actions;

export default organigramSlice.reducer;
