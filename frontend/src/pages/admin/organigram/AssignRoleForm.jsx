import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  existingEmployeeFormValidationSchema,
  creatingNewEmployeeFormValidationSchema,
} from "./validations/validationSchema";
import { DatePicker } from "@mui/x-date-pickers";

const stackStyles = {
  flexDirection: { xs: "row" },
  justifyContent: { xs: "space-between" },
  alignItems: { xs: "baseline" },
  minHeight: "82px",
};

const formControlStyles = {
  width: "190px",
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

const initialValues = {
  firstName: "",
  email: "",
  lastName: "",
  phone: "",
  joinDate: new Date(),
  location: "",
};

const AssignRoleForm = ({ data = initialValues, employees = [] }) => {
  const [value, setValue] = useState("");
  const [currentTab, setCurrentTab] = useState("exist_employee");

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
    validationSchema: existingEmployeeFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));

        setSubmitting(false);
      }, 1000);
    },
  });

  const creatingNewEmployeeForm = useFormik({
    initialValues: data,
    validationSchema: creatingNewEmployeeFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));

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

  return (
    <Box sx={{ px: { xs: 2.5 } }}>
      <Stack
        direction="row"
        gap={{ xs: 0, sm: 25.25 }}
        mb={{ xs: 9.375, md: 9.375 }}
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
              fontSize: { xs: "14px", sm: "16px" },
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
              fontSize: { xs: "14px", sm: "16px" },
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

      {currentTab === "exist_employee" ? (
        <form onSubmit={existingEmployeeForm.handleSubmit}>
          <Box mb={4}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="employee"
              mb={2.5}
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
              options={employees.map((option) => option)}
              onBlur={existingEmployeeForm.handleBlur}
              onChange={selectValue}
              label="Search input"
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

            {existingEmployeeForm.isSubmitting && (
              <LinearProgress sx={{ mb: "25px" }} />
            )}

            <Box sx={{ mt: "50px" }}>
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
            </Box>
          </Box>
        </form>
      ) : (
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
              sx={{ flexGrow: 1, mb: "50px" }}
            >
              <Grid2 xs={12} md={6} lg={6}>
                <Stack sx={stackStyles}>
                  <Typography
                    component="label"
                    variant="span"
                    htmlFor="firstName"
                    color={"secondary"}
                    fontWeight={500}
                    sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                  >
                    first name
                  </Typography>
                  <TextField
                    id="firstName"
                    name="firstName"
                    type="text"
                    size="medium"
                    placeholder="First name"
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
                  <Typography
                    component="label"
                    variant="span"
                    htmlFor="email"
                    color={"secondary"}
                    fontWeight={500}
                    sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                  >
                    email
                  </Typography>
                  <TextField
                    id="email"
                    name="email"
                    type="text"
                    size="medium"
                    placeholder="Email"
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
                  <Typography
                    component="label"
                    variant="span"
                    htmlFor="lastName"
                    color={"secondary"}
                    fontWeight={500}
                    sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                  >
                    last name
                  </Typography>
                  <TextField
                    id="lastName"
                    name="lastName"
                    type="text"
                    size="medium"
                    placeholder="Last name"
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
                  <Typography
                    component="label"
                    variant="span"
                    htmlFor="phone"
                    color={"secondary"}
                    fontWeight={500}
                    sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                  >
                    phone
                  </Typography>
                  <TextField
                    id="phone"
                    name="phone"
                    type="text"
                    size="medium"
                    placeholder="Phone"
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
                  <Typography
                    component="label"
                    variant="span"
                    htmlFor="joinDate"
                    color={"secondary"}
                    fontWeight={500}
                    sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                  >
                    join date
                  </Typography>
                  <DatePicker
                    size="medium"
                    value={creatingNewEmployeeForm.values.joinDate}
                    onChange={(value) => {
                      creatingNewEmployeeForm.setFieldValue("joinDate", value);
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
                </Stack>
              </Grid2>

              <Grid2 xs={12} md={6} lg={6}>
                <Stack sx={stackStyles}>
                  <Typography
                    component="label"
                    variant="span"
                    htmlFor="location"
                    color={"secondary"}
                    fontWeight={500}
                    sx={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
                  >
                    location
                  </Typography>
                  <TextField
                    id="location"
                    name="location"
                    type="text"
                    size="medium"
                    placeholder="Location"
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

          {creatingNewEmployeeForm.isSubmitting && (
            <LinearProgress sx={{ mb: "25px" }} />
          )}

          <Box>
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
          </Box>
        </form>
      )}
    </Box>
  );
};

export default AssignRoleForm;
