import { Box, Typography } from "@mui/material";
import React from "react";
// import "../../styles/donationSliderStyle.css";
import DonationCarousel from "./carousels/DonationCarousel";

const OPTIONS = {
  slidesToScroll: "auto",
  containScroll: "trimSnaps",
  loop: true,
};
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Donation = () => {
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
        }}
      >
        donations
      </Typography>

      <Box>
        <DonationCarousel slides={SLIDES} options={OPTIONS} />
      </Box>
    </Box>
  );
};

export default Donation;
