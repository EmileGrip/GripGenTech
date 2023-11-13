import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { validationsForm } from "./validations/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { useEffect } from "react";
import { fetchJobs } from "../../../redux/slices/internalMobility/addJobFormSlice";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";
import { debounce } from "lodash";

const AddSkillForm = ({
  data,
  open,
  closeModal,
  roles,
  onEdit,
  vacancyRoleId,
  getSelectedSkills,
  onSuccess,
}) => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const noSkillsMatch = "No skills match";
  const dispatch = useDispatch();
  // const [openDialog, setOpenDialog] = useState(false);

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };
  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

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
      fullSkillObj: null,
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
        if (onEdit) {
          sendData(token, values);
        } else {
          getSelectedSkills({
            ...values.fullSkillObj,
            title: values.fullSkillObj.name,
            level: 1,
          });
          closeModal();
        }
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
        console.log(error?.response.data);
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

  const sendData = useCallback(
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
          `vacancy_skill`,
          {
            vacancy_role_id: vacancyRoleId,
            skill_ref: values.skill,
            level: 1,
          },
          config
        );
        console.log(response.data);
        onSuccess(response.data);
      } catch (error) {
        onSuccess(error?.response.data);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        if (roles) {
          dispatch(fetchProjects());
        } else {
          dispatch(fetchJobs());
        }
        closeModal();
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
        formik.setFieldValue("fullSkillObj", selectedOption);
        formik.setFieldValue("skill", selectedOption.id);
      } else {
        formik.setFieldValue("fullSkillObj", null);
        formik.setFieldValue("skill", "");
      }
    },
    [formik, options]
  );

  const handleSearch = useCallback(
    async (event) => {
      event.preventDefault();
      formik.handleSubmit(); // Submit the form

      if (formik.values.skill === noSkillsMatch) {
        return;
      }

      // Call the searchSkills function here
      await searchSkills(token, formik.values.skill);
    },
    [searchSkills, token, formik]
  );

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  return (
    <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
      <Dialog
        open={open}
        onClose={closeModal}
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
          onClick={closeModal}
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
          sx={{ my: "20px", mx: 3 }}
          renderInput={(params) => (
            <TextField
              error={formik.touched.skill && Boolean(formik.errors.skill)}
              helperText={formik.touched.skill ? formik.errors.skill : ""}
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
              onClick={handleSearch}
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
    </Stack>
  );
};

export default AddSkillForm;
