import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById } from "./usersActions";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    success: null,
    loading: false,
    openSnack: false,
    response: {
      success: false,
      message: "",
    }, // recover page
    data: [],
    user: null,
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
    setResponse: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.openSnack = true;
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSuccess, setLoading, setOpenSnack, setData, setResponse } =
  usersSlice.actions;

export default usersSlice.reducer;
