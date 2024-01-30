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
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";
import { debounce } from "lodash";

const formControlWrapperStyle = {
  minHeight: "135px",
};

const AddRoleForm = ({ data, suggestedJobs, closeModal }) => {
  const { token } = useSelector((state) => state.auth);
  const { detectedPosition } = useSelector((state) => state.organigram);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [inputJobRoleValue, setInputJobRoleValue] = useState("");
  const [jobRoleOptions, setJobRoleOptions] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(false);

  const initialValues = {
    roleName: "",
    fullRoleObj: null,
    department: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addRoleFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        // alert(JSON.stringify(values, null, 2));
        sendData(values);
        setSubmitting(false);
      }, 1000);
    },
  });

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

  const searchJobs = useCallback(
    debounce(async (token, value) => {
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

        return response.data.payload;
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

  useEffect(() => {
    // Check if a valid option is selected
    const selectedOption = jobRoleOptions.find(
      (option) => option.title === inputJobRoleValue
    );

    if (selectedOption) {
      // Update your formik field with the selected option
      formik.setFieldValue("roleName", selectedOption.id);
    } else {
      // If the selected option is not in the current options, it may be a newly added role
      // In this case, you may handle it based on your requirements
    }
  }, [jobRoleOptions, inputJobRoleValue]);

  const sendData = useCallback(
    async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      // Create a function to filter out keys with empty string or null values
      const removeEmptyKeys = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== "" && v !== null)
        );

      // Determine the key based on the condition
      const key =
        typeof values.roleName === "number" ? "job_profile_id" : "title";

      const requestBody = removeEmptyKeys({
        [key]: values.roleName,
        department: values.department,
        parent_role_id:
          detectedPosition === "bottom" ? data.id : data.parent_role,
        selected_role_id: data.id,
        position: detectedPosition,
      });

      try {
        const response = await axiosInstance.post(`role`, requestBody, config);
        console.log(response.data);
        // onSuccess(true);
        // onClose();
        // onFetch();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchData(token));
        closeModal();
      }
    },
    [token]
  );

  const selectValue = (e, value) => {
    formik.setFieldValue("roleName", value !== null ? value : null);
  };

  const handleInputChange = (event, newValue) => {
    setInputJobRoleValue(newValue);
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
                if (value && value.startsWith("Add ")) {
                  // Handle adding the role here
                  const newRole = value.substring(4);
                  // Call the addRole function to add the new role
                  const newRoleId = await addRole(newRole);
                  if (newRoleId) {
                    // Update your formik field with the newly added role ID
                    formik.setFieldValue("roleName", newRoleId);
                  }
                } else {
                  // Check if a valid option is selected
                  const selectedOption = jobRoleOptions.find(
                    (option) => option.title === value
                  );

                  if (selectedOption) {
                    // Update your formik field with the selected option
                    formik.setFieldValue("roleName", selectedOption.id);
                  } else {
                    // If the selected option is not in the current options, it may be a newly added role
                    // In this case, you may handle it based on your requirements
                  }
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
            {suggestedJobs.map((job) => (
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
            <Typography variant="h6">continue</Typography>
          </Button>
          {formik.isSubmitting && <CircularProgress />}
        </Stack>
      </Stack>
    </form>
  );
};

export default AddRoleForm;
