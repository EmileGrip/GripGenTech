import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import progressBar from "../../../assets/horizontal_progress_bar.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ADMIN_JOB_DETAILS_ROUTE,
  ADMIN_PROJECT_DETAILS_ROUTE,
  EMPLOYEE_JOB_DETAILS_ROUTE,
  EMPLOYEE_PROJECT_DETAILS_ROUTE,
  MANAGER_JOB_DETAILS_ROUTE,
  MANAGER_PROJECT_DETAILS_ROUTE,
} from "../../../routes/paths";
import { skillsTable } from "../../../data/skillsData";

const JobCard = ({ data, projects }) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [showMore, setShowMore] = useState(false);
  const URL = window.location.href;
  const parts = URL.split("/");
  const currentFlow = parts[3];

  const jobDetailsLink =
    currentFlow === "employee"
      ? projects
        ? `${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${data.id}`
        : `${EMPLOYEE_JOB_DETAILS_ROUTE}/${data.id}`
      : currentFlow === "manager"
      ? projects
        ? `${MANAGER_PROJECT_DETAILS_ROUTE}/${data.id}`
        : `${MANAGER_JOB_DETAILS_ROUTE}/${data.id}`
      : currentFlow === "admin"
      ? projects
        ? `${ADMIN_PROJECT_DETAILS_ROUTE}/${data.id}`
        : `${ADMIN_JOB_DETAILS_ROUTE}/${data.id}`
      : "/"; // Default URL or handle other cases here

  return (
    <>
      {currentFlow === "employee" ? (
        <Stack
          sx={{
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
            p: { xs: 2, md: 0 },
            py: { md: "30px" },
            px: { md: "20px" },
            background: "#FAFAFA",
            border: "2px solid #EEEEEE",
            borderRadius: "10px",
          }}
        >
          <Link
            to={jobDetailsLink}
            style={{
              fontSize: "14px",
              textDecoration: "underline",
              textTransform: "capitalize",
              color: "#173433",
            }}
          >
            <Typography variant="h3">{data.title}</Typography>
          </Link>

          <img src={progressBar} alt="Horizontal progress bar" />

          <Typography variant="body1" color="#788894">
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>.</span>{" "}
            Start date: {data.startDate}{" "}
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>.</span>{" "}
            {data.kind}{" "}
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>.</span>{" "}
            USD ${data.salary}
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: { xs: "center", lg: "flex-start" },
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {skillsTable.length >= 1 && (
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {skillsTable.map((skill) => (
                  <Box
                    key={skill.skillName}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "12px",
                      background: "#0C1716",
                      borderRadius: "100px",
                      py: "4px",
                      px: "12px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      textTransform="none"
                      color="#FFFFFF"
                      fontWeight="500"
                    >
                      {skill.skillName}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>

          <Box
            sx={{
              width: "100%",
              height: "63px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography
              variant="body1"
              title={data.description}
              color="#788894"
              width="100%"
            >
              {data.description}
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box
          sx={{
            position: "relative",
            height: showMore ? "auto" : { xs: "247px", md: "228px" },
            p: "20px",
            background: "#FAFAFA",
            border: "2px solid #EEEEEE",
            borderRadius: "10px",
          }}
        >
          {!mdMatches && (
            <IconButton
              sx={{
                alignSelf: "center",
                p: 0,
                position: "absolute",
                top: "12px",
                right: "12px",
              }}
            >
              <img src={moreHoriz__icon} alt="More horizontal icon" />
            </IconButton>
          )}

          <Stack
            sx={{
              flexDirection: { md: "row" },
              alignItems: { md: "center" },
              gap: { xs: 1, md: 0 },
              mb: 1,
            }}
          >
            <Link
              to={jobDetailsLink}
              style={{
                fontSize: "14px",
                textDecoration: "underline",
                textTransform: "capitalize",
                color: "#173433",
              }}
            >
              <Typography variant="h3">{data.title}</Typography>
            </Link>

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: "14px",
                color: "#707070",
                pr: "15px",
              }}
            >
              <Divider
                orientation="vertical"
                flexItem
                sx={{ width: "2px", ml: { md: "20px" } }}
              />

              <Typography variant="h3">5</Typography>

              <Typography variant="h5">Matches</Typography>
            </Stack>

            {mdMatches && (
              <IconButton sx={{ alignSelf: "center", p: 0 }}>
                <img src={moreHoriz__icon} alt="More horizontal icon" />
              </IconButton>
            )}
          </Stack>

          <Typography
            variant="h5"
            sx={{ color: "#788894", textTransform: "capitalize", mb: 1 }}
          >
            {`${data.department} - Start date: ${data.startDate} - ${data.kind} - USD $${data.salary}`}
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <Box
                sx={{
                  width: { xs: "149px", md: "200px" },
                  height: showMore ? "auto" : "63px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#788894", width: "100%" }}
                >
                  {data.description}
                </Typography>
              </Box>

              <Button
                disableRipple={true}
                variant="text"
                sx={{
                  color: "#66C1FF",
                  alignSelf: "flex-start",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  lineHeight: "1.5",
                  "&: hover": {
                    backgroundColor: "transparent",
                  },
                  fontSize: { xs: "12px", md: "16px" },
                  mt: { xs: -1 },
                }}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "... show less" : "... show more"}
              </Button>
            </Stack>

            <Box
              sx={{
                width: "113px",
                height: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: data.status === "declined" ? "#B95144" : "#6AE6A4",
                borderRadius: "40px",
                textTransform: "capitalize",
                opacity: 0.2,
              }}
            >
              <Typography variant="h6">{data.status}</Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default JobCard;
