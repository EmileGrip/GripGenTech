import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchSkillProfileRecommendationData } from "../../../redux/slices/admin/skillProfile/skillProfileActions";
import { setDefaultSkills } from "../../../redux/slices/admin/skillProfile/skillProfileSlice";
import { fetchJobs } from "../../../redux/slices/internalMobility/addJobFormSlice";
import {
  ADMIN_JOBS_ROUTE,
  EMPLOYEE_JOBS_ROUTE,
  MANAGER_JOBS_ROUTE,
} from "../../../routes/paths";
import Description from "./Description";
import Details from "./Details";
import Skills from "./Skills";
import validationSchema from "./validations/validationSchema";

function formatDate(date) {
  if (date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const parts = date.toLocaleString("en-US", options).split("/");
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  }
}

const AddJobForm = ({ onEdit, handleEditClose, data, id, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const noDepartmentsMatch = "No departments match";
  const noRolesMatch = "No roles match";
  const job = data?.filter((job) => job.id == id)[0];
  const dispatch = useDispatch();

  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const jobsLink =
    currentFlow === "employee"
      ? EMPLOYEE_JOBS_ROUTE
      : currentFlow === "manager"
      ? MANAGER_JOBS_ROUTE
      : currentFlow === "admin"
      ? ADMIN_JOBS_ROUTE
      : "/"; // Default URL or handle other cases here

  useEffect(() => {
    dispatch(setDefaultSkills());
  }, []);

  useEffect(() => {
    const startDate = new Date(job?.role?.start_date);
    const endDate = new Date(job?.role?.end_date);

    formik.setValues({
      department: job?.department || "",
      role: job?.role?.id || "",
      startDate: startDate || null,
      endDate: endDate || null,
      hours: job?.role?.hours || "",
      salary: job?.role?.salary || "",
      description: job?.role?.description || "",
    });
  }, [job]);

  const formik = useFormik({
    initialValues: {
      department: "",
      role: "",
      startDate: null,
      endDate: null,
      hours: "",
      salary: "",
      description: "",
      skills: [],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // submit to the server
      if (values.role === "" || values.role === noRolesMatch) {
        // Handle "No roles match" validation
        formik.setFieldError("role", "Please select a valid role");
        setSubmitting(false);
        return;
      }

      if (onEdit) {
        try {
          // Use Promise.all to wait for both requests to complete
          await Promise.all([
            editDepartment(token, values),
            editRole(token, values),
          ]);

          // Both requests succeeded, you can close the form here
          handleEditClose();
        } catch (error) {
          // Handle error
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      } else {
        try {
          await sendData(token, values);

          // Reset form values to their initial state
          resetForm();
        } catch (error) {
          // Handle error
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }
    },
  });

  const [skills, setSkills] = useState([]);
  const getSkills = (value) => {
    setSkills(value);
    formik.setFieldValue("skills", value);
  };

  useEffect(() => {
    if (formik.values.role && !onEdit) {
      dispatch(fetchSkillProfileRecommendationData(formik.values.role));
    }
  }, [formik.values.role, onEdit]);

  const sendData = useCallback(
    async (token, values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const formatStartDate = formatDate(values.startDate);
      let formatEndDate = null;

      if (values.endDate instanceof Date && !isNaN(values.endDate)) {
        formatEndDate = formatDate(values.endDate);
      }

      // Create a function to filter out keys with empty string or null values
      const removeEmptyKeys = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== "" && v !== null)
        );

      const requestBody = removeEmptyKeys({
        department: values.department,
        job_profile_id: values.role,
        start_date: formatStartDate,
        end_date: formatEndDate,
        hours: values.hours,
        salary: values.salary,
        description: values.description,
        skills: values.skills?.map((skill) => ({
          skill_ref: skill.id,
          level: skill.level,
        })),
      });

      try {
        setLoading(true);
        const response = await axiosInstance.post(
          `job_vacancy`,
          requestBody,
          config
        );
        console.log(skills);
        console.log(response.data);
        setResponse(response.data);
        handleClickSnack();
      } catch (error) {
        setResponse(error?.response.data);
        handleClickSnack();
        console.log(error?.response.data);
      } finally {
        setLoading(false);
        dispatch(fetchJobs());
      }
    },
    [token]
  );

  const editDepartment = useCallback(
    async (token, values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      // Create a function to filter out keys with empty string or null values
      const removeEmptyKeys = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== "" && v !== null)
        );

      const requestBody = removeEmptyKeys({
        id: job?.id,
        department: values.department,
      });

      try {
        setLoading(true);
        const response = await axiosInstance.put(
          `job_vacancy`,
          requestBody,
          config
        );
        console.log(response.data);
        onSuccess(response.data);
      } catch (error) {
        onSuccess(error?.response.data);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        dispatch(fetchJobs());
      }
    },
    [token]
  );

  const editRole = useCallback(
    async (token, values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const formatStartDate = formatDate(values.startDate);
      const formatEndDate = formatDate(values.endDate);

      // Create a function to filter out keys with empty string or null values
      const removeEmptyKeys = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== "" && v !== null)
        );

      const requestBody = removeEmptyKeys({
        id: job?.role?.id,
        title: values.title,
        start_date: formatStartDate,
        end_date: formatEndDate,
        hours: values.hours,
        salary: values.salary,
        description: values.description,
      });

      try {
        setLoading(true);
        const response = await axiosInstance.put(
          `vacancy_role`,
          requestBody,
          config
        );
        console.log(response.data);
        onSuccess(response.data);
      } catch (error) {
        onSuccess(error?.response.data);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        dispatch(fetchJobs());
      }
    },
    [token]
  );

  // Snackbar handlers
  const [openSnack, setOpenSnack] = useState(false);
  const handleClickSnack = (value) => {
    if (value) {
      setResponse(value);
    }
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

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

      <form onSubmit={formik.handleSubmit}>
        <Stack sx={{ gap: 3 }}>
          <Typography variant="h2" color="#173433">
            {onEdit ? "Edit Job" : "New Job"}
          </Typography>

          <Details data={job} formik={formik} />

          <Description formik={formik} />

          <Skills
            onEdit={onEdit}
            vacancyRoleId={job?.role?.id}
            jobProfileId={job?.role?.job_profile_id}
            getSkills={getSkills}
            data={job?.role?.skills}
            onSuccess={handleClickSnack}
          />

          <Stack
            sx={{
              flexDirection: { sm: "row" },
              alignItems: { sm: "center" },
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              sx={{
                width: { xs: "100%", sm: "190px" },
                background: (theme) => theme.palette.accent,
              }}
            >
              <Typography variant="h6" textTransform="none" py={0.5}>
                Submit for approval
              </Typography>
            </Button>

            {onEdit ? (
              <Button
                onClick={handleEditClose}
                sx={{
                  width: { xs: "100%", sm: "190px" },
                  border: "1px solid #788894",
                }}
              >
                <Typography
                  variant="h6"
                  textTransform="none"
                  color="#788894"
                  py={0.5}
                >
                  Cancel
                </Typography>
              </Button>
            ) : (
              <Link to={jobsLink}>
                <Button
                  sx={{
                    width: { xs: "100%", sm: "190px" },
                    border: "1px solid #788894",
                  }}
                >
                  <Typography
                    variant="h6"
                    textTransform="none"
                    color="#788894"
                    py={0.5}
                  >
                    Cancel
                  </Typography>
                </Button>
              </Link>
            )}

            {loading && <CircularProgress size={20} />}
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default AddJobForm;
