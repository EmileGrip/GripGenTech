import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import SuggestedSkillChip from "./SuggestedSkillChip";
import { useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { validationsForm } from "./validations/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { useEffect } from "react";
import { fetchSkillsData } from "../../../redux/slices/Employee/mySkills/mySkillsActions";

const formControlWrapperStyle = {
  minHeight: "140px",
  mb: 9.375,
};

const AddSkillForm = ({ data, closeModal }) => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const noSkillsMatch = "No skills match";

  // Loading State
  const [loading, setLoading] = useState(false);

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

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
        sendData(token, values);
        setSubmitting(false);
      } catch (error) {
        // Handle error
        console.log(error);
        setSubmitting(false);
      }
    },
  });

  const searchSkills = useCallback(
    async (token, value) => {
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
        dispatch(fetchSkillsData(userInfo.id));
        closeModal();
      }
    },
    [token]
  );

  useEffect(() => {
    if (inputValue !== "") {
      searchSkills(token, inputValue);
    } else {
      setOptions([]);
    }
  }, [searchSkills, token, inputValue]);

  const selectValue = useCallback(
    (e, optionName) => {
      const selectedOption = options.find(
        (option) => option.name === optionName
      );
      const selectedId = selectedOption ? selectedOption.id : null;
      formik.setFieldValue("skill", selectedId);
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
    <form onSubmit={handleSearch}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Box sx={formControlWrapperStyle}>
          <Typography
            variant="h3"
            component="label"
            htmlFor="search_skill"
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            search skills
          </Typography>
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
            sx={{ mt: "16px" }}
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {params.InputProps.endAdornment}
                        {loading && <CircularProgress size={20} />}
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Box>
          <Typography
            variant="h3"
            component="label"
            htmlFor="search_skill"
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            suggested skills
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ flexGrow: 1, mt: "16px" }}
            mb={"50px"}
          >
            {data.map((skill) => (
              <Grid2 key={skill.skill_id} xs={4}>
                <SuggestedSkillChip
                  title={skill.title}
                  onClick={() => suggestedHandler(skill.title)}
                >
                  {skill.title}
                </SuggestedSkillChip>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontSize: "14px",
              px: "50px",
            }}
          >
            add skill
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default AddSkillForm;
