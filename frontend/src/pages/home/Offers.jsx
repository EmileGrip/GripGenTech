import { Box, Typography } from "@mui/material";
import React from "react";
import OffersCarousel from "./carousels/OffersCarousel";

const OPTIONS = {
  slidesToScroll: "auto",
  containScroll: "trimSnaps",
  loop: true,
};
const SLIDE_COUNT = 8;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Offers = () => {
  return (
    <Box
      sx={{
        position: "relative",
        mb: { xs: 10, md: 13, lg: 18 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: "0.75em",
          fontWeight: 600,
          color: "secondary.main",
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        offers
      </Typography>

      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.94) 26.67%, #EA0033 100%)",
        }}
      >
        <OffersCarousel slides={SLIDES} options={OPTIONS} />
      </Box>
    </Box>
  );
};

export default Offers;
