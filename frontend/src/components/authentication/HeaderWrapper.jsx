import { Stack, styled } from "@mui/material";

const HeaderWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    marginBottom: "35px",
  },
  // [theme.breakpoints.up("sm")]: {
  //   marginBottom: "46px",
  // },
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

export default HeaderWrapper;
