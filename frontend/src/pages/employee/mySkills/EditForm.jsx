import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

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

const genders = ["male", "female"];

const EditForm = ({ formik, loading }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const handleGenderChange = (event) => {
    const { checked, value } = event.target;
    const gender = value.toLowerCase();

    if (checked) {
      formik.setFieldValue("gender", [gender]);
    } else {
      formik.setFieldValue("gender", []);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
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
            edit profile
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
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.firstName ? formik.errors.firstName : ""
                  }
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
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
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.lastName ? formik.errors.lastName : ""
                  }
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
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
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.phone ? formik.errors.phone : ""}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
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
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.location ? formik.errors.location : ""
                  }
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  sx={formControlStyles}
                />
              </Stack>
            </Grid2>
          </Grid2>
        </Box>

        <Stack
          sx={{
            flexDirection: { md: "row" },
            alignItems: { md: "center" },
            gap: "30px",
          }}
        >
          <Stack>
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
                      checked={formik.values.gender[0] === gender}
                    />
                  }
                  label={gender}
                />
              ))}
            </FormGroup>
          </Stack>

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
              edit
            </Button>
            {loading && <CircularProgress size={20} />}
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditForm;
