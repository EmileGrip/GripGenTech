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

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  py: "10px",
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

const typographyStyle2 = { fontSize: "12px", color: "#788894" };

const TableRowSummary = ({ employee }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [isRowOpen, setIsRowOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;
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

                  <IconButton>
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
                    src={employee.image}
                    alt={employee.employeeName}
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
                    {employee.employeeName}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={11} sx={gridStyles}>
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
                  {employee.jobTitle}
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
                  {employee.department}
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
                    to="/"
                    style={{
                      color: "#66c1ff",
                      textDecoration: "1px underline",
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
                  src={employee.image}
                  alt={employee.employeeName}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    pl: 2,
                  }}
                  variant="h5"
                >
                  {employee.employeeName}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: "#788894",
                  fontSize: "12px",
                  fontWeight: 400,
                  pl: "46px",
                }}
                variant="h5"
              >
                {employee.jobTitle}
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
                  <Typography variant="body1" sx={typographyStyle2}>
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
                    {employee.jobTitle}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Department:
                  </Typography>
                  <Typography variant="body1" sx={typographyStyle2}>
                    {employee.department}
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
                to="/"
                style={{ color: "#66c1ff", textDecoration: "1px underline" }}
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
