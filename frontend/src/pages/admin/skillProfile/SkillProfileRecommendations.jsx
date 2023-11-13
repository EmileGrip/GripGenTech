import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import fileIcon from "../../../assets/add_file_icon.svg";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillProfile,
  fetchSkillProfileRecommendationData,
} from "../../../redux/slices/admin/skillProfile/skillProfileActions";
import axiosInstance from "../../../helper/axiosInstance";

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

  const AddSkillRecommendation = useCallback(
    async (token, skill_id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        // setLoading(true);
        const response = await axiosInstance.post(
          `skill_profile`,
          {
            skill_id,
            level: 1,
            job_profile_id: jobProfileId,
          },
          config
        );
        console.log(response.data);
        // onSuccess(true);
        // onClose();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchSkillProfile(jobProfileId));
        dispatch(fetchSkillProfileRecommendationData(jobProfileId));
        // closeModal();
      }
    },
    [token, jobProfileId]
  );

  const sortedSkills = skillProfileRecommendations
    ?.slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <Stack
      sx={{
        position: "relative",
        backgroundColor: "#FAFAFA",
        border: "1px solid #EEEEEE",
        borderRadius: "10px",
        pt: "75px",
        px: "20px",
        justifyContent: "center",
        gap: 1,
        minHeight: "330px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          textTransform: "capitalize",
          color: "darkGreen",
        }}
      >
        Skills Recommendations
      </Typography>

      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "70px",
          left: "20px",
          color: "#788894",
        }}
      >
        Select the skill to add it to job profile
      </Typography>

      <Stack className="displayData__section" sx={{ width: "100%" }}>
        {skillProfileRecommendationsLoading && <CircularProgress />}
        {!skillProfileRecommendationsLoading && (
          <>
            {sortedSkills.length < 1 ? (
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  mt: 2,
                }}
              >
                <img src={fileIcon} alt="File icon" />

                <Typography variant="h4" sx={{ color: "#788894" }}>
                  No skills found
                </Typography>
              </Stack>
            ) : (
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  mt: 3,
                  pb: 3,
                }}
              >
                {sortedSkills.length >= 1 && (
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {sortedSkills.map((skill) => (
                      <Box
                        onClick={() => AddSkillRecommendation(token, skill?.id)}
                        key={skill.title}
                        sx={{
                          background: "rgba(23, 52, 51, 0.40)",
                          borderRadius: "100px",
                          py: "4px",
                          px: "12px",
                          cursor: "pointer",
                          "&: hover": {
                            background: "#0C1716",
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          textTransform="none"
                          color="#FFFFFF"
                          fontWeight="500"
                        >
                          {skill.title}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default SkillProfileRecommendations;
