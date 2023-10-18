import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "./addProjectFormActions";

const addProjectFormSlice = createSlice({
  name: "addProjectForm",
  initialState: {
    name: "",
    department: "",
    startDate: null,
    endDate: null,
    description: "",
    roles: [],
    role: "",
    roleStartDate: null,
    roleEndDate: null,
    hours: "",
    salary: "",
    roleDescription: "",
    projects: [],
    projectsLoading: false,
    openSnack: false,
    response: {
      success: false,
      message: "",
    },
  },
  reducers: {
    setProjectFormInfo: (state, action) => {
      state.name = action.payload.name;
      state.department = action.payload.department;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.description = action.payload.description;
      state.roles = action.payload.roles;
      state.role = action.payload.role;
      state.roleStartDate = action.payload.roleStartDate;
      state.roleEndDate = action.payload.roleEndDate;
      state.hours = action.payload.hours;
      state.salary = action.payload.salary;
      state.roleDescription = action.payload.roleDescription;
    },
    setOpenProjectSnack: (state, action) => {
      state.openSnack = action.payload;
    },
    setProjectResponse: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.projectsLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projectsLoading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state) => {
      state.projectsLoading = false;
    });
  },
});

export const { setProjectFormInfo, setOpenProjectSnack, setProjectResponse } =
  addProjectFormSlice.actions;
export default addProjectFormSlice.reducer;
