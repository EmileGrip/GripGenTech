import { Button, styled } from "@mui/material";

const StyledDarkBtn = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: theme.palette.darkGreenAccent,
  padding: "10px",
  borderRadius: "5px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: theme.palette.lightGreen,
  },
  fontSize: "14px",
  fontWeight: 600,
  [theme.breakpoints.up("lg")]: {
    minWidth: "150px",
  },
}));

export default StyledDarkBtn;
