import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback } from "react";
import { Handle, Position } from "reactflow";
import CustomModal from "../../../ui/CustomModal";
import RoleNodeOverview from "./RoleNodeOverview";
import { useState } from "react";
import AddJobForm from "./AddJobForm";
import addIcon from "../../../assets/addIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchCareerPathData } from "../../../redux/slices/Employee/development/developmentActions";
import { setMessage } from "../../../redux/slices/Employee/development/developmentSlice";

const RoleNode = ({ data, isConnectable, isProfile, onSuccess }) => {
  const theme = useTheme();
  const xsMatches = useMediaQuery(theme.breakpoints.up("xs"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { data: careerPathData } = useSelector((state) => state.development);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddJobOpen = () => setIsAddJobOpen(true);
  const handleAddJobClose = () => setIsAddJobOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = !!anchorEl;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id: data.id,
      },
    };
    try {
      const response = await axiosInstance.delete("career_path", config);
      console.log(response.data.payload);
      dispatch(setMessage(response.data.message));
      setTimeout(() => {
        onSuccess(true);
      }, 1000);
    } catch (error) {
      console.log(error.response.data);
      // onSuccess(false);
    } finally {
      // setLoading(false);
      dispatch(fetchCareerPathData(token));
    }
  }, [token, onSuccess]);

  const handleAddData = () => {
    setAnchorEl(null);
    setIsAddJobOpen(false);
  };

  const handleDeleteData = () => {
    deleteData();
    setOpenDialog(false);
    setAnchorEl(null);
  };

  const isSingleNode = careerPathData?.jobs.length === 1;

  return (
    <Box sx={{ position: "relative" }}>
      <CustomModal open={open} onClose={handleClose} title=" ">
        <RoleNodeOverview jobId={data.id} />
      </CustomModal>
      <CustomModal
        open={isAddJobOpen}
        onClose={handleAddJobClose}
        title="Add Job"
      >
        <AddJobForm
          data={data}
          closeModal={handleAddData}
          onSuccess={onSuccess}
        />
      </CustomModal>

      <Handle
        type="target"
        position={!lgMatches ? Position.Top : Position.Left}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "250px",
          height: { lg: "40px" },
          borderRadius: "10px",
          fontSize: !lgMatches ? "12px" : "18px",
          fontWeight: "500",
          py: { xs: "12px", lg: "8px" },
          px: { xs: 1, lg: 2.5 },
          color: "#353C44",
          backgroundColor: "#E1FAED",
          cursor: "pointer",
          textAlign: "center",
        }}
        title={data.title}
      >
        <Typography
          onClick={handleOpen}
          sx={{
            mx: { xs: 5, lg: 3 },
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            px: 1,
          }}
        >
          {data.title}
        </Typography>

        {!isProfile && (
          <>
            <Stack sx={{ position: "absolute", top: 1, right: 1 }}>
              <IconButton sx={{ alignSelf: "center" }} onClick={handleClick}>
                <img src={moreHoriz__icon} alt="icon" />
              </IconButton>

              <Popover
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <Typography variant="h6" color="primary.main">
                    Add Job
                  </Typography>

                  <IconButton onClick={handleAddJobOpen}>
                    <AddIcon color="success" />
                  </IconButton>
                </Stack>
                <Divider variant="middle" />
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <Typography variant="h6" color="primary.main">
                    Delete Job
                  </Typography>

                  <IconButton
                    onClick={handleOpenDialog}
                    disabled={isSingleNode || data?.hasChildren ? true : false}
                  >
                    <DeleteOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#FE7777" }}
                    />
                  </IconButton>
                </Stack>
              </Popover>
            </Stack>

            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Confirm Job Delete`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure you want to delete this job?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} autoFocus>
                  cancel
                </Button>
                <Button onClick={handleDeleteData} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
      <Handle
        type="source"
        position={!lgMatches ? Position.Bottom : Position.Right}
        isConnectable={isConnectable}
      />
      {/* {!data.hasChildren && careerPathData?.jobs?.length <= 3 && (
        <Box
          sx={{
            position: "absolute",
            right: { xs: "50%", lg: "-182px" },
            top: { xs: "100px", lg: "50%" },
            transform: {
              xs: "translateX(50%)",
              lg: "translateX(0) translateY(-50%)",
            },
          }}
        >
          <Button onClick={handleAddJobOpen}>
            <Stack>
              <img style={{ alignSelf: "center" }} src={addIcon} alt="logo" />
              <Typography
                color="#66C1FF"
                variant="span"
                sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
              >
                Add Job
              </Typography>
            </Stack>
          </Button>
        </Box>
      )} */}
    </Box>
  );
};

export default RoleNode;
