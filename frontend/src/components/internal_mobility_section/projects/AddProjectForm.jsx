import {
  Alert,
  Button,
  Divider,
  Fab,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import editIcon from "../../../assets/edit_icon.svg";
import { useFormik } from "formik";
import Description from "../jobs/Description";
import Details from "../jobs/Details";
import Skills from "../jobs/Skills";
import {
  validationSchema,
  roleValidationSchema,
} from "./validations/validationSchema";
import {
  ADMIN_PROJECT_OVERVIEW_ROUTE,
  EMPLOYEE_PROJECT_OVERVIEW_ROUTE,
  MANAGER_PROJECT_OVERVIEW_ROUTE,
} from "../../../routes/paths";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenProjectSnack,
  setProjectFormInfo,
  setProjectResponse,
} from "../../../redux/slices/internalMobility/addProjectFormSlice";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchProjects } from "../../../redux/slices/internalMobility/addProjectFormActions";

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const parts = date.toLocaleString("en-US", options).split("/");
  return `${parts[2]}-${parts[0]}-${parts[1]}`;
}

const AddProjectForm = ({ onEdit, handleEditClose, data, id }) => {
  const [chosenRole, setChosenRole] = useState(null);
  const [showRole, setShowRole] = useState(false);
  const project = data?.filter((project) => project.id == id)[0];
  const [response, setResponse] = useState(null);
  const noDepartmentsMatch = "No departments match";
  const noRolesMatch = "No roles match";
  const { token } = useSelector((state) => state.auth);
  const {
    name,
    department,
    startDate,
    endDate,
    description,
    roles: currentProjectsRoles,
  } = useSelector((state) => state.addProjectForm);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [skills, setSkills] = useState([]);
  const getSkills = (value) => {
    setSkills(value);
    addRoleFormik.setFieldValue("skills", value);
  };

  const [roles, setRoles] = useState(
    onEdit ? project?.roles : currentProjectsRoles
  );

  useEffect(() => {
    const formaStartDate = startDate
      ? new Date(startDate)
      : project?.start_date
      ? new Date(project?.start_date)
      : null;
    const formatEndDate = endDate
      ? new Date(endDate)
      : project?.end_date
      ? new Date(project?.end_date)
      : null;

    formik.setValues({
      name: project?.name || name || "",
      department: project?.department || department || "",
      startDate: formaStartDate,
      endDate: formatEndDate,
      description: project?.description || description || "",
      roles:
        roles?.length > 1
          ? roles?.map((role) => {
              return {
                role: role?.id,
                roleStartDate: new Date(role?.start_date),
                roleEndDate: new Date(role?.end_date),
                hours: role?.hours,
                salary: role?.salary,
                roleDescription: role?.description,
                skills: role?.skills,
              };
            })
          : [],
    });
  }, [project]);

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
  const handleRoleClose = () => {
    setShowRole(false);
    setChosenRole(null);
    addRoleFormik.setFieldValue("role", "");
    addRoleFormik.setFieldValue("fullRoleObj", null);
    addRoleFormik.setFieldValue("startDate", null);
    addRoleFormik.setFieldValue("endDate", null);
    addRoleFormik.setFieldValue("hours", "");
    addRoleFormik.setFieldValue("salary", "");
    addRoleFormik.setFieldValue("description", "");
    getSkills([]);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      department: "",
      startDate: null,
      endDate: null,
      description: "",
      roles: [
        {
          job_profile_id: "",
          description: "",
          start_date: null,
          end_date: null,
          hours: "",
          salary: "",
          skills: [
            {
              skill_ref: "",
              level: "",
            },
          ],
        },
      ],
      role: "",
      roleStartDate: null,
      roleEndDate: null,
      hours: "",
      salary: "",
      roleDescription: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // submit to the server
      if (
        values.department === "" ||
        values.department === noDepartmentsMatch
      ) {
        // Handle "No departments match" validation
        formik.setFieldError("department", "Please select a valid department");
        setSubmitting(false);
        return;
      }

      if (values.role === "" || values.role === noRolesMatch) {
        // Handle "No roles match" validation
        formik.setFieldError("role", "Please select a valid role");
        setSubmitting(false);
        return;
      }

      // if (onEdit) {
      //   // try {
      //   //   // Use Promise.all to wait for both requests to complete
      //   //   await Promise.all([
      //   //     editDepartment(token, values),
      //   //     editRole(token, values),
      //   //   ]);
      //   //   // Both requests succeeded, you can close the form here
      //   //   handleEditClose();
      //   //   // Reset form values to their initial state
      //   //   resetForm();
      //   // } catch (error) {
      //   //   // Handle error
      //   //   console.log(error);
      //   // } finally {
      //   //   setSubmitting(false);
      //   // }
      // } else {
      //   try {
      //     // await sendData(token, values);

      //     // Reset form values to their initial state
      //     resetForm();
      //   } catch (error) {
      //     // Handle error
      //     console.log(error);
      //   } finally {
      //     setSubmitting(false);
      //   }
      // }
    },
  });

  const addRoleFormik = useFormik({
    initialValues: {
      role: "",
      fullRoleObj: null,
      startDate: null,
      endDate: null,
      hours: "",
      salary: "",
      description: "",
      skills: [],
    },
    validationSchema: roleValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // submit to the server
      if (onEdit) {
        editRole(token, values, chosenRole?.id);
        handleRoleClose();
      } else {
        const formatStartDate = values.startDate
          ? formatDate(values?.startDate)
          : null;
        const formatEndDate = values.endDate
          ? formatDate(values?.endDate)
          : null;

        const roleIndex = roles.findIndex((role) => role.id === values.role);
        if (roleIndex !== -1) {
          // Create a copy of the roles array
          const updatedRoles = [...roles];
          const currentSkills = updatedRoles[roleIndex].skills;

          // Create a map to quickly check if a skill ID exists
          const skillIdMap = {};
          currentSkills.forEach((skill) => {
            skillIdMap[skill.id] = true;
          });

          // Update or add skills based on whether they already exist
          const updatedSkills = values.skills.map((skill) => ({
            id: skill.id,
            title: skill.title,
            skill_ref: skill.id,
            level: 1,
          }));

          updatedSkills.forEach((skill) => {
            if (!skillIdMap[skill.id]) {
              // Skill doesn't exist, add it
              currentSkills.push(skill);
            } else {
              // Skill exists, update it if needed
              const existingSkillIndex = currentSkills.findIndex(
                (existingSkill) => existingSkill.id === skill.id
              );
              if (existingSkillIndex !== -1) {
                currentSkills[existingSkillIndex] = skill;
              }
            }
          });

          // Update the specific role with the new data
          updatedRoles[roleIndex] = {
            ...updatedRoles[roleIndex],
            id: values.role,
            title: values.fullRoleObj.title,
            job_profile_id: values.role,
            description: values.description,
            start_date: formatStartDate,
            end_date: formatEndDate,
            hours: values.hours,
            salary: values.salary,
            skills: currentSkills, // Update the skills array
          };

          // Update the state with the modified array
          setRoles(updatedRoles);
        } else {
          // Role doesn't exist, create a new role
          setRoles([
            ...roles,
            {
              id: values.role,
              title: values.fullRoleObj.title,
              job_profile_id: values.role,
              description: values.description,
              start_date: formatStartDate,
              end_date: formatEndDate,
              hours: values.hours,
              salary: values.salary,
              skills: values.skills.map((skill) => ({
                id: skill.id,
                title: skill.title,
                skill_ref: skill.id,
                level: 1,
              })),
            },
          ]);
        }

        handleRoleClose();
        resetForm();
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("roles", roles);
  }, [roles]);

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
    if (onEdit) {
      editData(token, formik.values);
      handleEditClose();
    } else {
      formik.validateForm().then((errors) => {
        if (
          !errors.name &&
          !errors.department &&
          !errors.startDate &&
          !errors.description &&
          roles?.length >= 1
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
              roles: formik.values.roles,
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
    }
  };

  const editData = useCallback(
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
      try {
        // setLoading(true);
        const response = await axiosInstance.put(
          `project_vacancy`,
          {
            id: project?.id,
            name: values.name,
            department: values.department,
            description: values.description,
            start_date: formatStartDate,
            end_date: formatEndDate,
          },
          config
        );
        console.log(response.data);
        dispatch(setOpenProjectSnack(true));
        dispatch(setProjectResponse(response.data));
      } catch (error) {
        dispatch(setOpenProjectSnack(true));
        dispatch(setProjectResponse(error?.response.data));
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchProjects());
      }
    },
    [token]
  );

  const editRole = useCallback(
    async (token, values, id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const formatStartDate = formatDate(values.startDate);
      const formatEndDate = formatDate(values.endDate);
      try {
        // setLoading(true);
        const response = await axiosInstance.put(
          `vacancy_role`,
          {
            id,
            title: values.title,
            start_date: formatStartDate,
            end_date: formatEndDate,
            hours: values.hours,
            salary: values.salary,
            description: values.description,
          },
          config
        );
        console.log(response.data);
        handleClickSnack(response.data);
      } catch (error) {
        handleClickSnack(error?.response.data);
        console.log(error.response.data);
      } finally {
        // setLoading(false);
        dispatch(fetchProjects());
      }
    },
    [token]
  );

  const handleEdit = (role) => {
    setChosenRole(role);
    handleRoleOpen(true);
    addRoleFormik.setFieldValue("role", role?.job_profile_id);
    addRoleFormik.setFieldValue("fullRoleObj", {
      id: role?.job_profile_id,
      title: role?.title,
    });
    addRoleFormik.setFieldValue(
      "startDate",
      role?.start_date ? new Date(role?.start_date) : null
    );
    addRoleFormik.setFieldValue(
      "endDate",
      role?.end_date ? new Date(role?.end_date) : null
    );
    addRoleFormik.setFieldValue("hours", role?.hours ? role?.hours : "");
    addRoleFormik.setFieldValue("salary", role?.salary ? role?.salary : "");
    addRoleFormik.setFieldValue("description", role?.description);
    getSkills(role?.skills);
  };

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
  const updatedSkills = project?.roles?.filter(
    (role) => role.id === chosenRole?.id
  )[0]?.skills;

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

      <Stack sx={{ gap: 3 }}>
        <Typography variant="h2" color="#173433">
          {onEdit ? "Edit Project" : "New Project"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack sx={{ gap: 3 }}>
            <Details formik={formik} projects={true} data={project} />

            <Description formik={formik} />
          </Stack>
        </form>

        <Typography variant="h2" color="#173433">
          Roles
        </Typography>

        {showRole ? (
          <form onSubmit={addRoleFormik.handleSubmit}>
            <Stack sx={{ gap: 3 }}>
              <Details
                formik={addRoleFormik}
                roles={true}
                chosenRole={chosenRole}
              />

              <Description formik={addRoleFormik} roles={true} />

              <Skills
                roles={true}
                onEdit={onEdit}
                vacancyRoleId={chosenRole?.id}
                getSkills={getSkills}
                data={onEdit ? updatedSkills : skills}
                onSuccess={handleClickSnack}
              />

              <Stack
                sx={{ flexDirection: { sm: "row" }, gap: { xs: 2, sm: 4 } }}
              >
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

                <Button
                  onClick={handleRoleClose}
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
            {roles?.length >= 1 &&
              roles?.map((role) => (
                <Stack
                  key={role?.title}
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
                    {role?.title}
                  </Typography>

                  <img
                    onClick={() => handleEdit({ ...role, editRole: true })}
                    src={editIcon}
                    alt="Edit icon"
                    style={{ cursor: "pointer" }}
                  />
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

        {roles?.length < 1 && (
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
              {onEdit ? "Edit" : "Overview project"}
            </Typography>
          </Button>

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
        </Stack>
      </Stack>
    </>
  );
};

export default AddProjectForm;
