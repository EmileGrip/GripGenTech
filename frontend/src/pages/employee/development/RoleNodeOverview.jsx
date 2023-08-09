import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import RoleSkillTableRow from "./RoleSkillTableRow";
import RoleSkillsHeaders from "./RoleSkillsHeaders";
import { useDispatch, useSelector } from "react-redux";
import { fetchCareerPathOverviewDataById } from "../../../redux/slices/Employee/development/developmentActions";

const RoleNodeOverview = ({ jobId }) => {
  const { token } = useSelector((state) => state.auth);
  const { overviewData, overviewDataLoading } = useSelector(
    (state) => state.development
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchCareerPathOverviewDataById(jobId));
    }
  }, [token, dispatch]);

  const sortedSkills = overviewData?.skills
    ?.slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <Box sx={{ px: 2 }}>
      <Typography vairant="h5" color={"secondary.main"} mb={1}>
        Next Job
      </Typography>
      {overviewDataLoading && <CircularProgress />}
      {!overviewDataLoading && (
        <Typography
          variant="h2"
          color={"secondary.main"}
          sx={{ mb: { xs: 3, lg: 6.75 }, textTransform: "capitalize" }}
        >
          {overviewData?.title}
        </Typography>
      )}
      <Typography variant="h3" color={"secondary.main"} sx={{ mb: { xs: 2 } }}>
        Skill Profile
      </Typography>
      {overviewDataLoading && <CircularProgress />}
      {!overviewDataLoading && (
        <>
          {sortedSkills?.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              No skills match
            </Typography>
          ) : (
            <Box className="tableContent__section">
              <RoleSkillsHeaders />
              {sortedSkills?.map((skill) => (
                <RoleSkillTableRow skill={skill} key={skill.title} />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default RoleNodeOverview;
