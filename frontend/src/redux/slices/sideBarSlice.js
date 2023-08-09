import { createSlice } from "@reduxjs/toolkit";

const storedMainValue = localStorage.getItem("openMain");
const storedSubValue = localStorage.getItem("openSub");

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    openMain: storedMainValue !== null ? storedMainValue : "main__0",
    openSub: storedSubValue !== null ? storedSubValue : "sub__0",
  },
  reducers: {
    setOpenMain: (state, action) => {
      state.openMain = action.payload;
    },
    setOpenSub: (state, action) => {
      state.openSub = action.payload;
    },
  },
});

export const { setOpenMain, setOpenSub } = sideBarSlice.actions;
export default sideBarSlice.reducer;
