import React from "react";
import { Rating } from "react-simple-star-rating";
import {
  MdRectangle,
  MdRectangleLeft,
  MdRectangleRight,
} from "../ui/my-react-icons/md";

const customIcons = [
  { icon: <MdRectangleLeft size={35} /> },
  { icon: <MdRectangle size={35} /> },
  { icon: <MdRectangle size={35} /> },
  { icon: <MdRectangleRight size={35} /> },
];

export const RatingBar = (props) => {
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
