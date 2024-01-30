import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useState } from "react";
import { suggestedSkills as ModalSuggestedSkills } from "../../../data/skillProfileData";
import HeadersTableSkillProfile from "./HeadersTableSkillProfile";
import CustomModal from "../../../ui/CustomModal";
import AddSkillForm from "./AddSkillForm";
import { skillsTable as tableData } from "../../../data/skillProfileData";
import TableRow from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobProfiles } from "../../../redux/slices/admin/jobProfile/jobProfileSlice";
import { fetchSkillProfile } from "../../../redux/slices/admin/skillProfile/skillProfileActions";
import {
  setSelectedJob,
  setSelectedTitle,
} from "../../../redux/slices/admin/skillProfile/skillProfileSlice";
import SkillProfileRecommendations from "./SkillProfileRecommendations";

const SkillProfile = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { jobProfile, loading } = useSelector((state) => state.jobProfile);
  const {
    skillProfile,
    skillsDataLoading,
    selectedJob,
    selectedTitle,
    skillProfileRecommendations,
  } = useSelector((state) => state.skillProfile);
  const [searchfield, setSearchfield] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  console.log("selectedTitle", selectedTitle);

  useEffect(() => {
    if (token) {
      dispatch(fetchJobProfiles(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token && (selectedTitle?.id || selectedJob?.id)) {
      console.log("selectedJob", selectedJob);
      console.log("selectedTitle", selectedTitle);

      if (!!selectedTitle?.id) {
        // function to iterate over jobProfile array to find same object similar to selectedTitle by name
        const findJob = (jobProfile, selectedTitle) => {
          return jobProfile.find(
            (job) => job.title.toLowerCase() === selectedTitle.toLowerCase()
          );
        };
        const job = findJob(jobProfile, selectedTitle?.title);
        console.log("job", job);
        dispatch(fetchSkillProfile(job?.id));
        return;
      }

      dispatch(fetchSkillProfile(selectedJob?.id));
    }
  }, [token, selectedJob, dispatch]);

  // useEffect to render jobProfile data regardless of searchfield
  useEffect(() => {
    if (jobProfile.length > 0) {
      setFilteredJobs(jobProfile);
      if (
        !selectedTitle &&
        (!selectedJob || Object.keys(selectedJob).length === 0)
      ) {
        dispatch(setSelectedJob(jobProfile[0]));
      }
    }
  }, [jobProfile]);

  useEffect(() => {
    if (jobProfile.length > 0 && searchfield.trim().length > 0) {
      if (!selectedTitle) {
        console.log("searchfield", searchfield);
        setFilteredJobs(
          jobProfile.filter((job) =>
            job.title.toLowerCase().includes(searchfield.toLowerCase())
          )
        );
        // TODO setFilteredJobs to jobProfile
      } else {
        setFilteredJobs(
          jobProfile.filter((job) =>
            job.title.toLowerCase().includes(selectedTitle.title.toLowerCase())
          )
        );
      }

      // console.log("selectedJob", selectedJob);
      // if (!selectedJob || Object.keys(selectedJob).length === 0) {
      //   dispatch(setSelectedJob(filteredJobs[0]));
      // }
    }
  }, [jobProfile, searchfield, selectedJob]);
  console.log("skillProfile", skillProfile);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    setAnchorEl(null);
    dispatch(setSelectedTitle(null));
    dispatch(setSelectedJob(option === null || option === "" ? null : option));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sortedSkills = skillProfile
    .slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  // Prevent page from going to the top after updating skills
  const [targetId, setTargetId] = useState(null);

  const handleSetTargetId = (id, deleteCase = false) => {
    const index = sortedSkills.findIndex((skill) => skill.id === id);
    if (index === 0) {
      setTargetId(sortedSkills[index + 1].id);
    } else if (index === sortedSkills.length - 1) {
      setTargetId(sortedSkills[index - 1].id);
    } else if (deleteCase) {
      setTargetId(sortedSkills[index - 1].id);
    } else {
      setTargetId(id);
    }
  };

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetId, sortedSkills]);

  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillForm
          data={skillProfileRecommendations}
          closeModal={handleClose}
          jobProfileId={selectedJob?.id}
        />
      </CustomModal>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box pb={1}>
            <Typography variant="body2" color="secondary.main">
              Determine the skill profile per job. Add recommended skills or
              search skills from the database and determine the proficiency
              level.
            </Typography>
          </Box>

          <Stack
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              alignItems: { xs: "flex-start", lg: "center" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Stack id="admin__step__7" direction="row" alignItems="center">
                <Typography
                  variant="h2"
                  color={"primary.main"}
                  textTransform="capitalize"
                >
                  {selectedJob?.title
                    ? selectedJob?.title
                    : selectedTitle?.title}
                  {/* {filteredJobs[0]?.title} */}
                </Typography>

                <IconButton id="demo-button" onClick={handleClick}>
                  <KeyboardArrowDownIcon />
                </IconButton>

                <Popover
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    style: {
                      maxHeight: filteredJobs.length > 5 ? "275px" : "auto", // set a max height for the menu if there are more than five jobs
                      overflow: "auto", // make the menu scrollable
                    },
                  }}
                >
                  <MenuItem>
                    <TextField
                      id="search-bar"
                      variant="outlined"
                      placeholder="Search jobs"
                      value={searchfield}
                      onChange={onSearchChange}
                    />
                  </MenuItem>
                  {console.log("filteredJobs", filteredJobs)}
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <MenuItem
                        key={job.id}
                        onClick={() => handleCloseMenu(job)}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {job.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No matching jobs</MenuItem>
                  )}
                </Popover>
              </Stack>
            </Box>

            <Button
              id="admin__step__8"
              variant="contained"
              color="secondary"
              sx={{
                mt: { xs: 2, lg: 0 },
                px: 8.75,
                lineHeight: "1.5",
                textTransform: "capitalize",
              }}
              endIcon={<AddIcon />}
              onClick={handleOpen}
            >
              add skill
            </Button>
          </Stack>

          <Stack
            className="displayData__section"
            my={5.5}
            sx={{ width: "100%" }}
          >
            {skillsDataLoading && <CircularProgress />}
            {!skillsDataLoading && (
              <>
                {sortedSkills.length < 1 ? (
                  <Typography variant="h3" color="primary" mb={3.125}>
                    No skills found
                  </Typography>
                ) : (
                  <Box className="tableContent__section">
                    <HeadersTableSkillProfile />
                    {sortedSkills.map((skill) => (
                      <TableRow
                        skill={skill}
                        handleSetTargetId={handleSetTargetId}
                        key={skill.id}
                        jobTitle={selectedJob?.title}
                      />
                    ))}
                  </Box>
                )}
              </>
            )}
          </Stack>
        </>
      )}
      <SkillProfileRecommendations
        jobProfileId={
          selectedJob?.id ? selectedJob?.id : selectedTitle?.job_profile_id
        }
      />
    </>
  );
};

export default SkillProfile;
