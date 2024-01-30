import { Stack, Typography } from "@mui/material";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// write function to generate star rating start from 1 to 5 based on rate prop
const generateStarRating = (rate) => {
  let starRating = [];
  for (let i = 0; i < 5; i++) {
    if (rate >= 1) {
      starRating.push(
        <StarIcon
          sx={{ width: "19px", height: "19px", color: "#FBB344" }}
          key={i}
        />
      );
      rate--;
    } else if (rate >= 0.5) {
      starRating.push(
        <StarHalfIcon
          sx={{ width: "19px", height: "19px", color: "#FBB344" }}
          key={i}
        />
      );
      rate -= 0.5;
    } else {
      starRating.push(
        <StarBorderIcon
          sx={{ width: "19px", height: "19px", color: "#FBB344" }}
          key={i}
        />
      );
    }
  }
  return starRating;
};

const CoursePriceWrapper = ({ price, rate, students }) => {
  return (
    <Stack sx={{ gap: "6px" }}>
      <Typography variant="h1" sx={{ fontSize: "32px", color: "darkGreen" }}>
        {`USD $${price || 100}`}
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: "6px", alignItems: "center" }}>
        <Stack sx={{ flexDirection: "row", gap: "6px" }}>
          {generateStarRating(rate)}
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {rate}
        </Typography>
        <Typography variant="body2" sx={{ color: "#a1a1a1" }}>
          ({students})
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CoursePriceWrapper;
