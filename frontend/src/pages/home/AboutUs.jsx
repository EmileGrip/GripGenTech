import {
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import redDot from "../../assets/redDot.svg";
import app_photo from "../../assets/app_photo.png";
import googlePlayIcon from "../../assets/googlePlayIcon.svg";
import appleIcon from "../../assets/appleIcon.svg";

const sentences = [
  "100% Fresh Food.",
  "Fast Delivery.",
  "With you in any occasions.",
  "Halal Food is easier with us.",
];

const AppBtn = styled(Button)(({ theme }) => ({
  flex: 1,
  borderRadius: "4px",
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "none",
  padding: "0.4em 0.5em",
  boxShadow: theme.shadows[3],
  "&:active": {
    boxShadow: theme.shadows[12],
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "14px",
  },
}));

const AboutUs = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: { xs: 4, md: 5, lg: 8 },
      }}
    >
      <Stack
        sx={{
          mb: { xs: 4, md: 5, lg: 8 },
          flexDirection: { xs: "column", md: "row-reverse" },
          justifyContent: { md: "space-evenly" },
        }}
      >
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography variant="h3" sx={{ color: "secondary.main", pl: 2 }}>
            why choose us ?
          </Typography>
          <List>
            {sentences.map((sentence, index) => {
              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <img src={redDot} alt="dot icon" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      variant="body1"
                      sx={{ color: "#afafaf", fontWeight: 500 }}
                    >
                      {sentence}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ maxWidth: { md: "350px", lg: "500px" } }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "secondary.main", pl: 2 }}
          >
            user our ZABEIHATY APP
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#afafaf", pl: 2, fontWeight: 500 }}
          >
            Ordering your Halal products easily and faster, simply download our
            app and start your journey with us.
          </Typography>
          <Box component="img" src={app_photo} sx={{ width: "100%" }} />
          <Stack
            sx={{
              px: { xs: 2, sm: 6, md: 0 },
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: { xs: "space-between", sm: "space-evenly" },
              gap: { xs: 1, sm: 8, md: 2 },
            }}
          >
            <AppBtn
              component={Link}
              href="#"
              sx={{
                background: "#D3D3D3",
                "&:hover": {
                  background: "#a6a6a6",
                  boxShadow: 6,
                },
              }}
              startIcon={
                <Box
                  component="img"
                  src={googlePlayIcon}
                  alt="icon"
                  sx={{
                    width: { xs: "17px", sm: "25px", lg: "35px" },
                    height: { xs: "17px", sm: "25px", lg: "35px" },
                    ml: { xs: 0.5, lg: 0 },
                    mr: { lg: 1 },
                  }}
                />
              }
            >
              Download it from
              <br /> Google Play
            </AppBtn>
            <AppBtn
              component={Link}
              href="#"
              sx={{
                background: "#4b4b4b",
                color: "#fff",
                "&:hover": {
                  background: "#292929",
                  boxShadow: 6,
                },
              }}
              startIcon={
                <Box
                  component="img"
                  src={appleIcon}
                  alt="icon"
                  sx={{
                    width: { xs: "17px", sm: "25px", lg: "35px" },
                    height: { xs: "17px", sm: "25px", lg: "35px" },
                    ml: { xs: 0.5, lg: 0 },
                    mr: { lg: 1 },
                  }}
                />
              }
            >
              Download it from
              <br /> App Store
            </AppBtn>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default AboutUs;
