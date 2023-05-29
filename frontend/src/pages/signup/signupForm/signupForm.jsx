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
// import {
//   ADMIN_PAGE_ROUTE,
//   EMPLOYEE_MY_SKILLS_ROUTE,
//   EMPLOYEE_PAGE_ROUTE,
//   MANAGER_PAGE_ROUTE,
// } from "../../../routes/paths";
import validationsForm from "../validations/validationSchema";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "../../../features/auth/authActions";
import { useState } from "react";
// import { useEffect } from "react";

const formControlStyles = {
  maxWidth: { xs: "400px", lg: "307px" },
  minHeight: "97px",
};

const SignupForm = () => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const { loading, userInfo, error } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [errorPayload, setErrorPayload] = useState(null);

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
      name: "",
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
      <form onSubmit={formik.handleSubmit}>
        <Stack
          sx={{
            width: "100%",
            px: { xs: 2 },
            alignItems: { xs: "center", lg: "initial" },
          }}
        >
          <Box sx={formControlStyles}>
            <TextField
              id="name"
              name="name"
              label="Name"
              size="medium"
              type="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name ? formik.errors.name : ""}
              error={formik.touched.name && Boolean(formik.errors.name)}
              variant="outlined"
              fullWidth
            />
          </Box>

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
