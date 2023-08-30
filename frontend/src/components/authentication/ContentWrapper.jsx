import { Stack, styled } from "@mui/material";

const ContentWrapper = styled(Stack)(({ theme }) => ({
  // height: "100%",
  [theme.breakpoints.up("xs")]: {
    maxWidth: "261px",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "348px",
  },
  justifyContent: "center",
}));

export default ContentWrapper;
