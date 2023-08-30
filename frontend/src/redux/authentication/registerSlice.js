import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Create register thunk

// Create registerSlice
const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: {},
});

export default registerSlice.reducer;
