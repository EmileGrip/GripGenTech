import React from "react";
import { Rating } from "react-simple-star-rating";
import { MdRoundedRectangle } from "../ui/my-react-icons/md";
import { useMediaQuery, useTheme } from "@mui/material";

export const RatingBar = (props) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const size = lgMatches ? 35 : mdMatches ? 30 : 20;

  const customIcons = [
    { icon: <MdRoundedRectangle size={size} /> },
    { icon: <MdRoundedRectangle size={size} /> },
    { icon: <MdRoundedRectangle size={size} /> },
    { icon: <MdRoundedRectangle size={size} /> },
  ];

  let dottedVerticalBarPositionLeft = "";
  if (props.requiredLevel == 0) {
    dottedVerticalBarPositionLeft = "0px";
  } else if (props.requiredLevel == 1) {
    dottedVerticalBarPositionLeft = lgMatches
      ? "35.6px"
      : mdMatches
      ? "30px"
      : "20px";
  } else if (props.requiredLevel == 2) {
    dottedVerticalBarPositionLeft = lgMatches
      ? "71px"
      : mdMatches
      ? "60px"
      : "40px";
  } else if (props.requiredLevel == 3) {
    dottedVerticalBarPositionLeft = lgMatches
      ? "106.6px"
      : mdMatches
      ? "90px"
      : "60px";
  } else if (props.requiredLevel == 4) {
    dottedVerticalBarPositionLeft = lgMatches
      ? "142px"
      : mdMatches
      ? "120px"
      : "80px";
  }

  let dottedVerticalBarColor = "";
  if (props.initialValue < props.requiredLevel) {
    dottedVerticalBarColor = "#DADE3D";
  } else if (props.initialValue >= props.requiredLevel) {
    dottedVerticalBarColor = "#3FB252";
  } else {
    dottedVerticalBarColor = "#3FB252";
  }

  let statusBarColors = [];
  if (props.initialValue < props.requiredLevel) {
    statusBarColors = ["#DADE3D", "#DADE3D", "#DADE3D", "#DADE3D"];
  } else if (props.initialValue >= props.requiredLevel) {
    statusBarColors = ["#3FB252", "#3FB252", "#3FB252", "#3FB252"];
  }

  return (
    <div style={{ position: "relative" }}>
      {props.requiredLevel > 0 && (
        <div
          style={{
            position: "absolute",
            top: lgMatches ? "0px" : mdMatches ? "-2px" : "-6.5px",
            left: dottedVerticalBarPositionLeft,
            width: "3px",
            height: "31px",
            borderLeft: `3px dotted ${dottedVerticalBarColor}`,
          }}
        />
      )}
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
        fillColor={dottedVerticalBarColor}
        fillColorArray={statusBarColors}
        initialValue={props.initialValue}
      />
    </div>
  );
};

export default RatingBar;
