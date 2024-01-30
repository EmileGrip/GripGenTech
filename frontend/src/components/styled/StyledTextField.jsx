import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.darkGreen,
    padding: "16px 12px",
    lineHeight: 1.5,
    fontSize: "16px",
    // borderRadius: "4px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      // borderRadius: "8px",
      border: `1px solid`,
      borderColor: `${theme.palette.darkGrey}`,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.darkerGreen,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.darkerGreen,
    },
  },
  "& fieldset": {
    border: `1px solid `,
    borderColor: theme.palette.darkGrey,
    borderRadius: "4px",
  },
}));
export default StyledTextField;
