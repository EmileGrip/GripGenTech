import React, { useCallback, useRef } from "react";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";
import hintIcon from "../../../assets/hintIcon.svg";
import { Button, Grid, Stack, Typography } from "@mui/material";
import axiosInstance from "../../../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillProfile,
  fetchSkillProfileRecommendationData,
} from "../../../redux/slices/admin/skillProfile/skillProfileActions";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: "0 !important",
};

const SkillProfileRecommendationTableRow = ({
  skill,
  jobProfileId,
  handleSetTargetId,
}) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const sendData = useCallback(
    async (token, skill_id) => {
      handleSetTargetId(skill.id);
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

  const skillRef = useRef(null);

  return (
    <Stack
      ref={skillRef}
      id={skill.id}
      key={skill.id}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        mb: 3.125,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          background: "#f5f5f5",
          borderRadius: "10px",
          height: "45px",
          minHeight: "45px",
          width: "100%",
        }}
      >
        <Grid item xs={12} sx={gridStyles}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Typography
                sx={{
                  color: "#737373",
                  fontWeight: 400,
                  mr: 1.75,
                  pl: 2,
                }}
                variant="h5"
              >
                {skill.title}
              </Typography>
              <DescriptionTooltip
                title={skill.description}
                placement="bottom-start"
              >
                <img src={hintIcon} alt="icon" />
              </DescriptionTooltip>
            </Stack>

            <Button onClick={() => sendData(token, skill.id)} sx={{ mr: 2 }}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#737373",
                  fontWeight: 400,
                  mr: 1.75,
                  pl: 2,
                }}
                variant="h5"
              >
                Add Skill
              </Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SkillProfileRecommendationTableRow;
