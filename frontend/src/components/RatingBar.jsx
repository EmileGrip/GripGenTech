import React from "react";
import { Rating } from "react-simple-star-rating";
import {
  MdRectangle,
  MdRectangleLeft,
  MdRectangleRight,
} from "../ui/my-react-icons/md";
import { useMediaQuery, useTheme } from "@mui/material";

export const RatingBar = (props) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const size = lgMatches ? 35 : mdMatches ? 30 : 20;

  const customIcons = [
    { icon: <MdRectangleLeft size={size} /> },
    { icon: <MdRectangle size={size} /> },
    { icon: <MdRectangle size={size} /> },
    { icon: <MdRectangleRight size={size} /> },
  ];
  return (
    <Rating
      showTooltip={false}
      customIcons={customIcons}
      readonly={true}
      onClick={(e) => {
        console.log(e);
      }}
      onPointerEnter={(e) => {
        console.log(e);
      }}
      iconsCount={4}
      fillColor="#39A430"
      fillColorArray={["#C7493E", "#F48B50", "#F4BE50", "#39A430"]}
      initialValue={props.initialValue}
    />
  );
};

export default RatingBar;
