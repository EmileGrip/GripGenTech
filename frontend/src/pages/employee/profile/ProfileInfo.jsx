import { Box, Stack, Typography } from "@mui/material";
import callIcon from "../../../assets/call_icon.svg";
import mailIcon from "../../../assets/mail_icon.svg";
import React from "react";
import DropPhoto from "../mySkills/DropPhoto";
import StyledWrapper from "../../../components/styled/StyledWrapper";

const ProfileInfo = ({ user }) => {
  return (
    <StyledWrapper
      sx={{
        gap: 3,
        height: "303.6px",
      }}
    >
      <Stack sx={{ alignItems: "center", gap: 3 }}>
        <Box sx={{ width: "100px", height: "100px" }}>
          <DropPhoto name="profile_pic" />
        </Box>

        {/* <Stack alignItems="center">
          <Box
            sx={{
              width: "167px",
              height: "6px",
              border: "transparent",
              borderRadius: "10px",
              backgroundColor: "softAccent",
              position: "relative",
              mb: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#6ae6a4",
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${70}%`,
                border: "transparent",
                borderRadius: "10px",
              }}
            />
          </Box>

          <Typography variant="body2" color="inactive.main">
            <span style={{ textDecoration: "underline" }}>
              Complete your profile
            </span>{" "}
            (70%/100%)
          </Typography>
        </Stack> */}
      </Stack>

      <Stack gap={2}>
        <Typography
          variant="h3"
          sx={{
            textTransform: "capitalize",
            color: "darkGreen",
          }}
        >{`${user?.first_name} ${user?.last_name}`}</Typography>

        <Typography
          variant="h4"
          sx={{
            textTransform: "capitalize",
            color: "inactive.main",
          }}
        >
          {user?.role?.title && user?.role?.title !== "0"
            ? user?.role?.title
            : "No Title"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={callIcon}
            alt="Call icon"
            style={{ width: "20px", height: "20px" }}
          />

          <Typography variant="body1" color="darkGreenAccent">
            {user?.phone ? user?.phone : ""}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={mailIcon}
            alt="Mail icon"
            style={{ width: "20px", height: "20px" }}
          />

          <Typography variant="body1" color="darkGreenAccent">
            {user?.email ? user?.email : ""}
          </Typography>
        </Box>
      </Stack>
    </StyledWrapper>
  );
};

export default ProfileInfo;
