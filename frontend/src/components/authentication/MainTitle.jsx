import { Typography, styled } from "@mui/material";

const MainTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "0.285em",
  fontWeight: 700,
  textTransform: "capitalize",
  [theme.breakpoints.up("xs")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
}));

export default MainTitle;
