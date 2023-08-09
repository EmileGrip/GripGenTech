import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { resetPasswordValidationsForm } from "./validations/validationSchema";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRecover } from "../../../redux/slices/auth/authActions";
import { setResponse } from "../../../redux/slices/auth/authSlice";

const formControlStyles = {
  maxWidth: { xs: "400px", lg: "307px" },
  minHeight: "97px",
};

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { response, loading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      token: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape(resetPasswordValidationsForm),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        // submit to the server
        // Assuming the userReset function returns a promise
        dispatch(
          userRecover({
            email: values.email,
            email_confirmation: values.token,
            new_password1: values.password,
            new_password2: values.confirmPassword,
          })
        )
          .then((response) => {
            // Password recovery request is successful, show the ResetPasswordForm
            dispatch(setResponse(response.payload));
            handleClick();
          })
          .finally(() => {
            setSubmitting(false);
            resetForm(); // Reset the form values after successful submission
          });
      }, 1000);
    },
  });

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!response?.success ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {response?.message}
        </Alert>
      </Snackbar>
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
              id="token"
              name="token"
              label="Token"
              size="medium"
              type="token"
              value={formik.values.token}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.token ? formik.errors.token : ""}
              error={formik.touched.token && Boolean(formik.errors.token)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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
              Send
            </Button>

            {loading && <CircularProgress size={20} />}
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

          {/* <Typography variant="body1" sx={{ color: "#8E9CA5", mb: 1 }}>
              Don't Have an Account?{" "}
              <Link
                to="/signup"
                style={{ color: "#66C1FF", textDecoration: "1px underline" }}
              >
                sign up
              </Link>
            </Typography> */}
        </Stack>
      </form>
    </>
  );
};

export default ResetPasswordForm;
