import { Button, styled } from "@mui/material";

const AuthRedBtn = styled(Button)(({ theme }) => ({
  width: "100%",
  // flex: 1,
  paddingTop: "1.125em",
  paddingBottom: "1.125em",
  marginBottom: "1.125em",
  boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.25)",
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
  "&:active": {
    backgroundColor: theme.palette.secondary.dark,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6875rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
  },
}));

export default AuthRedBtn;
