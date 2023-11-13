import RatingBar from "../../../components/RatingBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Stack,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Popover,
} from "@mui/material";
import { useState } from "react";
import hintIcon from "../../../assets/hintIcon.svg";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";
import increaseIcon from "../../../assets/increase_icon.svg";
import decreaseIcon from "../../../assets/decrease_icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillsData,
  fetchSkillsRecommendationData,
} from "../../../redux/slices/Employee/mySkills/mySkillsActions";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: 0,
};

const SkillTableRowOverview = ({ skill }) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [localSkillLevel, setLocalSkillLevel] = useState(skill.level);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = !!anchorEl;

  const increaseLevel = useCallback(async () => {
    if (localSkillLevel < 4) {
      setLocalSkillLevel((prev) => prev + 1);
      const updatedSkillLevel = localSkillLevel + 1; // Use the updated state here
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
          { level: updatedSkillLevel },
          config
        );
        console.log(response.data.payload);
      } catch (error) {
        console.log(error.response.data);
        setLocalSkillLevel((prev) => prev - 1);
      } finally {
        // setLoading(false);
        // dispatch(fetchSkillsData(userInfo.id));
      }
    }
  }, [localSkillLevel]);

  const decreaseLevel = useCallback(async () => {
    if (localSkillLevel > 1) {
      setLocalSkillLevel((prev) => prev - 1);
      const updatedSkillLevel = localSkillLevel - 1; // Use the updated state here
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
          { level: updatedSkillLevel },
          config
        );
        console.log(response.data.payload);
      } catch (error) {
        console.log(error.response.data);
        setLocalSkillLevel((prev) => prev + 1);
      } finally {
        // setLoading(false);
        // dispatch(fetchSkillsData(userInfo.id));
      }
    }
  }, [localSkillLevel]);

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

  const proficiencyMap = {
    1: "Basic",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
  };

  return (
    <>
      <Stack sx={{ justifyContent: "center" }}>
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
            }}
          >
            <Typography variant="h6" color="primary.main">
              Delete Skill
            </Typography>

            <IconButton onClick={handleDeleteData}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Stack>
        </Popover>
      </Stack>

      <Stack
        className="tableRow"
        sx={{
          flexDirection: "row",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Stack
          sx={{
            gap: "4px",
            borderRadius: "10px",
            p: "4px ",
            background: "#FFFFFF",
            width: "100%",
          }}
        >
          <Grid
            container
            spacing={1}
            columns={12}
            sx={{
              alignItems: "center",
              m: "0px",
            }}
          >
            <Grid xs={6} sm={5} sx={gridStyles}>
              <Stack
                sx={{
                  pl: { xs: "10px", lg: "15px" },
                  width: { xs: "100%", lg: "80%" },
                }}
              >
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
                </Stack>
              </Stack>
            </Grid>

            <Grid
              xs={6}
              sm={5}
              sx={{ ...gridStyles, justifyContent: "flex-end" }}
            >
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <img
                  onClick={decreaseLevel}
                  src={decreaseIcon}
                  alt="Decrease icon"
                  style={{ cursor: "pointer" }}
                />

                <Tooltip
                  title={
                    <>
                      {/* <div style={{ textAlign: "center" }}>
                        Proficiency needed
                      </div>
                      <RatingBar
                        initialValue={
                          skill.required_level === 0 ? 0 : skill.required_level
                        }
                      /> */}
                      <Typography
                        variant="h5"
                        color="#0C1716"
                        fontWeight="500"
                        textAlign="center"
                      >
                        Your level:
                        <br />
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#0C1716",
                          }}
                        >
                          {proficiencyMap[String(localSkillLevel)]}
                        </span>
                      </Typography>
                    </>
                  }
                  placement="top-start"
                  followCursor
                >
                  <span
                    style={{
                      marginTop: "7px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    <RatingBar
                      initialValue={localSkillLevel}
                      requiredLevel={skill.required_level}
                    />
                  </span>
                </Tooltip>

                <img
                  onClick={increaseLevel}
                  src={increaseIcon}
                  alt="Increase icon"
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            </Grid>

            {smMatches && (
              <Grid xs={2} sx={{ ...gridStyles, justifyContent: "flex-end" }}>
                <IconButton onClick={handleClick} sx={{ color: "#FE7777" }}>
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};

export default SkillTableRowOverview;
