import {
  Autocomplete,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchSkillProfileRecommendationData } from "../../../redux/slices/admin/skillProfile/skillProfileActions";
import { debounce } from "lodash";

const boxStyles = {
  minHeight: "82px",
};

const formControlStyles = {
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

const Details = ({
  data,
  formik,
  chosenRole,
  projects = false,
  roles = false,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [inputProjectDepartmentValue, setInputProjectDepartmentValue] =
    useState("");
  const [inputProjectRoleValue, setInputProjectRoleValue] = useState("");
  const [inputJobDepartmentValue, setInputJobDepartmentValue] = useState("");
  const [inputJobRoleValue, setInputJobRoleValue] = useState("");
  const [projectDepartmentOptions, setProjectDepartmentOptions] = useState([]);
  const [projectRoleOptions, setProjectRoleOptions] = useState([]);
  const [jobDepartmentOptions, setJobDepartmentOptions] = useState([]);
  const [jobRoleOptions, setJobRoleOptions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const noDepartmentsMatch = "No departments match";
  const noRolesMatch = "No roles match";

  // Loading State
  const [loading, setLoading] = useState(false);

  const searchJobs = useCallback(
    debounce(async (token, value, fieldName, isRole = false) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        setLoading(true);
        const response = await axiosInstance.post(
          `search`,
          {
            key:
              fieldName === "jobDepartment" || fieldName === "projectDepartment"
                ? "department"
                : "job_profile",
            value: value,
          },
          config
        );

        if (fieldName === "projectDepartment") {
          setProjectDepartmentOptions(response.data.payload);
        } else if (fieldName === "projectRole") {
          setProjectRoleOptions(response.data.payload);
        } else if (fieldName === "jobDepartment") {
          setJobDepartmentOptions(response.data.payload);
        } else if (fieldName === "jobRole") {
          setJobRoleOptions(response.data.payload);
        }

        if (isRole) {
          const selectedId = response.data.payload[0].id;
          return selectedId;
        } else {
          return response.data.payload[0];
        }
      } catch (error) {
        console.log(error?.response.data);
      } finally {
        setLoading(false);
      }
    }, 500),
    [token]
  );

  const addRole = useCallback(
    async (title) => {
      // Remove double quotes from the title
      const roleTitle = title.replace(/"/g, "");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        const response = await axiosInstance.post(
          `job_profile`,
          {
            title: roleTitle,
          },
          config
        );
        console.log(response.data);
        formik.setFieldValue("fullRoleObj", response.data.payload);
        if (response.data.payload.id) {
          dispatch(
            fetchSkillProfileRecommendationData(response.data.payload.id)
          );
        }
        return response.data.payload.id;
      } catch (error) {
        console.log(error.response.data);
      } finally {
        // dispatch(fetchSkillProfileRecommendationData(response.data.payload.id));
      }
    },
    [token]
  );

  const jobRoleHandler = async (fieldName, value) => {
    let selectedId;
    let selectedRole;

    if (fieldName === "jobRole") {
      selectedId = await searchJobs(token, value, "jobRole", true);
      selectedRole = await searchJobs(token, value, "jobRole");
    } else if (fieldName === "projectRole") {
      selectedId = await searchJobs(token, value, "projectRole", true);
      selectedRole = await searchJobs(token, value, "projectRole");
    }

    if (selectedId) {
      formik.setFieldValue("role", selectedId.id);
    }

    if (selectedRole) {
      formik.setFieldValue("fullRoleObj", selectedRole);
    }
  };

  useEffect(() => {
    if (inputProjectDepartmentValue !== "") {
      searchJobs(token, inputProjectDepartmentValue, "projectDepartment");
    } else {
      setProjectDepartmentOptions([]);
    }
  }, [searchJobs, token, inputProjectDepartmentValue]);
  useEffect(() => {
    if (inputProjectRoleValue !== "") {
      jobRoleHandler("projectRole", inputProjectRoleValue);
    } else {
      setProjectRoleOptions([]);
    }
  }, [searchJobs, token, inputProjectRoleValue]);

  useEffect(() => {
    if (inputJobDepartmentValue !== "") {
      searchJobs(token, inputJobDepartmentValue, "jobDepartment");
    } else {
      setJobDepartmentOptions([]);
    }
  }, [searchJobs, token, inputJobDepartmentValue]);
  useEffect(() => {
    if (inputJobRoleValue !== "") {
      jobRoleHandler("jobRole", inputJobRoleValue);
    } else {
      setJobRoleOptions([]);
    }
  }, [searchJobs, token, inputJobRoleValue]);

  const handleInputChange = (event, newValue, fieldName) => {
    if (fieldName === "projectDepartment") {
      setInputProjectDepartmentValue(newValue);
    } else if (fieldName === "projectRole") {
      setInputProjectRoleValue(newValue);
    } else if (fieldName === "jobDepartment") {
      setInputJobDepartmentValue(newValue);
    } else if (fieldName === "jobRole") {
      setInputJobRoleValue(newValue);
    }
    searchJobs(token, newValue, fieldName);
  };

  // Callback function to update formik fields dynamically
  const handleFieldChange = (event, fieldName) => {
    formik.setFieldValue(fieldName, event.target.value);
  };
  const selectValue = useCallback(
    (e, optionName, fieldName) => {
      if (fieldName === "jobDepartment") {
        const selectedOption = jobDepartmentOptions.find(
          (option) => option === optionName
        );

        if (selectedOption) {
          formik.setFieldValue("department", selectedOption);
        } else {
          formik.setFieldValue("department", "");
        }
      } else if (fieldName === "projectDepartment") {
        const selectedOption = projectDepartmentOptions.find(
          (option) => option === optionName
        );

        if (selectedOption) {
          formik.setFieldValue("department", selectedOption);
        } else {
          formik.setFieldValue("department", "");
        }
      }
    },
    [formik, jobDepartmentOptions, projectDepartmentOptions]
  );

  return (
    <Stack
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        gap: "20px",
        p: { xs: "12px", lg: "20px" },
      }}
    >
      <Typography variant="h3" color="#173433">
        {roles ? "Role Details" : "Details"}
      </Typography>

      <Grid2
        container
        spacing={{ xs: 1, lg: 0 }}
        columnSpacing={{ md: 8, lg: 4 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid2 xs={12} md={6}>
          <Box sx={boxStyles}>
            {projects ? (
              <TextField
                id="name"
                name="name"
                placeholder="Project Name"
                label="Project Name"
                size="medium"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && Boolean(formik.errors.name)}
                variant="outlined"
                fullWidth
                sx={{
                  ...formControlStyles,
                }}
              />
            ) : roles ? (
              <Autocomplete
                freeSolo
                id="project_role"
                name="role"
                value={
                  chosenRole?.title ? chosenRole?.title : inputProjectRoleValue
                }
                options={[
                  ...projectRoleOptions.map((option) => option.title),
                  // Add "Add 'string that user typed'" option conditionally
                  inputProjectRoleValue &&
                  !projectRoleOptions.some(
                    (option) => option.title === inputProjectRoleValue
                  )
                    ? `Add "${inputProjectRoleValue}"`
                    : null,
                ].filter(Boolean)}
                inputValue={inputProjectRoleValue}
                onInputChange={(event, newValue) => {
                  handleInputChange(event, newValue, "projectRole");
                }}
                onBlur={formik.handleBlur}
                onChange={async (e, value) => {
                  if (value.startsWith("Add ")) {
                    // Handle adding the role here
                    const newRole = value.substring(4);
                    // Call the addRole function to add the new role
                    const newRoleId = await addRole(newRole);
                    if (newRoleId) {
                      // Update your formik field with the newly added role ID
                      formik.setFieldValue("role", newRoleId);
                    }
                    // Reset the input value
                    // setInputJobRoleValue("");
                  } else {
                    handleFieldChange(e, "role");
                  }
                }}
                sx={formControlStyles}
                renderInput={(params) => (
                  <TextField
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role ? formik.errors.role : ""}
                    name="role"
                    fullWidth
                    label="Search role"
                    placeholder="Search role"
                    {...params}
                    type="search"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {params.InputProps.endAdornment}
                            {loading && <CircularProgress size={20} />}
                          </div>

                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            ) : (
              <Autocomplete
                freeSolo
                id="job_department"
                name="department"
                value={
                  data?.department ? data?.department : inputJobDepartmentValue
                }
                options={
                  jobDepartmentOptions.length < 1
                    ? [noDepartmentsMatch].map((option) => option)
                    : jobDepartmentOptions.map((option) => option)
                }
                inputValue={inputJobDepartmentValue}
                onInputChange={(event, newValue) => {
                  handleInputChange(event, newValue, "jobDepartment");
                }}
                onBlur={formik.handleBlur}
                onChange={(e, value) => selectValue(e, value, "jobDepartment")}
                sx={formControlStyles}
                renderInput={(params) => (
                  <TextField
                    error={
                      formik.touched.department &&
                      Boolean(formik.errors.department)
                    }
                    helperText={
                      formik.touched.department ? formik.errors.department : ""
                    }
                    name="department"
                    fullWidth
                    label="Search Department"
                    placeholder="Search Department"
                    {...params}
                    type="search"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {params.InputProps.endAdornment}
                            {loading && <CircularProgress size={20} />}
                          </div>

                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}
          </Box>
        </Grid2>

        <Grid2 xs={12} md={6}>
          {!roles && (
            <Box sx={boxStyles}>
              {projects ? (
                <Autocomplete
                  freeSolo
                  id="project_department"
                  name="department"
                  value={
                    data?.department
                      ? data?.department
                      : inputProjectDepartmentValue
                  }
                  options={
                    projectDepartmentOptions.length < 1
                      ? [noDepartmentsMatch].map((option) => option)
                      : projectDepartmentOptions.map((option) => option)
                  }
                  inputValue={inputProjectDepartmentValue}
                  onInputChange={(event, newValue) => {
                    handleInputChange(event, newValue, "projectDepartment");
                  }}
                  onBlur={formik.handleBlur}
                  onChange={(e, value) =>
                    selectValue(e, value, "projectDepartment")
                  }
                  sx={formControlStyles}
                  renderInput={(params) => (
                    <TextField
                      error={
                        formik.touched.department &&
                        Boolean(formik.errors.department)
                      }
                      helperText={
                        formik.touched.department
                          ? formik.errors.department
                          : ""
                      }
                      name="department"
                      fullWidth
                      label="Department"
                      placeholder="Department"
                      {...params}
                      type="search"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {params.InputProps.endAdornment}
                              {loading && <CircularProgress size={20} />}
                            </div>

                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  freeSolo
                  id="job_role"
                  name="role"
                  value={
                    data?.role.title ? data?.role.title : inputJobRoleValue
                  }
                  options={[
                    ...jobRoleOptions.map((option) => option.title),
                    // Add "Add 'string that user typed'" option conditionally
                    inputJobRoleValue &&
                    !jobRoleOptions.some(
                      (option) => option.title === inputJobRoleValue
                    )
                      ? `Add "${inputJobRoleValue}"`
                      : null,
                  ].filter(Boolean)}
                  inputValue={inputJobRoleValue}
                  onInputChange={(event, newValue) => {
                    handleInputChange(event, newValue, "jobRole");
                  }}
                  onBlur={formik.handleBlur}
                  onChange={async (e, value) => {
                    if (value.startsWith("Add ")) {
                      // Handle adding the role here
                      const newRole = value.substring(4);
                      // Call the addRole function to add the new role
                      const newRoleId = await addRole(newRole);
                      if (newRoleId) {
                        // Update your formik field with the newly added role ID
                        formik.setFieldValue("role", newRoleId);
                      }
                      // Reset the input value
                      // setInputJobRoleValue("");
                    } else {
                      handleFieldChange(e, "role");
                    }
                  }}
                  sx={formControlStyles}
                  renderInput={(params) => (
                    <TextField
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role ? formik.errors.role : ""}
                      name="role"
                      fullWidth
                      label="Search or add new Role"
                      placeholder="Search or add new Role"
                      {...params}
                      type="search"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {params.InputProps.endAdornment}
                              {loading && <CircularProgress size={20} />}
                            </div>

                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            </Box>
          )}
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Box sx={boxStyles}>
            <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
              <DatePicker
                size="medium"
                label="Start date"
                value={formik.values.startDate}
                onChange={(value) => {
                  formik.setFieldValue("startDate", value);
                }}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.startDate && formik.errors.startDate
                    )}
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                    id="startDate"
                    name="startDate"
                  />
                )}
              />

              {formik.touched.startDate && formik.errors.startDate ? (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    mx: "14px",
                    mt: "3px",
                    fontSize: "0.8571428571428571rem",
                  }}
                >
                  {formik.errors.startDate}
                </Typography>
              ) : null}
            </Stack>
          </Box>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Box sx={boxStyles}>
            <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
              <DatePicker
                size="medium"
                label="End date"
                value={formik.values.endDate}
                onChange={(value) => {
                  formik.setFieldValue("endDate", value);
                }}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.endDate && formik.errors.endDate
                    )}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    id="endDate"
                    name="endDate"
                  />
                )}
              />

              {formik.touched.endDate && formik.errors.endDate ? (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    mx: "14px",
                    mt: "3px",
                    fontSize: "0.8571428571428571rem",
                  }}
                >
                  {formik.errors.endDate}
                </Typography>
              ) : null}
            </Stack>
          </Box>
        </Grid2>

        {!projects && (
          <>
            <Grid2 xs={12} md={3}>
              <Box sx={boxStyles}>
                <TextField
                  id="hours"
                  name="hours"
                  placeholder="Hours"
                  label="Hours"
                  size="medium"
                  type="text"
                  value={formik.values.hours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.hours ? formik.errors.hours : ""}
                  error={formik.touched.hours && Boolean(formik.errors.hours)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    ...formControlStyles,
                  }}
                />
              </Box>
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Box sx={boxStyles}>
                <TextField
                  id="salary"
                  name="salary"
                  placeholder="Salary"
                  label="Salary"
                  size="medium"
                  type="text"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.salary ? formik.errors.salary : ""}
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    ...formControlStyles,
                  }}
                />
              </Box>
            </Grid2>
          </>
        )}
      </Grid2>
    </Stack>
  );
};

export default Details;
