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
import { setSelectedJob } from "../../../redux/slices/admin/skillProfile/skillProfileSlice";
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
  // const [selectedJob, setSelectedJob] = useState(null);
  const [searchfield, setSearchfield] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(fetchJobProfiles(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token && selectedJob && selectedJob.id) {
      dispatch(fetchSkillProfile(selectedJob.id));
    }
  }, [token, selectedJob, dispatch]);

  useEffect(() => {
    if (jobProfile.length > 0) {
      if (!selectedTitle) {
        setFilteredJobs(
          jobProfile.filter((job) => {
            return job.title.toLowerCase().includes(searchfield.toLowerCase());
          })
        );
      } else {
        setFilteredJobs(
          jobProfile.filter((job) => {
            return job.title.toLowerCase().includes(selectedTitle);
          })
        );
      }

      if (!selectedJob || Object.keys(selectedJob).length === 0) {
        dispatch(setSelectedJob(filteredJobs[0]));
      }
    }
  }, [jobProfile, searchfield, selectedJob]);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    setAnchorEl(null);
    dispatch(setSelectedJob(option === null || option === "" ? null : option));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sortedSkills = skillProfile
    .slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

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
          <Stack
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              alignItems: { xs: "flex-start", lg: "center" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="h2"
                  color={"primary.main"}
                  fontSize={{ xs: "24px" }}
                  textTransform="capitalize"
                >
                  {selectedJob?.title}
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
      <SkillProfileRecommendations jobProfileId={selectedJob?.id} />
    </>
  );
};

export default SkillProfile;
