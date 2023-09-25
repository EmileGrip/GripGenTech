import RatingBar from "./RatingBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Stack,
  Box,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Popover,
  Divider,
} from "@mui/material";
import { useState } from "react";
import hintIcon from "../assets/hintIcon.svg";
import completeIcon from "../assets/completeIcon.svg";
import DescriptionTooltip from "../ui/DescriptionTooltip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import moreHoriz__icon from "../assets/moreHoriz__icon.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useCallback } from "react";
import axiosInstance from "../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillsData,
  fetchSkillsRecommendationData,
} from "../redux/slices/Employee/mySkills/mySkillsActions";

const imgStyles = {
  display: "block",
  maxWidth: "100%",
  height: "100%",
};

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: 0,
};

const SkillTableRow = ({ skill, isProfile = false }) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen((prev) => !prev);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = !!anchorEl;

  const increaseLevel = useCallback(async () => {
    if (skill.level < 4) {
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
        const response = await axiosInstance.put(
          "skill_proficiency",
          { level: skill.level + 1 },
          config
        );
        console.log(response.data.payload);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchSkillsData(userInfo.id));
      }
    }
  }, []);

  const decreaseLevel = useCallback(async () => {
    if (skill.level > 1) {
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
        const response = await axiosInstance.put(
          "skill_proficiency",
          { level: skill.level - 1 },
          config
        );
        console.log(response.data.payload);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchSkillsData(userInfo.id));
      }
    }
  }, []);

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
      const response = await axiosInstance.delete("skill_proficiency", config);
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchSkillsData(userInfo.id));
      dispatch(fetchSkillsRecommendationData(userInfo.id));
    }
  }, []);

  const handleDeleteData = () => {
    deleteData();
    setAnchorEl(null);
  };

  const skillName = smMatches
    ? skill?.title?.slice(0, 30)
    : skill?.title?.slice(0, 15);

  return (
    <Stack
      className="tableRow"
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        mb: 3.125,
      }}
    >
      {!isProfile && (
        <Stack sx={{ justifyContent: "center" }}>
          <IconButton sx={{ alignSelf: "center", p: 0 }} onClick={handleClick}>
            <img src={moreHoriz__icon} alt="icon" />
          </IconButton>

          <Popover
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
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
                gap: "8px",
              }}
            >
              <Typography variant="h6" color="primary.main">
                Proficiency Level
              </Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <IconButton onClick={increaseLevel}>
                  <AddIcon color="success" />
                </IconButton>
                <IconButton onClick={decreaseLevel}>
                  <RemoveIcon color="error" />
                </IconButton>
              </Stack>
            </Stack>
            <Divider variant="middle" />
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

              <IconButton onClick={handleDeleteData} sx={{ color: "#FE7777" }}>
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Popover>
        </Stack>
      )}
      <Stack
        sx={{
          gap: "4px",
          borderRadius: "10px",
          p: "4px ",
          background: "#f5f5f5",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={1}
          columns={{ xs: 20 }}
          sx={{
            alignItems: "center",
            minHeight: "45px",
            m: "0px",
          }}
        >
          <Grid xs={12} sm={10} lg={8} sx={gridStyles}>
            <Stack sx={{ pl: { xs: "10px", lg: "15px" } }}>
              <Stack
                title={skill.title}
                sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
              >
                <Typography
                  sx={{
                    color: "#737373",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 400,
                  }}
                  variant="h5"
                >
                  {skillName}
                </Typography>
                {lgMatches && (
                  <DescriptionTooltip
                    title={skill.description}
                    placement="bottom-start"
                  >
                    <img
                      src={hintIcon}
                      alt="icon"
                      style={{ alignSelf: "center" }}
                    />
                  </DescriptionTooltip>
                )}
              </Stack>

              {!lgMatches && (
                <Typography
                  color="primary.main"
                  variant="body2"
                  sx={{
                    color: "#737373",
                    opacity: 0.61,
                  }}
                >
                  {/* Origin: {skill.origin} */}
                  Origin: Job Position
                </Typography>
              )}
            </Stack>
          </Grid>

          {lgMatches && (
            <Grid lg={4} sx={gridStyles}>
              <Typography color="primary.main" variant="body1">
                {/* {skill.origin} */}
                Job Position
              </Typography>
            </Grid>
          )}

          <Grid
            xs={6}
            sm={8}
            lg={4}
            sx={{ ...gridStyles, mt: "3px", pl: { sm: 1 } }}
          >
            <Tooltip
              title={
                <>
                  <div style={{ textAlign: "center" }}>Proficiency needed</div>
                  <RatingBar
                    initialValue={
                      skill.required_level === 0 ? 0 : skill.required_level
                    }
                  />
                </>
              }
              placement="top-start"
              followCursor
            >
              <span>
                <RatingBar initialValue={skill.level} />
              </span>
            </Tooltip>

            {/* <RatingBar initialValue={skill.level} /> */}
          </Grid>

          <Grid
            xs={2}
            sm={2}
            lg={4}
            sx={{ ...gridStyles, justifyContent: "flex-end" }}
          >
            {skill.status === 0 ? (
              <img src={completeIcon} style={imgStyles} alt="logo" />
            ) : lgMatches ? (
              <Typography
                variant="body1"
                sx={{
                  fontSize: { lg: "20px" },
                  color: "primary.main",
                  pr: 2,
                }}
              >
                {skill.status}
              </Typography>
            ) : (
              <IconButton onClick={handleOpen}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Grid>
        </Grid>

        {skill.status !== 0 && !lgMatches && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid
              container
              spacing={1}
              columns={{ xs: 20 }}
              key={skill.title}
              sx={{
                height: "45px",
                minHeight: "45px",
                m: 0,
              }}
            >
              <Grid xs={12} sm={10} lg={8} sx={gridStyles}>
                <Stack>
                  <Typography
                    sx={{
                      color: "#737373",
                      pl: { xs: "10px", lg: "15px" },
                      whiteSpace: "nowrap",
                      opacity: 0.61,
                      fontWeight: 400,
                    }}
                    variant="h5"
                  >
                    Proficiency Needed
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                xs={6}
                sm={8}
                lg={4}
                sx={{ ...gridStyles, mt: "3px", pl: { sm: 1 } }}
              >
                <span>
                  <RatingBar
                    initialValue={
                      skill.required_level === 0 ? 0 : skill.required_level
                    }
                  />
                </span>
              </Grid>

              <Grid
                xs={2}
                sm={2}
                lg={4}
                sx={{ ...gridStyles, justifyContent: "flex-end" }}
              >
                {skill.status === 0 ? (
                  <img src={completeIcon} style={imgStyles} alt="logo" />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary.main",
                      pr: 2,
                    }}
                  >
                    {skill.status}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Collapse>
        )}
      </Stack>
    </Stack>
  );
};

export default SkillTableRow;
