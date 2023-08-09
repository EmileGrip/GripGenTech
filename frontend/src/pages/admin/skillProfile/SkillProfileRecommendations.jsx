import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillProfileRecommendationData } from "../../../redux/slices/admin/skillProfile/skillProfileActions";
import SkillProfileRecommendationTableRow from "./SkillProfileRecommendationTableRow";

const SkillProfileRecommendations = ({ jobProfileId }) => {
  const { token } = useSelector((state) => state.auth);
  const { skillProfileRecommendations, skillProfileRecommendationsLoading } =
    useSelector((state) => state.skillProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && jobProfileId) {
      dispatch(fetchSkillProfileRecommendationData(jobProfileId));
    }
  }, [token, dispatch, jobProfileId]);

  const modifiedSkills = skillProfileRecommendations
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

      {skillProfileRecommendationsLoading && <CircularProgress />}
      {!skillProfileRecommendationsLoading && (
        <>
          {modifiedSkills.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              No skills found
            </Typography>
          ) : (
            <>
              {modifiedSkills.map((skill) => (
                <SkillProfileRecommendationTableRow
                  skill={skill}
                  jobProfileId={jobProfileId}
                  key={skill.id}
                />
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default SkillProfileRecommendations;
