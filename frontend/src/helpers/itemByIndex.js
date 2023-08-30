import offer_1 from "../assets/offer_1.png";
import offer_2 from "../assets/offer_2.png";
import offer_3 from "../assets/offer_3.png";
import offer_4 from "../assets/offer_4.png";
import offer_5 from "../assets/offer_5.png";

export const offers = [
  {
    price: "100$",
    thumbnail: offer_1,
    description: "Spiced Maple Cow Meat Belly Slices.",
  },
  {
    thumbnail: offer_2,
    price: "50$",
    description: "Flavourful Chicken Crown with Sage & Onion Gravy",
  },
  {
    price: "25$",
    thumbnail: offer_3,
    description: "Kilo red spices + yellow spices + half of black spices",
  },
  { price: "75$", thumbnail: offer_4, description: "Tender 2 Lamb Leg Chops" },
  {
    price: "15$",
    thumbnail: offer_5,
    description: "Natural Honey 100%",
  },
];

const itemByIndex = (index) => offers[index % offers.length];

export default itemByIndex;
