import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import validationsForm from "./validations/validationSchema";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";

const stackStyles = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "baseline",
  minHeight: "82px",
  gap: 1,
};

const formControlStyles = {
  width: { xs: "100%", lg: "190px" },
  maxWidth: "368px",
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

function formatDate(date) {
  if (date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const parts = date.toLocaleString("en-US", options).split("/");
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  }
}

const AddJobForm = ({
  onClose,
  data,
  onSuccess,
  onFetch,
  editMode = false,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [loading, setLoading] = useState(true);

  const { token, userInfo } = useSelector((state) => state.auth);

  const sendData = useCallback(
    async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const formatStartDate = formatDate(values.joinedDate);
      const formatEndDate = formatDate(values.leftDate);
      try {
        const response = await axiosInstance.post(
          `experience`,
          {
            title: values.position,
            company: values.company,
            start_date: formatStartDate,
            end_date: formatEndDate,
            description: values.description,
            user_id: userInfo.id,
            is_current: values.current,
          },
          config
        );
        console.log(response.data);
        onSuccess(true);
        onClose();
        onFetch();
      } catch (error) {
        onSuccess(false);
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    },
    [onClose, onFetch, onSuccess, token, userInfo.id]
  );

  const editData = useCallback(
    async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          id: data.id,
        },
      };
      const formatStartDate = formatDate(values.joinedDate);
      const formatEndDate = formatDate(values.leftDate);
      try {
        const response = await axiosInstance.put(
          `experience`,
          {
            title: values.position,
            company: values.company,
            start_date: formatStartDate,
            end_date: formatEndDate,
            description: values.description,
            is_current: values.current,
          },
          config
        );
        console.log(response.data);
        onSuccess(true);
        onClose();
        onFetch();
      } catch (error) {
        onSuccess(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [data.id, onClose, onFetch, onSuccess, token]
  );

  const formik = useFormik({
    initialValues: data,
    validationSchema: validationsForm,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        // alert(JSON.stringify(values, null, 2));
        if (editMode) {
          editData(values);
        } else {
          sendData(values);
        }
        setSubmitting(false);
      }, 1000);
    },
  });

  // Handle the change of the checkbox
  const handleCurrentChange = (event) => {
    formik.setFieldValue("current", event.target.checked);
  };

  // Use an effect to update the end date value if current is true
  useEffect(() => {
    if (formik.values.current) {
      formik.setFieldValue("leftDate", null);
    }
  }, [formik.values.current]); // Run the effect only when current changes

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Grid2
          container
          rowSpacing={4}
          columnSpacing={{ xs: 4, md: 8 }}
          sx={{ flexGrow: 1 }}
          mb={"50px"}
        >
          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  variant="span"
                  component="label"
                  htmlFor="position"
                  color={"secondary"}
                  fontWeight={500}
                >
                  Position
                </Typography>
              )}
              <TextField
                id="position"
                name="position"
                placeholder="Position"
                label={!lgMatches ? "Position" : ""}
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

          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  component="label"
                  variant="span"
                  htmlFor="joinDate"
                  color={"secondary"}
                  fontWeight={500}
                  sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                >
                  start date
                </Typography>
              )}
              <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
                <DatePicker
                  size="medium"
                  label={!lgMatches ? "Start Date" : ""}
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

                {formik.touched.joinedDate && formik.errors.joinedDate ? (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      mx: "14px",
                      mt: "3px",
                      fontSize: "0.8571428571428571rem",
                    }}
                  >
                    {formik.errors.joinedDate}
                  </Typography>
                ) : null}
              </Stack>
            </Stack>
          </Grid2>

          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  variant="span"
                  component="label"
                  htmlFor="company"
                  color={"secondary"}
                  fontWeight={500}
                >
                  Company
                </Typography>
              )}
              <TextField
                id="company"
                name="company"
                placeholder="Company"
                label={!lgMatches ? "Company" : ""}
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

          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  component="label"
                  variant="span"
                  htmlFor="leftDate"
                  color={"secondary"}
                  fontWeight={500}
                  sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                >
                  end date
                </Typography>
              )}
              <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
                <DatePicker
                  size="medium"
                  label={!lgMatches ? "Start Date" : ""}
                  value={formik.values.leftDate}
                  onChange={(value) => {
                    formik.setFieldValue("leftDate", value);
                  }}
                  disabled={formik.values.current} // disable the end date picker if current is true
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

                {formik.touched.leftDate && formik.errors.leftDate ? (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      mx: "14px",
                      mt: "3px",
                      fontSize: "0.8571428571428571rem",
                    }}
                  >
                    {formik.errors.leftDate}
                  </Typography>
                ) : null}
              </Stack>
            </Stack>
          </Grid2>

          <Grid2 xs={12}>
            <Stack sx={stackStyles}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="current"
                    checked={formik.values.current}
                    onChange={handleCurrentChange}
                  />
                }
                label="Current job"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontWeight: "500",
                    color: "secondary",
                  },
                }}
              />
            </Stack>
          </Grid2>

          <Grid2 xs={12}>
            <Stack sx={stackStyles}>
              <Box width={"100%"} mb={3}>
                <Typography
                  variant="body1"
                  component="label"
                  htmlFor="description"
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
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  fullWidth
                  sx={{ mt: "16px" }}
                />
              </Box>
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
            {editMode ? "edit" : "finish"}
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
