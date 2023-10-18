import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import editIcon from "../../../assets/edit_icon_light.svg";
import hintIcon from "../../../assets/hintIcon.svg";
import increaseIcon from "../../../assets/increase_icon.svg";
import decreaseIcon from "../../../assets/decrease_icon.svg";
import { useCallback, useEffect, useState } from "react";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";
import RatingBar from "../../RatingBar";
import CustomModal from "../../../ui/CustomModal";
import AddSkillForm from "./AddSkillForm";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchJobs } from "../../../redux/slices/internalMobility/addJobFormSlice";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import { fetchSkillProfileRecommendationData } from "../../../redux/slices/admin/skillProfile/skillProfileActions";

const Skills = ({
  roles = false,
  onEdit,
  vacancyRoleId,
  getSkills,
  data,
  onSuccess,
  job,
}) => {
  const [chosenSkill, setChosenSkill] = useState(null);
  const [roleId, setRoleId] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { skillProfileRecommendations } = useSelector(
    (state) => state.skillProfile
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleIncreaseLevel = () => {
    if (chosenSkill.level < 4) {
      setChosenSkill({
        ...chosenSkill,
        level: chosenSkill.level + 1,
      });
    }
  };

  const handleDecreaseLevel = () => {
    if (chosenSkill.level > 1) {
      setChosenSkill({
        ...chosenSkill,
        level: chosenSkill.level - 1,
      });
    }
  };

  const editLevel = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    try {
      const response = await axiosInstance.put(
        "vacancy_skill",
        {
          id: chosenSkill.id,
          skill_ref: chosenSkill.skill_ref,
          level: chosenSkill.level,
        },
        config
      );
      console.log(response.data.payload);
      onSuccess(response.data);
    } catch (error) {
      onSuccess(error?.response.data);
      console.log(error?.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchJobs());
      setChosenSkill(null);
      setOpenDialog(false);
    }
  }, [token, chosenSkill?.id, chosenSkill?.skill_ref, chosenSkill?.level]);

  const deleteData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: {
        id: chosenSkill.id,
      },
    };
    try {
      const response = await axiosInstance.delete("vacancy_skill", config);
      console.log(response.data.payload);
      onSuccess(response.data);
    } catch (error) {
      onSuccess(error?.response.data);
      console.log(error?.response.data);
    } finally {
      // setLoading(false);
      if (roles) {
        dispatch(fetchProjects());
      } else {
        dispatch(fetchJobs());
      }
    }
  }, [token, chosenSkill?.id]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [skills, setSkills] = useState(roles ? data : []);
  const getSelectedSkills = (value) => {
    setSkills([...skills, value]);
    getSkills([...skills, value]);
  };
  const selectedSkills = onEdit ? data : skills;

  useEffect(() => {
    getSkills(skills);
  }, [skills]);

  useEffect(() => {
    if (onEdit) {
      searchJobs(job?.role?.title);
    }
  }, [job?.role?.title]);

  useEffect(() => {
    if (token && roleId) {
      dispatch(fetchSkillProfileRecommendationData(roleId));
    }
  }, [token, dispatch, roleId, selectedSkills]);

  const addSuggestedSkill = () => {
    if (onEdit) {
      sendData(token, vacancyRoleId, chosenSkill.id, chosenSkill.level);
    } else {
      getSelectedSkills(chosenSkill);
      setChosenSkill(null);
    }
  };

  const searchJobs = useCallback(
    async (value) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        // setLoading(true);
        const response = await axiosInstance.post(
          `search`,
          {
            key: "job_profile",
            value,
          },
          config
        );

        const selectedId = response.data.payload[0].id;
        setRoleId(selectedId);
        // return selectedId;
      } catch (error) {
        console.log(error?.response.data);
      } finally {
        // setLoading(false);
      }
    },
    [token]
  );

  const sendData = useCallback(
    async (token, vacancy_role_id, skill_ref, level) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        // setLoading(true);
        const response = await axiosInstance.post(
          `vacancy_skill`,
          {
            vacancy_role_id,
            skill_ref,
            level,
          },
          config
        );
        console.log(response.data);
        onSuccess(response.data);
      } catch (error) {
        onSuccess(error?.response.data);
        console.log(error?.response.data);
      } finally {
        // setLoading(false);
        if (roles) {
          dispatch(fetchProjects());
        } else {
          dispatch(fetchJobs());
        }
        dispatch(fetchSkillProfileRecommendationData(roleId));
        setChosenSkill(null);
        // closeModal();
      }
    },
    [token]
  );

  const handleDeleteData = (id) => {
    if (onEdit) {
      deleteData();
    } else {
      const filteredSkills = skills?.filter((skill) => skill.id !== id);
      setSkills(filteredSkills);
      getSkills(filteredSkills);
    }
    setChosenSkill(null);
    setOpenDialog(false);
  };

  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillForm
          data={[]}
          closeModal={handleClose}
          roles={roles}
          onEdit={onEdit}
          vacancyRoleId={vacancyRoleId}
          getSelectedSkills={getSelectedSkills}
          onSuccess={onSuccess}
        />
      </CustomModal>

      <Stack
        sx={{
          background: "#FAFAFA",
          border: "2px solid #EEEEEE",
          borderRadius: "10px",
          gap: "20px",
          p: { xs: "12px", lg: "20px" },
        }}
      >
        <Typography variant="h3" color="#173433">
          {roles ? "Role Skills" : "Skills"}
        </Typography>

        <Typography variant="body1" color="#173433">
          Suggested Skills
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: { xs: "center", lg: "flex-start" },
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {skillProfileRecommendations?.length >= 1 && (
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: { xs: "center", lg: "flex-start" },
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {skillProfileRecommendations?.map((skill) => (
                <Box
                  onClick={() =>
                    setChosenSkill({ ...skill, level: 1, addSkill: true })
                  }
                  key={skill?.title}
                  sx={{
                    background: "rgba(23, 52, 51, 0.40)",
                    borderRadius: "100px",
                    py: "4px",
                    px: "12px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h6"
                    textTransform="none"
                    color="#FFFFFF"
                    fontWeight="500"
                  >
                    {skill?.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}

          <Button
            onClick={handleOpen}
            sx={{
              width: "124px",
              height: "29px",
              color: "rgba(23, 52, 51, 0.40)",
              border: "1px solid rgba(23, 52, 51, 0.40)",
              borderRadius: "100px",
            }}
          >
            <Typography variant="h6" textTransform="none" pr="12px">
              Add Skill
            </Typography>

            <AddIcon />
          </Button>
        </Stack>

        {chosenSkill?.addSkill && (
          <Stack
            sx={{
              background: "#FFFFFF",
              border: "1px solid #EEEEEE",
              borderRadius: "5px",
              p: "20px ",
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={1}
              columns={12}
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
                gap: { xs: 3, md: 0 },
                m: "0px",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
              >
                <Stack
                  sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
                >
                  <Typography variant="h5" color="darkGreen">
                    {chosenSkill?.title}
                  </Typography>

                  <DescriptionTooltip
                    title={chosenSkill.description}
                    placement="bottom-start"
                  >
                    <img
                      src={hintIcon}
                      alt="icon"
                      style={{ alignSelf: "center" }}
                    />
                  </DescriptionTooltip>
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ flexDirection: "row", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={handleDecreaseLevel}>
                    <img
                      src={decreaseIcon}
                      alt="Decrease icon"
                      style={{ cursor: "pointer" }}
                    />
                  </IconButton>

                  <Tooltip
                    title={
                      <>
                        <div style={{ textAlign: "center" }}>Level:</div>
                        <RatingBar initialValue={chosenSkill.level} />
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
                      <RatingBar initialValue={chosenSkill.level} />
                    </span>
                  </Tooltip>

                  <IconButton onClick={handleIncreaseLevel}>
                    <img
                      src={increaseIcon}
                      alt="Increase icon"
                      style={{ cursor: "pointer" }}
                    />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: { md: 3 } }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 3, sm: 4 },
                  }}
                >
                  <Button
                    onClick={addSuggestedSkill}
                    sx={{
                      width: "93px",
                      height: "22px",
                      background: (theme) => theme.palette.accent,
                    }}
                  >
                    <Typography
                      variant="body2"
                      textTransform="none"
                      fontWeight="500"
                    >
                      Confirm
                    </Typography>
                  </Button>

                  <Button
                    onClick={() => setChosenSkill(null)}
                    sx={{
                      width: "93px",
                      height: "22px",
                      border: "1px solid #788894",
                    }}
                  >
                    <Typography
                      variant="body2"
                      textTransform="none"
                      color="#788894"
                      fontWeight="500"
                    >
                      Cancel
                    </Typography>
                  </Button>

                  <IconButton
                    onClick={handleOpenDialog}
                    sx={{ color: "#FE7777" }}
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        )}

        <Typography variant="body1" color="#173433">
          Skills Selected
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: { xs: "center", lg: "flex-start" },
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {selectedSkills?.length >= 1 && (
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: { xs: "center", lg: "flex-start" },
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {selectedSkills?.map((skill) => (
                <Box
                  key={skill.id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    background: "#0C1716",
                    borderRadius: "100px",
                    py: "4px",
                    px: "12px",
                  }}
                >
                  <Typography
                    variant="h6"
                    textTransform="none"
                    color="#FFFFFF"
                    fontWeight="500"
                  >
                    {skill?.title}
                  </Typography>

                  <img
                    onClick={() =>
                      setChosenSkill({ ...skill, editSkill: true })
                    }
                    src={editIcon}
                    alt="Edit icon"
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>

        {chosenSkill?.editSkill && (
          <Stack
            sx={{
              background: "#FFFFFF",
              border: "1px solid #EEEEEE",
              borderRadius: "5px",
              p: "20px ",
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={1}
              columns={12}
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
                gap: { xs: 3, md: 0 },
                m: "0px",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
              >
                <Stack
                  sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
                >
                  <Typography variant="h5" color="darkGreen">
                    {chosenSkill?.title}
                  </Typography>

                  <DescriptionTooltip
                    title={chosenSkill.description}
                    placement="bottom-start"
                  >
                    <img
                      src={hintIcon}
                      alt="icon"
                      style={{ alignSelf: "center" }}
                    />
                  </DescriptionTooltip>
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ flexDirection: "row", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={handleDecreaseLevel}>
                    <img
                      src={decreaseIcon}
                      alt="Decrease icon"
                      style={{ cursor: "pointer" }}
                    />
                  </IconButton>

                  <Tooltip
                    title={
                      <>
                        <div style={{ textAlign: "center" }}>Level:</div>
                        <RatingBar initialValue={chosenSkill.level} />
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
                      <RatingBar initialValue={chosenSkill.level} />
                    </span>
                  </Tooltip>

                  <IconButton onClick={handleIncreaseLevel}>
                    <img
                      src={increaseIcon}
                      alt="Increase icon"
                      style={{ cursor: "pointer" }}
                    />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: { md: 3 } }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 3, sm: 4 },
                  }}
                >
                  <Button
                    onClick={editLevel}
                    sx={{
                      width: "93px",
                      height: "22px",
                      background: (theme) => theme.palette.accent,
                    }}
                  >
                    <Typography
                      variant="body2"
                      textTransform="none"
                      fontWeight="500"
                    >
                      Confirm
                    </Typography>
                  </Button>

                  <Button
                    onClick={() => setChosenSkill(null)}
                    sx={{
                      width: "93px",
                      height: "22px",
                      border: "1px solid #788894",
                    }}
                  >
                    <Typography
                      variant="body2"
                      textTransform="none"
                      color="#788894"
                      fontWeight="500"
                    >
                      Cancel
                    </Typography>
                  </Button>

                  <IconButton
                    onClick={handleOpenDialog}
                    sx={{ color: "#FE7777" }}
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        )}

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
            <Button
              onClick={() => handleDeleteData(chosenSkill.id)}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
};

export default Skills;
