import { Button, styled } from "@mui/material";

const StyledSmallDarkBtn = styled(Button)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 500,
  color: "#fff",
  backgroundColor: theme.palette.darkGreenAccent,
  padding: 0,
  borderRadius: "3px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: theme.palette.lightGreen,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "130px",
  },
}));

export default StyledSmallDarkBtn;
