import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SemiCircle from "./SemiCircle";

const hideStyleLaptop = {
  width: "0px",
  visibility: "hidden",
  opacity: 0,
};
const showStyleMobile = {
  transform: "translateX(0)",
  opacity: 1,
};
const DefaultLayout = ({ sidebarData, title, children }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [showSidebar, setShowSidebar] = useState(lgMatches);
  const sidebarHandler = (state) => {
    setShowSidebar(state);
  };
  const laptopStyle = !showSidebar && hideStyleLaptop;
  const mobileStyle = showSidebar && showStyleMobile;
  const currentScreen = lgMatches ? laptopStyle : mobileStyle;
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {!showSidebar && lgMatches && <SemiCircle onMenu={sidebarHandler} />}
      <SideBar
        sidebarData={sidebarData}
        onOpen={sidebarHandler}
        currentStyle={currentScreen}
      />
      <Box
        className="rightSide"
        sx={{
          flex: 1,
          borderLeft: lgMatches && showSidebar ? "2px solid #e9e9e9" : "",
          pt: 4.625,
          transition: "0.5s",
        }}
      >
        <Stack sx={{ px: { xs: 0, md: 4.5 }, height: "100%" }}>
          <Topbar title={title} onMenu={sidebarHandler} />
          <Stack pt={3.125} pb={5.5} sx={{ flex: 1 }}>
            {children}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default DefaultLayout;
