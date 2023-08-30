import { Button, styled } from "@mui/material";

const SignInSocialBtn = styled(Button)(({ theme }) => ({
  width: "100%",
  // flex: 1,
  paddingTop: "1.125em",
  paddingBottom: "1em",
  marginBottom: "1em",
  boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.25)",
  border: "1px solid #000000",
  backgroundColor: theme.palette.neutral.btnBg,
  color: "primary.main  ",
  "&:hover": {
    backgroundColor: theme.palette.neutral.main,
  },
  "&:active": {
    backgroundColor: theme.palette.neutral.main,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6875rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
  },
}));

export default SignInSocialBtn;
