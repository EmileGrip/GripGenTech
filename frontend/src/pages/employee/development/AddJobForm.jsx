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
import { useFormik } from "formik";
import SuggestedSkillChip from "../../employee/mySkills/SuggestedSkillChip";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import validationsForm from "./validations/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchCareerPathData } from "../../../redux/slices/Employee/development/developmentActions";
import { setMessage } from "../../../redux/slices/Employee/development/developmentSlice";

const formControlWrapperStyle = {
  minHeight: "140px",
  mb: 9.375,
};

const AddJobForm = ({ data, closeModal, onSuccess }) => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { jobsRecommendation } = useSelector((state) => state.development);
  const dispatch = useDispatch();
  const noJobsMatch = "No jobs match";

  // Loading State
  const [loading, setLoading] = useState(false);

  const suggestedHandler = async (value) => {
    setValue(value);

    // Call the searchSkills function here
    const selectedId = await searchJobs(token, value, true);

    // Then select the value
    if (selectedId) {
      formik.setFieldValue("job", selectedId);
    } else {
      formik.setFieldValue("job", "");
    }
  };

  const formik = useFormik({
    initialValues: {
      job: "",
    },
    validationSchema: validationsForm,
    onSubmit: (values, { setSubmitting }) => {
      if (values.job === null || values.job === noJobsMatch) {
        // Handle "No jobs match" validation
        formik.setFieldError("job", "Please select a valid job");
        setSubmitting(false);
        return;
      }

      try {
        // Submit to the server
        sendData(token, values);
        setSubmitting(false);
      } catch (error) {
        // Handle error
        console.log(error);
        setSubmitting(false);
      }
    },
  });

  const searchJobs = useCallback(
    async (token, value, isSuggested = false) => {
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
        console.log(response.data);
        setOptions(response.data.payload);

        if (isSuggested) {
          const selectedId = response.data.payload[0].id;
          return selectedId;
        }
        // onSuccess(true);
        // onClose();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        // closeModal();
      }
    },
    [token]
  );

  const sendData = useCallback(
    async (token, values) => {
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
          `career_path`,
          {
            job_profile_id: values.job,
            parent_career_job_id: data.id,
          },
          config
        );
        console.log(response.data);
        dispatch(setMessage(response.data.message));
        setTimeout(() => {
          onSuccess(true);
        }, 1000);
        // onClose();
      } catch (error) {
        dispatch(setMessage(error?.response.data.message));
        setTimeout(() => {
          onSuccess(false);
        }, 1000);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        dispatch(fetchCareerPathData(token));
        closeModal();
      }
    },
    [token, onSuccess]
  );

  useEffect(() => {
    if (inputValue !== "") {
      searchJobs(token, inputValue);
    } else {
      setOptions([]);
    }
  }, [searchJobs, token, inputValue]);

  const selectValue = useCallback(
    (e, optionName) => {
      const selectedOption = options.find(
        (option) => option.title === optionName
      );

      if (selectedOption) {
        formik.setFieldValue("job", selectedOption.id);
      } else {
        formik.setFieldValue("job", "");
      }
    },
    [formik, options]
  );

  const handleSearch = useCallback(
    async (event) => {
      event.preventDefault();
      formik.handleSubmit(); // Submit the form

      if (formik.values.job === noJobsMatch) {
        return;
      }

      // Call the searchJobs function here
      await searchJobs(token, formik.values.job);
    },
    [searchJobs, token, formik]
  );

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  const suggestedJobs = jobsRecommendation?.slice(0, 12);

  return (
    <form onSubmit={handleSearch}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Box sx={formControlWrapperStyle}>
          <Typography
            variant="h3"
            component="label"
            htmlFor="search_job"
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            search job
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Autocomplete
            freeSolo
            id="search_job"
            name="search_job"
            value={value}
            options={
              options.length < 1
                ? [noJobsMatch].map((option) => option)
                : options.map((option) => option.title)
            }
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onBlur={formik.handleBlur}
            onChange={(e, value) => selectValue(e, value)}
            label="Search input"
            sx={{ mt: "16px" }}
            renderInput={(params) => (
              <TextField
                error={formik.touched.job && Boolean(formik.errors.job)}
                helperText={formik.touched.job ? formik.errors.job : ""}
                name="search_job"
                fullWidth
                placeholder="Search Job"
                {...params}
                type="search"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {params.InputProps.endAdornment}
                        {loading && <CircularProgress size={20} />}
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Box>
          <Typography
            variant="h3"
            component="label"
            htmlFor="search_job"
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            suggested jobs
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ flexGrow: 1, mt: "16px" }}
            mb={"50px"}
          >
            {suggestedJobs.map((job) => (
              <Grid2 key={job.id} xs={4}>
                <SuggestedSkillChip
                  title={job.title}
                  onClick={() => suggestedHandler(job.title)}
                  selectedSkill={value}
                >
                  {job.title}
                </SuggestedSkillChip>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "16px" }}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontSize: "14px",
              px: "50px",
            }}
          >
            add job
          </Button>
          {formik.isSubmitting && <CircularProgress />}
        </Stack>
      </Stack>
    </form>
  );
};

export default AddJobForm;
