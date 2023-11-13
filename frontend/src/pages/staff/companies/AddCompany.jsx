import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import { industriesOptions as industries } from "../../../data/basicInfoData";
import AddIcon from "@mui/icons-material/Add";
import useLocationChange from "../../../hooks/useLocationChange";
import validationsForm from "./validations/validationSchema";
import { useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";

const rowStackStyle = {
  flexDirection: { xs: "column", md: "row" },
  justifyContent: { md: "space-between" },
  gap: { md: "40px", lg: "65px", xl: "120px" },
};

const formControlWrapperStyle = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "baseline",
  gap: { lg: "40px", xl: "60px" },
  minHeight: "82px",
  flex: 1,
};

const textFieldStyle = {
  "> *": { borderRadius: "7px !important" },
  width: { xs: "100%" },
  maxWidth: { xs: "368px", lg: "300px", xg: "320px" },
};

const labelStyle = {
  fontWeight: "500",
  color: "secondary.main",
};

const AddCompany = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [success, setSuccess] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const successHandler = (status) => {
    setSuccess(status);
    handleClickSnack();
  };

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const { token } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      industry: "",
      firstName: "",
      email: "",
      lastName: "",
    },
    validationSchema: validationsForm,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // submit to the server
        const companyId = await sendCompanyData(token, values);
        if (companyId) {
          await sendUserData(token, values, companyId);
          setSubmitting(false);
          resetForm(); // Reset the form values after successful submission
        }
      } catch (error) {
        console.log(error.response.data);
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  const sendCompanyData = useCallback(async (token, values) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      // setLoading(true);
      const response = await axiosInstance.post(
        `company`,
        {
          name: values.name,
          industry: values.industry,
        },
        config
      );
      console.log(response.data);
      setMessage(response.data.message);
      successHandler(true);
      // Check if the API call was successful and return the companyId
      if (response.data && response.data.payload && response.data.payload.id) {
        return response.data.payload.id;
      }
      // onClose();
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.message);
      successHandler(false);
      // Return null in case of an error
      return null;
    } finally {
      // setLoading(false);
    }
  }, []);

  const sendUserData = useCallback(async (token, values, companyId) => {
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
        `user`,
        {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          system_role: "admin",
          company_id: companyId,
        },
        config
      );
      console.log(response.data);
      setMessage(response.data.message);
      successHandler(true);
      // onClose();
      // onFetch();
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.message);
      successHandler(false);
    } finally {
      setLoading(false);
      // closeModal();
    }
  }, []);

  return (
    <>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Typography
        variant="h3"
        component="h2"
        sx={{ mb: { xs: 4, lg: 8.25 }, mt: { xs: 1, lg: 3 } }}
        color={"primary.main"}
      >
        Initial Setup -{" "}
        <Typography
          variant="h3"
          component="span"
          mb={3}
          color={"primary.main"}
          sx={{ fontWeight: "400" }}
        >
          Add Company
        </Typography>
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack className="rowStackStyle" sx={rowStackStyle}>
          <Stack className="formControl__wrapper" sx={formControlWrapperStyle}>
            {lgMatches && (
              <Box component="label" sx={labelStyle} htmlFor="name">
                Company name
              </Box>
            )}
            <TextField
              id="name"
              name="name"
              size="small"
              type="text"
              placeholder="What’s your company called"
              label={!lgMatches ? "Company name" : ""}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name ? formik.errors.name : ""}
              error={formik.touched.name && Boolean(formik.errors.name)}
              variant="outlined"
              fullWidth
              sx={textFieldStyle}
            />
          </Stack>

          <Stack className="formControl__wrapper" sx={formControlWrapperStyle}>
            {lgMatches && (
              <Box component="label" sx={labelStyle} htmlFor="industry">
                Industry
              </Box>
            )}
            <TextField
              id="industry"
              name="industry"
              size="small"
              select
              label={!lgMatches ? "Industry" : ""}
              value={formik.values.industry}
              onBlur={formik.handleBlur}
              helperText={formik.touched.industry ? formik.errors.industry : ""}
              error={formik.touched.industry && Boolean(formik.errors.industry)}
              // inputProps={{ "aria-label": "Without label" }}
              SelectProps={{
                native: true,
              }}
              onChange={formik.handleChange}
              sx={textFieldStyle}
            >
              {industries.map((industry, index) => (
                <option
                  key={index}
                  value={industry.value}
                  disabled={!industry.value}
                >
                  {industry.label}
                </option>
              ))}
            </TextField>
          </Stack>
        </Stack>

        <Stack className="rowStackStyle" sx={rowStackStyle}>
          <Stack className="formControl__wrapper" sx={formControlWrapperStyle}>
            {lgMatches && (
              <Box component="label" sx={labelStyle} htmlFor="firstName">
                First name
              </Box>
            )}
            <TextField
              id="firstName"
              name="firstName"
              size="small"
              type="text"
              placeholder="First name"
              label={!lgMatches ? "First name" : ""}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.firstName ? formik.errors.firstName : ""
              }
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              variant="outlined"
              fullWidth
              sx={textFieldStyle}
            />
          </Stack>

          <Stack className="formControl__wrapper" sx={formControlWrapperStyle}>
            {lgMatches && (
              <Box component="label" sx={labelStyle} htmlFor="lastName">
                Last name
              </Box>
            )}
            <TextField
              id="lastName"
              name="lastName"
              size="small"
              type="text"
              placeholder="Last name"
              label={!lgMatches ? "Last name" : ""}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.lastName ? formik.errors.lastName : ""}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              variant="outlined"
              fullWidth
              sx={textFieldStyle}
            />
          </Stack>
        </Stack>

        <Stack className="rowStackStyle" sx={rowStackStyle}>
          <Stack className="formControl__wrapper" sx={formControlWrapperStyle}>
            {lgMatches && (
              <Box component="label" sx={labelStyle} htmlFor="email">
                Email
              </Box>
            )}
            <TextField
              id="email"
              name="email"
              size="small"
              type="text"
              placeholder="Email"
              label={!lgMatches ? "Email" : ""}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email ? formik.errors.email : ""}
              error={formik.touched.email && Boolean(formik.errors.email)}
              variant="outlined"
              fullWidth
              sx={textFieldStyle}
            />
          </Stack>

          <Stack
            className="formControl__wrapper"
            sx={formControlWrapperStyle}
          />
        </Stack>

        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "20px" }}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontSize: "14px",
              px: "28px",
            }}
            endIcon={<AddIcon />}
          >
            add company
          </Button>

          {loading && <CircularProgress size={20} />}
        </Stack>
      </form>
    </>
  );
};

export default AddCompany;
