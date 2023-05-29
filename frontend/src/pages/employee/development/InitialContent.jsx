import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import JobChip from "./JobChip";
import DashLine from "../../../ui/DashLine";
import { Link } from "react-router-dom";
import addIcon from "../../../assets/addIcon.svg";
import { EMPLOYEE_DEVELOPMENT_ROUTE } from "../../../routes/paths";
import CustomModal from "../../../ui/CustomModal";
import AddJobForm from "./AddJobForm";
import { suggestedJobs } from "../../../data/skillsData";

const InitialContent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Job">
        <AddJobForm data={suggestedJobs} />
      </CustomModal>
      <Stack className="role__section" flexDirection={"row"} mb={14}>
        <Typography color="#808080" variant="body1">
          Current Role
        </Typography>
      </Stack>

      <Stack
        className="job__section"
        flexDirection="row"
        alignItems="center"
        mb={29}
      >
        <JobChip marginRight={{ marginRight: "22px" }}>
          Customer Specialist
        </JobChip>
        <DashLine />
        <Button onClick={handleOpen}>
          <Stack>
            <img style={{ alignSelf: "center" }} src={addIcon} alt="logo" />
            <Typography
              color="#66C1FF"
              variant="span"
              sx={{ textTransform: "capitalize" }}
            >
              Add Job
            </Typography>
          </Stack>
        </Button>
      </Stack>
    </>
  );
};

export default InitialContent;
