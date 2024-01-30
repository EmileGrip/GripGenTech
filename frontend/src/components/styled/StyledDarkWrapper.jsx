import { Stack, styled } from "@mui/material";

const StyledDarkWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  border: "2px solid",
  borderColor: theme.palette.lightGrey,
  borderRadius: "10px",
  padding: "12px",
}));

export default StyledDarkWrapper;
