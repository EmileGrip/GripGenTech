import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DropContainer from "../../../components/DropContainer";
import { useFormik } from "formik";
import { industriesOptions as industries } from "../../../data/basicInfoData";
import { City, Country, State } from "country-state-city";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { initialValues } from "../../../data/basicInfoData";
import { selectedValues } from "../../../data/basicInfoData";
import editIcon from "../../../assets/edit_icon_light.svg";
import useLocationChange from "../../../hooks/useLocationChange";
import validationsForm from "./validations/validationSchema";
import PhotoDropContainer from "../../employee/mySkills/PhotoDropContainer";
import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { ADMIN_ORGANIZATION_ORGRANIGRAM_ROUTE } from "../../../routes/paths";
import replaceNullWithEmptyString from "../../../helper/replaceNullWithEmptyString";
import {
  setFetchedData,
  setInitialVisit,
  setSuccess,
  setLoading,
  setOpenSnack,
  fetchData,
  editData,
} from "../../../redux/slices/admin/companyProfile/companyProfileSlice";
const rowStackStyle = {
  flexDirection: { xs: "column", md: "row" },
  justifyContent: { md: "space-between" },
  mb: { xs: "27px", lg: "54px" },
  gap: { md: "40px", lg: "65px", xl: "120px" },
};
const formControlWrapperStyle = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "baseline",
  gap: { lg: "40px", xl: "60px" },
  minHeight: "82px",
};

const formControlWrapperStyle2 = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "baseline",
  gap: { lg: "40px" },
  minHeight: "82px",
};

const textFieldStyle = {
  "> *": { borderRadius: "7px !important" },
  width: { xs: "100%" },
  maxWidth: { xs: "368px", lg: "300px", xg: "320px" },
};

const labelStyle = {
  fontWeight: "500",
  color: "secondary.main",
};

const acceptTypes = {
  "image/*": [".jpeg", ".jpg", ".png", ".avif", ".svg", ".webp"],
};

const OrgInitialSetup = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { success, initialVisit, loading, openSnack, fetchedData } =
    useSelector((state) => state.companyProfile);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setOpenSnack(false));
  };

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  const formik = useFormik({
    initialValues: fetchedData,
    validationSchema: validationsForm,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        dispatch(editData({ values, token }));
        if (initialVisit) {
          navigate(ADMIN_ORGANIZATION_ORGRANIGRAM_ROUTE);
        }

        // navigate("");
        setSubmitting(false);
      }, 1000);
    },
    enableReinitialize: true,
  });

  const countryValue = formik.values.country;
  let currentStates;

  if (countryValue) {
    const countryCode = countryValue.split("-")[1];
    const states = State.getStatesOfCountry(countryCode);

    currentStates =
      states.length > 0 ? (
        [{ name: "", isoCode: null }, ...states].map((state, index) => (
          <option key={index} disabled={index === 0} value={state.isoCode}>
            {state.name}
          </option>
        ))
      ) : (
        <>
          <option value="" disabled></option>
          <option value={countryValue.split("-")[0]}>
            {countryValue.split("-")[0]}
          </option>
        </>
      );
  } else {
    currentStates = (
      <>
        <option value="" disabled></option>
      </>
    );
  }

  const stateValue = formik.values.state;
  let currentCities;

  if (countryValue && stateValue) {
    const countryCode = countryValue.split("-")[1];
    const cities = City.getCitiesOfState(countryCode, stateValue);

    currentCities =
      cities.length > 0 ? (
        [{ name: "", isoCode: null }, ...cities].map((city, index) => (
          <option key={index} disabled={index === 0} value={city.name}>
            {city.name}
          </option>
        ))
      ) : (
        <>
          <option value="" disabled></option>
          <option value={countryValue.split("-")[0]}>
            {countryValue.split("-")[0]}
          </option>
        </>
      );
  } else {
    currentCities = (
      <>
        <option value="" disabled></option>
      </>
    );
  }

  const defaultOption = <option value="" disabled></option>;

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
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success ? "Success operation" : "Failed operation"}
        </Alert>
      </Snackbar>

      {initialVisit && (
        <Typography
          variant="h3"
          component="h2"
          sx={{ mb: { xs: 4, lg: 8.25 }, mt: { xs: 1, lg: 3 } }}
          color={"primary.main"}
        >
          Initial Setup -{" "}
          <Typography
            variant="h3"
            component="span"
            mb={3}
            color={"primary.main"}
            sx={{ fontWeight: "400" }}
          >
            Basic Info
          </Typography>
        </Typography>
      )}

      {!initialVisit && (
        <Typography
          variant="h3"
          component="h2"
          sx={{ mb: { xs: 4, lg: 8.25 }, mt: { xs: 1, lg: 3 } }}
          color={"primary.main"}
        >
          Company Info
        </Typography>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Box
              sx={{ mb: { xs: 3, md: 0 }, flex: { md: "1" } }}
              className="formControl__wrapper leftSide"
            >
              {/* <Typography
                variant="h4"
                color="secondary.main"
                sx={{ fontWeight: 600, mb: 2, width: "fit-content" }}
              >
                Upload logo
              </Typography> */}
              <PhotoDropContainer name="logo" logo={fetchedData?.logo} />
              {/* <DropContainer
              title={"Drag Logo Here"}
              fileTypes={acceptTypes}
              formik={formik}
              name="files"
            /> */}
            </Box>

            <Box sx={{ flex: { md: "1" } }} className="rightSide">
              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="name">
                    Company name
                    <span style={{ color: "red" }}>*</span>
                  </Box>
                )}
                <TextField
                  id="name"
                  name="name"
                  size="small"
                  type="text"
                  placeholder="What’s your company called"
                  label={
                    !lgMatches ? (
                      <span>
                        Company name<span style={{ color: "red" }}>*</span>
                      </span>
                    ) : (
                      ""
                    )
                  }
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.name ? formik.errors.name : ""}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  variant="outlined"
                  fullWidth
                  sx={textFieldStyle}
                />
              </Stack>

              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="industry">
                    Industry
                    <span style={{ color: "red" }}>*</span>
                  </Box>
                )}

                <TextField
                  id="industry"
                  name="industry"
                  size="small"
                  select
                  label={
                    !lgMatches ? (
                      <span>
                        Industry<span style={{ color: "red" }}>*</span>
                      </span>
                    ) : (
                      ""
                    )
                  }
                  value={formik.values.industry}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.industry ? formik.errors.industry : ""
                  }
                  error={
                    formik.touched.industry && Boolean(formik.errors.industry)
                  }
                  // inputProps={{ "aria-label": "Without label" }}
                  SelectProps={{
                    native: true,
                  }}
                  onChange={formik.handleChange}
                  sx={textFieldStyle}
                >
                  {industries.map((industry, index) => (
                    <option
                      key={index}
                      value={industry.value}
                      disabled={!industry.value}
                    >
                      {industry.label}
                    </option>
                  ))}
                </TextField>
              </Stack>

              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="website">
                    Website
                  </Box>
                )}
                <TextField
                  id="website"
                  name="website"
                  size="small"
                  type="text"
                  placeholder="Your company’s website"
                  label={!lgMatches ? "Company's website" : ""}
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.website ? formik.errors.website : ""
                  }
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  variant="outlined"
                  fullWidth
                  sx={textFieldStyle}
                />
              </Stack>

              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle2}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="linkedin">
                    Linkedin
                  </Box>
                )}
                <TextField
                  id="linkedin"
                  name="linkedin"
                  size="small"
                  type="text"
                  placeholder="Your company’s linkedin profile"
                  label={!lgMatches ? "Company's linkedIn" : ""}
                  value={formik.values.linkedin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.linkedin ? formik.errors.linkedin : ""
                  }
                  error={
                    formik.touched.linkedin && Boolean(formik.errors.linkedin)
                  }
                  variant="outlined"
                  fullWidth
                  sx={textFieldStyle}
                />
              </Stack>
            </Box>
          </Stack>

          <Divider
            sx={{ borderColor: "#E9E9E9", mb: { xs: "32px", lg: "64px" } }}
          />

          <Typography
            variant="h4"
            color="secondary.main"
            sx={{ fontWeight: 600, mb: { xs: "16px", lg: "24px" } }}
          >
            Location Details
          </Typography>

          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Box className="leftSide" sx={{ flex: { md: 1 } }}>
              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle2}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="country">
                    Country
                  </Box>
                )}

                <TextField
                  id="country"
                  name="country"
                  size="small"
                  select
                  label={!lgMatches ? "Country" : ""}
                  value={formik.values.country ?? ""}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.country ? formik.errors.country : ""
                  }
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  placeholder="Select Country"
                  SelectProps={{
                    native: true,
                  }}
                  onChange={(e) => {
                    formik.values.state = "";
                    formik.values.city = "";
                    formik.handleChange(e);
                  }}
                  sx={textFieldStyle}
                >
                  {<option key={-1} value={""} disabled={true}></option>}
                  {Country?.getAllCountries().map((country, index) => (
                    <option
                      key={index}
                      value={`${country.name}-${country.isoCode}`}
                    >
                      {`${country.name} - ${country.isoCode}`}
                    </option>
                  ))}
                </TextField>
              </Stack>
              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle2}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="state">
                    State
                  </Box>
                )}

                <TextField
                  id="state"
                  name="state"
                  size="small"
                  select
                  label={!lgMatches ? "State" : ""}
                  value={formik.values.state}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.state ? formik.errors.state : ""}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  // inputProps={{ "aria-label": "Without label" }}
                  SelectProps={{
                    native: true,
                  }}
                  onChange={(e) => {
                    if (formik.values.country) {
                      formik.values.city = "";
                      formik.handleChange(e);
                    }
                  }}
                  sx={textFieldStyle}
                >
                  {!formik.values.country && defaultOption}
                  {formik.values.country &&
                  State.getStatesOfCountry(formik.values.country.split("-")[1])
                    .length > 0 ? (
                    [
                      { name: "", isoCode: null },
                      ...State.getStatesOfCountry(
                        formik.values.country.split("-")[1]
                      ),
                    ].map((state, index) => (
                      <option
                        key={index}
                        disabled={index === 0}
                        value={state.isoCode}
                      >
                        {state.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="" disabled></option>
                      {formik.values.country && (
                        <option value={formik.values.country.split("-")[0]}>
                          {formik.values.country?.split("-")[0]}
                        </option>
                      )}
                    </>
                  )}
                </TextField>
              </Stack>

              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle2}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="city">
                    City
                  </Box>
                )}

                <TextField
                  id="city"
                  name="city"
                  size="small"
                  select
                  label={!lgMatches ? "City" : ""}
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.city ? formik.errors.city : ""}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  // inputProps={{ "aria-label": "Without label" }}
                  SelectProps={{
                    native: true,
                  }}
                  onChange={formik.handleChange}
                  sx={textFieldStyle}
                >
                  {!formik.values.state && defaultOption}
                  {formik.values.state &&
                  formik.values.country &&
                  City.getCitiesOfState(
                    formik.values.country.split("-")[1],
                    formik.values.state
                  ).length > 0 ? (
                    [
                      { name: "", isoCode: null },
                      ...City.getCitiesOfState(
                        formik.values.country.split("-")[1],
                        formik.values.state
                      ),
                    ].map((city, index) => (
                      <option
                        key={index}
                        disabled={index === 0}
                        value={city.name}
                      >
                        {city.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="" disabled></option>
                      {formik.values.state && formik.values.country && (
                        <option value={formik.values.country.split("-")[0]}>
                          {formik.values.country.split("-")[0]}
                        </option>
                      )}
                    </>
                  )}
                </TextField>
              </Stack>
            </Box>

            <Box
              className="rightSide"
              sx={{
                flex: { md: 1 },
              }}
            >
              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="address1">
                    Address Line 1
                  </Box>
                )}
                <TextField
                  id="address1"
                  name="address1"
                  size="small"
                  type="text"
                  placeholder="Your company's Address Line 1"
                  label={!lgMatches ? "Company's address 1" : ""}
                  value={formik.values.address1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.address1 ? formik.errors.address1 : ""
                  }
                  error={
                    formik.touched.address1 && Boolean(formik.errors.address1)
                  }
                  variant="outlined"
                  fullWidth
                  sx={textFieldStyle}
                />
              </Stack>

              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="address2">
                    Address Line 2
                  </Box>
                )}
                <TextField
                  id="address2"
                  name="address2"
                  size="small"
                  type="text"
                  placeholder="Your company's Address Line 2"
                  label={!lgMatches ? "Company's address 2" : ""}
                  value={formik.values.address2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.address2 ? formik.errors.address2 : ""
                  }
                  error={
                    formik.touched.address2 && Boolean(formik.errors.address2)
                  }
                  variant="outlined"
                  fullWidth
                  sx={textFieldStyle}
                />
              </Stack>

              <Stack
                className="formControl__wrapper"
                sx={formControlWrapperStyle}
              >
                {lgMatches && (
                  <Box component="label" sx={labelStyle} htmlFor="postal_code">
                    ZIP code
                  </Box>
                )}
                <TextField
                  id="postal_code"
                  name="postal_code"
                  size="small"
                  type="text"
                  placeholder="Zip Code"
                  label={!lgMatches ? "Zip code" : ""}
                  value={formik.values.postal_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.postal_code ? formik.errors.postal_code : ""
                  }
                  error={
                    formik.touched.postal_code &&
                    Boolean(formik.errors.postal_code)
                  }
                  variant="outlined"
                  fullWidth
                  sx={textFieldStyle}
                />
              </Stack>
            </Box>
          </Stack>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontSize: "14px",
              px: "28px",
            }}
            endIcon={
              initialVisit ? (
                <ArrowForwardIcon />
              ) : (
                <img src={editIcon} alt="icon" />
              )
            }
          >
            {initialVisit ? "continue" : "Edit"}
          </Button>
        </form>
      )}
    </>
  );
};

export default OrgInitialSetup;
