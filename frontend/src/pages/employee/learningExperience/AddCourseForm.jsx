import { Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as yup from "yup";
// import validationsForm from "../validations/validationSchema";

const AddCourseForm = ({ onClose, data }) => {
  const formik = useFormik({
    initialValues: data,
    validationSchema: "",
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));

        setSubmitting(false);
      }, 1000);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Grid2
          container
          rowSpacing={4}
          columnSpacing={8}
          sx={{ flexGrow: 1 }}
          mb={"50px"}
        >
          <Grid2 xs={6}>
            <Stack
              flexDirection="row"
              gap="46px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="span" color={"secondary"} fontWeight={500}>
                Degree
              </Typography>
              <TextField
                id="degree"
                name="degree"
                label="Degree"
                size="medium"
                type="text"
                value={formik.values.degree}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.degree ? formik.errors.degree : ""}
                error={formik.touched.degree && Boolean(formik.errors.degree)}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{
                  "> *": { borderRadius: "7px !important" },
                  width: "170px",
                }}
              />
            </Stack>
          </Grid2>

          <Grid2
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="span" color={"secondary"} fontWeight={500}>
              Started
            </Typography>
            <DatePicker
              onChange={(value) => {
                formik.setFieldValue("started", Date.parse(value));
              }}
              value={formik.values.started}
              sx={{
                width: "190px",
                mt: "9px",
                "> *": { borderRadius: "7px " },
              }}
              slots={
                <TextField
                  className="myDatePicker"
                  error={Boolean(
                    formik.touched.started && formik.errors.started
                  )}
                  helperText={formik.touched.started && formik.errors.started}
                  label="Started"
                  margin="normal"
                  name="started"
                  variant="standard"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              }
            />
          </Grid2>

          <Grid2 xs={6}>
            <Stack
              flexDirection="row"
              gap="46px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="span" color={"secondary"} fontWeight={500}>
                Institution
              </Typography>
              <TextField
                id="institution"
                name="institution"
                label="Institution"
                size="medium"
                type="text"
                value={formik.values.institution}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.institution ? formik.errors.institution : ""
                }
                error={
                  formik.touched.institution &&
                  Boolean(formik.errors.institution)
                }
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  "> *": { borderRadius: "7px !important" },
                  width: "170px",
                }}
              />
            </Stack>
          </Grid2>

          <Grid2
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="span" color={"secondary"} fontWeight={500}>
              Finished
            </Typography>
            <DatePicker
              onChange={(value) => {
                formik.setFieldValue("finished", Date.parse(value));
              }}
              value={formik.values.finished}
              sx={{ width: "190px", "> *": { borderRadius: "7px " } }}
              slots={
                <TextField
                  error={Boolean(
                    formik.touched.finished && formik.errors.finished
                  )}
                  helperText={formik.touched.finished && formik.errors.finished}
                  label="finished"
                  margin="normal"
                  name="finished"
                  variant="standard"
                  fullWidth
                />
              }
            />
          </Grid2>
        </Grid2>

        <Stack flexDirection="row" gap="30px">
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
            finish
          </Button>
          <Button
            onClick={() => onClose()}
            variant="outlined"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              px: "50px",
              fontSize: "14px",
            }}
          >
            cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddCourseForm;
