import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../assets/logo.png";
import expIcon_active from "../assets/briefcase_active.svg";
import expIcon_unactive from "../assets/briefcase_inactive.svg";
import userIcon from "../assets/usertag_active.svg";
import styles from "./SideBarEmployee.module.css";
import skillsIcon from "../assets/skills_active.svg";
import skillsIcon_2 from "../assets/skills_inactive.svg";
import settingIcon from "../assets/setting-2.svg";
import infoIcon from "../assets/info-circle.svg";
import logoutIcon from "../assets/logout.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EMPLOYEE_MY_SKILLS_ROUTE } from "../routes/paths";
import { EMPLOYEE_DEVELOPMENT_ROUTE } from "../routes/paths";

const SideBarEmployee = () => {
  const [openSkills, setOpenSkills] = useState(true);
  const [openExp, setOpenExp] = useState(false);
  const [openOrg, setOpenOrg] = useState(false);
  const [activeMySkills, setActiveMySkills] = useState(true);
  const [activeDev, setActiveDev] = useState(false);
  const handleClickSkills = () => {
    setOpenSkills(true);
    setOpenExp(false);
    setOpenOrg(false);
  };
  const handlerClickExp = () => {
    setOpenExp(true);
    setOpenSkills(false);
    setOpenOrg(false);
    setActiveMySkills(false);
    setActiveDev(false);
  };
  const handlerClickOrg = () => {
    setOpenOrg(true);
    setOpenSkills(false);
    setOpenExp(false);
    setActiveMySkills(false);
    setActiveDev(false);
  };
  const handlerMySkills = () => {
    setActiveMySkills(true);
    setActiveDev(false);
  };
  const handlerDev = () => {
    setActiveMySkills(false);
    setActiveDev(true);
  };
  const mainCategoryStyle = (state) => {
    return {
      color: state ? "secondary.main" : "inactive.main",
      backgroundColor: state ? "#e5f3fc" : "",
      "> *": {
        fontWeight: state ? "600 !important" : "",
      },
    };
  };

  return (
    <Box className={styles.sideBar}>
      <Stack height={"100%"} spacing={4.5} px={3.25}>
        <img width={171} height={47} src={logo} alt="logo" />
        {/* Skills List */}
        <Box>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
            }}
            component="nav"
            aria-labelledby="nested-list"
            onClick={handleClickSkills}
          >
            <ListItemButton
              sx={{
                backgroundColor: openSkills ? "#e5f3fc" : "",
              }}
            >
              <ListItemIcon>
                {openSkills && <img src={skillsIcon} alt="icon" />}
                {!openSkills && <img src={skillsIcon_2} alt="icon" />}
              </ListItemIcon>
              <ListItemText
                primary="Skills"
                sx={{
                  color: openSkills ? "secondary.main" : "inactive.main",
                  backgroundColor: openSkills ? "#e5f3fc" : "",
                  "> *": {
                    fontWeight: openSkills ? "600 !important" : "",
                  },
                }}
              />
            </ListItemButton>
          </List>

          <Collapse in={openSkills} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link onClick={handlerMySkills} to={EMPLOYEE_MY_SKILLS_ROUTE}>
                <ListItemButton
                  sx={{
                    pl: 9,
                  }}
                  disableRipple
                >
                  <ListItemText
                    primary={"My Skills"}
                    sx={{
                      color: "secondary.main",
                      "> *": {
                        fontWeight: activeMySkills ? "600 !important" : "",
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
              <Link onClick={handlerDev} to={EMPLOYEE_DEVELOPMENT_ROUTE}>
                <ListItemButton
                  sx={{
                    pl: 9,
                  }}
                  disableRipple
                >
                  <ListItemText
                    primary={"Development"}
                    sx={{
                      color: "secondary.main",
                      "> *": { fontWeight: activeDev ? "600 !important" : "" },
                    }}
                  />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </Box>

        <Divider sx={{ mt: "20px !important" }} />

        {/* Second List */}
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            mt: "24px !important",
          }}
          component="nav"
          aria-labelledby="nested-list"
        >
          <ListItemButton
            onClick={handlerClickExp}
            sx={{
              backgroundColor: openExp ? "#e5f3fc" : "",
              mb: 4.5,
            }}
          >
            <ListItemIcon>
              {openExp && <img src={expIcon_active} alt="icon" />}
              {!openExp && <img src={expIcon_unactive} alt="icon" />}
            </ListItemIcon>
            <ListItemText
              primary="Experience"
              sx={mainCategoryStyle(openExp)}
            />
          </ListItemButton>

          <ListItemButton
            onClick={handlerClickOrg}
            sx={{
              backgroundColor: openOrg ? "#e5f3fc" : "",
            }}
          >
            <ListItemIcon>
              <img src={userIcon} alt="icon" />
            </ListItemIcon>
            <ListItemText
              primary="Organigram"
              sx={mainCategoryStyle(openOrg)}
            />
          </ListItemButton>
        </List>

        {/* Settings list */}
        <Box sx={{ marginTop: "240px !important" }}>
          <Divider />
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              mt: "20px !important",
            }}
            component="nav"
            aria-labelledby="nested-list"
          >
            <ListItemButton sx={{ marginBottom: "16px !important" }}>
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
            </ListItemButton>
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
            <ListItemButton>
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
    </Box>
  );
};

export default SideBarEmployee;
