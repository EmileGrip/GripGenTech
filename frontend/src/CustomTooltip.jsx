import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import pic from "./assets/tooltips_pic.png";
import logo from "./assets/Logo/Logo - Export/Adepti - Horizontal Logo 1.png";
import backButtonImage from "./assets/back_button.svg";
import nextButtonImage from "./assets/next_button.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "./redux/slices/admin/companyProfile/companyProfileSlice";

export function CustomTooltip({
  continuous,
  index,
  isLastStep,
  size,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
}) {
  const steps = Array.from({ length: size - 1 });
  const { fetchedData } = useSelector((state) => state.companyProfile);
  const { token, userInfo } = useSelector((state) => state.auth);
  const [contentState, setContentState] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  useEffect(() => {
    setContentState(step.content);
  }, [step]);

  const replacedContent = contentState?.replace(
    /\[organization name\]/g,
    fetchedData?.name
  );

  return (
    <Stack
      sx={{
        position: "relative",
        alignItems: "center",
        gap: 3,
        width: {
          xs: "300px",
          sm: "400px",
          md: index === 0 ? "830px" : "400px",
        },
        p: index === 0 ? "40px" : "50px 30px 20px 30px",
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow: "0px 20px 80px 0px rgba(0, 0, 0, 0.20)",
      }}
    >
      <IconButton
        {...closeProps}
        sx={{ position: "absolute", top: 2, right: 2, color: "#0C1716" }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "#0C1716" }}>
        {step.title}
      </Typography>

      {index > 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "#788894" }}
        >
          {replacedContent}
        </Typography>
      ) : (
        <>
          <Stack
            sx={{
              flexDirection: { md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              p: 2,
            }}
          >
            <img src={pic} alt="Pic" />

            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: 2,
              }}
            >
              <Typography variant="h1" sx={{ color: "#0C1716" }}>
                Hi {userInfo?.first_name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Typography variant="h2" sx={{ color: "#6AE6A4" }}>
                  Welcome to
                </Typography>

                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "160px", height: "40px" }}
                />
              </Box>

              <Typography variant="body1" sx={{ color: "#788894" }}>
                The platform where skills and opportunities come together to
                unlock your workforce’s full potential
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ textAlign: "center", color: "#788894", pb: "30px" }}>
            <Typography variant="body1">
              Get insight into the skills{" "}
              <span style={{ fontWeight: 600, color: "#0C1716" }}>
                {fetchedData?.name}
              </span>{" "}
              needs and which skills are available
            </Typography>

            <Typography variant="body1">
              Create a development and growth culture based on skills and
              ambitions
            </Typography>

            <Typography variant="body1">
              Dive into real-time workforce data. Discover skill gaps and ensure
              that
              <span style={{ fontWeight: 600, color: "#0C1716" }}>
                {" "}
                {fetchedData?.name}
              </span>{" "}
              stays ahead of the curve
            </Typography>
          </Box>
        </>
      )}

      {continuous && (
        <Box
          sx={{
            display: "flex",
            justifyContent: index > 0 ? "space-between" : "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {index > 0 && (
            <>
              <IconButton
                disabled={index === 1 ? true : false}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "220px",
                  p: "5px 10px",
                  background: index < 2 ? "#EEEEEE !important" : "#6AE6A4",
                  color: "#0C1716",
                  borderRadius: "5px",
                }}
                {...backProps}
              >
                <img src={backButtonImage} alt="Back button" />
              </IconButton>

              <Box sx={{ display: "flex", gap: 1 }}>
                {steps.map((step, i) => (
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      background:
                        index > i && index - 2 < i ? "#6AE6A4" : "#D9D9D9",
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </Box>
            </>
          )}

          {index === 0 ? (
            <Stack sx={{ gap: "18px" }}>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  maxWidth: "220px",
                  height: "40px",
                  textTransform: "capitalize",
                  p: "10px",
                  background: "#6AE6A4",
                  color: "#0C1716",
                  borderRadius: "5px",
                }}
                {...primaryProps}
              >
                start tour
              </Button>

              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "200px",
                  maxWidth: "220px",
                  height: "40px",
                  textTransform: "capitalize",
                  p: "10px",
                  border: "1px solid #788894",
                  color: "#0C1716",
                  borderRadius: "5px",
                }}
                {...skipProps}
              >
                skip tour
              </Button>
            </Stack>
          ) : !isLastStep ? (
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "220px",
                height: "34px",
                textTransform: "capitalize",
                p: "5px 10px",
                background: "#6AE6A4",
                color: "#0C1716",
                borderRadius: "5px",
              }}
              {...primaryProps}
            >
              <img src={nextButtonImage} alt="Next button" />
            </IconButton>
          ) : (
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "220px",
                height: "34px",
                textTransform: "capitalize",
                p: "5px 10px",
                background: "#6AE6A4",
                color: "#0C1716",
                borderRadius: "5px",
              }}
              {...primaryProps}
            >
              finish
            </Button>
          )}
        </Box>
      )}
    </Stack>
  );
}

export default CustomTooltip;
