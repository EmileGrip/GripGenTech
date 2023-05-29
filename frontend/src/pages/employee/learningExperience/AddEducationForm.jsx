import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik, withFormik } from "formik";
import * as yup from "yup";
import { AddEducationValidationForm } from "./validations/validationSchema";

const stackStyles = {
  flexDirection: { xs: "row" },
  justifyContent: { xs: "space-between" },
  alignItems: { xs: "baseline" },
  minHeight: "82px",
};

const formControlStyles = {
  width: "190px",
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

const AddEducationForm = ({ data, onClose }) => {
  const formik = useFormik({
    initialValues: data,
    validationSchema: AddEducationValidationForm,
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
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Grid2
          container
          rowSpacing={4}
          columnSpacing={8}
          sx={{ flexGrow: 1 }}
          mb={"50px"}
        >
          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                component="label"
                variant="span"
                htmlFor="degree"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                Degree
              </Typography>
              <TextField
                id="degree"
                name="degree"
                placeholder="degree"
                size="medium"
                type="text"
                value={formik.values.degree}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.degree ? formik.errors.degree : ""}
                error={formik.touched.degree && Boolean(formik.errors.degree)}
                variant="outlined"
                fullWidth
                sx={formControlStyles}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                component="label"
                variant="span"
                htmlFor="started"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                Started
              </Typography>
              <DatePicker
                size="medium"
                value={formik.values.started}
                onChange={(value) => {
                  formik.setFieldValue("started", value);
                }}
                maxDate={new Date()}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.started && formik.errors.started
                    )}
                    helperText={formik.touched.started && formik.errors.started}
                    id="started"
                    name="started"
                  />
                )}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                component="label"
                variant="span"
                htmlFor="institution"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                Institution
              </Typography>
              <TextField
                id="institution"
                name="institution"
                placeholder="institution"
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
                variant="outlined"
                fullWidth
                sx={formControlStyles}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                component="label"
                variant="span"
                htmlFor="finished"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                Finished
              </Typography>
              <DatePicker
                size="medium"
                value={formik.values.finished}
                onChange={(value) => {
                  formik.setFieldValue("finished", value);
                }}
                maxDate={new Date()}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.finished && formik.errors.finished
                    )}
                    helperText={
                      formik.touched.finished && formik.errors.finished
                    }
                    id="finished"
                    name="finished"
                  />
                )}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                component="label"
                variant="span"
                htmlFor="level"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                Level
              </Typography>
              <TextField
                id="level"
                name="level"
                placeholder="level"
                size="medium"
                type="text"
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.level ? formik.errors.level : ""}
                error={formik.touched.level && Boolean(formik.errors.level)}
                variant="outlined"
                fullWidth
                sx={formControlStyles}
              />
            </Stack>
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

export default AddEducationForm;
