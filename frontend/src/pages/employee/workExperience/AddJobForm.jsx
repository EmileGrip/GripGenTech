import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik, withFormik } from "formik";
import * as yup from "yup";
import validationsForm from "./validations/validationSchema";

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

const AddJobForm = ({ onClose, data }) => {
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationsForm,
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
                variant="span"
                component="label"
                htmlFor="position"
                color={"secondary"}
                fontWeight={500}
              >
                Position
              </Typography>
              <TextField
                id="position"
                name="position"
                placeholder="Position"
                size="medium"
                type="text"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.position ? formik.errors.position : ""
                }
                error={
                  formik.touched.position && Boolean(formik.errors.position)
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
                htmlFor="joinDate"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                joined
              </Typography>
              <DatePicker
                size="medium"
                value={formik.values.joinedDate}
                onChange={(value) => {
                  formik.setFieldValue("joinedDate", value);
                }}
                maxDate={new Date()}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.joinedDate && formik.errors.joinedDate
                    )}
                    helperText={
                      formik.touched.joinedDate && formik.errors.joinedDate
                    }
                    id="joinedDate"
                    name="joinedDate"
                  />
                )}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                variant="span"
                component="label"
                htmlFor="company"
                color={"secondary"}
                fontWeight={500}
              >
                Company
              </Typography>
              <TextField
                id="company"
                name="company"
                placeholder="Company"
                size="medium"
                type="text"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.company ? formik.errors.company : ""}
                error={formik.touched.company && Boolean(formik.errors.company)}
                variant="outlined"
                fullWidth
                sx={{
                  ...formControlStyles,
                }}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12} lg={6}>
            <Stack sx={stackStyles}>
              <Typography
                component="label"
                variant="span"
                htmlFor="leftDate"
                color={"secondary"}
                fontWeight={500}
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                left
              </Typography>
              <DatePicker
                size="medium"
                value={formik.values.leftDate}
                onChange={(value) => {
                  formik.setFieldValue("leftDate", value);
                }}
                maxDate={new Date()}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.leftDate && formik.errors.leftDate
                    )}
                    helperText={
                      formik.touched.leftDate && formik.errors.leftDate
                    }
                    id="leftDate"
                    name="leftDate"
                  />
                )}
              />
            </Stack>
          </Grid2>
        </Grid2>

        <Box width={"100%"} mb={3}>
          <Typography
            variant="body1"
            component="label"
            htmlFor="description"
            mb={2}
            color={"secondary"}
            fontWeight={500}
          >
            Description
          </Typography>
          <TextField
            id="description"
            placeholder="Type description separated with ' - '"
            multiline
            rows={4}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.description ? formik.errors.description : ""
            }
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            fullWidth
          />
        </Box>

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

export default AddJobForm;
