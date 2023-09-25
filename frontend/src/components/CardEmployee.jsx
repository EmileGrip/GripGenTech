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
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../helper/axiosInstance";
import { deleteUser } from "../redux/slices/admin/users/usersActions";
import moreHoriz__icon from "../assets/moreHoriz__icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const CardEmployee = ({ onOpen, data }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleDeleteUser = () => {
    dispatch(deleteUser(data.id));
    setAnchorEl(null);
  };

  const style = {
    py: "22px",
    background: "#FAFAFA",
    border: " 1.5px solid #EAEAEA",
    borderRadius: "8px",
    height: "100%",
    textAlign: "center",
    position: "relative",
  };

  return (
    <Stack alignItems={"center"} sx={style}>
      <Stack
        sx={{
          justifyContent: "center",
          position: "absolute",
          top: "0px",
          right: "0px",
        }}
      >
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
              Delete Employee
            </Typography>

            <IconButton onClick={handleOpenDialog} sx={{ color: "#FE7777" }}>
              <DeleteOutlinedIcon fontSize="small" />
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
          {`Confirm Employee Delete`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete this employee?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Avatar
        src={data?.profile_picture?.url}
        alt={data?.profile_picture?.name}
        sx={{
          width: "93px",
          height: "93px",
          mb: "14px",
          border: "9px solid #E1FAED",
        }}
      />
      <Box
        sx={{ width: "100%" }}
        title={data.first_name + " " + data.last_name}
      >
        <Typography
          variant="h3"
          mb={0.5}
          color="primary"
          sx={{
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            px: 1,
          }}
        >
          {data.first_name + " " + data.last_name}
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }} title={data?.role?.title}>
        <Typography
          variant="body1"
          mb={3.5}
          color="primary"
          sx={{
            opacity: "0.7",
            textAlign: "center",
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            px: 1,
          }}
        >
          {data?.role?.title ? data.role.title : "No Title"}
        </Typography>
      </Box>
      <Box sx={{ px: "20px", width: "100%" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onOpen(data)}
          sx={{
            textTransform: "capitalize",
            // px: "10px",
            width: "100%",
            py: "8px",
            fontSize: "14px",
            mt: "auto",
          }}
        >
          View Profile
        </Button>
      </Box>
    </Stack>
  );
};

export default CardEmployee;
