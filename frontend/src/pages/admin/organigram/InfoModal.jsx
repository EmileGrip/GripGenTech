import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
import editaIcon from "../../../assets/edit_icon.svg";
import CustomModal from "../../../ui/CustomModal";
import EditRoleForm from "./EditRoleForm";
import { suggestedJobs as ModalSuggestedJobs } from "../../../data/chartTreeData";
import {
  ADMIN_EMPLOYEES_PROFILE,
  EMPLOYEE_EMPLOYEES_PROFILE,
  MANAGER_EMPLOYEES_PROFILE,
} from "../../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import thumbnail from "../../../assets/employee_1.jpg";
import moment from "moment";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";
import { useEffect } from "react";

const propertyStyle = {
  fontSize: { xs: "16px", sm: "20px" },
  fontWeight: "600",
  mb: { xs: 1, md: 2 },
};

const stackStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const typographyStyle = {
  textTransform: "capitalize",
  flex: 1,
  fontSize: { xs: "12px", sm: "16px" },
};

const buttonStyle = {
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: "600",
  width: "226px",
  height: "35px",
  borderRadius: "4px",
};

const InfoModal = ({ data, editRoleData, closeModal, hideOptions = false }) => {
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const { token, userInfo } = useSelector((state) => state.auth);
  const formattedDate = moment(data?.user?.created_at).format("DD MMM YYYY");
  const info = {
    leader: data?.user?.first_name
      ? `${data?.user?.first_name} ${data?.user?.last_name}`
      : "",
    joined: data?.user?.created_at ? formattedDate : "",
    id: data?.user?.id ? data?.user?.id : "",
  };
  const contact = {
    email: data?.user?.email ? data?.user?.email : "",
    phone: data?.user?.phone ? data?.user?.phone : "",
    location: data?.user?.location ? data?.user?.location : "",
  };
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleEditRoleOpen = () => setIsEditRoleOpen(true);
  const handleEditRoleClose = () => setIsEditRoleOpen(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const resetData = useCallback(async () => {
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
      const response = await axiosInstance.put(
        "role",
        {
          reset: "user",
        },
        config
      );
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchData(token));
      closeModal();
    }
  }, []);

  const handleResetData = () => {
    resetData();
    setOpenDialog(false);
  };

  const profileLink =
    userInfo.system_role === "employee" && data.user
      ? `${EMPLOYEE_EMPLOYEES_PROFILE}/${data.user.id}`
      : userInfo.system_role === "manager" && data.user
      ? `${MANAGER_EMPLOYEES_PROFILE}/${data.user.id}`
      : userInfo.system_role === "admin" && data.user
      ? `${ADMIN_EMPLOYEES_PROFILE}/${data.user.id}`
      : "/"; // Default URL or handle other cases here

  return (
    <>
      {!hideOptions && (
        <>
          <CustomModal
            open={isEditRoleOpen}
            onClose={handleEditRoleClose}
            title="Edit Role"
          >
            <EditRoleForm
              data={ModalSuggestedJobs}
              editRoleData={editRoleData}
              closeModal={closeModal}
            />
          </CustomModal>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Confirm Employee Reset`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Are you sure you want to reset this employee?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} autoFocus>
                cancel
              </Button>
              <Button onClick={handleResetData} color="error">
                Reset
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      <Stack
        className="info__modal"
        sx={{
          mt: { xs: "-40px" },
          px: { xs: "44px", sm: "95px", lg: "0px" },
        }}
      >
        <Stack>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center" },
              gap: { xs: "12px", sm: "45px" },
              mb: { xs: "20px" },
            }}
          >
            <Avatar
              src={data?.user?.profile_picture}
              alt="Profile picture"
              sx={{
                width: { xs: "121px", sm: "217px" },
                height: { xs: "122px", sm: "218px" },
                filter:
                  "drop-shadow(0px 62px 25px rgba(0, 0, 0, 0.01)) drop-shadow(0px 35px 21px rgba(0, 0, 0, 0.05)) drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.09)) drop-shadow(0px 4px 9px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1))",
              }}
            />

            {data.user ? (
              <Box
                sx={{ textAlign: { xs: "center", sm: "left" }, width: "60%" }}
                title={info.leader}
              >
                <Typography
                  variant="h3"
                  sx={{
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#1E394C",
                    fontSize: { xs: "18px", sm: "30px" },
                    fontWeight: 400,
                  }}
                >
                  {info.leader}
                </Typography>
                <Stack
                  sx={{
                    flexDirection: { xs: "row", sm: "column" },
                    justifyContent: "flex-start",
                    alignItems: { xs: "center", sm: "flex-start" },
                    gap: "15px",
                  }}
                  title={data?.title}
                >
                  <Typography
                    sx={{
                      color: "#1E394C",
                      fontSize: { xs: "13px", sm: "20px" },
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {data?.title && data?.title !== "0"
                      ? data?.title
                      : "No Title"}
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      opacity: 0.5,
                      fontSize: { xs: "12px", sm: "20px" },
                    }}
                  >
                    {data?.user?.gender}
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Typography variant="h3" color="primary">
                No user found
              </Typography>
            )}
          </Stack>

          <Box sx={{ flex: "1" }}>
            <Stack
              sx={{
                flexDirection: { md: "row" },
                justifyContent: { xs: "center", md: "space-between" },
              }}
            >
              <Box
                className="info__section"
                sx={{ flex: "1", mb: { xs: 3, md: 6 } }}
              >
                <Typography variant="h4" color={"secondary"} sx={propertyStyle}>
                  Info
                </Typography>

                {Object.keys(info).map((property, index) => (
                  <Stack key={index} sx={stackStyle}>
                    <Typography
                      variant="h5"
                      color={"secondary"}
                      sx={typographyStyle}
                    >
                      {property}
                    </Typography>
                    <Typography
                      variant="body1"
                      color={"secondary"}
                      sx={{ flex: 2 }}
                    >
                      {info[property]}
                    </Typography>
                  </Stack>
                ))}
              </Box>

              <Box
                className="contact__section"
                sx={{ flex: "1", mb: { xs: 3, md: 6 } }}
              >
                <Typography variant="h4" color={"secondary"} sx={propertyStyle}>
                  Contact
                </Typography>

                {Object.keys(contact).map((property, index) => (
                  <Stack key={index} sx={stackStyle}>
                    <Typography
                      variant="h5"
                      color={"secondary"}
                      sx={typographyStyle}
                    >
                      {property}
                    </Typography>
                    <Typography
                      variant="body1"
                      color={"secondary"}
                      sx={{ flex: 2 }}
                    >
                      {contact[property]}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Stack
          sx={{
            flexDirection: { sm: "row" },
            alignItems: { xs: "center" },
            gap: { xs: "18px", sm: "13px" },
            flexWrap: "wrap",
          }}
        >
          <Button
            href={profileLink}
            variant="contained"
            color="secondary"
            sx={buttonStyle}
            disabled={!data?.user ? true : false}
          >
            See Full Bio
          </Button>
          {!hideOptions && (
            <>
              <Button
                onClick={handleEditRoleOpen}
                variant="text"
                sx={{
                  ...buttonStyle,
                  border: "1px solid #1E394C",
                  color: "#1E394C",
                }}
                endIcon={<img src={editaIcon} alt="edit icon" />}
              >
                Edit Role
              </Button>
              <Button
                onClick={handleOpenDialog}
                variant="text"
                sx={{
                  ...buttonStyle,
                  border: "1px solid #1E394C",
                  color: "#1E394C",
                  width: "113px",
                }}
              >
                Reset
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default InfoModal;
