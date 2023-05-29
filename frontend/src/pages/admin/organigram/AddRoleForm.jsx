import {
  Box,
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import SuggestedJobs from "./SuggestedJobs";
import { useState } from "react";
import { addRoleFormValidationSchema } from "./validations/validationSchema";

const formControlWrapperStyle = {
  minHeight: "130px",
};

const AddRoleForm = ({ data }) => {
  const [value, setValue] = useState("");

  const initialValues = {
    roleName: "",
    department: "",
  };

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addRoleFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (values.roleName === null || values.roleName.trim() === "") {
        alert("Please, select your role name");
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
    formik.setFieldValue("roleName", value !== null ? value : null);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Box mb={{ xs: 2.5, sm: 7 }}>
          <Box sx={formControlWrapperStyle}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="roleName"
              mb={1.5}
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              role name
            </Typography>
            <TextField
              id="roleName"
              name="roleName"
              type="text"
              value={formik.values.roleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.roleName ? formik.errors.roleName : ""}
              error={formik.touched.roleName && Boolean(formik.errors.roleName)}
              fullWidth
            />
          </Box>

          <Box sx={formControlWrapperStyle}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="department"
              mb={1.5}
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              department
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
            />
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h3"
            component="label"
            htmlFor="roleName"
            mb={2.75}
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            suggested job
          </Typography>
          <Grid2 container spacing={2} sx={{ flexGrow: 1 }} mb={"50px"}>
            {data.map((job) => (
              <Grid2 key={job} xs={4}>
                <SuggestedJobs onClick={suggestedHandler} selectedJob={value}>
                  {job}
                </SuggestedJobs>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {formik.isSubmitting && <LinearProgress sx={{ mb: "25px" }} />}

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
            continue
          </Button>
          <Typography
            variant="body2"
            sx={{
              textTransform: "capitalize",
              color: "#1E394C",
              fontSize: "12px",
            }}
          >
            next: assign role
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddRoleForm;
