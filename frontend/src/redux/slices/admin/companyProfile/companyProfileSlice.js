import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../helper/axiosInstance";
import replaceNullWithEmptyString from "../../../../helper/replaceNullWithEmptyString";

// Async action creator for fetching data
export const fetchData = createAsyncThunk(
  "companyProfile/fetchData",
  async (token, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const response = await axiosInstance.get(`company`, config);
    console.log("fetched data:", response.data);

    // Access the fetchedData state
    const fetchedData = thunkAPI.getState().companyProfile.fetchedData;
    return replaceNullWithEmptyString(response.data.payload.data, fetchedData);
  }
);

// Async action creator for editing data
export const editData = createAsyncThunk(
  "companyProfile/editData",
  async ({ values, token }, { dispatch }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    await axiosInstance.put(
      `company`,
      { ...values, description: "Not inIncluded", phone: "Not included" },
      config
    );
    dispatch(setSuccess(true));
    dispatch(setOpenSnack(true));
  }
);

const companyProfileSlice = createSlice({
  name: "companyProfile",
  initialState: {
    success: null,
    initialVisit: true,
    loading: true,
    openSnack: false,
    fetchedData: {
      files: "",
      name: "",
      industry: "",
      website: "",
      linkedin: "",
      country: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      postal_code: "",
      logo: null,
    },
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setInitialVisit: (state, action) => {
      state.initialVisit = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOpenSnack: (state, action) => {
      state.openSnack = action.payload;
    },
    setFetchedData: (state, action) => {
      state.fetchedData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.initialVisit = !!!action.payload.industry;
        state.fetchedData = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(editData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editData.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.openSnack = true;
      });
  },
});

export const {
  setSuccess,
  setInitialVisit,
  setLoading,
  setOpenSnack,
  setFetchedData,
} = companyProfileSlice.actions;

export default companyProfileSlice.reducer;
