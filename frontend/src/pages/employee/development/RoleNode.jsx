import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Handle, Position } from "reactflow";
import CustomModal from "../../../ui/CustomModal";
import RoleNodeOverview from "./RoleNodeOverview";
import { useState } from "react";
import { suggestedJobs } from "../../../data/skillsData";
import AddJobForm from "./AddJobForm";
import addIcon from "../../../assets/addIcon.svg";

const RoleNode = ({ data, isConnectable }) => {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddJobOpen = () => setIsAddJobOpen(true);
  const handleAddJobClose = () => setIsAddJobOpen(false);

  return (
    <Box sx={{ position: "relative" }}>
      <CustomModal open={open} onClose={handleClose} title=" ">
        <RoleNodeOverview data={data} />
      </CustomModal>
      <CustomModal
        open={isAddJobOpen}
        onClose={handleAddJobClose}
        title="Add Job"
      >
        <AddJobForm data={suggestedJobs} />
      </CustomModal>

      <Handle
        type="target"
        position={!lgMatches ? Position.Top : Position.Left}
        isConnectable={isConnectable}
      />
      <Box
        onClick={handleOpen}
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "103px", lg: "auto" },
          height: { lg: "40px" },
          borderRadius: "10px",
          fontSize: !lgMatches ? "12px" : "18px",
          fontWeight: "500",
          py: { xs: "12px", lg: "8px" },
          px: { xs: 1, lg: 2.5 },
          color: "#353C44",
          backgroundColor: "#E5F3FC",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        {data.label}
      </Box>
      <Handle
        type="source"
        position={!lgMatches ? Position.Bottom : Position.Right}
        isConnectable={isConnectable}
      />

      <Box sx={{ position: "absolute", right: "-182px", top: "0px" }}>
        <Button onClick={handleAddJobOpen}>
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
      </Box>
    </Box>
  );
};

export default RoleNode;
