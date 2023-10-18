import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchSkillsData,
  fetchSkillsWishlistData,
} from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";
import SkillsOverview from "../../../components/profile-section/profile/skillsValidation/SkillsOverview";
import SkillsOverview2 from "./SkillsOverview2";

const Overview = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { userInfo, token } = useSelector((state) => state.auth);
  const { skills, skillsDataLoading, skillsRecommendation } = useSelector(
    (state) => state.mySkills
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(userInfo.id));
      dispatch(fetchSkillsData(userInfo.id));
      dispatch(fetchSkillsWishlistData(userInfo.id));
    }
  }, [token, dispatch]);

  const modifiedSkills = skills
    .slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <>
      <SkillsOverview
        skills={modifiedSkills}
        skillsLoading={skillsDataLoading}
        skillsRecommendation={skillsRecommendation}
        user={userInfo}
        userId={userInfo.id}
      />
      <SkillsOverview2 />
    </>
  );
};

export default Overview;
