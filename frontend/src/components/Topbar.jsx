import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import productsTitles from "../data/productsTitles";
import SearchIcon from "@mui/icons-material/Search";
import employeeIcon from "../assets/employee_1.jpg";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import MobileDropDownMenu from "./menu/MobileDropDownMenu";
import categories from "../data/categories";
import MenuBtn from "./menu/MenuBtn";
import { ReactComponent as CategoryIcon } from "../assets/categories_icon.svg";
import settings from "../data/settings";
import { logout } from "../redux/authentication/authActions";
import { useNavigate } from "react-router-dom";
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from "../routes/paths";

const Topbar = () => {
  const navigate = useNavigate();
  const { isAuth, accessToken } = useSelector((state) => state.auth);
  const dipatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfo);

  const logoutHandler = () => {
    dipatch(logout(accessToken));
    navigate(SIGNIN_ROUTE);
  };

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <Box>
    <AppBar
      position="static"
      sx={{
        background: "transparent",
      }}
    >
      <Container fullwidth="xl">
        <Toolbar
          disableGutters
          sx={{
            gap: { xs: "6px", md: "0px" },
            justifyContent: { xs: "space-between", md: "flex-start" },
          }}
        >
          <Link
            className="menu__link"
            href="#"
            sx={{
              display: { xs: "none", md: "block" },
              mr: { md: "20px" },
              color: "primary.main",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HomeIcon sx={{ mr: "5px" }} />
              <Typography
                variant="body2"
                component="span"
                sx={{ textTransform: "capitalize" }}
              >
                {" "}
                Home
              </Typography>
            </Box>
          </Link>

          <Box
            className="search__bar"
            sx={{
              flex: 1,
              maxWidth: { xs: "230px", md: "280px", lg: "360px" },
              // mr: { md: "13px" },
            }}
          >
            <Autocomplete
              freeSolo
              fullWidth={true}
              id="search"
              sx={{ backgroundColor: "#d9d9d9" }}
              options={productsTitles.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={"Search"}
                  size={"small"}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon
                            sx={{
                              color: "secondary.main",
                              fontSize: isTablet ? "large" : "medium",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Stack
            className="mobile__view"
            sx={{ flexDirection: "row", display: { xs: "flex", md: "none" } }}
          >
            {isAuth ? (
              <>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: { xs: "6px" },
                    alignItems: "center",
                  }}
                >
                  <Avatar src={employeeIcon} alt="avatar icon" />
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize", color: "primary.main" }}
                  >
                    {`${userInfo?.firstName} ${userInfo?.lastName}`}
                  </Typography>
                </Stack>
                <MobileDropDownMenu />
              </>
            ) : (
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  color: "secondary.main",
                }}
              >
                <Link href={SIGNIN_ROUTE} variant="body2" color="inherit">
                  Login
                </Link>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  sx={{
                    borderRightWidth: "1px",
                    bgcolor: "secondary.main",
                    mx: "4px",
                  }}
                />
                <Link href={SIGNUP_ROUTE} variant="body2" color="inherit">
                  Sign up
                </Link>
              </Stack>
            )}
          </Stack>

          <Stack
            className="tablet__view"
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              ml: { md: "auto" },
              gap: { md: "12px" },
            }}
          >
            <Stack
              className="options__wrapper"
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: "25px" },
                color: "primary.main",
              }}
            >
              <MenuBtn items={categories} text={"categories"}>
                <CategoryIcon
                  fill={"currentColor"}
                  style={{ width: "22.433px", height: "19.45px" }}
                />
              </MenuBtn>

              <MenuBtn items={settings} text={"settings"} isSettings>
                <SettingsIcon color="inherit" />
              </MenuBtn>

              <Link
                className="menu__link"
                href="#"
                sx={{
                  display: { xs: "none", md: "block" },
                  mr: { md: "20px" },
                  color: "primary.main",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ShoppingCartIcon fontSize="small" sx={{ mr: "5px" }} />
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {" "}
                    cart
                  </Typography>
                </Box>
              </Link>
            </Stack>

            {isAuth ? (
              <>
                <Button onClick={handleClick}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      gap: { xs: "6px" },
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={employeeIcon} alt="avatar icon" />
                    <Typography
                      variant="body2"
                      sx={{
                        textTransform: "capitalize",
                        color: "primary.main",
                      }}
                    >
                      {`${userInfo?.firstName} ${userInfo?.lastName}`}
                    </Typography>
                  </Stack>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem
                    sx={{ color: "secondary.main" }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  color: "secondary.main",
                  ml: { md: "10px" },
                }}
              >
                <Link href={SIGNIN_ROUTE} variant="body2" color="inherit">
                  Login
                </Link>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{
                    borderRightWidth: "1px",
                    bgcolor: "secondary.main",
                    mx: "4px",
                  }}
                />
                <Link href={SIGNUP_ROUTE} variant="body2" color="inherit">
                  Sign up
                </Link>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
    // </Box>
  );
};

export default Topbar;
