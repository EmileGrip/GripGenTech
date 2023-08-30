import charityRetailIrelandLogo from "../assets/charity-retail-irelandLogo.png";
import muslimForHumanityLogo from "../assets/muslims-for-humanity-logo.png";
import muslimChartiyLogo from "../assets/muslim-charity-logo-cropped.png";
export const images = [
  charityRetailIrelandLogo,
  muslimChartiyLogo,
  muslimForHumanityLogo,
];

const imageByIndex = (index) => images[index % images.length];

export default imageByIndex;
