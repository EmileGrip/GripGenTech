import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { EMPLOYEE_MY_SKILLS_PROFILE } from "../routes/paths";

const EmployeeProfile = ({ data }) => {
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "0", md: "45px" },
        p: 3,
      }}
    >
      <Box mt={2} mb={2}>
        <Avatar
          src={data.thumbnail}
          sx={{
            width: { xs: "75px", md: "218px" },
            height: { xs: "75px", md: "218px" },
            filter:
              "drop-shadow(0px 62px 25px rgba(0, 0, 0, 0.01)) drop-shadow(0px 35px 21px rgba(0, 0, 0, 0.05)) drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.09)) drop-shadow(0px 4px 9px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1))",
          }}
        />
      </Box>

      <Box sx={{ flex: "1", mr: 4, mt: 4 }}>
        <Box className="title__section" sx={{ mb: { xs: "35px", md: "70px" } }}>
          <Typography
            variant="h3"
            color={"secondary"}
            sx={{
              fontSize: "30px",
              fontWeight: "400",
              textTransform: "capitalize",
            }}
          >
            {data.name}
          </Typography>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ textTransform: "capitalize" }}
          >
            {data.jobTitle}
          </Typography>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ opacity: "0.5", textTransform: "capitalize" }}
          >
            {data.gender}
          </Typography>
        </Box>

        <Box className="contact__section" sx={{ mb: { xs: 3, md: 6 } }}>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ fontWeight: "600", mb: { xs: 1, md: 2 } }}
          >
            Contact
          </Typography>

          {Object.keys(data.contact).map((property, index) => (
            <Stack
              key={index}
              flexDirection="row"
              justifyContent={"space-between"}
            >
              <Typography
                variant="h5"
                color={"secondary"}
                sx={{ textTransform: "capitalize", flex: 1 }}
              >
                {property}
              </Typography>
              <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
                {data.contact[property]}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Box className="info__section" sx={{ mb: { xs: 3, md: 6 } }}>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ fontWeight: "600", mb: { xs: 1, md: 2 } }}
          >
            Info
          </Typography>

          {Object.keys(data.info).map((property, index) => (
            <Stack
              key={index}
              flexDirection="row"
              justifyContent={"space-between"}
            >
              <Typography
                variant="h5"
                color={"secondary"}
                sx={{ textTransform: "capitalize", flex: 1 }}
              >
                {property}
              </Typography>
              <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
                {data.info[property]}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Link
          to={EMPLOYEE_MY_SKILLS_PROFILE}
          style={{ color: "#66c1ff", textDecoration: "1px underline" }}
        >
          See Full Bio
        </Link>
      </Box>
    </Stack>
  );
};

export default EmployeeProfile;
