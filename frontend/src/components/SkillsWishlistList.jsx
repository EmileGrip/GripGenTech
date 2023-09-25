import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CustomModal from "../ui/CustomModal";
import AddSkillWishlistForm from "../pages/employee/mySkills/AddSkillWishlistForm";
import { suggestedSkills as ModalSuggestedSkills } from "../data/skillsData";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillsWishlistData } from "../redux/slices/Employee/mySkills/mySkillsActions";
import SkillWishTableRow from "./SkillWishTableRow";

const SkillsWishlistList = () => {
  const [open, setOpen] = useState(false);
  const { userInfo, token } = useSelector((state) => state.auth);
  const { skillsWishlist, skillsWishlistLoading, skillsRecommendation } =
    useSelector((state) => state.mySkills);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchSkillsWishlistData(userInfo.id));
    }
  }, [token, dispatch]);

  const modifiedSkills = skillsWishlist
    ?.slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <Box className="wishList__section">
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillWishlistForm
          data={skillsRecommendation}
          closeModal={handleClose}
        />
      </CustomModal>

      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          alignItems: { sm: "center" },
          gap: { xs: 1, sm: 0 },
          pb: 2,
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
            alignSelf: "flex-start",
          }}
          endIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Skill
        </Button>
      </Stack>

      <Box pb={8.5}>
        <Typography variant="body2" color="secondary.main">
          Add skills to your profile that you don't have yet but want to
          develop.
        </Typography>
      </Box>

      {skillsWishlistLoading && <CircularProgress />}
      {!skillsWishlistLoading && (
        <>
          {modifiedSkills.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              No skills found
            </Typography>
          ) : (
            <>
              {modifiedSkills.map((skill, index) => (
                <SkillWishTableRow skill={skill} key={skill.id} index={index} />
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SkillsWishlistList;
