import RatingBar from "../../../RatingBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Stack,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import hintIcon from "../../../../assets/hintIcon.svg";
import DescriptionTooltip from "../../../../ui/DescriptionTooltip";
import moreHoriz__icon from "../../../../assets/moreHoriz__icon.svg";
import increaseIcon from "../../../../assets/increase_icon.svg";
import decreaseIcon from "../../../../assets/decrease_icon.svg";
import statusInvalidate from "../../../../assets/status_invalidate.svg";
import statusValidate from "../../../../assets/status_validate.svg";
import { useCallback } from "react";
import axiosInstance from "../../../../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillsData,
  fetchSkillsRecommendationData,
  fetchSkillsWishlistData,
} from "../../../../redux/slices/Employee/mySkills/mySkillsActions";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: 0,
};

const SkillTableRow = ({
  skill,
  user,
  sendData,
  deleteData,
  isProfile,
  skillsWishlist,
  showOptions,
  handleSetTargetId,
}) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = !!anchorEl;

  const skillName = smMatches
    ? skill?.title?.slice(0, 30)
    : skill?.title?.slice(0, 15);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const proficiencyMap = {
    1: "Basic",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
  };

  const handleValidation = () => {
    if (skill?.verified) {
      deleteData(skill?.id);
    } else {
      sendData(skill?.id);
    }
    handleClose();
  };

  const [localSkillLevel, setLocalSkillLevel] = useState(skill.level);

  useEffect(() => {
    console.log("Current localSkillLevel:", localSkillLevel);
  }, [localSkillLevel]);

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
        const { data } = await axiosInstance.put(
          "skill_proficiency",
          { level: updatedSkillLevel },
          config
        );

        console.log("increased skill", data.payload);
      } catch (error) {
        console.log(error.response.data);

        setLocalSkillLevel((prev) => prev - 1);
      } finally {
        // setLoading(false);
        // dispatch(fetchSkillsData(user.id));
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
          "skill_proficiency",
          { level: updatedSkillLevel },
          config
        );
        console.log("decreased skill", response.data.payload);
      } catch (error) {
        console.log(error.response.data);

        setLocalSkillLevel((prev) => prev + 1);
      } finally {
        // setLoading(false);
        // dispatch(fetchSkillsData(user.id));
      }
    }
  }, [localSkillLevel]);

  const deleteSkill = useCallback(async () => {
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
      const response = await axiosInstance.delete(
        showOptions ? "skill_wish" : "skill_proficiency",
        config
      );
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      if (showOptions) {
        dispatch(fetchSkillsWishlistData(user.id));
      } else {
        dispatch(fetchSkillsData(user.id));
      }
      dispatch(fetchSkillsRecommendationData(user.id));
    }
  }, []);

  const handleDeleteData = () => {
    deleteSkill();
    setAnchorEl(null);
  };

  const skillRef = useRef(null);

  return (
    <Stack
      ref={skillRef}
      id={skill.id}
      className="tableRow"
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        mb: 3.125,
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
          spacing="12px"
          columns={{ xs: 12 }}
          sx={{
            alignItems: "center",
            minHeight: "45px",
            m: "0px",
          }}
        >
          {!skillsWishlist && (
            <Grid xs={1} lg={0.25} sx={gridStyles}>
              <Stack sx={{ justifyContent: "center" }}>
                <IconButton
                  sx={{ alignSelf: "center", p: 0 }}
                  onClick={handleClick}
                >
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
                  <Button
                    onClick={handleOpenDialog}
                    sx={{
                      height: "56px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#E1FAED80",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="#788894"
                      textTransform="none"
                    >
                      {isProfile
                        ? skill?.verified
                          ? "Remove validation"
                          : "Validate"
                        : "Delete"}
                    </Typography>
                  </Button>
                </Popover>

                {isProfile ? (
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    PaperProps={{
                      sx: { backgroundColor: "white", py: 2 }, // Make dialog background transparent
                    }}
                    BackdropProps={{
                      sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" }, // Make backdrop transparent
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseDialog}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "grey",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogTitle sx={{ textAlign: "center" }}>
                      <img
                        src={
                          skill?.verified ? statusInvalidate : statusValidate
                        }
                        alt="Status validation icon"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </DialogTitle>
                    <Typography variant="h2" textAlign="center">
                      {skill?.verified
                        ? "Remove the validated skill"
                        : "Validate Skill"}
                    </Typography>
                    <DialogContent sx={{ maxWidth: "480px" }}>
                      {skill?.verified ? (
                        <Typography variant="body1" color="#788894">
                          You’re about to remove the validated{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {skill.title}
                          </span>{" "}
                          Skill for{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {`${user?.first_name} ${user?.last_name}`}
                          </span>{" "}
                          please select the option below
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="#788894">
                          You’re about to validate the{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {skill.title}
                          </span>{" "}
                          Skill for{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {`${user?.first_name} ${user?.last_name}`},
                          </span>{" "}
                          please select the option below
                        </Typography>
                      )}
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", px: 3 }}>
                      <Stack
                        sx={{
                          flexDirection: { sm: "row" },
                          gap: { xs: 2, sm: 4 },
                          justifyContent: "center",
                          width: { xs: "100%" },
                        }}
                      >
                        <Button
                          onClick={handleValidation}
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            background: (theme) => theme.palette.accent,
                            color: "darkGreen",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography variant="h6">
                            {skill?.verified ? "Remove" : "Certify"}
                          </Typography>
                        </Button>
                        <Button
                          onClick={handleCloseDialog}
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            border: "1px solid #788894",
                            color: "#788894",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography variant="h6">Cancel</Typography>
                        </Button>
                      </Stack>
                    </DialogActions>
                  </Dialog>
                ) : (
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {`Confirm Skill Delete`}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete this skill?`}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} autoFocus>
                        cancel
                      </Button>
                      <Button onClick={handleDeleteData} color="error">
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </Stack>
            </Grid>
          )}

          {showOptions && (
            <Grid xs={1} lg={0.25} sx={gridStyles}>
              <Stack sx={{ justifyContent: "center" }}>
                <IconButton
                  sx={{ alignSelf: "center", p: 0 }}
                  onClick={handleClick}
                >
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
                  <Button
                    onClick={handleOpenDialog}
                    sx={{
                      height: "56px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#E1FAED80",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="#788894"
                      textTransform="none"
                    >
                      {isProfile
                        ? skill?.verified
                          ? "Remove validation"
                          : "Validate"
                        : "Delete"}
                    </Typography>
                  </Button>
                </Popover>

                {isProfile ? (
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    PaperProps={{
                      sx: { backgroundColor: "white", py: 2 }, // Make dialog background transparent
                    }}
                    BackdropProps={{
                      sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" }, // Make backdrop transparent
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <IconButton
                      aria-label="close"
                      onClick={handleCloseDialog}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "grey",
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogTitle sx={{ textAlign: "center" }}>
                      <img
                        src={
                          skill?.verified ? statusInvalidate : statusValidate
                        }
                        alt="Status validation icon"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </DialogTitle>
                    <Typography variant="h2" textAlign="center">
                      {skill?.verified
                        ? "Remove the validated skill"
                        : "Validate Skill"}
                    </Typography>
                    <DialogContent sx={{ maxWidth: "480px" }}>
                      {skill?.verified ? (
                        <Typography variant="body1" color="#788894">
                          You’re about to remove the validated{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {skill.title}
                          </span>{" "}
                          Skill for{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {`${user?.first_name} ${user?.last_name}`}
                          </span>{" "}
                          please select the option below
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="#788894">
                          You’re about to validate the{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {skill.title}
                          </span>{" "}
                          Skill for{" "}
                          <span style={{ color: "#0C1716", fontWeight: "600" }}>
                            {`${user?.first_name} ${user?.last_name}`},
                          </span>{" "}
                          please select the option below
                        </Typography>
                      )}
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", px: 3 }}>
                      <Stack
                        sx={{
                          flexDirection: { sm: "row" },
                          gap: { xs: 2, sm: 4 },
                          justifyContent: "center",
                          width: { xs: "100%" },
                        }}
                      >
                        <Button
                          onClick={handleValidation}
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            background: (theme) => theme.palette.accent,
                            color: "darkGreen",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography variant="h6">
                            {skill?.verified ? "Remove" : "Certify"}
                          </Typography>
                        </Button>
                        <Button
                          onClick={handleCloseDialog}
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            border: "1px solid #788894",
                            color: "#788894",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography variant="h6">Cancel</Typography>
                        </Button>
                      </Stack>
                    </DialogActions>
                  </Dialog>
                ) : (
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {`Confirm Skill Delete`}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete this skill?`}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} autoFocus>
                        cancel
                      </Button>
                      <Button onClick={handleDeleteData} color="error">
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </Stack>
            </Grid>
          )}

          <Grid
            xs={showOptions ? 11 : skillsWishlist ? 12 : 11}
            lg={!skillsWishlist && 6.4}
            sx={gridStyles}
          >
            <Stack
              sx={{
                pl: showOptions
                  ? "27px"
                  : !skillsWishlist && { xs: "10px", lg: "15px" },
              }}
            >
              <Stack
                title={skill.title}
                sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
              >
                <Typography
                  sx={{
                    color: "darkGreen",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 400,
                  }}
                  variant="h5"
                >
                  {skillsWishlist ? skill?.title : skillName}
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
            </Stack>
          </Grid>

          {!skillsWishlist && (
            <>
              <Grid
                xs={6}
                lg={4.35}
                sx={{ ...gridStyles, mt: "3px", pl: { sm: 1 } }}
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

              <Grid
                xs={6}
                lg={1}
                sx={{ ...gridStyles, justifyContent: "flex-end" }}
              >
                <img
                  src={skill?.verified ? statusValidate : statusInvalidate}
                  alt="Status validation icon"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default SkillTableRow;
