import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropContainer from "../../employee/mySkills/DropContainer";
import { useFormik } from "formik";
import { industriesOptions as industries } from "../../../data/basicInfoData";
import { City, Country, State } from "country-state-city";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { initialValues } from "../../../data/basicInfoData";
import { selectedValues } from "../../../data/basicInfoData";
import editIcon from "../../../assets/edit_icon_light.svg";

const rowStackStyle = {
  flexDirection: { xs: "column", md: "row" },
  justifyContent: { md: "space-between" },
  mb: { xs: "27px", lg: "54px" },
  gap: { md: "40px", lg: "65px", xl: "120px" },
};

const formControlWrapperStyle = {
  flexDirection: "row",
  justifyContent: { lg: "space-between" },
  alignItems: "center",
  gap: { lg: "40px", xl: "60px" },
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

const OrgInitialSetup = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: selectedValues,
    validationSchema: "",
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        alert(JSON.stringify(values, null, 2));
        // navigate("");
        setSubmitting(false);
      }, 1000);
    },
  });

  const currentStates =
    State.getStatesOfCountry(formik.values.country.split("-")[1]).length > 0 ? (
      [
        { name: "", isoCode: null },
        ...State.getStatesOfCountry(formik.values.country.split("-")[1]),
      ].map((state, index) => (
        <option key={index} disabled={index === 0} value={state.isoCode}>
          {state.name}
        </option>
      ))
    ) : (
      <>
        <option value="" disabled></option>
        <option value={formik.values.country.split("-")[0]}>
          {formik.values.country.split("-")[0]}
        </option>
      </>
    );

  const currentCities =
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
        <option key={index} disabled={index === 0} value={city.name}>
          {city.name}
        </option>
      ))
    ) : (
      <>
        <option value="" disabled></option>
        <option value={formik.values.country.split("-")[0]}>
          {formik.values.country.split("-")[0]}
        </option>
      </>
    );

  const defaultOption = <option value="" disabled></option>;

  const acceptTypes = {
    "image/*": [".jpeg", ".jpg", ".png", ".avif", ".svg", ".webp"],
  };

  return (
    <>
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

      <form onSubmit={formik.handleSubmit}>
        <Stack className="rowStackStyle" sx={rowStackStyle}>
          <Box
            sx={{ mb: { xs: 3, md: 0 }, flex: { md: "1" } }}
            className="formControl__wrapper leftSide"
          >
            <Typography
              variant="h4"
              color="secondary.main"
              sx={{ fontWeight: 600, mb: 2, width: "fit-content" }}
            >
              upload logo
            </Typography>
            <DropContainer
              title={"Drag Logo Here"}
              fileTypes={acceptTypes}
              formik={formik}
              name="files"
            />
          </Box>

          <Box sx={{ flex: { md: "1" } }} className="rightSide">
            <Stack
              className="formControl__wrapper"
              sx={formControlWrapperStyle}
            >
              {lgMatches && (
                <Box component="label" sx={labelStyle} htmlFor="companyName">
                  Company name
                </Box>
              )}
              <TextField
                id="companyName"
                name="companyName"
                label="Company name"
                size="small"
                type="text"
                placeholder="What’s your company called"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.position ? formik.errors.position : ""
                }
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                margin="normal"
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
                </Box>
              )}

              <TextField
                id="industry"
                name="industry"
                label="Industry"
                size="small"
                select
                margin="normal"
                value={formik.values.industry}
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
                <Box component="label" sx={labelStyle} htmlFor="companyWebsite">
                  Website
                </Box>
              )}
              <TextField
                id="companyWebsite"
                name="companyWebsite"
                label="Website"
                size="small"
                type="text"
                placeholder="Your company’s website"
                value={formik.values.companyWebsite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.companyWebsite
                    ? formik.errors.companyWebsite
                    : ""
                }
                error={
                  formik.touched.companyWebsite &&
                  Boolean(formik.errors.companyWebsite)
                }
                margin="normal"
                variant="outlined"
                fullWidth
                sx={textFieldStyle}
              />
            </Stack>

            <Stack
              className="formControl__wrapper"
              sx={{
                flexDirection: "row",
                justifyContent: { lg: "space-between" },
                alignItems: "center",
                gap: { lg: "40px" },
              }}
            >
              {lgMatches && (
                <Box
                  component="label"
                  sx={labelStyle}
                  htmlFor="companyLinkedin"
                >
                  Linkedin
                </Box>
              )}
              <TextField
                id="companyLinkedin"
                name="companyLinkedin"
                label="Linkedin "
                size="small"
                type="text"
                placeholder="Your company’s linkedin profile"
                value={formik.values.companyLinkedin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.companyLinkedin
                    ? formik.errors.companyLinkedin
                    : ""
                }
                error={
                  formik.touched.companyLinkedin &&
                  Boolean(formik.errors.companyLinkedin)
                }
                margin="normal"
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
              sx={{
                flexDirection: "row",
                justifyContent: { lg: "space-between" },
                alignItems: "center",
                gap: { lg: "40px" },
              }}
            >
              {lgMatches && (
                <Box component="label" sx={labelStyle} htmlFor="country">
                  Country
                </Box>
              )}

              <TextField
                id="country"
                name="country"
                label="Country"
                size="small"
                select
                margin="normal"
                value={formik.values.country}
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
                {Country.getAllCountries().map((country, index) => (
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
              sx={{
                flexDirection: "row",
                justifyContent: { lg: "space-between" },
                alignItems: "center",
                gap: { lg: "40px" },
              }}
            >
              {lgMatches && (
                <Box component="label" sx={labelStyle} htmlFor="state">
                  State
                </Box>
              )}

              <TextField
                id="state"
                name="state"
                label="State"
                size="small"
                select
                margin="normal"
                value={formik.values.state}
                // inputProps={{ "aria-label": "Without label" }}
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => {
                  formik.values.city = "";
                  formik.handleChange(e);
                }}
                sx={textFieldStyle}
              >
                {!formik.values.country && defaultOption}
                {formik.values.country && currentStates}
              </TextField>
            </Stack>

            <Stack
              className="formControl__wrapper"
              sx={{
                flexDirection: "row",
                justifyContent: { lg: "space-between" },
                alignItems: "center",
                gap: { lg: "40px" },
              }}
            >
              {lgMatches && (
                <Box component="label" sx={labelStyle} htmlFor="city">
                  City
                </Box>
              )}

              <TextField
                id="city"
                name="city"
                label="City"
                size="small"
                select
                margin="normal"
                value={formik.values.city}
                // inputProps={{ "aria-label": "Without label" }}
                SelectProps={{
                  native: true,
                }}
                onChange={formik.handleChange}
                sx={textFieldStyle}
              >
                {!formik.values.state && defaultOption}
                {formik.values.state && currentCities}
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
                <Box component="label" sx={labelStyle} htmlFor="addressLine1">
                  Address Line 1
                </Box>
              )}
              <TextField
                id="addressLine1"
                name="addressLine1"
                label="Address Line 1"
                size="small"
                type="text"
                placeholder="Your company's Address Line 1"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.addressLine1 ? formik.errors.addressLine1 : ""
                }
                error={
                  formik.touched.addressLine1 &&
                  Boolean(formik.errors.addressLine1)
                }
                margin="normal"
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
                <Box component="label" sx={labelStyle} htmlFor="addressLine2">
                  Address Line 2
                </Box>
              )}
              <TextField
                id="addressLine2"
                name="addressLine2"
                label="Address Line 2"
                size="small"
                type="text"
                placeholder="Your company's Address Line 2"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.addressLine2 ? formik.errors.addressLine2 : ""
                }
                error={
                  formik.touched.addressLine2 &&
                  Boolean(formik.errors.addressLine2)
                }
                margin="normal"
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
                <Box component="label" sx={labelStyle} htmlFor="zipCode">
                  ZIP code
                </Box>
              )}
              <TextField
                id="zipCode"
                name="zipCode"
                label="Zip Code"
                size="small"
                type="text"
                placeholder="Zip Code"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.zipCode ? formik.errors.zipCode : ""}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                margin="normal"
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
            !formik.initialValues.files ? (
              <ArrowForwardIcon />
            ) : (
              <img src={editIcon} alt="icon" />
            )
          }
        >
          {!formik.initialValues.files ? "continue" : "Edit"}
        </Button>
      </form>
    </>
  );
};

export default OrgInitialSetup;
