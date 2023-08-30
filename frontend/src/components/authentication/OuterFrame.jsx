import { Stack, styled } from "@mui/material";

const OuterFrame = styled(Stack)(({ theme }) => ({
  height: "100%",
  width: "100%",
  padding: "15px",
  // paddingBottom: "15px",
  color: theme.palette.secondary.main,
  [theme.breakpoints.up("xs")]: {
    border: `5px solid currentColor`,
  },
  [theme.breakpoints.up("md")]: {
    border: `2.5px solid currentColor`,
  },
  [theme.breakpoints.up("lg")]: {
    border: `5px solid currentColor`,
  },
  alignItems: "center",
  justifyContent: "center",
}));

export default OuterFrame;
