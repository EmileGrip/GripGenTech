import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ProductBox from "./ProductBox";
import cowIcon from "../../assets/cowIcon.svg";
import sheepIcon from "../../assets/sheepIcon.svg";
import goatIcon from "../../assets/goatIcon.svg";
import cowCalfIcon from "../../assets/cowCalfIcon.svg";
import chickenProductIcon from "../../assets/chickenProductIcon.svg";

const OurProducts = () => {
  return (
    <Box
      sx={{
        mb: { xs: 4, md: 5, lg: 8 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: "0.75em",
          fontWeight: 600,
          color: "secondary.main",
          textAlign: "center",
        }}
      >
        our products
      </Typography>
      <Stack
        sx={{
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: { xs: "5px", sm: 2, md: "66px", lg: "90px", xl: "115px" },
          px: { xs: 0.25, sm: 1, md: 5, lg: 8, xl: 10 },
        }}
      >
        <ProductBox productName="cow" src={cowIcon} />
        <ProductBox productName="sheep" src={sheepIcon} />
        <ProductBox productName="calf cow" src={cowCalfIcon} />
        <ProductBox productName="chicken" src={chickenProductIcon} />
        <ProductBox productName="goat" src={goatIcon} />
      </Stack>
    </Box>
  );
};

export default OurProducts;
