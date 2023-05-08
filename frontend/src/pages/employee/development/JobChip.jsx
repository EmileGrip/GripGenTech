import React from "react";

const JobChip = ({ children, marginRight }) => {
  const style = {
    display: "inline-flex",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "500",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "20px",
    paddingLeft: "20px",
    color: "#353C44",
    backgroundColor: "#E5F3FC",
  };
  return (
    <div style={{ ...style, ...marginRight }}>
      <span>{children}</span>
    </div>
  );
};

export default JobChip;
