import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import fileIcon from "../../../../assets/add_file_icon.svg";
import SkillHeadersRow from "./SkillHeadersRow";
import SkillTableRow from "./SkillTableRow";
import { skillsTableHeaders as headers } from "../../../../data/mySkillsProfileData";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillsData,
  fetchSkillsRecommendationData,
} from "../../../../redux/slices/Employee/mySkills/mySkillsActions";
import { useFormik } from "formik";
import { validationsForm } from "../../../../pages/employee/mySkills/validations/validationSchema";
import { debounce } from "lodash";

const SkillsOverview = ({
  skills,
  skillsLoading,
  skillsWishlist,
  skillsWishlistLoading,
  skillsRecommendation,
  user,
  userId,
  isProfile = false,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [chosenSkill, setChosenSkill] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //Remove origin
  const { origin, ...tableHeaders } = headers;

  // Snackbar handlers
  const [openSnack, setOpenSnack] = useState(false);
  const [response, setResponse] = useState(null);

  const handleClickSnack = (response) => {
    setResponse(response);
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const sendData = useCallback(
    async (id) => {
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
          `endorsement`,
          {
            skill_id: id,
          },
          config
        );
        console.log(response.data);
        handleClickSnack(response.data);
      } catch (error) {
        handleClickSnack(error?.response.data);
        console.log(error?.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchSkillsData(userId));
      }
    },
    [token]
  );

  const deleteData = useCallback(
    async (id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          skill_id: id,
        },
      };

      try {
        // setLoading(true);
        const response = await axiosInstance.delete(`endorsement`, config);
        console.log(response.data);
        handleClickSnack(response.data);
      } catch (error) {
        handleClickSnack(error?.response.data);
        console.log(error?.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchSkillsData(userId));
      }
    },
    [token]
  );

  // Add skill form
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const noSkillsMatch = "No skills match";

  // Loading State
  const [loading, setLoading] = useState(false);

  // const suggestedHandler = async (value) => {
  //   setValue(value);

  //   // Call the searchSkills function here
  //   const selectedId = await searchSkills(token, value, true);

  //   // Then select the value
  //   if (selectedId) {
  //     formik.setFieldValue("skill", selectedId);
  //   } else {
  //     formik.setFieldValue("skill", "");
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      skill: "",
    },
    validationSchema: validationsForm,
    onSubmit: (values, { setSubmitting }) => {
      if (values.skill === null || values.skill === noSkillsMatch) {
        // Handle "No skills match" validation
        formik.setFieldError("skill", "Please select a valid skill");
        setSubmitting(false);
        return;
      }

      try {
        // Submit to the server
        AddSkill(token, values);
        setSubmitting(false);
      } catch (error) {
        // Handle error
        console.log(error);
        setSubmitting(false);
      }
    },
  });

  const searchSkills = useCallback(
    async (token, value, isSuggested = false) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        setLoading(true);
        const response = await axiosInstance.post(
          `search`,
          {
            key: "skill",
            value: value,
          },
          config
        );
        console.log(response.data);
        setOptions(response.data.payload);

        if (isSuggested) {
          const selectedId = response.data.payload[0].id;
          return selectedId;
        }
        // onSuccess(true);
        // onClose();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        // closeModal();
      }
    },
    [token]
  );

  const debouncedSearchSkills = useCallback(
    debounce((token, inputValue) => {
      if (inputValue !== "") {
        searchSkills(token, inputValue);
      } else {
        setOptions([]);
      }
    }, 1000),
    []
  );

  const AddSkill = useCallback(
    async (token, values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      try {
        setLoading(true);
        const response = await axiosInstance.post(
          `skill_proficiency`,
          {
            skill_id: values.skill,
            level: 1,
          },
          config
        );
        console.log(response.data);
        // onSuccess(true);
        // onClose();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        dispatch(fetchSkillsData(user.id));
        dispatch(fetchSkillsRecommendationData(user.id));
        handleCloseDialog();
      }
    },
    [token]
  );

  useEffect(() => {
    debouncedSearchSkills(token, inputValue);
  }, [debouncedSearchSkills, token, inputValue]);

  const selectValue = useCallback(
    (e, optionName) => {
      const selectedOption = options.find(
        (option) => option.name === optionName
      );

      if (selectedOption) {
        formik.setFieldValue("skill", selectedOption.id);
      } else {
        formik.setFieldValue("skill", "");
      }
    },
    [formik, options]
  );

  // const handleSearch = useCallback(
  //   async (event) => {
  //     event.preventDefault();
  //     formik.handleSubmit(); // Submit the form

  //     if (formik.values.skill === noSkillsMatch) {
  //       return;
  //     }

  //     // Call the searchSkills function here
  //     await searchSkills(token, formik.values.skill);
  //   },
  //   [searchSkills, token, formik]
  // );

  const handleAddSkillInsideDialog = () => {
    // Submit the form
    formik.handleSubmit();

    // Check if the form is valid before closing the dialog
    if (formik.isValid) {
      handleCloseDialog();
    }
    setChosenSkill(null);
    setValue("");
  };

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  const handleSelectedSkills = (value) => {
    setChosenSkill(value);
    formik.setFieldValue("skill", value.skill_id);
    setValue(value.title);
  };

  // Prevent page from going to the top after updating skills
  const [targetId, setTargetId] = useState(null);

  const handleSetTargetId = (id, deleteCase = false) => {
    const index = skills.findIndex((skill) => skill.id === id);
    if (index === 0) {
      setTargetId(skills[index + 1].id);
    } else if (index === skills.length - 1) {
      setTargetId(skills[index - 1].id);
    } else if (deleteCase) {
      setTargetId(skills[index - 1].id);
    } else {
      setTargetId(id);
    }
  };

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetId, skills]);

  return (
    <>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={response?.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {response?.message}
        </Alert>
      </Snackbar>

      <Grid2 container spacing={2} mb={2}>
        <Grid2 item xs={12}>
          <Stack
            sx={{
              position: "relative",
              backgroundColor: "#FAFAFA",
              border: "1px solid #EEEEEE",
              borderRadius: "10px",
              // minHeight: "280px",
              pt: "75px",
              px: "20px",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                position: "absolute",
                top: "20px",
                left: "20px",
                textTransform: "capitalize",
                color: "darkGreen",
              }}
            >
              Your skill profile
            </Typography>

            <Stack className="displayData__section" sx={{ width: "100%" }}>
              {skillsLoading && <CircularProgress />}
              {!skillsLoading && (
                <>
                  {skills.length < 1 ? (
                    <Stack
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <img src={fileIcon} alt="File icon" />

                      <Typography variant="h4" sx={{ color: "#788894" }}>
                        The skills is empty
                      </Typography>
                    </Stack>
                  ) : (
                    <>
                      {lgMatches && <SkillHeadersRow data={tableHeaders} />}

                      <Box className="tableContent__section">
                        {skills.map((skill) => (
                          <SkillTableRow
                            skill={skill}
                            key={skill.id}
                            user={user}
                            sendData={sendData}
                            deleteData={deleteData}
                            isProfile={isProfile}
                            handleSetTargetId={handleSetTargetId}
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </>
              )}
            </Stack>

            {!isProfile && (
              <>
                <Box
                  onClick={handleOpenDialog}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pb: 3,
                    zIndex: "10",
                  }}
                >
                  <Fab
                    id="employee__step__4"
                    sx={{
                      background: "#6AE6A4",
                      "&:hover": {
                        background: "#6AE6A4",
                      },
                    }}
                  >
                    <AddIcon sx={{ color: "#FFFFFF" }} />
                  </Fab>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    PaperProps={{
                      sx: {
                        backgroundColor: "white",
                        py: 2,
                        width: { xs: "300px", md: "800px" },
                      }, // Make dialog background transparent
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

                    <DialogTitle>Add Skill</DialogTitle>

                    <Autocomplete
                      freeSolo
                      id="search_skill"
                      name="search_skill"
                      value={value}
                      options={
                        options.length < 1
                          ? [noSkillsMatch].map((option) => option)
                          : options.map((option) => option.name)
                      }
                      inputValue={inputValue}
                      onInputChange={handleInputChange}
                      onBlur={formik.handleBlur}
                      onChange={(e, value) => selectValue(e, value)}
                      label="Search input"
                      sx={{ mt: "20px", mx: 3 }}
                      renderInput={(params) => (
                        <TextField
                          error={
                            formik.touched.skill && Boolean(formik.errors.skill)
                          }
                          helperText={
                            formik.touched.skill ? formik.errors.skill : ""
                          }
                          name="search_skill"
                          fullWidth
                          placeholder="Search Skill"
                          {...params}
                          type="search"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {params.InputProps.endAdornment}
                                  {loading && <CircularProgress size={20} />}
                                </div>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />

                    <DialogTitle>Suggested Skills</DialogTitle>

                    <DialogContent>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          // justifyContent: { xs: "center" },
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        {skillsRecommendation.length >= 1 && (
                          <Stack
                            sx={{
                              flexDirection: "row",
                              justifyContent: { xs: "center" },
                              alignItems: "center",
                              gap: "12px",
                              flexWrap: "wrap",
                            }}
                          >
                            {skillsRecommendation.map((skill) => (
                              <Box
                                onClick={() => handleSelectedSkills(skill)}
                                key={skill.title}
                                sx={{
                                  background:
                                    chosenSkill?.title === skill?.title
                                      ? "#0C1716"
                                      : "rgba(23, 52, 51, 0.40)",
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
                                  {skill.title}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "center", px: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "center", md: "flex-start" },
                          width: { xs: "100%" },
                          pb: "12px",
                        }}
                      >
                        <Button
                          onClick={handleAddSkillInsideDialog}
                          type="submit"
                          sx={{
                            width: { xs: "100%", sm: "220px" },
                            background: (theme) => theme.palette.accent,
                            color: "darkGreen",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography variant="h6">Add Skill</Typography>
                        </Button>
                      </Box>
                    </DialogActions>
                  </Dialog>
                </form>
              </>
            )}
          </Stack>
        </Grid2>

        {isProfile && (
          <Grid2 item xs={12}>
            <Stack
              sx={{
                position: "relative",
                backgroundColor: "#FAFAFA",
                border: "1px solid #EEEEEE",
                borderRadius: "10px",
                // minHeight: "280px",
                pt: "75px",
                px: "20px",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  textTransform: "capitalize",
                  color: "darkGreen",
                }}
              >
                Skills wishlist
              </Typography>

              <Stack className="displayData__section" sx={{ width: "100%" }}>
                {skillsWishlistLoading && <CircularProgress />}
                {!skillsWishlistLoading && (
                  <>
                    {skillsWishlist.length < 1 ? (
                      <Stack
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <img src={fileIcon} alt="File icon" />

                        <Typography variant="h4" sx={{ color: "#788894" }}>
                          The wishlist is empty
                        </Typography>
                      </Stack>
                    ) : (
                      <>
                        {/* {lgMatches && <SkillHeadersRow data={tableHeaders} />} */}

                        <Box className="tableContent__section">
                          {skillsWishlist.map((skill) => (
                            <SkillTableRow
                              skill={skill}
                              key={skill.id}
                              user={user}
                              skillsWishlist={true}
                            />
                          ))}
                        </Box>
                      </>
                    )}
                  </>
                )}
              </Stack>
            </Stack>
          </Grid2>
        )}
      </Grid2>
    </>
  );
};

export default SkillsOverview;
