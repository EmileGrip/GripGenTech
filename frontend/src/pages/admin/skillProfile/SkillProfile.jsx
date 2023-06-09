import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import { suggestedSkills as ModalSuggestedSkills } from "../../../data/skillProfileData";
import HeadersTableSkillProfile from "./HeadersTableSkillProfile";
import CustomModal from "../../../ui/CustomModal";
import AddSkillForm from "./AddSkillForm";
import { skillsTable as tableData } from "../../../data/skillProfileData";
import TableRow from "./TableRow";

const SkillProfile = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const jobs = tableData.map((data) => data.jobTitle);
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const skills = tableData
    .filter((data) => data.jobTitle === selectedJob)
    .map((data) => data.skills);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (option) => {
    setAnchorEl(null);
    setSelectedJob(option);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillForm data={ModalSuggestedSkills} />
      </CustomModal>
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
            >
              {selectedJob}
            </Typography>
            <IconButton id="demo-button" onClick={handleClick}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {jobs.map((job) => (
                <MenuItem key={job} onClick={() => handleCloseMenu(job)}>
                  {job}
                </MenuItem>
              ))}
            </Menu>
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
      <Stack className="displayData__section" mt={5.5} sx={{ width: "100%" }}>
        <HeadersTableSkillProfile />
        {skills[0].map((skill, index) => (
          <TableRow
            skill={skill}
            key={skill.skillName}
            jobTitle={selectedJob}
          />
        ))}
      </Stack>
    </>
  );
};

export default SkillProfile;
