import { TextField, styled } from "@mui/material";

const StyledTextarea = styled(TextField)(({ theme }) => ({
  width: "100%",
  lineHeight: 1.5,
  borderRadius: "4px",
  background: "#fff",
  "& .MuiInputBase-root": {
    padding: "16px 12px",
    height: "100%",
  },
  "& .MuiInputBase-input": {
    color: theme.palette.darkGreen,
    padding: 0,
  },
  "& fieldset": {
    border: `1px solid `,
    borderColor: theme.palette.darkGrey,
    borderRadius: "4px",
  },
}));

export default StyledTextarea;
