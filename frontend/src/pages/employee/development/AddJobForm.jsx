import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import SuggestedSkillChip from "../../employee/mySkills/SuggestedSkillChip";
// import * as yup from "yup";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import validationsForm from "../../employee/mySkills/validations/validationSchema";
const AddJobForm = ({ data }) => {
  const [value, setValue] = useState("");

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

  const formik = useFormik({
    initialValues: {
      job: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      if (values.job === null || values.job.trim() === "") {
        alert("Please Enter a valid value");
        setSubmitting(false);
        return;
      }
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));

        setSubmitting(false);
      }, 1000);
    },
  });

  const selectValue = (e, value) => {
    formik.setFieldValue("job", value !== null ? value : null);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Box mb={9.375}>
          <Typography
            variant="h3"
            mb={2.5}
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
              ml: { xs: "20px", md: "0" },
            }}
          >
            search job
          </Typography>
          <Autocomplete
            freeSolo
            id="search_job"
            name="search_job"
            value={value}
            options={data.map((option) => option)}
            onBlur={formik.handleBlur}
            onChange={selectValue}
            label="Search input"
            renderInput={(params) => (
              <TextField
                error={formik.touched.job && Boolean(formik.errors.job)}
                helperText={formik.touched.job ? formik.errors.job : ""}
                name="search_job"
                fullWidth
                {...params}
                type="search"
                // value={value}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
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

        <Box>
          <Typography
            variant="h3"
            mb={2.75}
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
              ml: { xs: "20px", md: "0" },
            }}
          >
            suggested jobs
          </Typography>
          <Grid2 container spacing={2} sx={{ flexGrow: 1 }} mb={"50px"}>
            {data.map((job) => (
              <Grid2 key={job} xs={4}>
                <SuggestedSkillChip onClick={suggestedHandler}>
                  {job}
                </SuggestedSkillChip>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Box>
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
              ml: { xs: "20px", md: "0" },
            }}
          >
            add job
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default AddJobForm;
