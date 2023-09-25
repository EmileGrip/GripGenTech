import {
  Autocomplete,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers";
import { suggestedJobs } from "../../../data/skillsData";

const boxStyles = {
  minHeight: "82px",
};

const formControlStyles = {
  "& .MuiInputBase-root": { borderRadius: "7px" },
};

const Details = ({ formik, projects = false, roles = false }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const noDepartmentsMatch = "No departments match";
  const noRolesMatch = "No roles match";

  return (
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
        {roles ? "Role Details" : "Details"}
      </Typography>

      <Grid2
        container
        spacing={{ xs: 1, lg: 0 }}
        columnSpacing={{ md: 8, lg: 4 }}
        sx={{ flexGrow: 1 }}
      >
        <Grid2 xs={12} md={6}>
          <Box sx={boxStyles}>
            {projects ? (
              <TextField
                id="name"
                name="name"
                placeholder="Project Name"
                label="Project Name"
                size="medium"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.name ? formik.errors.name : ""}
                error={formik.touched.name && Boolean(formik.errors.name)}
                variant="outlined"
                fullWidth
                sx={{
                  ...formControlStyles,
                }}
              />
            ) : roles ? (
              <Autocomplete
                freeSolo
                id="search_role"
                name="search_role"
                //   value={value}
                options={
                  suggestedJobs.length < 1
                    ? [noRolesMatch].map((option) => option)
                    : suggestedJobs.map((option) => option)
                }
                //   inputValue={inputValue}
                //   onInputChange={handleInputChange}
                onBlur={formik.handleBlur}
                //   onChange={(e, value) => selectValue(e, value)}
                sx={formControlStyles}
                renderInput={(params) => (
                  <TextField
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role ? formik.errors.role : ""}
                    name="search_role"
                    fullWidth
                    label="Search role"
                    placeholder="Search role"
                    {...params}
                    type="search"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {params.InputProps.endAdornment}
                            {/* {loading && <CircularProgress size={20} />} */}
                          </div>

                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            ) : (
              <Autocomplete
                freeSolo
                id="search_department"
                name="search_department"
                //   value={value}
                options={
                  suggestedJobs.length < 1
                    ? [noDepartmentsMatch].map((option) => option)
                    : suggestedJobs.map((option) => option)
                }
                //   inputValue={inputValue}
                //   onInputChange={handleInputChange}
                onBlur={formik.handleBlur}
                //   onChange={(e, value) => selectValue(e, value)}
                sx={formControlStyles}
                renderInput={(params) => (
                  <TextField
                    error={
                      formik.touched.department &&
                      Boolean(formik.errors.department)
                    }
                    helperText={
                      formik.touched.department ? formik.errors.department : ""
                    }
                    name="search_department"
                    fullWidth
                    label="Search Department"
                    placeholder="Search Department"
                    {...params}
                    type="search"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {params.InputProps.endAdornment}
                            {/* {loading && <CircularProgress size={20} />} */}
                          </div>

                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}
          </Box>
        </Grid2>

        <Grid2 xs={12} md={6}>
          {!roles && (
            <Box sx={boxStyles}>
              {projects ? (
                <Autocomplete
                  freeSolo
                  id="department"
                  name="department"
                  //   value={value}
                  options={
                    suggestedJobs.length < 1
                      ? [noDepartmentsMatch].map((option) => option)
                      : suggestedJobs.map((option) => option)
                  }
                  //   inputValue={inputValue}
                  //   onInputChange={handleInputChange}
                  onBlur={formik.handleBlur}
                  //   onChange={(e, value) => selectValue(e, value)}
                  sx={formControlStyles}
                  renderInput={(params) => (
                    <TextField
                      error={
                        formik.touched.department &&
                        Boolean(formik.errors.department)
                      }
                      helperText={
                        formik.touched.department
                          ? formik.errors.department
                          : ""
                      }
                      name="department"
                      fullWidth
                      label="Department"
                      placeholder="Department"
                      {...params}
                      type="search"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {params.InputProps.endAdornment}
                              {/* {loading && <CircularProgress size={20} />} */}
                            </div>

                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  freeSolo
                  id="search_role"
                  name="search_role"
                  //   value={value}
                  options={
                    suggestedJobs.length < 1
                      ? [noRolesMatch].map((option) => option)
                      : suggestedJobs.map((option) => option)
                  }
                  //   inputValue={inputValue}
                  //   onInputChange={handleInputChange}
                  onBlur={formik.handleBlur}
                  //   onChange={(e, value) => selectValue(e, value)}
                  sx={formControlStyles}
                  renderInput={(params) => (
                    <TextField
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role ? formik.errors.role : ""}
                      name="search_role"
                      fullWidth
                      label="Search or add new Role"
                      placeholder="Search or add new Role"
                      {...params}
                      type="search"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {params.InputProps.endAdornment}
                              {/* {loading && <CircularProgress size={20} />} */}
                            </div>

                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            </Box>
          )}
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Box sx={boxStyles}>
            <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
              <DatePicker
                size="medium"
                label="Start date"
                value={formik.values.startDate}
                onChange={(value) => {
                  formik.setFieldValue("startDate", value);
                }}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.startDate && formik.errors.startDate
                    )}
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                    id="startDate"
                    name="startDate"
                  />
                )}
              />

              {formik.touched.startDate && formik.errors.startDate ? (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    mx: "14px",
                    mt: "3px",
                    fontSize: "0.8571428571428571rem",
                  }}
                >
                  {formik.errors.startDate}
                </Typography>
              ) : null}
            </Stack>
          </Box>
        </Grid2>

        <Grid2 xs={12} md={3}>
          <Box sx={boxStyles}>
            <Stack sx={{ width: { xs: "100%", lg: "auto" } }}>
              <DatePicker
                size="medium"
                label="End date"
                value={formik.values.endDate}
                onChange={(value) => {
                  formik.setFieldValue("endDate", value);
                }}
                sx={formControlStyles}
                slot={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(
                      formik.touched.endDate && formik.errors.endDate
                    )}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    id="endDate"
                    name="endDate"
                  />
                )}
              />

              {formik.touched.endDate && formik.errors.endDate ? (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    mx: "14px",
                    mt: "3px",
                    fontSize: "0.8571428571428571rem",
                  }}
                >
                  {formik.errors.endDate}
                </Typography>
              ) : null}
            </Stack>
          </Box>
        </Grid2>

        {!projects && (
          <>
            <Grid2 xs={12} md={3}>
              <Box sx={boxStyles}>
                <TextField
                  id="hours"
                  name="hours"
                  placeholder="Hours"
                  label="Hours"
                  size="medium"
                  type="text"
                  value={formik.values.hours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.hours ? formik.errors.hours : ""}
                  error={formik.touched.hours && Boolean(formik.errors.hours)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    ...formControlStyles,
                  }}
                />
              </Box>
            </Grid2>

            <Grid2 xs={12} md={3}>
              <Box sx={boxStyles}>
                <TextField
                  id="salary"
                  name="salary"
                  placeholder="Salary"
                  label="Salary"
                  size="medium"
                  type="text"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.salary ? formik.errors.salary : ""}
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    ...formControlStyles,
                  }}
                />
              </Box>
            </Grid2>
          </>
        )}
      </Grid2>
    </Stack>
  );
};

export default Details;
