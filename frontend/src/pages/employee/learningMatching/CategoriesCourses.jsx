import { Button, Stack, styled } from "@mui/material";
import React from "react";
import { useState } from "react";

const Category = styled(Button)(({ theme }) => ({
  color: theme.palette.inactive.main,
  fontSize: "18px",
  fontWeight: 400,
  textTransform: "none",
  "&:hover": {
    color: "#788894",
    background: "#E5F3FC",
  },
  "&.active": {
    color: theme.palette.darkGreen,
    fontWeight: 600,
    borderRadius: "0",
    borderBottom: `2px solid ${theme.palette.accent}`,
  },
  [theme.breakpoints.up("md")]: {
    paddingInline: "16px",
    paddingBlock: "9px",
  },
}));

const categories = [
  "All courses",
  "Current job",
  "Learning path",
  "Skill wishlist",
];

const CategoriesCourses = () => {
  const [select, setSelect] = useState(0);
  return (
    <Stack
      className="categories__courses"
      sx={{
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {categories.map((category, index) => (
        <Category
          key={index}
          className={select === index ? "active" : ""}
          onClick={() => setSelect(index)}
        >
          {category}
        </Category>
      ))}
    </Stack>
  );
};

export default CategoriesCourses;
