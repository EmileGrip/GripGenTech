import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import AuthRedBtn from "../../../components/RedButton";
import SignInSocialBtn from "../../../components/authentication/SignInSocialBtn";
import googleIcon from "../../../assets/devicon_google.svg";
import facebookIcon from "../../../assets/logos_facebook.svg";
import OuterFrame from "../../../components/authentication/OuterFrame";
import ContentWrapper from "../../../components/authentication/ContentWrapper";
import HeaderWrapper from "../../../components/authentication/HeaderWrapper";
import TextFieldWrapper from "../../../components/authentication/TextFieldWrapper";
import TextFieldLabel from "../../../components/authentication/TextFieldLabel";
import CustomTextField from "../../../components/authentication/CustomTextField";
import MainTitle from "../../../components/authentication/MainTitle";
import CustomSubTitle from "../../../components/authentication/SubTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../redux/authentication/authActions";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, SIGNUP_ROUTE } from "../../../routes/paths";
import { getUserInfo } from "../../../redux/userInfoSlice";
import loginValidationSchema from "./loginValidationSchema";

const smallLabelWrapperStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  mb: { xs: "9.5px", sm: "13px" },
  fontSize: { xs: "0.6875rem", sm: "0.875rem" },
  color: "primary.main",
  fontWeight: 500,
};
const Login = () => {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, isAuth } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object().shape(loginValidationSchema),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setTimeout(() => {
        dispatch(userLogin({ email: values.email, password: values.password }));
        setSubmitting(false);
      }, 2000);
    },
  });

  useEffect(() => {
    if (isAuth) {
      navigate(HOME_ROUTE);
      dispatch(getUserInfo(accessToken));
    }
  }, [isAuth, navigate]);

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: "20px" },
        py: { xs: "12px" },
        // minHeight: "100vh",
        // height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OuterFrame className="outerFrame">
        <ContentWrapper className="content__wrapper">
          <HeaderWrapper>
            <MainTitle component="h1">Welcome</MainTitle>

            <CustomSubTitle component="h2">
              start your journey with us from here
            </CustomSubTitle>
          </HeaderWrapper>

          <form onSubmit={formik.handleSubmit}>
            <TextFieldWrapper>
              <TextFieldLabel component="label" htmlFor="email">
                Email
              </TextFieldLabel>

              <CustomTextField
                id="email"
                name="email"
                type="email"
                variant="outlined"
                placeholder="Enter your email-address"
                size={!mdMatch ? "small" : "medium"}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email && formik.errors.email}
              />
            </TextFieldWrapper>

            <TextFieldWrapper className="formControl__wrapper">
              <TextFieldLabel component="label" htmlFor="password">
                Password
              </TextFieldLabel>

              <CustomTextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                size={!mdMatch ? "small" : "medium"}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                onBlur={formik.handleBlur}
                helperText={formik.touched.password && formik.errors.password}
              />
            </TextFieldWrapper>

            <TextFieldWrapper
              className="formControl_wrapper"
              sx={smallLabelWrapperStyle}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id="remember-me-checkbox"
                    name="rememberMe"
                    value={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                }
                label={
                  <Typography
                    component="label"
                    htmlFor="remember-me-checkbox"
                    variant="inherit"
                  >
                    Remember me
                  </Typography>
                }
              />

              <Link variant="inherit" href="#" underline="none">
                Forget Password?
              </Link>
            </TextFieldWrapper>

            <Box>
              <AuthRedBtn type="submit" disabled={formik.isSubmitting}>
                Sign in
              </AuthRedBtn>

              <SignInSocialBtn startIcon={<img src={googleIcon} />}>
                Sign in with Google
              </SignInSocialBtn>

              <SignInSocialBtn
                sx={{ mb: "2.54em" }}
                startIcon={<img src={facebookIcon} />}
              >
                Sign in with Google
              </SignInSocialBtn>
            </Box>

            <Box
              sx={{
                textAlign: "center",
                fontSize: { xs: "13px", sm: "18px" },
                fontWeight: 500,
              }}
            >
              <Typography variant="inherit" color="primary.main">
                Do you have an account?
              </Typography>

              <Link
                href={SIGNUP_ROUTE}
                underline="none"
                sx={{ fontWeight: 700 }}
              >
                SignUp
              </Link>
            </Box>
          </form>
        </ContentWrapper>
      </OuterFrame>
    </Container>
  );
};

export default Login;
