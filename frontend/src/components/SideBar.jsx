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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/Logo/Logo - Export/Adepti - Horizontal Logo 1.png";
import logo2 from "../assets/Logo/Logo - Export/logo.svg";
import settingIcon from "../assets/setting-2.svg";
import infoIcon from "../assets/info-circle.svg";
import logoutIcon from "../assets/logout.svg";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/auth/authSlice";
import { setOpenMain, setOpenSub } from "../redux/slices/sideBarSlice";
import {
  ADMIN_SETTINGS_ROUTE,
  AMDIN_EMPLOYEE_ROUTE,
  EMPLOYEE_PROFILE_PATH,
  MANAGER_EMPLOYEES_ROUTE,
} from "../routes/paths";

const laptopDefaultStyle = {
  width: "300px",
  opacity: "1",
  visibility: "visible",
};

const SideBar = ({ sidebarData, currentStyle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { openMain, openSub } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSideBarClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
    if (isHovered) {
      setIsHovered(false);
    }
  };

  const handleLogoHover = (isHovered) => {
    setIsHovered(isHovered);
  };

  const handleCategoryHover = (index) => {
    setHoveredCategory(index);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setOpenMain("main__0"));
    dispatch(setOpenSub("sub__0"));
    localStorage.removeItem("activeBtn");
  };

  const mainMenuHandler = (e) => {
    dispatch(setOpenMain(e.currentTarget.id));
    dispatch(setOpenSub("sub__0"));
  };

  const subMenuHandler = (e) => {
    const newIndex = e.currentTarget.dataset.index;
    dispatch(setOpenSub(newIndex));
  };

  const checkMainActive = (index) => openMain === `main__${index}`;
  const checkSubActive = (index) => openSub === `sub__${index}`;

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];
  const currentPage = parts[4];

  const handleHomePage = () => {
    dispatch(setOpenMain("main__0"));
    dispatch(setOpenSub("sub__0"));
    if (currentFlow === "admin") {
      navigate(AMDIN_EMPLOYEE_ROUTE);
    } else if (currentFlow === "manager") {
      navigate(MANAGER_EMPLOYEES_ROUTE);
    } else {
      navigate(EMPLOYEE_PROFILE_PATH);
    }
  };

  const handleSettingsPage = () => {
    navigate(ADMIN_SETTINGS_ROUTE);
  };

  useEffect(() => {
    if (currentPage === "settings") {
      dispatch(setOpenMain(null));
      dispatch(setOpenSub(null));
    } else {
      localStorage.setItem("openMain", openMain);
      localStorage.setItem("openSub", openSub);
    }
  }, [currentPage, dispatch, openMain, openSub]);

  return (
    <Box
      className="sidebar"
      sx={{
        paddingTop: 4,
        height: "100%",
        position: "sticky",
        top: "0",
        transition: "0.5s ",

        backgroundColor: "background.newMain",

        ...laptopDefaultStyle,
        ...currentStyle,
        width: isSideBarOpen ? "260px" : "66px",
        // justifyContent: "center",
        borderRight: "1px solid #EEE",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        height: " 100vh",
      }}
    >
      {isSideBarOpen && (
        <IconButton
          title="Close sidebar"
          sx={{
            position: "absolute",
            right: { xs: "30px", md: "25px", lg: "0px" },
            top: { xs: "29px" },
          }}
          onClick={() => handleSideBarClick(false)}
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      )}

      <Stack
        className="categroies__wrapper"
        spacing={4.5}
        pb={3.25}
        sx={{ px: { xs: 0 } }}
      >
        {isSideBarOpen ? (
          <IconButton
            onClick={handleHomePage}
            sx={{
              width: 150,
              p: 0,
              ml: 2,
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <img
              style={{ alignSelf: "center" }}
              width={150}
              src={logo1}
              alt="logo"
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleSideBarClick(true)}
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
            sx={{
              width: 36,
              p: 0,
              margin: "auto",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Box
              title="Open sidebar"
              style={{
                width: "36px",
                height: "44px",
                alignSelf: "center",
                backgroundImage: isHovered ? "none" : `url(${logo2})`,
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              {isHovered && (
                <KeyboardDoubleArrowRightIcon
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </Box>
          </IconButton>
        )}

        <Box>
          <List
            className="nav__categroies"
            component="nav"
            aria-labelledby="nested-list"
            sx={{ width: "100%", px: { lg: 2 } }}
          >
            {sidebarData.map((category, index) => {
              return category.subCategory.length > 0 ? (
                <Box
                  className="main__category"
                  id={
                    category.categoryName === "Organization" &&
                    currentFlow === "admin"
                      ? "admin__step__1"
                      : category.categoryName === "Internal Mobility" &&
                        currentFlow === "admin"
                      ? "admin__step__9"
                      : category.categoryName === "Internal Mobility" &&
                        currentFlow === "manager"
                      ? "manager__step__2"
                      : category.categoryName === "Skills" &&
                        currentFlow === "employee"
                      ? "employee__step__2"
                      : category.categoryName === "Internal Mobility" &&
                        currentFlow === "employee"
                      ? "employee__step__6"
                      : `${category.categoryName}`
                  }
                  title={category.categoryName}
                  key={category.categoryName}
                  onMouseEnter={() => handleCategoryHover(index)}
                  onMouseLeave={() => handleCategoryLeave()}
                  sx={{ position: "relative", mb: 2 }}
                >
                  <Link
                    style={{ display: "flex", justifyContent: "center" }}
                    to={category.catergoryPath}
                  >
                    <ListItemButton
                      id={`main__${index}`}
                      onClick={(e) => mainMenuHandler(e)}
                      sx={{
                        justifyContent: "center",
                        color: checkMainActive(index)
                          ? "secondary.main"
                          : "inactive.main",
                        backgroundColor: checkMainActive(index)
                          ? "#E1FAED"
                          : "",
                        "& *": {
                          fontWeight: checkMainActive(index)
                            ? "600 !important"
                            : "",
                        },
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemIcon
                        sx={{ minWidth: isSideBarOpen ? "56px" : "auto " }}
                      >
                        <img
                          src={
                            checkMainActive(index)
                              ? category.iconsPath.active
                              : category.iconsPath.inactive
                          }
                          alt="icon"
                          style={{ width: "22px", height: "22px" }}
                        />
                      </ListItemIcon>

                      {isSideBarOpen && (
                        <ListItemText primary={category.categoryName} />
                      )}
                    </ListItemButton>
                  </Link>

                  {hoveredCategory === index && (
                    <Collapse
                      // in={true}
                      in={hoveredCategory === index}
                      timeout="auto"
                      unmountOnExit
                      sx={{
                        position: "absolute",
                        top: 0,
                        // left: "90%",
                        left: "100%",
                        // right: 0,
                        width: "200px",
                        background: "white",
                        border: "1px solid #EEE",
                        borderRadius: "8px",
                      }}
                    >
                      <List component="div" disablePadding>
                        {category.subCategory.map((sub, subIndex) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            data-index={`sub__${subIndex}`}
                            onClick={(e) => subMenuHandler(e)}
                          >
                            <ListItemButton
                              sx={{ textAlign: "center" }}
                              disableRipple
                            >
                              <ListItemText
                                id={
                                  category.categoryName === "Organization" &&
                                  index === 0
                                    ? "admin__step__2"
                                    : category.categoryName ===
                                        "Organization" && index === 1
                                    ? "admin__step__3"
                                    : category.categoryName ===
                                        "Internal Mobility" &&
                                      index === 0 &&
                                      currentFlow === "admin"
                                    ? "admin__step__10"
                                    : category.categoryName === "Skills" &&
                                      index === 1
                                    ? "employee__step__5"
                                    : category.categoryName ===
                                        "Internal Mobility" &&
                                      index === 1 &&
                                      currentFlow === "manager"
                                    ? "manager__step__4"
                                    : category.categoryName ===
                                        "Internal Mobility" &&
                                      index === 0 &&
                                      currentFlow === "employee"
                                    ? "employee__step__7"
                                    : category.categoryName ===
                                        "Internal Mobility" &&
                                      index === 1 &&
                                      currentFlow === "employee"
                                    ? "employee__step__8"
                                    : `${sub.name}`
                                }
                                primary={sub.name}
                                sx={{
                                  textAlign: "left",
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
                  )}
                </Box>
              ) : (
                <Link
                  id={`main__${index}`}
                  title={category.categoryName}
                  onClick={(e) => mainMenuHandler(e)}
                  key={category.categoryName}
                  to={category.catergoryPath}
                >
                  <ListItemButton
                    sx={{
                      justifyContent: "center",
                      color: checkMainActive(index)
                        ? "secondary.main"
                        : "inactive.main",
                      backgroundColor: checkMainActive(index) ? "#E1FAED" : "",
                      "& *": {
                        fontWeight: checkMainActive(index)
                          ? "600 !important"
                          : "",
                      },
                      borderRadius: "5px",
                      mb: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{ minWidth: isSideBarOpen ? "56px" : "auto " }}
                    >
                      <img
                        src={
                          checkMainActive(index)
                            ? category.iconsPath.active
                            : category.iconsPath.inactive
                        }
                        alt="icon"
                        style={{ width: "22px", height: "22px" }}
                      />
                    </ListItemIcon>

                    {isSideBarOpen && (
                      <ListItemText primary={category.categoryName} />
                    )}
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </Box>
      </Stack>

      <Stack sx={{ marginTop: "auto" }}>
        {isSideBarOpen && <Divider />}

        <List
          sx={{
            px: { lg: 2 },
            width: "100%",
            mt: "10px !important",
          }}
          component="nav"
          aria-labelledby="nested-list"
        >
          {currentFlow === "admin" && (
            <ListItemButton
              onClick={handleSettingsPage}
              sx={{
                justifyContent: "center",
                color:
                  currentPage === "settings"
                    ? "secondary.main"
                    : "inactive.main",
                backgroundColor: currentPage === "settings" ? "#E1FAED" : "",
                "& *": {
                  fontWeight:
                    currentPage === "settings" ? "600 !important" : "",
                },
                borderRadius: "5px",
                mb: "16px !important",
              }}
            >
              <ListItemIcon sx={{ minWidth: isSideBarOpen ? "56px" : "auto" }}>
                <img src={settingIcon} alt="icon" />
              </ListItemIcon>

              {isSideBarOpen && (
                <ListItemText
                  primary="Settings"
                  sx={{
                    color:
                      currentPage === "settings"
                        ? "secondary.main"
                        : "inactive.main",
                    "> *": {
                      fontWeight:
                        currentPage === "settings" ? "600 !important" : "500",
                    },
                  }}
                />
              )}
            </ListItemButton>
          )}

          <a
            href={addHttpProtocol(
              "https://doc.clickup.com/9012006948/d/8cjgm14-952/for-admins"
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemButton
              sx={{ justifyContent: "center", marginBottom: "8px !important" }}
            >
              <ListItemIcon sx={{ minWidth: isSideBarOpen ? "56px" : "auto" }}>
                <img src={infoIcon} alt="icon" />
              </ListItemIcon>

              {isSideBarOpen && (
                <ListItemText
                  primary="Support"
                  sx={{
                    color: "inactive.main",
                    "> *": {
                      fontWeight: "500",
                    },
                  }}
                />
              )}
            </ListItemButton>
          </a>

          <ListItemButton
            sx={{ justifyContent: "center" }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ minWidth: isSideBarOpen ? "56px" : "auto" }}>
              <img src={logoutIcon} alt="icon" />
            </ListItemIcon>

            {isSideBarOpen && (
              <ListItemText
                primary="Log out"
                sx={{
                  color: "#FE7777",
                  "> *": {
                    fontWeight: "500",
                  },
                }}
              />
            )}
          </ListItemButton>
        </List>
      </Stack>
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
