import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import person_icon from "../../../assets/person_icon.svg";
import group_icon from "../../../assets/group_icon.svg";
import hide_icon from "../../../assets/hide_icon.svg";
import { Handle, Position } from "reactflow";
import addIcon from "../../../assets/addIcon.svg";
import emptyRoleIcon from "../../../assets/emptyRole_icon.png";
import CustomModal from "../../../ui/CustomModal";
import AddRoleForm from "./AddRoleForm";
import { useState } from "react";
import { suggestedJobs as ModalSuggestedJobs } from "../../../data/chartTreeData";
import { employees as ModalEmployees } from "../../../data/chartTreeData";
import AssignRoleForm from "./AssignRoleForm";
import { employeeData as dialogData } from "../../../data/chartTreeData";
import InfoModal from "./InfoModal";
import { setDetectedPosition } from "../../../redux/slices/admin/organigram/organigramSlice";
import { useDispatch, useSelector } from "react-redux";
import EditRoleForm from "./EditRoleForm";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";
import { useEffect } from "react";

const Node = ({ data, isConnectable }) => {
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddRoleOpen = () => setIsAddRoleOpen(true);
  const handleAddRoleClose = () => setIsAddRoleOpen(false);

  const handleAssignRoleOpen = () => setIsAssignRoleOpen(true);
  const handleAssignRoleClose = () => setIsAssignRoleOpen(false);

  const handleInfoOpen = () => setIsInfoOpen(true);
  const handleInfoClose = () => setIsInfoOpen(false);

  const handleAddNode = (position) => {
    handleAddRoleOpen();
    dispatch(setDetectedPosition(position));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

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
      const response = await axiosInstance.delete("role", config);
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchData(token));
    }
  }, []);

  const handleDeleteData = () => {
    deleteData();
    setOpenDialog(false);
    setAnchorEl(null);
  };

  return (
    <>
      <CustomModal
        open={isAddRoleOpen}
        onClose={handleAddRoleClose}
        title="Add Role"
      >
        <AddRoleForm
          data={data}
          suggestedJobs={ModalSuggestedJobs}
          closeModal={handleAddRoleClose}
        />
      </CustomModal>
      <CustomModal
        open={isAssignRoleOpen}
        onClose={handleAssignRoleClose}
        title={data.user ? "Edit Position" : "Assign Role"}
      >
        <AssignRoleForm data={data} closeModal={handleAssignRoleClose} />
      </CustomModal>
      <CustomModal open={isInfoOpen} onClose={handleInfoClose} title=" ">
        <InfoModal
          data={data}
          editRoleData={data}
          closeModal={handleInfoClose}
        />
      </CustomModal>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Stack
        className="node "
        sx={{
          backgroundColor: "transparent",
          position: "relative",
          width: "212px",
        }}
      >
        <Button
          onClick={handleAssignRoleOpen}
          sx={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "100px",
            "&:hover": {
              background: "transparent",
            },
            zIndex: 1,
          }}
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              background: "#D9D9D9",
              p: !data?.user?.profile_picture ? "23px" : "0px",
            }}
            src={
              data?.user?.profile_picture
                ? data?.user?.profile_picture
                : emptyRoleIcon
            }
            alt={
              data?.user?.profile_picture
                ? "Profile picture"
                : "Empty role picture"
            }
          />
        </Button>

        <Box>
          <Stack
            className="contentBox"
            sx={{
              alignItems: "stretch",
              backgroundColor: "#fafafa",
              border: "1.5px solid #EAEAEA",
              borderRadius: "8px",
              pt: "68px",
              pb: 2,
              mt: "50px",
              position: "relative",
            }}
          >
            <Stack sx={{ position: "absolute", top: 1, right: 1 }}>
              <IconButton sx={{ alignSelf: "center" }} onClick={handleClick}>
                <img src={moreHoriz__icon} alt="icon" />
              </IconButton>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
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
                    Delete Role
                  </Typography>

                  <IconButton
                    onClick={handleOpenDialog}
                    disabled={data.user ? true : false}
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
                {`Confirm Role Delete`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure you want to delete this role?`}
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

            <IconButton
              onClick={handleInfoOpen}
              sx={{ borderRadius: 0 }}
              title={
                !data?.user
                  ? `empty name`
                  : data?.user.first_name + " " + data?.user.last_name
              }
            >
              <Typography
                variant="h4"
                fontWeight="700"
                color="primary"
                sx={{
                  textAlign: "center",
                  mb: 0.5,
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  px: 1,
                }}
              >
                {!data?.user
                  ? `empty name`
                  : data?.user.first_name + " " + data?.user.last_name}
              </Typography>
            </IconButton>

            <div
              title={
                !data.title ||
                data.title.trim().length === 0 ||
                data.title === "0"
                  ? `empty role`
                  : data.title
              }
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: "400",
                  opacity: "0.7",
                  textAlign: "center",
                  mb: 0.5,
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  px: 1,
                }}
              >
                {!data.title ||
                data.title.trim().length === 0 ||
                data.title === "0"
                  ? `empty role`
                  : data.title}
              </Typography>
            </div>

            <div
              title={
                !data?.department ||
                data?.department.trim().length === 0 ||
                data.title === "0"
                  ? `empty department`
                  : data?.department
              }
            >
              <Typography
                variant="h5"
                color="primary"
                sx={{
                  fontWeight: "400",
                  opacity: "0.7",
                  textAlign: "center",
                  mb: 0.5,
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  px: 1,
                }}
              >
                {!data?.department ||
                data?.department.trim().length === 0 ||
                data.title === "0"
                  ? `empty department`
                  : data?.department}
              </Typography>
            </div>
          </Stack>

          {!data.isSingleIcon && (
            <>
              <IconButton
                onClick={() => handleAddNode("left")}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "-42px",
                }}
              >
                <img src={addIcon} alt="add role" />
              </IconButton>

              <IconButton
                onClick={() => handleAddNode("right")}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-42px",
                }}
              >
                <img src={addIcon} alt="add role" />
              </IconButton>
            </>
          )}

          {!data.hasChildren && (
            <IconButton
              onClick={() => handleAddNode("bottom")}
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "-42px",
              }}
            >
              <img src={addIcon} alt="add role" />
            </IconButton>
          )}
        </Box>
      </Stack>

      <Handle
        type="source"
        position={Position.Bottom}
        id={data.id.toString()}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default Node;
