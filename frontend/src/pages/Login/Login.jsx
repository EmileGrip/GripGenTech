import { Box, Container, Stack, Typography } from "@mui/material";
import LoginForm from "./LoginForm/LoginForm";
import login_logo from "../../assets/login_logo.svg";
import bg_login from "../../assets/bg_login.png";

const Login = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ px: "0 !important", display: "flex", height: "100vh" }}
    >
      <Stack
        alignItems={"flex-end"}
        justifyContent={"center"}
        sx={{
          width: "45%",
          maxWidth: "480px",
          height: "100%",
          pr: 5,
          position: "relative",
        }}
      >
        <Box sx={{ width: "307px", textAlign: "left", mb: 5 }}>
          <img src={login_logo} alt="logo" width={150} height={42} />
        </Box>
        <LoginForm />
        <Typography
          variant="body1"
          sx={{
            width: "307px",
            color: "secondary.main",
            opacity: "0.5",
            position: "absolute",
            bottom: "50px",
          }}
        >
          Grip® All Rights Reserved
        </Typography>
      </Stack>
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${bg_login})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </Container>
  );
};

export default Login;
