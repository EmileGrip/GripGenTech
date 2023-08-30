import {
  Box,
  Button,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

function MenuBtn({ children, items, text, isSettings = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ color: !open ? "primary.main" : "secondary.main" }}>
      <Button
        onClick={handleMenu}
        sx={{
          fontSize: { md: "12px" },
          textTransform: "capitalize",
          color: "currentColor",
        }}
        startIcon={children}
      >
        {text}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem component={Link} href="#" key={item.id} sx={{ mb: 1 }}>
            <ListItemIcon sx={{ mr: 1 }}>
              <img
                style={{
                  width: isSettings ? "24px" : "",
                  height: isSettings ? "24px" : "",
                }}
                src={item.thumbnail}
              />
            </ListItemIcon>
            <ListItemText
              sx={{ color: isSettings ? "primary.main" : "secondary.main" }}
            >
              {item.title}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MenuBtn;
