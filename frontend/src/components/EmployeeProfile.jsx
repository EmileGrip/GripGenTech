import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import {
  ADMIN_EMPLOYEES_PROFILE,
  EMPLOYEE_MY_SKILLS_PROFILE,
  MANAGER_EMPLOYEES_PROFILE,
} from "../routes/paths";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import axiosInstance from "../helper/axiosInstance";

const EmployeeProfile = ({ data }) => {
  const inputDateString = data?.date_joined;
  const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSSSZ";
  const outputFormat = "DD MMM YYYY";

  const outputDateString = moment(inputDateString, inputFormat).format(
    outputFormat
  );

  const { userInfo } = useSelector((state) => state.auth);

  const profileLink =
    userInfo.system_role === "employee"
      ? `${EMPLOYEE_MY_SKILLS_PROFILE}/${data.id}`
      : userInfo.system_role === "manager"
      ? `${MANAGER_EMPLOYEES_PROFILE}/${data.id}`
      : userInfo.system_role === "admin"
      ? `${ADMIN_EMPLOYEES_PROFILE}/${data.id}`
      : "/"; // Default URL or handle other cases here

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "0", md: "45px" },
        px: { xs: 3, lg: 0 },
        pt: 0,
        mt: { xs: "-40px", lg: "-70px" },
      }}
    >
      <Box mt={2} mb={2}>
        <Avatar
          src={data?.profile_picture?.url}
          alt={data?.profile_picture?.name}
          sx={{
            width: { xs: "75px", md: "218px" },
            height: { xs: "75px", md: "218px" },
            filter:
              "drop-shadow(0px 62px 25px rgba(0, 0, 0, 0.01)) drop-shadow(0px 35px 21px rgba(0, 0, 0, 0.05)) drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.09)) drop-shadow(0px 4px 9px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1))",
          }}
        />
      </Box>

      <Box sx={{ flex: "1", mt: 4 }}>
        <Box
          className="title__section"
          sx={{ mb: { xs: "35px", md: "70px" }, width: "60%" }}
          title={data?.first_name + " " + data?.last_name}
        >
          <Typography
            variant="h3"
            color={"secondary"}
            sx={{
              fontWeight: "400",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data?.first_name + " " + data?.last_name}
          </Typography>
          <Box sx={{ width: "100%" }} title={data?.role?.title}>
            <Typography
              variant="h4"
              color={"secondary"}
              sx={{
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.role ? data?.role?.title : "No Title"}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ opacity: "0.5", textTransform: "capitalize" }}
          >
            {data?.gender}
          </Typography>
        </Box>

        <Box className="contact__section" sx={{ mb: { xs: 3 } }}>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ fontWeight: "600", mb: { xs: 1, md: 2 } }}
          >
            Contact
          </Typography>

          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ textTransform: "capitalize", flex: 1 }}
            >
              Email
            </Typography>
            <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
              {data?.email ? data?.email : "No Email"}
            </Typography>
          </Stack>

          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ textTransform: "capitalize", flex: 1 }}
            >
              phone
            </Typography>
            <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
              {data?.phone ? data?.phone : "No Phone"}
            </Typography>
          </Stack>

          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ textTransform: "capitalize", flex: 1 }}
            >
              location
            </Typography>
            <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
              {data?.location ? data?.location : "No Location"}
            </Typography>
          </Stack>
        </Box>

        <Box className="info__section" sx={{ mb: { xs: 3 } }}>
          <Typography
            variant="h4"
            color={"secondary"}
            sx={{ fontWeight: "600", mb: { xs: 1, md: 2 } }}
          >
            Info
          </Typography>

          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ textTransform: "capitalize", flex: 1 }}
            >
              leader
            </Typography>
            <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
              {data?.leader ? data?.leader : "No Leader"}
            </Typography>
          </Stack>

          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ textTransform: "capitalize", flex: 1 }}
            >
              Joined
            </Typography>
            <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
              {data?.date_joined ? outputDateString : "No Time"}
            </Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent={"space-between"}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ textTransform: "capitalize", flex: 1 }}
            >
              id
            </Typography>
            <Typography variant="body1" color={"secondary"} sx={{ flex: 2 }}>
              {data?.id}
            </Typography>
          </Stack>
        </Box>

        <Link
          to={profileLink}
          style={{ color: "#66c1ff", textDecoration: "1px underline" }}
        >
          See Full Bio
        </Link>
      </Box>
    </Stack>
  );
};

export default EmployeeProfile;
