import RatingBar from "../../../components/RatingBar";
import { skillsTable as data } from "../../../data/skillProfileData";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import increaseIcon from "../../../assets/increase_icon.svg";
import decreaseIcon from "../../../assets/decrease_icon.svg";
import { useCallback, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import {
  fetchSkillProfile,
  fetchSkillProfileRecommendationData,
} from "../../../redux/slices/admin/skillProfile/skillProfileActions";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: 0,
};

const TableRow = ({ skill, handleSetTargetId }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [localSkillLevel, setLocalSkillLevel] = useState(skill.level);

  const proficiencyMap = {
    1: "Basic",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
  };

  const [showMore, setShowMore] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

  const increaseLevel = useCallback(async () => {
    if (localSkillLevel < 4) {
      setLocalSkillLevel((prev) => prev + 1);
      const updatedSkillLevel = localSkillLevel + 1; // Use the updated state here
      // handleSetTargetId(skill.id);
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
          "skill_profile",
          { level: updatedSkillLevel },
          config
        );
        console.log(response.data.payload);
      } catch (error) {
        console.log(error.response.data);
        setLocalSkillLevel((prev) => prev - 1);
      } finally {
        // setLoading(false);
        // dispatch(fetchSkillProfile(skill.job_profile_id_id));
      }
    }
  }, [localSkillLevel]);

  const decreaseLevel = useCallback(async () => {
    if (localSkillLevel > 1) {
      setLocalSkillLevel((prev) => prev - 1);
      const updatedSkillLevel = localSkillLevel - 1; // Use the updated state here
      // handleSetTargetId(skill.id);
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
          "skill_profile",
          { level: updatedSkillLevel },
          config
        );
        console.log(response.data.payload);
      } catch (error) {
        console.log(error.response.data);
        setLocalSkillLevel((prev) => prev + 1);
      } finally {
        // setLoading(false);
        // dispatch(fetchSkillProfile(skill.job_profile_id_id));
      }
    }
  }, [localSkillLevel]);

  const deleteData = useCallback(async () => {
    handleSetTargetId(skill.id, true);
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
      const response = await axiosInstance.delete("skill_profile", config);
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchSkillProfile(skill.job_profile_id_id));
      dispatch(fetchSkillProfileRecommendationData(skill.job_profile_id_id));
    }
  }, []);

  const handleDeleteData = () => {
    deleteData();
    setAnchorEl(null);
  };

  const skillRef = useRef(null);

  return (
    <Stack
      ref={skillRef}
      id={skill.id}
      sx={{
        flexDirection: { xs: "row" },
      }}
      className="tableContent__section"
    >
      <Stack sx={{ justifyContent: "center" }}>
        <IconButton sx={{ alignSelf: "center" }} onClick={handleClick}>
          <img src={moreHoriz__icon} alt="icon" />
        </IconButton>

        <Popover
          open={open}
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

            <IconButton onClick={handleDeleteData} sx={{ color: "#FE7777" }}>
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Popover>
      </Stack>

      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={1}
          columns={16}
          alignItems="center"
          sx={{
            flex: 1,
            minHeight: { xs: "72px", lg: "97px", xl: "72px" },
          }}
        >
          <Grid xs={8} sm={10} lg={5} sx={gridStyles}>
            <Typography
              sx={{
                color: "#788894",
                fontWeight: 400,
                mr: 1.75,
                pl: 2,
                fontSize: {
                  xs: "13px",
                  sm: "16px",
                  md: "20px",
                },
              }}
              variant="h5"
            >
              {skill.title}
            </Typography>
          </Grid>

          {lgMatches && (
            <Grid xs={0} lg={6} sx={{ ...gridStyles, pt: 2, pb: 1 }}>
              {skill.description.length > 101 ? (
                <Typography
                  color="primary.main"
                  variant="body1"
                  sx={{
                    color: "#788894",
                    width: "80%",
                  }}
                >
                  {showMore
                    ? skill.description + " "
                    : skill.description.substring(0, 100) + "... "}
                  <Button
                    disableRipple={true}
                    variant="text"
                    sx={{
                      color: "#66C1FF",
                      alignSelf: "flex-start",
                      fontWeight: "400",
                      textTransform: "lowercase",
                      lineHeight: "1.5",
                      p: 0,
                      "&: hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? ` Show less` : " Show more"}
                  </Button>
                </Typography>
              ) : (
                <Typography
                  color="primary.main"
                  variant="body1"
                  sx={{
                    color: "#788894",
                    width: "80%",
                  }}
                >
                  {skill.description}
                </Typography>
              )}
            </Grid>
          )}

          <Grid
            xs={8}
            sm={6}
            lg={5}
            sx={{
              ...gridStyles,
              justifyContent: { md: "center", lg: "center", xl: "flex-start" },
              flexDirection: { lg: "column", xl: "row" },
              alignItems: "center",
              gap: { xl: "34px" },
            }}
          >
            {/* <Tooltip
              title={
                <>
                  <div style={{ textAlign: "center" }}>Proficiency needed</div>
                  <RatingBar initialValue={4 - skill.level} />
                </>
              }
              placement="top-start"
              followCursor
            >
              <span style={{ marginTop: "7px" }}>
                <RatingBar initialValue={skill.level} />
              </span>
            </Tooltip> */}

            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton onClick={decreaseLevel}>
                <img
                  src={decreaseIcon}
                  alt="Decrease icon"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>

              <span
                style={{
                  marginTop: "7px",
                  marginLeft: "4px",
                  marginRight: "8px",
                }}
              >
                <RatingBar
                  initialValue={localSkillLevel}
                  requiredLevel={localSkillLevel}
                />
              </span>

              <IconButton onClick={increaseLevel}>
                <img
                  src={increaseIcon}
                  alt="Increase icon"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Stack>

            {lgMatches && (
              <Typography
                variant="body2"
                sx={{ color: "#788894", fontSize: "14px" }}
              >
                {proficiencyMap[String(localSkillLevel)]}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Divider />
      </Box>
    </Stack>
  );
};

export default TableRow;
