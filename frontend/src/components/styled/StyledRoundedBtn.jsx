import { Button, styled } from "@mui/material";

const StyledRoundedBtn = styled(Button)(({ theme }) => ({
  padding: "4px 12px",
  borderRadius: "100px",
  border: "1px solid",
  borderColor: theme.palette.softGreen,
  color: theme.palette.softGreen,
  fontWeight: 500,
  fontSize: "14px",
  textTransform: "capitalize",
}));

export default StyledRoundedBtn;
