import { Box, Button, Tooltip, Typography } from "@mui/material";
import { skillsWishlist as data } from "../data/skillsData";
import Grid from "@mui/material/Unstable_Grid2";
import hintIcon from "../assets/hintIcon.svg";
import DescriptionTooltip from "../ui/DescriptionTooltip";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CustomModal from "../ui/CustomModal";
import AddSkillWishlistForm from "../pages/employee/mySkills/AddSkillWishlistForm";
import { suggestedSkills as ModalSuggestedSkills } from "../data/skillsData";

const SkillsWishlistList = () => {
  const checkLastChild = (index, array) => index + 1 === array.length;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const gridStyles = {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    p: 0,
  };
  return (
    <Box className="wishList__section">
      <CustomModal open={open} onClose={handleClose} title="Add Skill Wishlist">
        <AddSkillWishlistForm data={ModalSuggestedSkills} />
      </CustomModal>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.25,
        }}
      >
        <Typography variant={"h3"} color="primary.main" fontWeight={"400"}>
          Skills Wishlist
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            px: { xs: 4 },
            lineHeight: "1.5",
            textTransform: "capitalize",
            alignSelf: { xs: "flex-start", md: "flex-end", lg: "flex-start" },
          }}
          endIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Skill Wishlist
        </Button>
      </Stack>
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
