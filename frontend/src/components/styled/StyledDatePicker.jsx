import { styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.darkGrey,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.darkerGreen,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.darkerGreen,
    },
  },
  "& .MuiInputBase-root": {
    borderRadius: "4px",
  },
  "& .MuiInputBase-input": {
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "12px",
    color: theme.palette.darkGreen,
    textTransform: "capitalize",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.inactive.main,
  },
}));

export default StyledDatePicker;
