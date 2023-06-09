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

import { useFormik, withFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  ADMIN_PAGE_ROUTE,
  EMPLOYEE_MY_SKILLS_ROUTE,
  EMPLOYEE_PAGE_ROUTE,
  MANAGER_PAGE_ROUTE,
} from "../../../routes/paths";
import validationsForm from "../validations/validationSchema";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../features/auth/authActions";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../../../features/auth/authSlice";

const formControlStyles = {
  maxWidth: { xs: "400px", lg: "307px" },
  minHeight: "97px",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [errorPayload, setErrorPayload] = useState(null);

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

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape(validationsForm),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        dispatch(logout());
        dispatch(userLogin({ email: values.email, password: values.password }));
        setSubmitting(false);
      }, 1000);
    },
  });

  useEffect(() => {
    if (error) {
      handleClick({ message: "Failed to log in" });
    }

    return () => {
      setErrorPayload(null);
    };
  }, [error]);

  // Redirection
  useEffect(() => {
    if (userInfo) {
      if (userInfo.is_staff) {
        navigate(ADMIN_PAGE_ROUTE);
      } else if (userInfo.is_manager) {
        navigate(MANAGER_PAGE_ROUTE);
      } else if (
        !userInfo.is_staff &&
        !userInfo.is_manager &&
        userInfo.is_active
      ) {
        navigate(EMPLOYEE_PAGE_ROUTE);
      }
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={"error"} sx={{ width: "100%" }}>
          {errorPayload?.message}
        </Alert>
      </Snackbar>

      <form onSubmit={formik.handleSubmit} style={{ marginBottom: "150px" }}>
        <Stack
          sx={{
            width: "100%",
            px: { xs: 2 },
            alignItems: { xs: "center", lg: "initial" },
          }}
        >
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
              fullWidth
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
              helperText={formik.touched.password ? formik.errors.password : ""}
              error={formik.touched.password && Boolean(formik.errors.password)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>

          <Stack sx={{ maxWidth: { xs: "400px", lg: "307px" } }}>
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
