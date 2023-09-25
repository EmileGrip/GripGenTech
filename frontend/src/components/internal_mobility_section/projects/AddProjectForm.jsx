import { Button, Divider, Fab, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import editIcon from "../../../assets/edit_icon.svg";
import { useFormik } from "formik";
import Description from "../jobs/Description";
import Details from "../jobs/Details";
import Skills from "../jobs/Skills";
import { jobs } from "../../../data/jobsData";
import {
  roleValidationSchema,
  validationSchema,
} from "./validations/validationSchema";
import {
  ADMIN_PROJECT_OVERVIEW_ROUTE,
  EMPLOYEE_PROJECT_OVERVIEW_ROUTE,
  MANAGER_PROJECT_OVERVIEW_ROUTE,
} from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjectFormInfo } from "../../../redux/slices/internalMobility/addProjectFormSlice";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const parts = date.toLocaleString("en-US", options).split("/");
  return `${parts[1]}/${parts[0]}/${parts[2]}`;
}

const AddProjectForm = () => {
  const [showRole, setShowRole] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const projectOverviewLink =
    currentFlow === "employee"
      ? EMPLOYEE_PROJECT_OVERVIEW_ROUTE
      : currentFlow === "manager"
      ? MANAGER_PROJECT_OVERVIEW_ROUTE
      : currentFlow === "admin"
      ? ADMIN_PROJECT_OVERVIEW_ROUTE
      : "/"; // Default URL or handle other cases here

  const handleRoleOpen = () => setShowRole(true);
  const handleRoleClose = () => setShowRole(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      department: "",
      startDate: null,
      endDate: null,
      description: "",
      role: "",
      roleStartDate: null,
      roleEndDate: null,
      hours: "",
      salary: "",
      roleDescription: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // submit to the server
    },
  });

  const addRoleFormik = useFormik({
    initialValues: {
      role: "",
      startDate: null,
      endDate: null,
      hours: "",
      salary: "",
      description: "",
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // submit to the server
    },
  });

  useEffect(() => {
    formik.setFieldValue("role", addRoleFormik.values.role);
    formik.setFieldValue("roleStartDate", addRoleFormik.values.startDate);
    formik.setFieldValue("roleEndDate", addRoleFormik.values.endDate);
    formik.setFieldValue("hours", addRoleFormik.values.hours);
    formik.setFieldValue("salary", addRoleFormik.values.salary);
    formik.setFieldValue("roleDescription", addRoleFormik.values.description);
  }, [
    addRoleFormik.values.role,
    addRoleFormik.values.startDate,
    addRoleFormik.values.endDate,
    addRoleFormik.values.hours,
    addRoleFormik.values.salary,
    addRoleFormik.values.description,
  ]);

  const handleOverviewClick = (e) => {
    formik.validateForm().then((errors) => {
      if (
        !errors.name &&
        !errors.description &&
        formik.values.roleStartDate &&
        formik.values.roleDescription
      ) {
        dispatch(
          setProjectFormInfo({
            name: formik.values.name,
            department: formik.values.department,
            startDate: formik.values.startDate
              ? formatDate(formik.values.startDate)
              : null,
            endDate: formik.values.endDate
              ? formatDate(formik.values.endDate)
              : null,
            description: formik.values.description,
            role: formik.values.role,
            roleStartDate: formik.values.roleStartDate
              ? formatDate(formik.values.roleStartDate)
              : null,
            roleEndDate: formik.values.roleEndDate
              ? formatDate(formik.values.roleEndDate)
              : null,
            hours: formik.values.hours,
            salary: formik.values.salary,
            roleDescription: formik.values.roleDescription,
          })
        );
        navigate(projectOverviewLink);
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <>
      <Stack sx={{ gap: 3 }}>
        <Typography variant="h2" color="#173433">
          New Project
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack sx={{ gap: 3 }}>
            <Details formik={formik} projects={true} />

            <Description formik={formik} />
          </Stack>
        </form>

        <Typography variant="h2" color="#173433">
          Roles
        </Typography>

        {showRole ? (
          <form onSubmit={addRoleFormik.handleSubmit}>
            <Stack sx={{ gap: 3 }}>
              <Details formik={addRoleFormik} roles={true} />

              <Description formik={addRoleFormik} roles={true} />

              <Skills roles={true} />

              <Button
                type="submit"
                disabled={addRoleFormik.isSubmitting}
                sx={{
                  width: { xs: "100%", sm: "190px" },
                  background: (theme) => theme.palette.accent,
                }}
              >
                <Typography variant="h6" textTransform="none" py={0.5}>
                  Add role
                </Typography>
              </Button>
            </Stack>
          </form>
        ) : (
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: { xs: "center", lg: "flex-start" },
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {jobs.length >= 1 &&
              jobs.map((job) => (
                <Stack
                  key={job.id}
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#FAFAFA",
                    border: "2px solid #EEEEEE",
                    borderRadius: "10px",
                    width: "275px",
                    height: "50px",
                    py: "12px",
                    px: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="darkGreen"
                    sx={{
                      fontSize: "18px",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "80%",
                    }}
                  >
                    {job.title}
                  </Typography>

                  <img src={editIcon} alt="Edit icon" />
                </Stack>
              ))}

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#FAFAFA",
                border: "2px solid #EEEEEE",
                borderRadius: "10px",
                width: "275px",
                height: "50px",
                py: "12px",
                px: "20px",
              }}
            >
              <Typography variant="h5" color="#788894">
                Add new role
              </Typography>

              <Fab
                onClick={handleRoleOpen}
                sx={{
                  width: "30px",
                  height: "30px",
                  background: "#6AE6A4",
                  "&:hover": {
                    background: "#6AE6A4",
                  },
                }}
              >
                <AddIcon sx={{ color: "#FFFFFF" }} />
              </Fab>
            </Stack>
          </Stack>
        )}

        {!formik.values.roleStartDate && !formik.values.roleDescription && (
          <Typography
            sx={{
              color: "#d32f2f",
              mx: "14px",
              fontSize: "0.8571428571428571rem",
            }}
          >
            Role is required
          </Typography>
        )}

        <Divider sx={{ borderBottom: "2px solid #EEEEEE" }} />

        <Stack sx={{ flexDirection: { sm: "row" }, gap: { xs: 2, sm: 4 } }}>
          <Button
            onClick={handleOverviewClick}
            sx={{
              width: { xs: "100%", sm: "190px" },
              background: (theme) => theme.palette.accent,
            }}
          >
            <Typography variant="h6" textTransform="none" py={0.5}>
              Overview project
            </Typography>
          </Button>

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
        </Stack>
      </Stack>
    </>
  );
};

export default AddProjectForm;
