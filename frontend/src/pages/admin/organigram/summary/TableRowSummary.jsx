import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moreHoriz__icon from "../../../../assets/moreHoriz__icon.svg";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ADMIN_SKILL_PROFILE } from "../../../../routes/paths.js";
import { deleteUser } from "../../../../redux/slices/admin/users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTitle } from "../../../../redux/slices/admin/skillProfile/skillProfileSlice";
import { useEffect } from "react";
import { fetchJobProfiles } from "../../../../redux/slices/admin/jobProfile/jobProfileSlice";
import { setOpenMain, setOpenSub } from "../../../../redux/slices/sideBarSlice";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  py: "10px",
  textTransform: "capitalize",
};

const stackStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
};

const typographyStyle = {
  textTransform: "capitalize",
  fontSize: "12px",
  color: "#353C44",
};

const typographyStyle2 = {
  fontSize: "12px",
  color: "#788894",
  textTransform: "capitalize",
};

const TableRowSummary = ({ employee }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [isRowOpen, setIsRowOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchJobProfiles(token));
    }
  }, [token, dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

  const handleDeleteUser = () => {
    dispatch(deleteUser(employee.id));
    setAnchorEl(null);
  };

  const handleGoToSkillProfile = () => {
    // Check if the employee's role is available
    if (!employee?.role) {
      return;
    }

    dispatch(setOpenMain("main__2"));
    dispatch(setOpenSub("sub__0"));
    dispatch(setSelectedTitle(employee?.role?.title));
  };

  return (
    <>
      {lgMatches ? (
        <Box>
          <Stack
            sx={{
              flexDirection: { xs: "row" },
            }}
            className="tableContent__section"
          >
            <Stack sx={{ justifyContent: "center" }}>
              <IconButton
                sx={{ alignSelf: "center", mr: 2 }}
                onClick={handleClick}
              >
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

                  <IconButton onClick={handleDeleteUser}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Stack>
              </Popover>
            </Stack>

            <Grid
              container
              spacing={1}
              columns={40}
              alignItems="center"
              sx={{
                flex: 1,
                minHeight: "72px",
              }}
            >
              <Grid xs={7} sx={gridStyles}>
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar
                    src={employee?.profile_picture?.url}
                    alt={employee?.profile_picture?.name}
                    sx={{ width: "30px", height: "30px" }}
                  />
                  <Typography
                    sx={{
                      color: "#788894",
                      fontSize: "16px",
                      fontWeight: 400,
                      mr: 1.75,
                      pl: 2,
                    }}
                    variant="h5"
                  >
                    {`${employee.first_name} ${employee.last_name}`}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={11} sx={{ ...gridStyles, textTransform: "initial" }}>
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    mr: 1.75,
                    pl: 2,
                  }}
                  variant="h5"
                >
                  {employee.email}
                </Typography>
              </Grid>

              <Grid xs={7} sx={gridStyles}>
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    mr: 1.75,
                    pl: 2,
                  }}
                  variant="h5"
                >
                  {employee.phone}
                </Typography>
              </Grid>

              <Grid xs={5} sx={gridStyles}>
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    mr: 1.75,
                    pl: 2,
                  }}
                  variant="h5"
                >
                  {employee?.role?.title}
                </Typography>
              </Grid>

              <Grid xs={5} sx={gridStyles}>
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    mr: 1.75,
                    pl: 2,
                  }}
                  variant="h5"
                >
                  {employee?.role?.department}
                </Typography>
              </Grid>

              <Grid xs={5} sx={gridStyles}>
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    mr: 1.75,
                    pl: 2,
                  }}
                  variant="h5"
                >
                  <Link
                    to={employee?.role ? ADMIN_SKILL_PROFILE : "/"}
                    onClick={handleGoToSkillProfile}
                    style={{
                      color: employee?.role ? "#66c1ff" : "#788894",
                      textDecoration: employee?.role ? "1px underline" : "none",
                      pointerEvents: employee?.role ? "auto" : "none",
                    }}
                  >
                    Go to Skill Profile
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <Divider variant="middle" />
        </Box>
      ) : (
        <Box
          sx={{
            px: "26px",
            pb: "14px",
            ...(isRowOpen && {
              background: "#FAFAFA",
              border: "2px solid #EEEEEE",
              borderRadius: "10px",
              mb: isRowOpen && 1,
            }),
          }}
        >
          <Stack
            sx={{
              flexDirection: { xs: "row" },
              flex: 1,
              minHeight: "72px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="tableContent__section"
          >
            <Box>
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar
                  src={employee?.profile_picture?.url}
                  alt={employee?.profile_picture?.name}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    pl: 2,
                    textTransform: "capitalize",
                  }}
                  variant="h5"
                >
                  {`${employee.first_name} ${employee.last_name}`}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: "#788894",
                  fontSize: "12px",
                  fontWeight: 400,
                  pl: "46px",
                  textTransform: "capitalize",
                }}
                variant="h5"
              >
                {employee?.role?.title}
              </Typography>
            </Box>

            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsRowOpen(!isRowOpen)}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Stack>

          {!isRowOpen && <Divider />}

          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <Grid container spacing={1} columns={12} sx={{ pl: "46px", py: 2 }}>
              <Grid xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Email:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ ...typographyStyle2, textTransform: "initial" }}
                  >
                    {employee.email}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Phone:
                  </Typography>
                  <Typography variant="body1" sx={typographyStyle2}>
                    {employee.phone}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Job Title:
                  </Typography>
                  <Typography variant="body1" sx={typographyStyle2}>
                    {employee?.role?.title}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Department:
                  </Typography>
                  <Typography variant="body1" sx={typographyStyle2}>
                    {employee?.role?.department}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Typography
              sx={{
                color: "#788894",
                fontSize: "12px",
                fontWeight: 400,
                pt: 1,
                pl: "46px",
              }}
              variant="h5"
            >
              <Link
                to={employee?.role ? ADMIN_SKILL_PROFILE : "/"}
                onClick={handleGoToSkillProfile}
                style={{
                  color: employee?.role ? "#66c1ff" : "#788894",
                  textDecoration: employee?.role ? "1px underline" : "none",
                  pointerEvents: employee?.role ? "auto" : "none",
                }}
              >
                Go to Skill Profile
              </Link>
            </Typography>
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default TableRowSummary;
