import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { recommendedData as data } from "../../../data/recommendedData";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { EMPLOYEE_DEVELOPMENT_ROUTE } from "../../../routes/paths";
import JobChip from "./JobChip";
import RecommendChip from "./RecommendChip";
import DashLine from "../../../ui/DashLine";
import addIcon from "../../../assets/addIcon.svg";
import useLocationChange from "../../../hooks/useLocationChange";
import CustomModal from "../../../ui/CustomModal";
import AddJobForm from "./AddJobForm";
import { suggestedJobs } from "../../../data/skillsData";
const DevelopmentPage = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Job">
        <AddJobForm data={suggestedJobs} />
      </CustomModal>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        mb={11.625}
        className="header__section"
      >
        <Typography variant="h3" mb={3} color={"primary.main"}>
          Your Career path
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            alignSelf: "flex-start",
            textTransform: "capitalize",
            mt: 1,
            fontSize: "14px",
          }}
          endIcon={<AddIcon />}
          onClick={handleOpen}
        >
          add job
        </Button>
      </Stack>
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
        <Link to={EMPLOYEE_DEVELOPMENT_ROUTE}>
          <Stack>
            <img style={{ alignSelf: "center" }} src={addIcon} alt="logo" />
            <Typography color="#66C1FF">Add Job</Typography>
          </Stack>
        </Link>
      </Stack>
      <Box
        className="recommended__section"
        sx={{ borderTop: "2px solid #E9E9E9", pt: 2.375 }}
      >
        <Typography variant="h3" pb={2.375} color={"primary.main"}>
          Recommended For You
        </Typography>
        <Stack flexDirection="row" gap="36px">
          {data.map((item) => (
            <RecommendChip
              key={item.title}
              title={item.title}
              match={item.matchStrength}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default DevelopmentPage;
