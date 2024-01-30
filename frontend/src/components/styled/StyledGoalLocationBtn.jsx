import { Button, styled } from "@mui/material";

const StyledGoalLocationBtn = styled(Button)(({ theme }) => ({
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid",
  borderColor: theme.palette.lightGrey,
  backgroundColor: theme.palette.background.white,
  color: theme.palette.darkGreen,
  fontWeight: 600,
  fontSize: "18px",
  textTransform: "initial",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "273px",
  },
}));

export default StyledGoalLocationBtn;
