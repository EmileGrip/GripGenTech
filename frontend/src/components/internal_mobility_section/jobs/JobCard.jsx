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
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import progressBar from "../../../assets/horizontal_progress_bar.svg";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  ADMIN_JOB_DETAILS_ROUTE,
  ADMIN_PROJECT_DETAILS_ROUTE,
  EMPLOYEE_JOB_DETAILS_ROUTE,
  EMPLOYEE_PROJECT_DETAILS_ROUTE,
  MANAGER_JOB_DETAILS_ROUTE,
  MANAGER_PROJECT_DETAILS_ROUTE,
} from "../../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchJobs } from "../../../redux/slices/internalMobility/addJobFormSlice";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import {
  setOpenProjectSnack,
  setProjectResponse,
} from "../../../redux/slices/internalMobility/addProjectFormSlice";

const JobCard = ({
  data,
  projects,
  handleEditOpen,
  getClickedJobId,
  onSuccess,
}) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [showMore, setShowMore] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const jobDetailsLink =
    currentFlow === "employee"
      ? projects
        ? `${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${data.id}`
        : `${EMPLOYEE_JOB_DETAILS_ROUTE}/${data.id}`
      : currentFlow === "manager"
      ? projects
        ? `${MANAGER_PROJECT_DETAILS_ROUTE}/${data.id}`
        : `${MANAGER_JOB_DETAILS_ROUTE}/${data.id}`
      : currentFlow === "admin"
      ? projects
        ? `${ADMIN_PROJECT_DETAILS_ROUTE}/${data.id}`
        : `${ADMIN_JOB_DETAILS_ROUTE}/${data.id}`
      : "/"; // Default URL or handle other cases here

  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [desktopAnchorEl, setDesktopAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
    getClickedJobId(data.id);
  };
  const handleDesktopMenuOpen = (event) => {
    setDesktopAnchorEl(event.currentTarget);
    getClickedJobId(data.id);
  };
  const handleMenuClose = () => {
    setMobileAnchorEl(null);
    setDesktopAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteData = useCallback(
    async (token, id, api) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          id,
        },
      };

      try {
        // setLoading(true);
        const response = await axiosInstance.delete(api, config);
        console.log(response.data);
        if (projects) {
          dispatch(setOpenProjectSnack(true));
          dispatch(setProjectResponse(response.data));
        } else {
          onSuccess(response.data);
        }
      } catch (error) {
        if (projects) {
          dispatch(setOpenProjectSnack(true));
          dispatch(setProjectResponse(error?.response.data));
        } else {
          onSuccess(error?.response.data);
        }
        console.log(error?.response.data);
      } finally {
        // setLoading(false);
        if (api === "job_vacancy") {
          dispatch(fetchJobs());
        } else {
          dispatch(fetchProjects());
        }
      }
    },
    [token]
  );

  const handleDeleteJob = () => {
    if (projects) {
      deleteData(token, data.id, "project_vacancy");
    } else {
      deleteData(token, data.id, "job_vacancy");
    }
    setMobileAnchorEl(null);
    setDesktopAnchorEl(null);
    handleCloseDialog();
  };

  const description = projects ? data?.description : data?.role?.description;
  const formattedDescription = description !== null ? description : "";

  return (
    <>
      {currentFlow === "employee" ? (
        <Stack
          sx={{
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
            p: { xs: 2, md: 0 },
            py: { md: "30px" },
            px: { md: "20px" },
            background: "#FAFAFA",
            border: "2px solid #EEEEEE",
            borderRadius: "10px",
            height: "340px",
          }}
        >
          <Link
            to={jobDetailsLink}
            title={projects ? data?.name : data?.role?.title}
            style={{
              fontSize: "14px",
              textDecoration: "underline",
              textTransform: "capitalize",
              color: "#173433",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="h3">
              {projects ? data?.name : data?.role?.title}
            </Typography>
          </Link>

          <img src={progressBar} alt="Horizontal progress bar" />

          <Typography variant="body1" color="#788894">
            {data?.department}{" "}
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>.</span>{" "}
            Start date: {projects ? data?.start_date : data?.role?.start_date}{" "}
            {!projects && (
              <>
                <span style={{ fontSize: "20px", verticalAlign: "super" }}>
                  .
                </span>{" "}
                {data?.role?.hours ? data?.role?.hours : ""}{" "}
                <span style={{ fontSize: "20px", verticalAlign: "super" }}>
                  .
                </span>{" "}
                USD ${data?.role?.salary ? data?.role?.salary : ""}
              </>
            )}
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: { xs: "center", lg: "flex-start" },
              alignItems: "center",
              gap: "12px",
              width: { xs: "250px", sm: "500px" },
              maxWidth: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              p: 2,
            }}
          >
            {data?.role?.skills < 1 ? (
              <Typography color="primary" fontSize="16px">
                No skills found
              </Typography>
            ) : (
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  ml: { xs: "350px", sm: "100px", md: "260px", lg: "0px" },
                }}
              >
                {data?.role?.skills.map((skill) => (
                  <Box
                    key={skill?.title}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "12px",
                      background: "#0C1716",
                      borderRadius: "100px",
                      py: "4px",
                      px: "12px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      textTransform="none"
                      color="#FFFFFF"
                      fontWeight="500"
                    >
                      {skill?.title}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>

          <Box
            sx={{
              width: "100%",
              height: "63px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="body1"
              title={description}
              color="#788894"
              width="100%"
            >
              {description}
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box
          sx={{
            position: "relative",
            height: showMore ? "auto" : { xs: "247px", md: "228px" },
            p: "20px",
            background: "#FAFAFA",
            border: "2px solid #EEEEEE",
            borderRadius: "10px",
          }}
        >
          {!mdMatches && (
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{
                alignSelf: "center",
                p: 0,
                position: "absolute",
                top: "12px",
                right: "12px",
              }}
            >
              <img src={moreHoriz__icon} alt="More horizontal icon" />
            </IconButton>
          )}

          <Menu
            anchorEl={mobileAnchorEl}
            open={Boolean(mobileAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              style: {
                width: "120px",
              },
            }}
          >
            <MenuItem
              onClick={handleEditOpen}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#788894",
              }}
            >
              <Typography>Edit</Typography>
            </MenuItem>

            <MenuItem
              onClick={handleOpenDialog}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#788894",
              }}
            >
              <Typography>Delete</Typography>
            </MenuItem>
          </Menu>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {projects ? "Confirm Project Delete" : "Confirm Job Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Are you sure you want to delete this ${
                  projects ? "project" : "job"
                }?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} autoFocus>
                cancel
              </Button>
              <Button onClick={handleDeleteJob} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Stack
            sx={{
              flexDirection: { md: "row", justifyContent: "space-between" },
              alignItems: { md: "center" },
              gap: { xs: 1, md: 0 },
              mb: 1,
            }}
          >
            <Link
              to={jobDetailsLink}
              title={projects ? data?.name : data?.role?.title}
              style={{
                fontSize: "14px",
                textDecoration: "underline",
                textTransform: "capitalize",
                color: "#173433",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {projects ? data?.name : data?.role?.title}
              </Typography>
            </Link>

            {/* <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: "14px",
                color: "#707070",
                pr: "15px",
              }}
            >
              <Divider
                orientation="vertical"
                flexItem
                sx={{ width: "2px", ml: { md: "20px" } }}
              />

              <Typography variant="h3">5</Typography>

              <Typography variant="h5">Matches</Typography>
            </Stack> */}

            {mdMatches && (
              <IconButton
                onClick={handleDesktopMenuOpen}
                sx={{ alignSelf: "center", p: 0 }}
              >
                <img src={moreHoriz__icon} alt="More horizontal icon" />
              </IconButton>
            )}

            <Menu
              anchorEl={desktopAnchorEl}
              open={Boolean(desktopAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  width: "120px",
                },
              }}
            >
              <MenuItem
                onClick={handleEditOpen}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#788894",
                }}
              >
                <Typography>Edit</Typography>
              </MenuItem>

              <MenuItem
                onClick={handleOpenDialog}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#788894",
                }}
              >
                <Typography>Delete</Typography>
              </MenuItem>
            </Menu>
          </Stack>

          <Typography
            variant="h5"
            sx={{ color: "#788894", textTransform: "capitalize", mb: 1 }}
          >
            {`${data?.department ? ` ${data?.department} -` : ""} Start date: ${
              projects ? data?.start_date : data?.role?.start_date
            } ${data?.role?.hours ? `- ${data?.role?.hours}` : ""} ${
              data?.role?.salary ? `- USD $${data?.role?.salary}` : ""
            }`}
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <Box
                sx={{
                  width: { xs: "149px", md: "200px" },
                  height: showMore ? "auto" : "63px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#788894", width: "100%" }}
                >
                  {formattedDescription}
                </Typography>
              </Box>

              {formattedDescription?.length >= 87 && (
                <Button
                  disableRipple={true}
                  variant="text"
                  sx={{
                    color: "#66C1FF",
                    alignSelf: "flex-start",
                    textTransform: "capitalize",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    "&: hover": {
                      backgroundColor: "transparent",
                    },
                    fontSize: { xs: "12px", md: "16px" },
                    mt: { xs: -1 },
                  }}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "... show less" : "... show more"}
                </Button>
              )}
            </Stack>

            <Box
              sx={{
                width: "113px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  data.status === "declined"
                    ? "#B95144"
                    : data.status === "pending"
                    ? "#66C1FF"
                    : "#6AE6A4",
                borderRadius: "40px",
                textTransform: "capitalize",
                opacity: 0.2,
              }}
            >
              <Typography variant="h6">{data.status}</Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default JobCard;
