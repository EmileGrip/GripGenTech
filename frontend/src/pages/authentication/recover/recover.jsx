import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RecoverForm from "./recoverForm/recoverForm";
import login_logo from "../../../assets/Logo/Logo - Export/Adepti - Horizontal Logo 1.png";
import bg_login from "../../../assets/bg_login.png";

const Recover = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container
      maxWidth={false}
      sx={{ px: "0 !important", display: "flex", height: "100vh" }}
    >
      <Stack
        sx={{
          alignItems: { lg: "flex-end" },
          justifyContent: "center",
          width: { xs: "100%", lg: "45%" },
          maxWidth: { lg: "480px" },
          height: "100%",
          pr: { lg: 5 },
          position: "relative",
        }}
      >
        <Box className="recover_page_special_width_in_firefox">
          <img src={login_logo} alt="logo" width={150} />
        </Box>
        <RecoverForm />
        <Box className="recover_page_copyright_in_firefox">
          <Typography
            variant="body1"
            sx={{
              color: "secondary.main",
              opacity: "0.5",
            }}
          >
            Adepti® All Rights Reserved
          </Typography>
        </Box>
      </Stack>

      {mdMatches && (
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${bg_login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      )}
    </Container>
  );
};

export default Recover;
