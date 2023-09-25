import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { AddCourseValidationForm } from "./validations/validationSchema";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const parts = date.toLocaleString("en-US", options).split("/");
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
}

const stackStyles = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "baseline",
  minHeight: "82px",
};

const formControlStyles = {
  width: { xs: "100%", lg: "190px" },
  maxWidth: "368px",
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

const AddCourseForm = ({
  onClose,
  data,
  onSuccess,
  onFetch,
  editMode = false,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [loading, setLoading] = useState(true);
  const { userInfo, token } = useSelector((state) => state.auth);

  const sendData = useCallback(
    async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const formatStartDate = formatDate(values.started);
      const formatEndDate = formatDate(values.finished);
      try {
        const response = await axiosInstance.post(
          `course`,
          {
            degree: values.degree,
            start_date: formatStartDate,
            end_date: formatEndDate,
            user_id: userInfo.id,
            institution: values.institution,
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
      const formatStartDate = formatDate(values.started);
      const formatEndDate = formatDate(values.finished);
      try {
        const response = await axiosInstance.put(
          `course`,
          {
            degree: values.degree,
            start_date: formatStartDate,
            end_date: formatEndDate,
            institution: values.institution,
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
    validationSchema: AddCourseValidationForm,
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
          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  component="label"
                  variant="span"
                  htmlFor="degree"
                  color={"secondary"}
                  fontWeight={500}
                  sx={{ mr: 1, whiteSpace: "nowrap" }}
                >
                  Course name
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              )}
              <TextField
                id="degree"
                name="degree"
                placeholder="Course name"
                label={
                  !lgMatches ? (
                    <span>
                      Course name<span style={{ color: "red" }}>*</span>
                    </span>
                  ) : (
                    ""
                  )
                }
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

          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  component="label"
                  variant="span"
                  htmlFor="started"
                  color={"secondary"}
                  fontWeight={500}
                  sx={{ mr: 1, whiteSpace: "nowrap" }}
                >
                  Started
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              )}
              <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
                <DatePicker
                  size="medium"
                  label={
                    !lgMatches ? (
                      <span>
                        Started<span style={{ color: "red" }}>*</span>
                      </span>
                    ) : (
                      ""
                    )
                  }
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
                      helperText={
                        formik.touched.started && formik.errors.started
                      }
                      id="started"
                      name="started"
                    />
                  )}
                />
                {formik.touched.started && formik.errors.started ? (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      mx: "14px",
                      mt: "3px",
                      fontSize: "0.8571428571428571rem",
                    }}
                  >
                    {formik.errors.started}
                  </Typography>
                ) : null}
              </Stack>
            </Stack>
          </Grid2>

          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  component="label"
                  variant="span"
                  htmlFor="institution"
                  color={"secondary"}
                  fontWeight={500}
                  sx={{ mr: 1, whiteSpace: "nowrap" }}
                >
                  Institution
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              )}
              <TextField
                id="institution"
                name="institution"
                placeholder="Institution"
                label={
                  !lgMatches ? (
                    <span>
                      Institution<span style={{ color: "red" }}>*</span>
                    </span>
                  ) : (
                    ""
                  )
                }
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

          <Grid2 xs={12} md={6}>
            <Stack sx={stackStyles}>
              {lgMatches && (
                <Typography
                  component="label"
                  variant="span"
                  htmlFor="finished"
                  color={"secondary"}
                  fontWeight={500}
                  sx={{ mr: 1, whiteSpace: "nowrap" }}
                >
                  Finished
                  <span style={{ color: "red" }}>*</span>
                </Typography>
              )}
              <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
                <DatePicker
                  size="medium"
                  placeholder="Finished"
                  label={
                    !lgMatches ? (
                      <span>
                        Finished<span style={{ color: "red" }}>*</span>
                      </span>
                    ) : (
                      ""
                    )
                  }
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
                {formik.touched.finished && formik.errors.finished ? (
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      mx: "14px",
                      mt: "3px",
                      fontSize: "0.8571428571428571rem",
                    }}
                  >
                    {formik.errors.finished}
                  </Typography>
                ) : null}
              </Stack>
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

export default AddCourseForm;
