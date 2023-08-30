import {
  Container,
  Divider,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import OuterFrame from "../../../components/authentication/OuterFrame";
import HeaderWrapper from "../../../components/authentication/HeaderWrapper";
import MainTitle from "../../../components/authentication/MainTitle";
import TextFieldWrapper from "../../../components/authentication/TextFieldWrapper";
import TextFieldLabel from "../../../components/authentication/TextFieldLabel";
import CustomTextField from "../../../components/authentication/CustomTextField";
import AuthRedBtn from "../../../components/RedButton";

const SignUp = () => {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: "20px" },
        py: { xs: "12px" },
        // minHeight: "100vh",
        // height: "auto",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OuterFrame className="outerFrame">
        <HeaderWrapper>
          <MainTitle component="h1">sign up now</MainTitle>
        </HeaderWrapper>

        <form>
          <TextFieldWrapper>
            <TextFieldLabel component="label" htmlFor="first_name">
              first name
            </TextFieldLabel>
            <CustomTextField
              id="first_name"
              name="firstName"
              type="text"
              variant="outlined"
              placeholder="Enter your first name"
              size={!mdMatch ? "small" : "medium"}
              fullWidth
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextFieldLabel component="label" htmlFor="last_name">
              last name
            </TextFieldLabel>
            <CustomTextField
              id="last_name"
              name="lastName"
              type="text"
              variant="outlined"
              placeholder="Enter your last name"
              size={!mdMatch ? "small" : "medium"}
              fullWidth
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextFieldLabel component="label" htmlFor="email">
              email-address
            </TextFieldLabel>
            <CustomTextField
              id="email"
              name="email"
              type="email"
              variant="outlined"
              placeholder="Enter your Email Address"
              size={!mdMatch ? "small" : "medium"}
              fullWidth
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextFieldLabel component="label" htmlFor="phoneNumber">
              phone Number
            </TextFieldLabel>
            <CustomTextField
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              variant="outlined"
              placeholder="Enter your Phone Number"
              size={!mdMatch ? "small" : "medium"}
              fullWidth
              sx={{ background: "#d9d9d9" }}
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment
                      sx={{
                        "& > p": {
                          fontSize: {
                            xs: "1rem",
                            sm: "1.125rem",
                            md: "1.25rem",
                          },
                        },
                      }}
                      position="start"
                    >
                      +855
                    </InputAdornment>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ mr: 1, borderRightWidth: 2 }}
                    />
                  </>
                ),
              }}
            />
          </TextFieldWrapper>

          <TextFieldWrapper>
            <TextFieldLabel component="label" htmlFor="password">
              password
            </TextFieldLabel>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              placeholder="Enter your Password"
              size={!mdMatch ? "small" : "medium"}
              fullWidth
            />
          </TextFieldWrapper>

          <TextFieldWrapper sx={{ mb: { xs: 4, sm: 5 } }}>
            <TextFieldLabel component="label" htmlFor="confirmPassword">
              confirm password
            </TextFieldLabel>
            <CustomTextField
              id="confirmPassword"
              name="confirmPassword"
              variant="outlined"
              placeholder="Confirm Your Password"
              size={!mdMatch ? "small" : "medium"}
              fullWidth
            />
          </TextFieldWrapper>
          <AuthRedBtn>sign up</AuthRedBtn>
        </form>
      </OuterFrame>
    </Container>
  );
};

export default SignUp;
