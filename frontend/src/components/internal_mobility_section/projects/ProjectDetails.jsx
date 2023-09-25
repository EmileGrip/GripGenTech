import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
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
import { Link, useParams } from "react-router-dom";
import { jobs } from "../../../data/jobsData";
import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const boxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const ProjectDetails = () => {
  const { id } = useParams();
  const job = jobs.filter((job) => job.id == id)[0];
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const newProjectLink =
    currentFlow === "employee"
      ? EMPLOYEE_NEW_PROJECT_ROUTE
      : currentFlow === "manager"
      ? MANAGER_NEW_PROJECT_ROUTE
      : currentFlow === "admin"
      ? ADMIN_NEW_PROJECT_ROUTE
      : "/"; // Default URL or handle other cases here

  const rolesRequiredLink =
    currentFlow === "employee"
      ? `${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${id}${ROLES_REQUIRED_ROUTE}`
      : currentFlow === "manager"
      ? `${MANAGER_PROJECT_DETAILS_ROUTE}/${id}${ROLES_REQUIRED_ROUTE}`
      : currentFlow === "admin"
      ? `${ADMIN_PROJECT_DETAILS_ROUTE}/${id}${ROLES_REQUIRED_ROUTE}`
      : "/"; // Default URL or handle other cases here

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
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
            <Typography variant="h2" color="#173433" textTransform="capitalize">
              Insurance Website and App
            </Typography>

            <Link to={newProjectLink}>
              <IconButton>
                <img src={editIcon} alt="Edit icon" />
              </IconButton>
            </Link>
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
              pending
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
          <Typography variant="h2" color="#173433" textTransform="capitalize">
            Insurance Website and App
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
              pending
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
              onClick={handleMenuClose}
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
              onClick={handleMenuClose}
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
                {job.title}
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
                Start Date: {job.startDate}
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
                End Date: {job.startDate}
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
            {job.description}
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
        {jobs.length >= 1 &&
          jobs.map((job) => (
            <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={job.id}>
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
                  title={job.title}
                  sx={{
                    fontSize: "18px",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "80%",
                  }}
                >
                  {job.title}
                </Typography>

                <Link to={rolesRequiredLink}>
                  <IconButton>
                    <img src={rightArrow} alt="Right arrow" />
                  </IconButton>
                </Link>
              </Stack>
            </Grid2>
          ))}
      </Grid2>
    </Stack>
  );
};

export default ProjectDetails;
