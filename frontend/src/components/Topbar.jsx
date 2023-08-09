import {
  Avatar,
  Badge,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import bellIcon from "../assets/bell.svg";
import messageIcon from "../assets/message.svg";
import userImg from "../assets/avatar blue 1.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import avatarImg from "../assets/employee_0.jpg";
import menuIcon from "../assets/menu.svg";
import EditIcon from "@mui/icons-material/Edit";
import search from "../assets/search.svg";
import toolbar_right from "../assets/toolbar_right.svg";
import download_icon from "../assets/download_icon.svg";
import mailto_icon from "../assets/mailto_icon.svg";
import share_icon from "../assets/share_icon.svg";
import print_icon from "../assets/print_icon.svg";
import share_icon_2 from "../assets/share_icon_2.svg";
import signs_icon from "../assets/signs_icon.svg";
import arrowCounter from "../assets/arrowCounterClockwise_icon.svg";
import arrowClock from "../assets/arrowClockwise_icon.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../redux/slices/admin/users/usersActions";
import { useNavigate } from "react-router-dom";
import { setOpenMain, setOpenSub } from "../redux/slices/sideBarSlice";

const stylesButtons = {
  border: "1px solid #e9e9e9",
  borderRadius: "50%",
  p: 2,
  mr: { xs: 2, lg: 3 },
  width: {
    xs: "39px",
    lg: "52px",
  },
  height: {
    xs: "39px",
    lg: "52px",
  },
};

const optionsWrapperStyle = {
  background: "#FAFAFA",
  border: "2px solid #EEEEEE",
  borderRadius: "10px",
  py: "18px",
  px: "13px",
};

const Topbar = ({ title, onMenu }) => {
  const isOrganigram = false;
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [showOptions, setShowOptions] = useState(false);
  const { token, userInfo } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditInformation = () => {
    navigate("/employee/skills/myskills");
    dispatch(setOpenMain("main__0"));
    dispatch(setOpenSub("sub__0"));
    handleMenuClose();
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(userInfo.id));
    }
  }, [token, dispatch]);

  return (
    <Stack
      className="topbar"
      pb={2.5}
      justifyContent="space-between"
      sx={{
        borderBottom: "2px solid #e9e9e9 ",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { lg: "center" },
      }}
    >
      {/* Main header laptop */}
      {lgMatches && (
        <Stack spacing={2}>
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontSize: "32px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
          <Breadcrumbs />
        </Stack>
      )}

      {/* menu laptop */}
      <Stack
        className="menuBar"
        alignItems={"center"}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: { xs: "space-between" },
          mb: "10px",
          flexWrap: !lgMatches && isOrganigram ? "wrap" : "nowrap",
        }}
      >
        {!lgMatches && (
          <Box
            sx={{
              width: !lgMatches && isOrganigram ? "100%" : "auto",
              mb: !lgMatches && isOrganigram ? 2 : 0,
            }}
          >
            <IconButton onClick={() => onMenu(true)}>
              <img src={menuIcon} alt="menu icon" />
            </IconButton>
          </Box>
        )}

        {/* Default Right side menu bar laptop */}
        {!isOrganigram && (
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            {/* <IconButton sx={stylesButtons}>
              <Badge color="alert" overlap="circular" variant="dot">
                <img src={messageIcon} alt="icon" />
              </Badge>
            </IconButton>
            <IconButton sx={stylesButtons}>
              <Badge color="alert" overlap="circular" variant="dot">
                <img src={bellIcon} alt="icon" />
              </Badge>
            </IconButton> */}

            {/* {lgMatches ? (
              <Stack
                onClick={handleMenuOpen}
                flexDirection={"row"}
                alignItems={"center"}
                sx={{
                  padding: "8px",
                  pr: 3,
                  border: "1px solid #E9E9E9",
                  borderRadius: "30px",
                  // cursor: "pointer",
                }}
              >
                <Avatar
                  src={user?.profile_picture?.url}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  sx={{ mr: 2.25, width: "39px", height: "39px" }}
                />
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Typography
                    color={"primary.main"}
                    sx={{ textTransform: "capitalize", mr: 3 }}
                  >
                    {`${user?.first_name} ${user?.last_name}`}
                  </Typography>
                )}
                <IconButton onClick={handleMenuOpen}>
                  <ExpandMoreIcon
                    sx={{ color: "primary", cursor: "pointer" }}
                  />
                </IconButton>
              </Stack>
            ) : (
              <IconButton>
                <Avatar
                  src={user?.profile_picture?.url}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  sx={{ width: "39px", height: "39px" }}
                />
              </IconButton>
            )} */}

            <Stack
              onClick={handleMenuOpen}
              flexDirection={"row"}
              alignItems={"center"}
              sx={{
                padding: "8px",
                pr: 3,
                border: "1px solid #E9E9E9",
                borderRadius: "30px",
                // cursor: "pointer",
              }}
            >
              <Avatar
                src={user?.profile_picture?.url}
                alt={`${user?.first_name} ${user?.last_name}`}
                sx={{ mr: 2.25, width: "39px", height: "39px" }}
              />
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <Typography
                  color={"primary.main"}
                  sx={{ textTransform: "capitalize", mr: 3 }}
                >
                  {`${user?.first_name} ${user?.last_name}`}
                </Typography>
              )}
              <IconButton onClick={handleMenuOpen}>
                <ExpandMoreIcon sx={{ color: "primary", cursor: "pointer" }} />
              </IconButton>
            </Stack>
          </Stack>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
              width: "200px",
            },
          }}
        >
          <MenuItem onClick={handleEditInformation}>
            <EditIcon sx={{ marginRight: 1, width: "20px", height: "20px" }} />
            <Typography>Profile</Typography>
          </MenuItem>
        </Menu>

        {/* Organigram Right side menu bar laptop*/}
        {/* {isOrganigram && (
          <Stack
            className="first__row"
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: { lg: "space-between" },
              gap: "20px",
            }}
          >
            <TextField
              name="search_organigram"
              fullWidth
              size="small"
              type="search"
              variant="outlined"
              sx={{
                maxWidth: "270px",
                "> *": {
                  border: "1px solid #808080",
                },
              }}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={search} alt="search icon" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "capitalize",
                fontSize: "14px",
                px: "65px",
                alignSelf: { xs: "flex-start", lg: "auto" },
              }}
            >
              finish
            </Button>
          </Stack>
        )} */}
      </Stack>

      {/* Topbar organigram mobile */}
      {/* {!lgMatches && isOrganigram && (
        <Stack
          className="organigram__toolbar_mobile"
          sx={(showOptions && optionsWrapperStyle) || {}}
        >
          <Stack
            className="first__row"
            sx={{
              flexDirection: { xs: "row" },
              justifyContent: { xs: "space-between" },
              alignItems: { xs: "center" },
              mb: "22px",
            }}
          >
            <TextField
              name="search_organigram"
              fullWidth
              size="small"
              type="search"
              variant="outlined"
              sx={{
                maxWidth: "270px",
                "> *": {
                  border: "1px solid #808080",
                },
              }}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={search} alt="search icon" />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton onClick={() => setShowOptions((prev) => !prev)}>
              <img src={toolbar_right} alt="icon" />
            </IconButton>
          </Stack>

          {showOptions && (
            <Stack
              className="second__row"
              sx={{ flexDirection: { xs: "row" }, mb: "17px" }}
            >
              <Stack gap="16px" mr={2} sx={{ flexDirection: { xs: "row" } }}>
                <IconButton>
                  <img
                    style={{ cursor: "pointer" }}
                    src={download_icon}
                    alt="download icon"
                  />
                </IconButton>
                <IconButton>
                  <img
                    style={{ cursor: "pointer" }}
                    src={mailto_icon}
                    alt="mailto icon"
                  />
                </IconButton>
              </Stack>
              <Divider sx={{ mr: 2 }} orientation="vertical" flexItem />
              <Stack gap="16px" mr={2} sx={{ flexDirection: { xs: "row" } }}>
                <IconButton>
                  <img
                    style={{ cursor: "pointer" }}
                    src={share_icon}
                    alt="share icon"
                  />
                </IconButton>
                <IconButton>
                  <img
                    style={{ cursor: "pointer" }}
                    src={print_icon}
                    alt="print icon"
                  />
                </IconButton>
              </Stack>
              <Divider sx={{ mr: 2 }} orientation="vertical" flexItem />
              <Stack gap="16px" mr={2} sx={{ flexDirection: { xs: "row" } }}>
                <IconButton>
                  <img
                    style={{ cursor: "pointer" }}
                    src={share_icon_2}
                    alt="share icon"
                  />
                </IconButton>
                <IconButton>
                  <img
                    style={{ cursor: "pointer" }}
                    src={signs_icon}
                    alt="signs icon"
                  />
                </IconButton>
              </Stack>
            </Stack>
          )}

          {showOptions && (
            <Stack
              className="third__row"
              sx={{
                flexDirection: { xs: "row" },
                justifyContent: { xs: "space-between" },
              }}
            >
              <Stack sx={{ flexDirection: { xs: "row" }, gap: "16px" }}>
                <IconButton>
                  <img src={arrowCounter} alt="icon" />
                </IconButton>
                <IconButton>
                  <img src={arrowClock} alt="icon" />
                </IconButton>
              </Stack>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  px: "65px",
                }}
              >
                finish
              </Button>
            </Stack>
          )}
        </Stack>
        

      )} */}

      {/* Main header mobile */}
      {!lgMatches && (
        <Typography
          variant="h1"
          sx={{
            color: "primary.main",
            fontSize: "32px",
            fontWeight: "600",
            textTransform: "capitalize",
            mt: { xs: 3, sm: 5 },
          }}
        >
          {title}
        </Typography>
      )}
    </Stack>
  );
};

export default Topbar;
