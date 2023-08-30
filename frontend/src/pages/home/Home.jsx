import { Container } from "@mui/material";
import Topbar from "../../components/Topbar";
import Hero from "./Hero";
import OurProducts from "./OurProducts";
import Offers from "./Offers";

import AboutUs from "./AboutUs";
import Donation from "./Donation";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <Container maxWidth={false} sx={{ px: { xs: 0 } }}>
      <Topbar />
      <Hero />
      <OurProducts />
      <Offers />
      <AboutUs />
      <Donation />
      <Footer />
    </Container>
  );
};

export default Home;
