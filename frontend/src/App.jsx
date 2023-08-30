import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HOME_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from "./routes/paths";
import SignUp from "./pages/authentication/signUp/SignUp";
import { responsiveTheme } from "./theme";
import Login from "./pages/authentication/signIn/Login";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  // Redirect to home if user is logged in
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate(SIGNIN_ROUTE);
  //   }
  // }, [isAuth, navigate]);

  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <Box className="app">
        <Routes>
          <Route index element={<Login />} />
          <Route path={SIGNIN_ROUTE} index element={<Login />} />
          <Route path={SIGNUP_ROUTE} element={<SignUp />} />
          <Route path={HOME_ROUTE} element={<Home />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
