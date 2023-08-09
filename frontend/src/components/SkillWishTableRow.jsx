import React, { useCallback, useEffect, useState } from "react";
import moreHoriz__icon from "../assets/moreHoriz__icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchSkillsWishlistData } from "../redux/slices/Employee/mySkills/mySkillsActions";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../helper/axiosInstance";
import DescriptionTooltip from "../ui/DescriptionTooltip";
import hintIcon from "../assets/hintIcon.svg";
import { Grid, IconButton, Popover, Stack, Typography } from "@mui/material";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: "0 !important",
};

const SkillWishTableRow = ({ skill, isProfile = false, index }) => {
  //   const checkLastChild = (index, array) => index + 1 === array.length;
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = !!anchorEl;

  const deleteData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id: skill.id,
      },
    };
    try {
      const response = await axiosInstance.delete("skill_wish", config);
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchSkillsWishlistData(userInfo.id));
    }
  }, []);

  const handleDeleteData = () => {
    deleteData();
    setAnchorEl(null);
  };

  return (
    <Stack
      key={skill.id}
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        mb: 3.125,
        // mb: checkLastChild(index, data) ? 0 : 3.125,
      }}
    >
      {!isProfile && (
        <Stack sx={{ justifyContent: "center" }}>
          <IconButton
            sx={{ alignSelf: "center", p: 0, mr: 1 }}
            onClick={handleClick}
          >
            <img src={moreHoriz__icon} alt="icon" />
          </IconButton>

          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
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
                Delete Skill
              </Typography>

              <IconButton onClick={handleDeleteData}>
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          </Popover>
        </Stack>
      )}
      <Grid
        container
        spacing={1}
        sx={{
          background: "#f5f5f5",
          borderRadius: "10px",
          height: "45px",
          minHeight: "45px",
          width: "100%",
        }}
      >
        <Grid item xs={12} sx={gridStyles}>
          <Typography
            sx={{
              color: "#737373",
              fontWeight: 400,
              mr: 1.75,
              pl: 2,
            }}
            variant="h5"
          >
            {skill.title}
          </Typography>
          <DescriptionTooltip
            title={skill.description}
            placement="bottom-start"
          >
            <img src={hintIcon} alt="icon" />
          </DescriptionTooltip>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SkillWishTableRow;
