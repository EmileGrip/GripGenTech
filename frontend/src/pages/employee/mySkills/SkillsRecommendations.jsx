import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillsRecommendationData } from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import SkillRecommendationTableRow from "./SkillsRecommendationTableRow";

const SkillsRecommendation = () => {
  const { userInfo, token } = useSelector((state) => state.auth);
  const { skillsRecommendation, skillsRecommendationLoading } = useSelector(
    (state) => state.mySkills
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchSkillsRecommendationData(userInfo.id));
    }
  }, [token, dispatch]);

  const modifiedSkills = skillsRecommendation
    ?.slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <Box className="recommendation__section">
      <Typography
        variant={"h3"}
        color="primary.main"
        fontWeight={"400"}
        mb={3.125}
      >
        Skills Recommendation
      </Typography>

      {skillsRecommendationLoading && <CircularProgress />}
      {!skillsRecommendationLoading && (
        <>
          {modifiedSkills.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              No skills found
            </Typography>
          ) : (
            <>
              {modifiedSkills.map((skill) => (
                <SkillRecommendationTableRow
                  skill={skill}
                  key={skill.skill_id}
                />
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SkillsRecommendation;
