import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import heroBg from "../../assets/heroBg.jpeg";
const Hero = () => {
  return (
    <Stack
      sx={{
        background: `url(${heroBg}) no-repeat `,
        backgroundPosition: { xs: " 50% 55%" },
        backgroundSize: { xs: "cover" },
        mb: { xs: 3, md: 3.5 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          width: { xs: "108px", md: "240px", lg: "416px" },
          color: "white",
          fontSize: { xs: "0.8125rem", md: "1.8125rem", lg: "3.125rem" },
          mt: { xs: "0.615em" },
          mb: { xs: "0.3em" },
          ml: { xs: "3.4615em" },
        }}
      >
        Fresh Meat From our farm to your home
      </Typography>
    </Stack>
  );
};

export default Hero;
