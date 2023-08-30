import { Box, Container, Link, Stack, Typography, styled } from "@mui/material";
import React from "react";
import footerLogo from "../../assets/footer-logo.png";
import facebookLogo from "../../assets/facebook-logo.svg";
import instagramLogo from "../../assets/insta-logo.svg";
import youtubeLogo from "../../assets/youtube-logo.svg";
import visaLogo from "../../assets/visa-logo.svg";
import mastercardLogo from "../../assets/mastercard-logo.svg";
import discoverLogo from "../../assets/discover-logo.svg";

const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.background.default,
}));

const SocialLogo = styled(Box)(({ theme }) => ({
  color: theme.palette.background.default,
  width: "20px",
  height: "20px",
  [theme.breakpoints.up("sm")]: {
    width: "30px",
    height: "30px",
  },
}));

const PaymentLogo = styled(Box)(({ theme }) => ({
  color: theme.palette.background.default,
  width: "40px",
  height: "20px",
  [theme.breakpoints.up("sm")]: {
    width: "60px",
    height: "30px",
  },
}));

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
      }}
    >
      <Container
        maxWidth={"lg"}
        disableGutters
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: { sm: "wrap" },
            gap: { xs: 2 },
          }}
        >
          <Stack sx={{ flex: { sm: 0.75 } }}>
            <Box
              component="img"
              sx={{
                width: { xs: "70px" },
                height: { xs: "55px" },
                mb: { xs: 0.5 },
              }}
              src={footerLogo}
              alt="footer-logo"
            />

            <FooterText variant="body2">
              We have specialized in delivery of Halal food products, produced
              by local farms all around the country.
            </FooterText>
          </Stack>

          <Stack
            sx={{
              flex: { sm: 1, md: 2 },
              pl: { sm: 2, md: 0 },
              alignItems: { md: "center" },
            }}
          >
            <FooterText variant="h3" sx={{ mb: { xs: "0.375em", sm: "1em" } }}>
              contacts
            </FooterText>

            <Stack
              sx={{
                gap: { xs: 0.5 },
                mb: { xs: 1 },
                alignItems: { md: "center" },
              }}
            >
              <Link
                href="mailto:example@email.com"
                variant="body2"
                sx={{ color: "background.default" }}
              >
                example@email.com
              </Link>
              <Link
                href="tel:+5551234567"
                variant="body2"
                sx={{ color: "background.default" }}
              >
                +555.123.4567
              </Link>
              <Link
                href="tel:+5551234568"
                variant="body2"
                sx={{ color: "background.default" }}
              >
                +555.123.4568
              </Link>
              <FooterText variant="body2">2nd Ave and Washington</FooterText>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                gap: { xs: 2 },
                alignItems: { md: "center" },
              }}
            >
              <Link href="#">
                <SocialLogo
                  component="img"
                  src={facebookLogo}
                  alt="socail icon"
                />
              </Link>

              <Link href="#">
                <SocialLogo
                  component="img"
                  src={instagramLogo}
                  alt="socail icon"
                />
              </Link>

              <Link href="#">
                <SocialLogo
                  component="img"
                  src={youtubeLogo}
                  alt="socail icon"
                />
              </Link>
            </Stack>
          </Stack>

          <Stack sx={{ width: { sm: "100%", md: "" }, flex: { md: 1 } }}>
            <FooterText variant="h3" sx={{ mb: { xs: "0.375em", sm: "1em" } }}>
              secure payments
            </FooterText>
            <Stack sx={{ flexDirection: "row", gap: { xs: 2 } }}>
              <Link href="#">
                <PaymentLogo component="img" src={visaLogo} alt="visa icon" />
              </Link>

              <Link href="#">
                <PaymentLogo
                  component="img"
                  src={mastercardLogo}
                  alt="mastercard icon"
                />
              </Link>

              <Link href="#">
                <PaymentLogo
                  component="img"
                  src={discoverLogo}
                  alt="discover icon"
                />
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
