import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  // height: "67px",
  width: "100%",
  maxWidth: "261px",
  "& .MuiInputBase-input::placeholder": {
    fontSize: "1rem",
    fontWeight: 400,
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    fontWeight: 400,
    boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.25)",
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiInputBase-input::placeholder": {
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    "& .MuiInputBase-input": {
      fontSize: "1.125rem",
      fontWeight: 400,
    },
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "348px",
    "& .MuiInputBase-input::placeholder": {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    "& .MuiInputBase-input": {
      fontSize: "1.25rem",
      fontWeight: 400,
      paddingTop: "12.625px",
      paddingBottom: "12.625px",
    },
  },
}));

export default CustomTextField;
