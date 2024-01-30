import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import SuggestedJobs from "./SuggestedJobs";
import { useEffect, useState } from "react";
import { addRoleFormValidationSchema } from "./validations/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";
import { debounce } from "lodash";

const formControlWrapperStyle = {
  minHeight: "135px",
};

const EditRoleForm = ({ data, editRoleData, closeModal }) => {
  const [value, setValue] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputJobRoleValue, setInputJobRoleValue] = useState(
    editRoleData.title
  );
  const [jobRoleOptions, setJobRoleOptions] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(false);

  const initialValues = {
    roleName: editRoleData.title ? editRoleData.title : "",
    fullRoleObj: null,
    department: editRoleData.department ? editRoleData.department : "",
  };

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

  const editData = useCallback(async (token, values) => {
    console.log(values);
    const isDepartmentEmpty =
      values.department.trim().length === 0 ? true : false;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id: editRoleData.id,
      },
    };
    try {
      const response = await axiosInstance.put(
        "role",
        {
          job_profile_id: values.roleName,
          department: isDepartmentEmpty ? "0" : values.department,
        },
        config
      );
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchData(token));
      closeModal();
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: addRoleFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        // alert(JSON.stringify(values, null, 2));
        editData(token, values);
        setSubmitting(false);
      }, 1000);
    },
  });

  const searchJobs = useCallback(
    debounce(async (token, value, isRole = false) => {
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
            key: "job_profile",
            value: value,
          },
          config
        );

        setJobRoleOptions(response.data.payload);

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
        return response.data.payload.id;
      } catch (error) {
        console.log(error.response.data);
      } finally {
        // dispatch(fetchSkillProfileRecommendationData(response.data.payload.id));
      }
    },
    [token]
  );

  const jobRoleHandler = async (value) => {
    let selectedId;
    let selectedRole;

    selectedId = await searchJobs(token, value, true);
    selectedRole = await searchJobs(token, value);

    if (selectedId) {
      formik.setFieldValue("roleName", selectedId.id);
    }

    if (selectedRole) {
      formik.setFieldValue("fullRoleObj", selectedRole);
    }
  };

  useEffect(() => {
    if (inputJobRoleValue !== "") {
      jobRoleHandler(inputJobRoleValue);
    } else {
      setJobRoleOptions([]);
    }
  }, [searchJobs, token, inputJobRoleValue]);

  const selectValue = (e, value) => {
    formik.setFieldValue("roleName", value !== null ? value : null);
  };

  const handleInputChange = (event, newValue) => {
    setInputJobRoleValue(newValue);
    searchJobs(token, newValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Box>
          <Box sx={formControlWrapperStyle}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="roleName"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              role name
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Autocomplete
              freeSolo
              id="roleName"
              name="roleName"
              value={inputJobRoleValue}
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
                handleInputChange(event, newValue, "roleName");
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
                    formik.setFieldValue("roleName", newRoleId);
                  }
                } else {
                  formik.setFieldValue("roleName", e.target.value);
                }
              }}
              sx={{ mt: "16px" }}
              renderInput={(params) => (
                <TextField
                  error={
                    formik.touched.roleName && Boolean(formik.errors.roleName)
                  }
                  helperText={
                    formik.touched.roleName ? formik.errors.roleName : ""
                  }
                  name="roleName"
                  fullWidth
                  label="Search or add new Role"
                  placeholder="Search or add new Role"
                  {...params}
                  type="search"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <div style={{ display: "flex", alignItems: "center" }}>
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
          </Box>

          <Box sx={formControlWrapperStyle}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="department"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              department
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="department"
              name="department"
              type="text"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.department ? formik.errors.department : ""
              }
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
              fullWidth
              sx={{ mt: "16px" }}
            />
          </Box>
        </Box>

        {/* <Box>
          <Typography
            variant="h3"
            component="label"
            htmlFor="roleName"
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            suggested job
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ flexGrow: 1, mt: "16px" }}
            mb={"50px"}
          >
            {data.map((job) => (
              <Grid2 key={job} xs={4}>
                <SuggestedJobs onClick={suggestedHandler} selectedJob={value}>
                  {job}
                </SuggestedJobs>
              </Grid2>
            ))}
          </Grid2>
        </Box> */}

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
            pb: 1,
          }}
        >
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
            sx={{
              width: { xs: "100%", sm: "220px" },
              background: (theme) => theme.palette.accent,
              color: "darkGreen",
              textTransform: "capitalize",
              "&:hover": {
                background: "#6AE6A480",
              },
            }}
          >
            <Typography variant="h6">edit</Typography>
          </Button>
          {formik.isSubmitting && <CircularProgress />}
        </Stack>
      </Stack>
    </form>
  );
};

export default EditRoleForm;
