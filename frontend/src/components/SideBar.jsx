import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/Logo - Export/Adepti - Horizontal Logo 1.png";
import settingIcon from "../assets/setting-2.svg";
import infoIcon from "../assets/info-circle.svg";
import logoutIcon from "../assets/logout.svg";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/auth/authSlice";
import { setOpenMain, setOpenSub } from "../redux/slices/sideBarSlice";

const mobileDefaultStyle = {
  width: "100%",
  position: "fixed",
  inset: "0",
  opacity: "0",
  px: 4,
  zIndex: "999",
  transform: "translateX(-100%)",
};

const laptopDefaultStyle = {
  width: "300px",
  opacity: "1",
  visibility: "visible",
};

const SideBar = ({ sidebarData, onOpen, currentStyle }) => {
  const { openMain, openSub } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setOpenMain("main__0"));
    dispatch(setOpenSub("sub__0"));
  };

  const mainMenuHandler = (e) => {
    dispatch(setOpenMain(e.currentTarget.id));
    dispatch(setOpenSub("sub__0"));
    if (!lgMatches) {
      onOpen(false);
    }
  };

  const subMenuHandler = (e) => {
    const newIndex = e.currentTarget.dataset.index;
    dispatch(setOpenSub(newIndex));
    if (!lgMatches) {
      onOpen(false);
    }
  };

  const checkMainActive = (index) => openMain === `main__${index}`;
  const checkSubActive = (index) => openSub === `sub__${index}`;

  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mediaDefaultStyle = lgMatches ? laptopDefaultStyle : mobileDefaultStyle;

  useEffect(() => {
    localStorage.setItem("openMain", openMain);
    localStorage.setItem("openSub", openSub);
  }, [openMain, openSub]);

  return (
    <Box
      className="sidebar"
      sx={{
        paddingTop: "37px",
        height: "100vh",
        position: { lg: "sticky" },
        top: { lg: "0" },
        // alignSelf: "flex-start",
        transition: "0.5s ",
        backgroundColor: "#FcFcFc",
        ...mediaDefaultStyle,
        ...currentStyle,
      }}
    >
      {/* <Box
        className="wrapper"
        sx={{ position: { lg: "sticky" }, top: { lg: "37px" } }}
      > */}
      <IconButton
        sx={{
          position: "absolute",
          left: { xs: "30px", md: "25px", lg: "0px" },
          top: { xs: "40px" },
        }}
        onClick={() => onOpen(false)}
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <Stack
        height={"100%"}
        spacing={4.5}
        pb={3.25}
        sx={{ pr: { xs: 0, md: 3.25 } }}
      >
        <img
          style={{ alignSelf: "center" }}
          width={171}
          height={47}
          src={logo}
          alt="logo"
        />
        <Box>
          <List
            component="nav"
            aria-labelledby="nested-list"
            sx={{ width: "100%" }}
          >
            {sidebarData.map((category, index) => {
              return category.subCategory.length > 0 ? (
                <Box key={category.categoryName}>
                  <Link to={category.catergoryPath}>
                    <ListItemButton
                      id={`main__${index}`}
                      onClick={(e) => mainMenuHandler(e)}
                      sx={{
                        color: checkMainActive(index)
                          ? "secondary.main"
                          : "inactive.main",
                        backgroundColor: checkMainActive(index)
                          ? "#B4F4D2"
                          : "",
                        "& *": {
                          fontWeight: checkMainActive(index)
                            ? "600 !important"
                            : "",
                        },
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={
                            checkMainActive(index)
                              ? category.iconsPath.active
                              : category.iconsPath.inactive
                          }
                          alt="icon"
                        />
                      </ListItemIcon>
                      <ListItemText primary={category.categoryName} />
                    </ListItemButton>
                  </Link>
                  <Collapse
                    in={checkMainActive(index)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {category.subCategory.map((sub, index) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          data-index={`sub__${index}`}
                          onClick={(e) => subMenuHandler(e)}
                        >
                          <ListItemButton
                            sx={{
                              pl: 9,
                            }}
                            disableRipple
                          >
                            <ListItemText
                              primary={sub.name}
                              sx={{
                                color: "secondary.main",
                                "> *": {
                                  fontWeight: checkSubActive(index)
                                    ? "600 !important"
                                    : "",
                                },
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                <Link
                  id={`main__${index}`}
                  onClick={(e) => mainMenuHandler(e)}
                  key={category.categoryName}
                  to={category.catergoryPath}
                >
                  <ListItemButton
                    sx={{
                      color: checkMainActive(index)
                        ? "secondary.main"
                        : "inactive.main",
                      backgroundColor: checkMainActive(index) ? "#B4F4D2" : "",
                      "& *": {
                        fontWeight: checkMainActive(index)
                          ? "600 !important"
                          : "",
                      },
                      borderRadius: "5px",
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src={
                          checkMainActive(index)
                            ? category.iconsPath.active
                            : category.iconsPath.inactive
                        }
                        alt="icon"
                      />
                    </ListItemIcon>
                    <ListItemText primary={category.categoryName} />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </Box>

        <Box sx={{ marginTop: "auto !important" }}>
          <Divider />
          <List
            sx={{
              width: "100%",
              mt: "20px !important",
            }}
            component="nav"
            aria-labelledby="nested-list"
          >
            {/* <ListItemButton sx={{ marginBottom: "16px !important" }}>
              <ListItemIcon>
                <img src={settingIcon} alt="icon" />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{
                  color: "settings.main",
                  "> *": {
                    fontWeight: "500",
                  },
                }}
              />
            </ListItemButton> */}
            <a
              href={addHttpProtocol(
                "https://doc.clickup.com/9012006948/d/8cjgm14-952/for-admins"
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemButton sx={{ marginBottom: "16px !important" }}>
                <ListItemIcon>
                  <img src={infoIcon} alt="icon" />
                </ListItemIcon>
                <ListItemText
                  primary="Support"
                  sx={{
                    color: "settings.main",
                    "> *": {
                      fontWeight: "500",
                    },
                  }}
                />
              </ListItemButton>
            </a>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <img src={logoutIcon} alt="icon" />
              </ListItemIcon>
              <ListItemText
                primary="Log out"
                sx={{
                  color: "#FE7777",
                  "> *": {
                    fontWeight: "500",
                  },
                }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Stack>
      {/* </Box> */}
    </Box>
  );
};

const addHttpProtocol = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

export default SideBar;
