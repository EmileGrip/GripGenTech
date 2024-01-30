import { Button, styled } from "@mui/material";

const StyledOutlinedBtn = styled(Button)(({ theme }) => ({
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid",
  borderColor: theme.palette.accent,
  color: theme.palette.accent,
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: 1.5,
  textTransform: "capitalize",
  [theme.breakpoints.up("lg")]: {
    minWidth: "150px",
  },
}));

export default StyledOutlinedBtn;
