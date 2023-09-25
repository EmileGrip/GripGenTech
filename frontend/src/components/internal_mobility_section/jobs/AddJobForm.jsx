import { Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import Description from "./Description";
import Details from "./Details";
import Skills from "./Skills";
import validationSchema from "./validations/validationSchema";

const AddJobForm = () => {
  const formik = useFormik({
    initialValues: {
      department: "",
      role: "",
      startDate: null,
      endDate: null,
      hours: "",
      salary: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // submit to the server
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ gap: 3 }}>
        <Typography variant="h2" color="#173433">
          New Job
        </Typography>

        <Details formik={formik} />

        <Description formik={formik} />

        <Skills />

        <Stack sx={{ flexDirection: { sm: "row" }, gap: { xs: 2, sm: 4 } }}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            sx={{
              width: { xs: "100%", sm: "190px" },
              background: (theme) => theme.palette.accent,
            }}
          >
            <Typography variant="h6" textTransform="none" py={0.5}>
              Submit for approval
            </Typography>
          </Button>

          <Button
            sx={{
              width: { xs: "100%", sm: "190px" },
              border: "1px solid #788894",
            }}
          >
            <Typography
              variant="h6"
              textTransform="none"
              color="#788894"
              py={0.5}
            >
              Cancel
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddJobForm;
