import { Typography, styled } from "@mui/material";

const TextFieldLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  textTransform: "capitalize",
  color: theme.palette.primary.main,
  [theme.breakpoints.up("xs")]: {
    fontSize: "1.125rem",
    marginBottom: "0.55em",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
}));

export default TextFieldLabel;
