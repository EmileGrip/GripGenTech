import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  existingEmployeeFormValidationSchema,
  creatingNewEmployeeFormValidationSchema,
} from "./validations/validationSchema";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";
import { fetchUsers } from "../../../redux/slices/admin/users/usersActions";

const stackStyles = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "baseline",
  minHeight: "82px",
};

const formControlStyles = {
  width: { xs: "100%", lg: "190px" },
  maxWidth: "368px",
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

const initialValues = {
  firstName: "",
  email: "",
  lastName: "",
  phone: "",
  joinDate: null,
  location: "",
  gender: [],
  role: [],
};

const genders = ["male", "female"];
const roles = ["employee", "admin", "manager"];

const AssignRoleForm = ({ data, closeModal }) => {
  const [value, setValue] = useState("");
  const [currentTab, setCurrentTab] = useState("exist_employee");
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [existingEmployees, setExistingEmployess] = useState([]);
  const dispatch = useDispatch();

  // Loading State
  const [loading, setLoading] = useState(false);

  const toggleTab = (value) => {
    setCurrentTab(value);
  };

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

  const existingEmployeeForm = useFormik({
    initialValues: {
      employee: "",
    },
    // validationSchema: existingEmployeeFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        // alert(JSON.stringify(values, null, 2));
        editData(token, values.employee.id);
        setSubmitting(false);
      }, 1000);
    },
  });

  const creatingNewEmployeeForm = useFormik({
    initialValues: initialValues,
    validationSchema: creatingNewEmployeeFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        // alert(JSON.stringify(values, null, 2));
        sendData(token, values);
        setSubmitting(false);
      }, 1000);
    },
  });

  const selectValue = (e, value) => {
    existingEmployeeForm.setFieldValue(
      "employee",
      value !== null ? value : null
    );
  };

  const handleGenderChange = (event) => {
    const { checked, value } = event.target;
    const gender = value.toLowerCase();

    if (checked) {
      creatingNewEmployeeForm.setFieldValue("gender", [gender]);
    } else {
      creatingNewEmployeeForm.setFieldValue("gender", []);
    }
  };

  const handleRoleChange = (event) => {
    const { checked, value } = event.target;
    const role = value.toLowerCase();

    if (checked) {
      creatingNewEmployeeForm.setFieldValue("role", [role]);
    } else {
      creatingNewEmployeeForm.setFieldValue("role", []);
    }

    // if (checked) {
    //   creatingNewEmployeeForm.setFieldValue("role", [
    //     ...creatingNewEmployeeForm.values.role,
    //     lowercaseValue,
    //   ]);
    // } else {
    //   creatingNewEmployeeForm.setFieldValue(
    //     "role",
    //     creatingNewEmployeeForm.values.role.filter(
    //       (role) => role !== lowercaseValue
    //     )
    //   );
    // }
  };

  const { token, userInfo } = useSelector((state) => state.auth);
  // Fetch employees
  const fetchUsersData = useCallback(async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.get("user", config);
      setExistingEmployess(response.data.payload.data);
      console.log(response.data.payload.data);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }, []);

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
          `user`,
          {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone,
            // joinDate: values.joinDate,
            location: values.location,
            gender: values.gender[0].toLowerCase(),
            system_role: values.role[0].toLowerCase(),
            company_id: userInfo.company_id,
          },
          config
        );
        console.log(response.data);
        if (data) {
          editData(token, response.data.payload.id);
        }
        // onSuccess(true);
        // onClose();
        // onFetch();
      } catch (error) {
        // onSuccess(false);
        console.log(error.response.data);
      } finally {
        setLoading(false);
        if (data) {
          dispatch(fetchData(token));
        } else {
          dispatch(fetchUsers(token));
        }
        closeModal();
      }
    },
    [token]
  );

  const editData = useCallback(async (token, userId) => {
    console.log(userId);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id: data.id,
      },
    };
    try {
      const response = await axiosInstance.put(
        "role",
        {
          user_id: userId,
        },
        config
      );
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchData(token));
      closeModal();
    }
  }, []);

  useEffect(() => {
    fetchUsersData(token);
  }, [token, fetchUsersData]);

  return (
    <Box sx={{ px: { xs: 2.5 } }}>
      {data && (
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: { xs: "space-between", md: "initial" },
            gap: { md: 25.25 },
            mb: { xs: 9.375, md: 9.375 },
          }}
        >
          <Button
            onClick={() => toggleTab("exist_employee")}
            mb={2.5}
            sx={{ borderRadius: 1 }}
          >
            <Typography
              variant="h3"
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 600,
                color:
                  currentTab === "exist_employee"
                    ? "#1E394C"
                    : "rgba(30, 57, 76, 0.5)",
                borderBottom:
                  currentTab === "exist_employee" && "2px solid #1E394C",
              }}
            >
              existing employee
            </Typography>
          </Button>

          <Button
            onClick={() => toggleTab("new_employee")}
            mb={2.5}
            sx={{ borderRadius: 1 }}
          >
            <Typography
              variant="h3"
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 600,
                color:
                  currentTab === "new_employee"
                    ? "#1E394C"
                    : "rgba(30, 57, 76, 0.5)",
                borderBottom:
                  currentTab === "new_employee" && "2px solid #1E394C",
              }}
            >
              create new employee
            </Typography>
          </Button>
        </Stack>
      )}

      {currentTab === "exist_employee" && data ? (
        <form onSubmit={existingEmployeeForm.handleSubmit}>
          <Box mb={4}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="employee"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              existing employee
            </Typography>
            <Autocomplete
              freeSolo
              // disableClearable --> to disable close icon (second icon)
              disableClearable
              id="employee"
              name="employee"
              value={value}
              getOptionLabel={(option) =>
                option
                  ? option.first_name + " " + option.last_name
                  : data.user
                  ? `${data.user.first_name} ${data.user.last_name}`
                  : ""
              }
              renderOption={(props, option, index) => {
                const key = `listItem-${index}-${option.id}`;
                const displayName = option.first_name + " " + option.last_name;
                return (
                  <li {...props} key={key}>
                    {displayName}
                  </li>
                );
              }}
              options={existingEmployees}
              onBlur={existingEmployeeForm.handleBlur}
              onChange={selectValue}
              label="Search input"
              sx={{ mt: "16px" }}
              renderInput={(params) => (
                <TextField
                  error={
                    existingEmployeeForm.touched.employee &&
                    Boolean(existingEmployeeForm.errors.employee)
                  }
                  helperText={
                    existingEmployeeForm.touched.employee
                      ? existingEmployeeForm.errors.employee
                      : ""
                  }
                  name="employee"
                  placeholder="Search Employee"
                  sx={{ minHeight: "82px" }}
                  {...params}
                  type="search"
                  value={existingEmployeeForm.values.employee}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
                mt: "50px",
              }}
            >
              <Button
                type="submit"
                disabled={existingEmployeeForm.isSubmitting}
                variant="contained"
                color="secondary"
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  px: "50px",
                }}
              >
                finish
              </Button>
              {existingEmployeeForm.isSubmitting && <CircularProgress />}
            </Stack>
          </Box>
        </form>
      ) : (
        <>
          <form onSubmit={creatingNewEmployeeForm.handleSubmit}>
            <Box>
              <Typography
                variant="h3"
                mb={3.75}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 400,
                  color: "secondary.main",
                }}
              >
                create new employee
              </Typography>

              <Grid2
                container
                spacing={{ xs: 1, lg: 0 }}
                columnSpacing={{ md: 8, lg: 4 }}
                sx={{ flexGrow: 1 }}
              >
                <Grid2 xs={12} md={6} lg={6}>
                  <Stack sx={stackStyles}>
                    {lgMatches && (
                      <Typography
                        component="label"
                        variant="span"
                        htmlFor="firstName"
                        color={"secondary"}
                        fontWeight={500}
                        sx={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        first name
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                    )}
                    <TextField
                      id="firstName"
                      name="firstName"
                      type="text"
                      size="medium"
                      placeholder="First Name"
                      label={
                        !lgMatches ? (
                          <span>
                            First Name<span style={{ color: "red" }}>*</span>
                          </span>
                        ) : (
                          ""
                        )
                      }
                      value={creatingNewEmployeeForm.values.firstName}
                      onChange={creatingNewEmployeeForm.handleChange}
                      onBlur={creatingNewEmployeeForm.handleBlur}
                      helperText={
                        creatingNewEmployeeForm.touched.firstName
                          ? creatingNewEmployeeForm.errors.firstName
                          : ""
                      }
                      error={
                        creatingNewEmployeeForm.touched.firstName &&
                        Boolean(creatingNewEmployeeForm.errors.firstName)
                      }
                      sx={formControlStyles}
                    />
                  </Stack>
                </Grid2>

                <Grid2 xs={12} md={6} lg={6}>
                  <Stack sx={stackStyles}>
                    {lgMatches && (
                      <Typography
                        component="label"
                        variant="span"
                        htmlFor="email"
                        color={"secondary"}
                        fontWeight={500}
                        sx={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        email
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                    )}
                    <TextField
                      id="email"
                      name="email"
                      type="text"
                      size="medium"
                      placeholder="Email"
                      label={
                        !lgMatches ? (
                          <span>
                            Email<span style={{ color: "red" }}>*</span>
                          </span>
                        ) : (
                          ""
                        )
                      }
                      value={creatingNewEmployeeForm.values.email}
                      onChange={creatingNewEmployeeForm.handleChange}
                      onBlur={creatingNewEmployeeForm.handleBlur}
                      helperText={
                        creatingNewEmployeeForm.touched.email
                          ? creatingNewEmployeeForm.errors.email
                          : ""
                      }
                      error={
                        creatingNewEmployeeForm.touched.email &&
                        Boolean(creatingNewEmployeeForm.errors.email)
                      }
                      sx={formControlStyles}
                    />
                  </Stack>
                </Grid2>

                <Grid2 xs={12} md={6} lg={6}>
                  <Stack sx={stackStyles}>
                    {lgMatches && (
                      <Typography
                        component="label"
                        variant="span"
                        htmlFor="lastName"
                        color={"secondary"}
                        fontWeight={500}
                        sx={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        last name
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                    )}
                    <TextField
                      id="lastName"
                      name="lastName"
                      type="text"
                      size="medium"
                      placeholder="Last Name"
                      label={
                        !lgMatches ? (
                          <span>
                            Last Name<span style={{ color: "red" }}>*</span>
                          </span>
                        ) : (
                          ""
                        )
                      }
                      value={creatingNewEmployeeForm.values.lastName}
                      onChange={creatingNewEmployeeForm.handleChange}
                      onBlur={creatingNewEmployeeForm.handleBlur}
                      helperText={
                        creatingNewEmployeeForm.touched.lastName
                          ? creatingNewEmployeeForm.errors.lastName
                          : ""
                      }
                      error={
                        creatingNewEmployeeForm.touched.lastName &&
                        Boolean(creatingNewEmployeeForm.errors.lastName)
                      }
                      sx={formControlStyles}
                    />
                  </Stack>
                </Grid2>

                <Grid2 xs={12} md={6} lg={6}>
                  <Stack sx={stackStyles}>
                    {lgMatches && (
                      <Typography
                        component="label"
                        variant="span"
                        htmlFor="phone"
                        color={"secondary"}
                        fontWeight={500}
                        sx={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        phone
                      </Typography>
                    )}
                    <TextField
                      id="phone"
                      name="phone"
                      type="text"
                      size="medium"
                      placeholder="Phone"
                      label={!lgMatches ? "Phone" : ""}
                      value={creatingNewEmployeeForm.values.phone}
                      onChange={creatingNewEmployeeForm.handleChange}
                      onBlur={creatingNewEmployeeForm.handleBlur}
                      helperText={
                        creatingNewEmployeeForm.touched.phone
                          ? creatingNewEmployeeForm.errors.phone
                          : ""
                      }
                      error={
                        creatingNewEmployeeForm.touched.phone &&
                        Boolean(creatingNewEmployeeForm.errors.phone)
                      }
                      sx={formControlStyles}
                    />
                  </Stack>
                </Grid2>

                <Grid2 xs={12} md={6} lg={6}>
                  <Stack sx={stackStyles}>
                    {lgMatches && (
                      <Typography
                        component="label"
                        variant="span"
                        htmlFor="joinDate"
                        color={"secondary"}
                        fontWeight={500}
                        sx={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        join date
                      </Typography>
                    )}
                    <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
                      <DatePicker
                        size="medium"
                        label={!lgMatches ? "Join Date" : ""}
                        value={creatingNewEmployeeForm.values.joinDate}
                        onChange={(value) => {
                          creatingNewEmployeeForm.setFieldValue(
                            "joinDate",
                            value
                          );
                        }}
                        maxDate={new Date()}
                        sx={formControlStyles}
                        slot={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              creatingNewEmployeeForm.touched.joinDate &&
                                creatingNewEmployeeForm.errors.joinDate
                            )}
                            helperText={
                              creatingNewEmployeeForm.touched.joinDate &&
                              creatingNewEmployeeForm.errors.joinDate
                            }
                            id="joinDate"
                            name="joinDate"
                          />
                        )}
                      />
                      {creatingNewEmployeeForm.touched.joinDate &&
                      creatingNewEmployeeForm.errors.joinDate ? (
                        <Typography
                          sx={{
                            color: "#d32f2f",
                            mx: "14px",
                            mt: "3px",
                            fontSize: "0.8571428571428571rem",
                          }}
                        >
                          {creatingNewEmployeeForm.errors.joinDate}
                        </Typography>
                      ) : null}
                    </Stack>
                  </Stack>
                </Grid2>

                <Grid2 xs={12} md={6} lg={6}>
                  <Stack sx={stackStyles}>
                    {lgMatches && (
                      <Typography
                        component="label"
                        variant="span"
                        htmlFor="location"
                        color={"secondary"}
                        fontWeight={500}
                        sx={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        location
                      </Typography>
                    )}
                    <TextField
                      id="location"
                      name="location"
                      type="text"
                      size="medium"
                      placeholder="Location"
                      label={!lgMatches ? "Location" : ""}
                      value={creatingNewEmployeeForm.values.location}
                      onChange={creatingNewEmployeeForm.handleChange}
                      onBlur={creatingNewEmployeeForm.handleBlur}
                      helperText={
                        creatingNewEmployeeForm.touched.location
                          ? creatingNewEmployeeForm.errors.location
                          : ""
                      }
                      error={
                        creatingNewEmployeeForm.touched.location &&
                        Boolean(creatingNewEmployeeForm.errors.location)
                      }
                      sx={formControlStyles}
                    />
                  </Stack>
                </Grid2>
              </Grid2>
            </Box>

            <Typography
              variant="h3"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              gender
            </Typography>

            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                textTransform: "capitalize",
              }}
            >
              {genders.map((gender) => (
                <FormControlLabel
                  key={gender}
                  control={
                    <Checkbox
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={handleGenderChange}
                      checked={
                        creatingNewEmployeeForm.values.gender[0] === gender
                      }
                    />
                  }
                  label={gender}
                />
              ))}
            </FormGroup>

            <Typography
              variant="h3"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              role
              <span style={{ color: "red" }}>*</span>
            </Typography>

            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                textTransform: "capitalize",
              }}
            >
              {roles.map((role) => (
                <FormControlLabel
                  key={role}
                  control={
                    <Checkbox
                      id="role"
                      name="role"
                      value={role}
                      onChange={handleRoleChange}
                      checked={creatingNewEmployeeForm.values.role[0] === role}
                    />
                  }
                  label={role}
                />
              ))}
            </FormGroup>

            <Box sx={{ minHeight: "25px", color: "#d32f2f" }}>
              {creatingNewEmployeeForm.errors.role &&
                creatingNewEmployeeForm.touched.role && (
                  <div>{creatingNewEmployeeForm.errors.role}</div>
                )}
            </Box>

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
                my: 3.75,
              }}
            >
              <Button
                type="submit"
                disabled={creatingNewEmployeeForm.isSubmitting}
                variant="contained"
                color="secondary"
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  px: "50px",
                }}
              >
                finish
              </Button>
              {loading && <CircularProgress />}
            </Stack>
          </form>
        </>
      )}
    </Box>
  );
};

export default AssignRoleForm;
