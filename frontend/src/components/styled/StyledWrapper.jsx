import { Stack, styled } from "@mui/material";

const StyledWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.white,
  border: "2px solid",
  borderColor: theme.palette.lightGrey,
  borderRadius: "10px",
  padding: "16px",
  [theme.breakpoints.down("lg")]: {
    padding: "20px",
  },
}));

export default StyledWrapper;
