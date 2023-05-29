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
import InitialContent from "./InitialContent";
import MockContent from "./MockContent";
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

      <Typography variant="h2" color={"primary.main"}>
        Your Career path
      </Typography>

      {/* <InitialContent /> */}
      <MockContent />
      <Box
        className="recommended__section"
        sx={{ borderTop: "2px solid #E9E9E9", pt: 2.375 }}
      >
        <Typography variant="h3" pb={2.375} color={"primary.main"}>
          Recommended For You
        </Typography>
        <Stack
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: "20px", lg: "36px" },
          }}
        >
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
