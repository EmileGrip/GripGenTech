import React, { useState } from "react";
import StyledDarkWrapper from "../../../components/styled/StyledDarkWrapper";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LinesEllipsis from "react-lines-ellipsis";
import goalIcon from "../../../assets/goals_active.svg";
import circleDotsIcon from "../../../assets/moreHoriz__icon.svg";
import AddIcon from "@mui/icons-material/Add";
import delete_inactive from "../../../assets/delete_inactive.svg";

const SuggestedGoalCard = ({ title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledDarkWrapper
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "12px",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Box
        component={"img"}
        src={goalIcon}
        sx={{ width: "24px", height: "24px" }}
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          textTransform: "capitalize",
          color: "darkGreenAccent",
        }}
        title={title}
      >
        <LinesEllipsis
          text={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="words"
        />
      </Typography>
      {/* TODO: create sub menu onclick */}
      <IconButton onClick={handleClick} sx={{ width: "24px", height: "24px" }}>
        <Box component={"img"} src={circleDotsIcon} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          sx={{
            justifyContent: "flex-end",
            gap: "16px",
            color: "inactive.main",
          }}
        >
          <ListItemText sx={{ opacity: "0.7", textAlign: "right" }}>
            Add to My goals
          </ListItemText>
          <AddIcon fontSize="small" sx={{ width: "24px", height: "24px" }} />
        </MenuItem>
        <MenuItem
          sx={{
            justifyContent: "flex-end",
            gap: "16px",
            color: "inactive.main",
          }}
        >
          <ListItemText sx={{ opacity: "0.7" }}>Remove suggestion</ListItemText>
          <Box component={"img"} src={delete_inactive} />
        </MenuItem>
      </Menu>
    </StyledDarkWrapper>
  );
};

export default SuggestedGoalCard;
