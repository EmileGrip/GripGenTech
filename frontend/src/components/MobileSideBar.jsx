import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo/Logo - Export/Adepti - Horizontal Logo 1.png";
import settingIcon from "../assets/setting-2.svg";
import infoIcon from "../assets/info-circle.svg";
import logoutIcon from "../assets/logout.svg";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/auth/authSlice";
import { setOpenMain, setOpenSub } from "../redux/slices/sideBarSlice";
import { ADMIN_SETTINGS_ROUTE } from "../routes/paths";

const mobileDefaultStyle = {
  width: "100%",
  position: "fixed",
  inset: "0",
  opacity: "0",
  px: "20px",
  zIndex: "999",
  transform: "translateX(-100%)",
};

const MobileSideBar = ({ sidebarData, onOpen, currentStyle }) => {
  const { openMain, openSub } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setOpenMain("main__0"));
    dispatch(setOpenSub("sub__0"));
    localStorage.removeItem("activeBtn");
  };

  const mainMenuHandler = (e) => {
    dispatch(setOpenMain(e.currentTarget.id));
    dispatch(setOpenSub("sub__0"));
    onOpen(false);
  };

  const subMenuHandler = (e) => {
    const newIndex = e.currentTarget.dataset.index;
    dispatch(setOpenSub(newIndex));
    onOpen(false);
  };

  const checkMainActive = (index) => openMain === `main__${index}`;
  const checkSubActive = (index) => openSub === `sub__${index}`;

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];
  const currentPage = parts[4];

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
        transition: "0.5s ",
        backgroundColor: "#FcFcFc",
        ...mobileDefaultStyle,
        ...currentStyle,
      }}
    >
      <IconButton
        title="Close sidebar"
        sx={{
          position: "absolute",
          left: { xs: "30px", md: "25px" },
          top: "29px",
        }}
        onClick={() => onOpen(false)}
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>

      <Stack spacing={4.5} pb={3.25} sx={{ pr: { xs: 0, md: "10px" } }}>
        <img
          style={{ alignSelf: "center" }}
          width={150}
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
                <Box
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
                  sx={{ position: "relative", mb: 2 }}
                >
                  <Link to={category.catergoryPath}>
                    <ListItemButton
                      id={`main__${index}`}
                      onClick={(e) => mainMenuHandler(e)}
                      sx={{
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
                      <ListItemIcon>
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
                              id={
                                category.categoryName === "Organization" &&
                                index === 0
                                  ? "admin__step__2"
                                  : category.categoryName === "Organization" &&
                                    index === 1
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
                  title={category.categoryName}
                  onClick={(e) => mainMenuHandler(e)}
                  key={category.categoryName}
                  to={category.catergoryPath}
                >
                  <ListItemButton
                    sx={{
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
                    <ListItemIcon>
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

                    <ListItemText primary={category.categoryName} />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </Box>
      </Stack>

      <Stack>
        <List
          sx={{
            width: "100%",
            mt: "20px !important",
          }}
          component="nav"
          aria-labelledby="nested-list"
        >
          {currentFlow === "admin" && (
            <ListItemButton
              onClick={handleSettingsPage}
              sx={{
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
              <ListItemIcon>
                <img src={settingIcon} alt="icon" />
              </ListItemIcon>

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
            </ListItemButton>
          )}

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
                  color: "inactive.main",
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

export default MobileSideBar;
