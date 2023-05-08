import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik, withFormik } from "formik";
import * as yup from "yup";
// import validationsForm from "../validations/validationSchema";

const AddJobForm = ({ onClose, data }) => {
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
                Position
              </Typography>
              <TextField
                id="position"
                name="position"
                label="Position"
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

          <Grid2 xs={6} mt={2}>
            <Stack
              flexDirection="row"
              gap="46px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="span" color={"secondary"} fontWeight={500}>
                Joined
              </Typography>
              <DatePicker
                onChange={(value) => {
                  formik.setFieldValue("joinedDate", Date.parse(value));
                }}
                value={formik.values.joinedDate}
                sx={{ width: "190px", "> *": { borderRadius: "7px " } }}
                slots={
                  <TextField
                    className="myDatePicker"
                    error={Boolean(
                      formik.touched.joinedDate && formik.errors.joinedDate
                    )}
                    helperText={
                      formik.touched.joinedDate && formik.errors.joinedDate
                    }
                    label="Join"
                    margin="normal"
                    name="joinedDate"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                }
              />
            </Stack>
          </Grid2>

          <Grid2 xs={6}>
            <Stack
              flexDirection="row"
              gap="46px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="span" color={"secondary"} fontWeight={500}>
                Company
              </Typography>
              <TextField
                id="company"
                name="company"
                label="Company"
                size="medium"
                type="text"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.company ? formik.errors.company : ""}
                error={formik.touched.company && Boolean(formik.errors.company)}
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

          <Grid2 xs={6} mt={2}>
            <Stack
              flexDirection="row"
              gap="46px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="span" color={"secondary"} fontWeight={500}>
                Left
              </Typography>
              <DatePicker
                onChange={(value) => {
                  formik.setFieldValue("leftDate", Date.parse(value));
                }}
                value={formik.values.leftDate}
                sx={{ width: "190px", "> *": { borderRadius: "7px " } }}
                slots={
                  <TextField
                    error={Boolean(
                      formik.touched.leftDate && formik.errors.leftDate
                    )}
                    helperText={
                      formik.touched.leftDate && formik.errors.leftDate
                    }
                    label="Left"
                    margin="normal"
                    name="leftDate"
                    variant="standard"
                    fullWidth
                    sx={{ "> *": { borderRadius: "7px !important" } }}
                  />
                }
              />
            </Stack>
          </Grid2>
        </Grid2>

        <Box width={"100%"} mb={3}>
          <Typography
            variant="body1"
            mb={2}
            color={"secondary"}
            fontWeight={500}
          >
            Description
          </Typography>
          <TextField
            id="description-textarea"
            label="Type here"
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
