import { createSlice } from "@reduxjs/toolkit";

const addProjectFormSlice = createSlice({
  name: "addProjectForm",
  initialState: {
    name: "",
    department: "",
    startDate: null,
    endDate: null,
    description: "",
    role: "",
    roleStartDate: null,
    roleEndDate: null,
    hours: "",
    salary: "",
    roleDescription: "",
  },
  reducers: {
    setProjectFormInfo: (state, action) => {
      state.name = action.payload.name;
      state.department = action.payload.department;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.description = action.payload.description;
      state.role = action.payload.role;
      state.roleStartDate = action.payload.roleStartDate;
      state.roleEndDate = action.payload.roleEndDate;
      state.hours = action.payload.hours;
      state.salary = action.payload.salary;
      state.roleDescription = action.payload.roleDescription;
    },
  },
});

export const { setProjectFormInfo } = addProjectFormSlice.actions;
export default addProjectFormSlice.reducer;
