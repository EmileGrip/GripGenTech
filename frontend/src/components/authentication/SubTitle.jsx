import { Typography, styled } from "@mui/material";

const CustomSubTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 700,
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.9375rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
}));

export default CustomSubTitle;
