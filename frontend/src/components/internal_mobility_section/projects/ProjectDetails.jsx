import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import rightArrow from "../../../assets/arrow_right_icon.svg";
import editIcon from "../../../assets/edit_icon.svg";
import mailIcon from "../../../assets/mail_icon.svg";
import dateIcon from "../../../assets/date_icon.svg";
import menuIcon from "../../../assets/description_menu_icon.svg";
import {
  ADMIN_NEW_PROJECT_ROUTE,
  ADMIN_PROJECT_DETAILS_ROUTE,
  EMPLOYEE_NEW_PROJECT_ROUTE,
  EMPLOYEE_PROJECT_DETAILS_ROUTE,
  MANAGER_NEW_PROJECT_ROUTE,
  MANAGER_PROJECT_DETAILS_ROUTE,
  ROLES_REQUIRED_ROUTE,
} from "../../../routes/paths";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import EmployeeCard from "../jobs/EmployeeCard";
import AddProjectForm from "./AddProjectForm";

const boxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const ProjectDetails = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { id } = useParams();
  const { projects, projectsLoading } = useSelector(
    (state) => state.addProjectForm
  );
  const project = projects.filter((project) => project.id == id)[0];
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [onEdit, setOnEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const handleEditOpen = () => {
    setOnEdit(true);
  };
  const handleEditClose = () => {
    setOnEdit(false);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const editStatus = useCallback(
    async (value) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        // setLoading(true);
        const response = await axiosInstance.put(
          `project_vacancy`,
          {
            id,
            status: value === "approve" ? "approved" : "declined",
          },
          config
        );
        console.log(response.data);
        handleClickSnack(response.data);
      } catch (error) {
        handleClickSnack(error?.response.data);
        console.log(error?.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchProjects());
        handleCloseDialog();
        handleMenuClose();
      }
    },
    [token]
  );

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const initialJobsToDisplay = lgMatches ? 2 : 1;

  const goToRolePage = (roleId) => {
    navigate(
      currentFlow === "employee"
        ? `${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${id}${ROLES_REQUIRED_ROUTE}/${roleId}`
        : currentFlow === "manager"
        ? `${MANAGER_PROJECT_DETAILS_ROUTE}/${id}${ROLES_REQUIRED_ROUTE}/${roleId}`
        : currentFlow === "admin"
        ? `${ADMIN_PROJECT_DETAILS_ROUTE}/${id}${ROLES_REQUIRED_ROUTE}/${roleId}`
        : "/" // Default URL or handle other cases here
    );
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const [clickedMenuItem, setClickedMenuItem] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (value) => {
    setClickedMenuItem(value);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Snackbar handlers
  const [openSnack, setOpenSnack] = useState(false);
  const [response, setResponse] = useState(null);

  const handleClickSnack = (response) => {
    setResponse(response);
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={response?.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {response?.message}
        </Alert>
      </Snackbar>

      {onEdit ? (
        <AddProjectForm
          onEdit={onEdit}
          handleEditClose={handleEditClose}
          data={projects}
          id={project.id}
        />
      ) : (
        <>
          {projectsLoading && <CircularProgress />}
          {!projectsLoading && (
            <Stack sx={{ gap: 3 }}>
              {currentFlow === "manager" ? (
                <Stack
                  sx={{
                    flexDirection: { md: "row" },
                    justifyContent: "space-between",
                    alignItems: { md: "center" },
                    gap: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      variant="h2"
                      color="#173433"
                      textTransform="capitalize"
                    >
                      {project?.name}
                    </Typography>

                    {/* <IconButton onClick={handleEditOpen}>
                      <img src={editIcon} alt="Edit icon" />
                    </IconButton> */}
                  </Box>

                  <Box
                    sx={{
                      width: "114.455px",
                      height: "35px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#E5F3FC",
                      borderRadius: "40px",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography variant="h6" color="#788894">
                      {project?.status}
                    </Typography>
                  </Box>
                </Stack>
              ) : currentFlow === "employee" ? (
                <Stack
                  sx={{
                    flexDirection: { md: "row" },
                    justifyContent: "space-between",
                    alignItems: { md: "center" },
                    gap: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      variant="h2"
                      color="#173433"
                      textTransform="capitalize"
                    >
                      {project?.name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "114.455px",
                      height: "35px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#E5F3FC",
                      borderRadius: "40px",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography variant="h6" color="#788894">
                      {project?.status}
                    </Typography>
                  </Box>
                </Stack>
              ) : (
                <Stack
                  sx={{
                    flexDirection: { md: "row" },
                    alignItems: { md: "center" },
                    gap: 3,
                  }}
                >
                  <Typography
                    variant="h2"
                    color="#173433"
                    textTransform="capitalize"
                  >
                    {project?.name}
                  </Typography>

                  <Box
                    sx={{
                      width: "138px",
                      height: "35px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      background: "#E5F3FC",
                      borderRadius: "40px",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography variant="h6" color="#788894">
                      {project?.status}
                    </Typography>

                    <IconButton onClick={handleMenuOpen}>
                      <ExpandMoreIcon
                        sx={{
                          color: "primary",
                          cursor: "pointer",
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>
                  </Box>

                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
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
                        width: "155px",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => handleOpenDialog("approve")}
                      sx={{
                        fontSize: "16px",
                        color: "#788894",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Approve
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleOpenDialog("decline")}
                      sx={{
                        fontSize: "16px",
                        color: "#788894",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Decline
                    </MenuItem>
                  </Menu>

                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {`Confirm Project ${clickedMenuItem}`}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to ${clickedMenuItem} this project?`}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} autoFocus>
                        cancel
                      </Button>
                      <Button
                        onClick={() => editStatus(clickedMenuItem)}
                        color="error"
                      >
                        {clickedMenuItem}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              )}

              <Stack
                sx={{
                  background: "#FAFAFA",
                  border: "2px solid #EEEEEE",
                  borderRadius: "10px",
                  gap: "20px",
                  p: { xs: "12px", lg: "20px" },
                }}
              >
                <Typography variant="h3" color="#173433">
                  Details
                </Typography>

                <Grid container spacing="20px" columns={12}>
                  <Grid item xs={12} md={12}>
                    <Box sx={boxStyles}>
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={mailIcon}
                        alt="Mail icon"
                      />

                      <Typography
                        variant="body1"
                        color="#788894"
                        textTransform="capitalize"
                      >
                        {project?.department}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={boxStyles}>
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={dateIcon}
                        alt="Date icon"
                      />

                      <Typography
                        variant="body1"
                        color="#788894"
                        textTransform="capitalize"
                      >
                        Start Date: {project?.start_date}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={boxStyles}>
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={dateIcon}
                        alt="Date icon"
                      />

                      <Typography
                        variant="body1"
                        color="#788894"
                        textTransform="capitalize"
                      >
                        End Date: {project?.end_date}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>

              <Stack
                sx={{
                  background: "#FAFAFA",
                  border: "2px solid #EEEEEE",
                  borderRadius: "10px",
                  gap: "20px",
                  p: { xs: "12px", lg: "20px" },
                }}
              >
                <Typography variant="h3" color="#173433">
                  Description
                </Typography>

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <img src={menuIcon} alt="Description Menu icon" />

                  <Typography variant="body1" color="#788894" mt={1}>
                    Description:
                    <br />
                    {project?.description}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="h2" color="#173433">
                Roles required
              </Typography>

              <Grid2
                container
                rowSpacing={"28px"}
                columnSpacing={"20px"}
                columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}
              >
                {project?.roles?.length >= 1 &&
                  project?.roles?.map((role) => (
                    <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={role.id}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "#FAFAFA",
                          border: "2px solid #EEEEEE",
                          borderRadius: "10px",
                          height: "50px",
                          py: "12px",
                          px: "20px",
                        }}
                      >
                        <Typography
                          variant="h5"
                          color="darkGreen"
                          title={role?.title}
                          sx={{
                            fontSize: "18px",
                            textTransform: "capitalize",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "80%",
                          }}
                        >
                          {role?.title}
                        </Typography>

                        {/* <Link to={rolesRequiredLink}> */}
                        <IconButton onClick={() => goToRolePage(role.id)}>
                          <img src={rightArrow} alt="Right arrow" />
                        </IconButton>
                        {/* </Link> */}
                      </Stack>
                    </Grid2>
                  ))}
              </Grid2>

              {/* <Stack
                sx={{
                  background: "#FAFAFA",
                  border: "2px solid #EEEEEE",
                  borderRadius: "10px",
                  gap: "20px",
                  p: { xs: "12px", lg: "20px" },
                }}
              >
                <Typography variant="h3" color="#173433">
                  Matches -{" "}
                  <span style={{ fontWeight: 400 }}>
                    here are the possible matches for your job posted
                  </span>
                </Typography>

                <Grid2
                  container
                  rowSpacing={"28px"}
                  columnSpacing={"20px"}
                  columns={{ xs: 4, lg: 8 }}
                >
                  {showMore
                    ? recommendationsData?.vacancy_based?.map((job) => (
                        <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
                          <EmployeeCard data={job} />
                        </Grid2>
                      ))
                    : recommendationsData?.vacancy_based
                        ?.slice(0, initialJobsToDisplay)
                        .map((job) => (
                          <Grid2
                            xs={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                            key={job.id}
                          >
                            <EmployeeCard data={job} />
                          </Grid2>
                        ))}
                </Grid2>

                {recommendationsData?.vacancy_based?.length >
                  initialJobsToDisplay && (
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
                    {showMore ? "Show less..." : "Show more..."}
                  </Button>
                )}
              </Stack> */}
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default ProjectDetails;
