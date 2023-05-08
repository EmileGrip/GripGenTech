import { Box, Tooltip, Typography } from "@mui/material";
import { skillsWishlist as data } from "../data/skillsData";
import Grid from "@mui/material/Unstable_Grid2";
import hintIcon from "../assets/hintIcon.svg";
import DescriptionTooltip from "../ui/DescriptionTooltip";

const SkillsWishlistList = () => {
  const checkLastChild = (index, array) => index + 1 === array.length;
  const gridStyles = {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    p: 0,
  };
  return (
    <Box className="wishList__section">
      <Typography
        variant={"h3"}
        color="primary.main"
        fontWeight={"400"}
        mb={2.25}
      >
        Skills Wishlist
      </Typography>
      {data.map((skill, index) => (
        <Grid
          container
          spacing={1}
          key={skill.skillName}
          sx={{
            background: "#f5f5f5",
            borderRadius: "10px",
            height: "45px",
            minHeight: "45px",
            mb: checkLastChild(index, data) ? 0 : 3.125,
          }}
        >
          <Grid xs={12} sx={gridStyles}>
            <Typography
              sx={{
                color: "#737373",
                fontSize: "20px",
                fontWeight: 400,
                mr: 1.75,
                pl: 2,
              }}
              variant="h5"
            >
              {skill.skillName}
            </Typography>
            <DescriptionTooltip
              title={skill.description}
              placement="bottom-start"
            >
              <img src={hintIcon} alt="icon" />
            </DescriptionTooltip>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default SkillsWishlistList;
