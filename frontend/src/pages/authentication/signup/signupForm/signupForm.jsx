import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import googleIcon from "../../../../assets/google-icon.svg";
import microsoftIcon from "../../../../assets/microsoft-icon.svg";

import { useFormik, withFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
// import {
//   ADMIN_PAGE_ROUTE,
//   EMPLOYEE_MY_SKILLS_ROUTE,
//   EMPLOYEE_PAGE_ROUTE,
//   MANAGER_PAGE_ROUTE,
// } from "../../../routes/paths";
import validationsForm from "../validations/validationSchema";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "../../../features/auth/authActions";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../../helper/axiosInstance";
import { userLoginWithGoogleOrMicrosoft } from "../../../../redux/slices/auth/authActions";
import Turnstile from "react-turnstile";
// import { useEffect } from "react";

const formControlStyles = {
  maxWidth: { xs: "100%", lg: "307px" },
  minHeight: "97px",
};

const boxStyles = {
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  justifyContent: { xs: "center", lg: "flex-start" },
  alignItems: "center",
  gap: { lg: 4 },
  width: { xs: "100%", lg: "590px" },
};

const SignupForm = () => {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { loading, userInfo, error } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [errorPayload, setErrorPayload] = useState(null);
  const [cloudFlareToken, setCloudFlareToken] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorParam = queryParams.get("error");

  const handleGoogleSignUp = (api) => {
    dispatch(
      userLoginWithGoogleOrMicrosoft({
        api,
        token: cloudFlareToken,
        operation: "signup",
      })
    );
  };

  const handleClick = (payload, isError = false) => {
    setOpen(true);
    if (isError) {
      setErrorPayload(payload);
    } else {
      setPayload(payload);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (errorParam) {
      setOpen(true);
    }
  }, [errorParam]);

  //   useEffect(() => {
  //     if (userInfo) {
  //       // ... (existing code for successful login)
  //     } else if (error) {
  //       handleClick({ message: "Failed to sign up" }, true);
  //     }

  //     return () => {
  //       setPayload(null);
  //       setErrorPayload(null);
  //     };
  //   }, [userInfo, navigate, error]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape(validationsForm),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        console.log(values);
        // dispatch(userLogin({ email: values.email, password: values.password }));
        setSubmitting(false);
      }, 1000);
    },
  });
  //   useEffect(() => {
  //     if (userInfo) {
  //       if (userInfo.is_staff) {
  //         navigate(ADMIN_PAGE_ROUTE);
  //       } else if (userInfo.is_manager) {
  //         navigate(MANAGER_PAGE_ROUTE);
  //       } else if (
  //         !userInfo.is_staff &&
  //         !userInfo.is_manager &&
  //         userInfo.is_active
  //       ) {
  //         navigate(EMPLOYEE_PAGE_ROUTE);
  //       }
  //     }
  //   }, [userInfo, navigate]);

  return (
    <>
      {errorParam && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={"error"}
            sx={{ width: "100%" }}
          >
            {errorParam}
          </Alert>
        </Snackbar>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Stack
          className="mr_4_6"
          sx={{
            width: "100%",
            px: { xs: 2, lg: 0 },
            alignItems: { xs: "center", lg: "initial" },
          }}
        >
          <Box sx={boxStyles} mb="30px">
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "300px", lg: "292px" },
              }}
            >
              <Button
                onClick={() => handleGoogleSignUp("auth/google/login/")}
                variant="contained"
                startIcon={
                  <img
                    src={googleIcon}
                    alt="google icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                }
                size="large"
                sx={{
                  mb: 2,
                  py: { xs: "8px", lg: "12px" },
                  px: { xs: "35px", lg: "0" },
                  flex: 1,
                  background: "white",
                  color: "secondary.main",
                  fontWeight: "400 !important",
                  textTransform: "none !important",
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "white",
                    boxShadow: "none",
                    border: "1px solid #353C44",
                  },
                }}
              >
                Sign up with Google
              </Button>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "300px", lg: "292px" },
              }}
            >
              <Button
                onClick={() => handleGoogleSignUp("auth/azure/login/")}
                variant="contained"
                startIcon={
                  <img
                    src={microsoftIcon}
                    alt="microsoft icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                }
                size="large"
                sx={{
                  mb: 2,
                  py: { xs: "8px", lg: "12px" },
                  px: { xs: "35px", lg: "0" },
                  flex: 1,
                  background: "white",
                  color: "secondary.main",
                  fontWeight: "400 !important",
                  textTransform: "none !important",
                  boxShadow: "none",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "white",
                    boxShadow: "none",
                    border: "1px solid #353C44",
                  },
                }}
              >
                Sign up with Microsoft
              </Button>
            </Box>
          </Box>

          <Box sx={boxStyles}>
            <Box sx={formControlStyles}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                size="medium"
                type="text"
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
                sx={{ width: { xs: "300px", lg: "280px" } }}
              />
            </Box>

            <Box sx={formControlStyles}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                size="medium"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.lastName ? formik.errors.lastName : ""
                }
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                variant="outlined"
                sx={{ width: { xs: "300px", lg: "280px" } }}
              />
            </Box>
          </Box>

          <Box sx={boxStyles}>
            <Box sx={formControlStyles}>
              <TextField
                id="email"
                name="email"
                label="Email"
                size="medium"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email ? formik.errors.email : ""}
                error={formik.touched.email && Boolean(formik.errors.email)}
                variant="outlined"
                sx={{ width: { xs: "300px", lg: "280px" } }}
              />
            </Box>

            <Box sx={formControlStyles}>
              <TextField
                id="password"
                name="password"
                label="Password"
                size="medium"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.password ? formik.errors.password : ""
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                variant="outlined"
                sx={{ width: { xs: "300px", lg: "280px" } }}
              />
            </Box>
          </Box>

          <Box sx={boxStyles}>
            <Box sx={formControlStyles}>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                size="medium"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : ""
                }
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                variant="outlined"
                sx={{ width: { xs: "300px", lg: "280px" } }}
              />
            </Box>

            <Turnstile
              className="dave"
              sitekey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
              onVerify={(token) => setCloudFlareToken(token)}
            />
          </Box>

          <Stack sx={{ maxWidth: { xs: "400px", lg: "280px" } }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={formik.isSubmitting}
              onClick={() => handleClick({ message: "Signup successful" })}
              sx={{
                mb: 2,
                py: { xs: "8px", lg: "12px" },
                px: { xs: "35px", lg: "0" },
                flex: 1,
                fontWeight: "400 !important",
                fontSize: "20px !important",
                textTransform: "capitalize !important",
                borderRadius: "10px",
              }}
            >
              Sign Up
            </Button>
          </Stack>

          <Typography variant="body1" sx={{ color: "#8E9CA5", mb: 1 }}>
            Have an Account?{" "}
            <Link
              to="/login"
              style={{ color: "#66C1FF", textDecoration: "1px underline" }}
            >
              log in
            </Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
};

export default SignupForm;
