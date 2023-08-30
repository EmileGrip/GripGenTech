import { Stack, styled } from "@mui/material";

const TextFieldWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    marginBottom: "12px",
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: "16px",
  },
}));

export default TextFieldWrapper;
