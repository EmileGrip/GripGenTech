import { IconButton, ListItemIcon, Menu, Tooltip } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactComponent as CategoriesIcon } from "../../assets/categories_icon.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItemMobile from "./MenuItemMobile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authentication/authActions";
import { useNavigate } from "react-router-dom";
import { SIGNIN_ROUTE } from "../../routes/paths";

const MobileDropDownMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { accessToken } = useSelector((state) => state.auth);
  const dipatch = useDispatch();

  const logoutHandler = () => {
    dipatch(logout(accessToken));
    navigate(SIGNIN_ROUTE);
  };

  return (
    <>
      <Tooltip title="Menu">
        <IconButton onClick={handleClick}>
          <MenuIcon sx={{ color: open ? "secondary.main" : "primary.main" }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.2,
              bgcolor: "neutral.btnBg",
              opacity: 0.9,
              borderRadius: "10px",
            },
          },
        }}
      >
        <MenuItemMobile href="#">
          <ListItemIcon sx={{ color: "inherit" }}>
            <HomeIcon sx={{ mr: 1 }} />
          </ListItemIcon>
          home
        </MenuItemMobile>

        <MenuItemMobile href="#">
          <ListItemIcon
            sx={{
              color: "inherit",
              pl: "4px",
              pt: "3px",
              width: "27.433px",
              height: "27.433px",
            }}
          >
            <CategoriesIcon
              fill={"inherit"}
              style={{ width: "22.433px", height: "19.45px" }}
            />
          </ListItemIcon>
          categories
        </MenuItemMobile>

        <MenuItemMobile href="#">
          <ListItemIcon sx={{ color: "inherit" }}>
            <SettingsIcon sx={{ mr: 1 }} />
          </ListItemIcon>
          settings
        </MenuItemMobile>

        <MenuItemMobile href="#">
          <ListItemIcon sx={{ color: "inherit" }}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
          </ListItemIcon>
          cart
        </MenuItemMobile>

        <MenuItemMobile
          onClick={logoutHandler}
          sx={{ color: "secondary.main" }}
        >
          logout
        </MenuItemMobile>
      </Menu>
    </>
  );
};

export default MobileDropDownMenu;
