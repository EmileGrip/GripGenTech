import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import googleIcon from "../../../../assets/google-icon.svg";
import microsoftIcon from "../../../../assets/microsoft-icon.svg";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  ADMIN_PAGE_ROUTE,
  EMPLOYEE_PAGE_ROUTE,
  MANAGER_PAGE_ROUTE,
  STAFF_PAGE_ROUTE,
} from "../../../../routes/paths";
import validationsForm from "../validations/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  userLoginWithGoogleOrMicrosoft,
} from "../../../../redux/slices/auth/authActions";
import { useState } from "react";
import { useEffect } from "react";
import Turnstile from "react-turnstile";

const formControlStyles = {
  maxWidth: { xs: "400px", lg: "307px" },
  minHeight: "97px",
};

const boxStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: { xs: "center", lg: "flex-start" },
  gap: { lg: 1 },
};

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error, isAuth } = useSelector(
    (state) => state.auth
  );
  const role = userInfo ? userInfo.system_role : null;
  const [open, setOpen] = useState(false);
  const [errorPayload, setErrorPayload] = useState(null);
  const [cloudFlareToken, setCloudFlareToken] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const errorParam = queryParams.get("error");

  const handleClick = (payload) => {
    setOpen(true);
    setErrorPayload(payload);
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

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape(validationsForm),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        dispatch(
          userLogin({
            email: values.email,
            password: values.password,
            token: cloudFlareToken,
          })
        );
        setSubmitting(false);
      }, 1000);
    },
  });

  useEffect(() => {
    if (error && !isAuth) {
      handleClick({ message: "Failed to log in" });
    }

    return () => {
      setErrorPayload(null);
    };
  }, [error, isAuth]);

  const handleGoogleSignUp = (api) => {
    dispatch(
      userLoginWithGoogleOrMicrosoft({
        api,
        token: cloudFlareToken,
        operation: "login",
      })
    );
  };

  // Redirection
  useEffect(() => {
    if (isAuth) {
      if (role === "admin") {
        navigate(ADMIN_PAGE_ROUTE);
      } else if (role === "manager") {
        navigate(MANAGER_PAGE_ROUTE);
      } else if (role === "employee") {
        navigate(EMPLOYEE_PAGE_ROUTE);
      } else if (role === "staff") {
        navigate(STAFF_PAGE_ROUTE);
      }
    }
  }, [navigate, role, isAuth]);

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={"error"} sx={{ width: "100%" }}>
          {errorParam ? errorParam : errorPayload?.message}
        </Alert>
      </Snackbar>

      <form onSubmit={formik.handleSubmit} style={{ marginBottom: "30px" }}>
        <Stack
          className="mr_4_6"
          sx={{
            width: "100%",
            px: { xs: 2, lg: 0 },
            alignItems: { xs: "center", lg: "initial" },
          }}
        >
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
                sx={{ width: "300px" }}
              />
            </Box>
          </Box>

          <Box sx={boxStyles}>
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
                // fullWidth
                sx={{ width: "300px", mb: 2 }}
              />
            </Box>
          </Box>

          <Turnstile
            className="dave"
            sitekey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
            onVerify={(token) => setCloudFlareToken(token)}
          />

          <Stack sx={{ width: "300px" }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={formik.isSubmitting}
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
              Log In
            </Button>
          </Stack>

          <Box sx={boxStyles}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "300px",
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
                  mb: 1,
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
                Login with Google
              </Button>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "300px",
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
                  mb: 1,
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
                Login with Microsoft
              </Button>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ color: "#8E9CA5", mb: 1 }}>
            Don't Have an Account?{" "}
            <Link
              to="/signup"
              style={{ color: "#66C1FF", textDecoration: "1px underline" }}
            >
              Sign up
            </Link>
          </Typography>

          <Typography variant="body1" sx={{ color: "#8E9CA5" }}>
            Forgot your Password?{" "}
            <Link
              to="/recover"
              style={{ color: "#66C1FF", textDecoration: "1px underline" }}
            >
              Recover it
            </Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
