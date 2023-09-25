import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import profilePic from "../../../assets/employee_1.jpg";
import progressBar from "../../../assets/horizontal_progress_bar.svg";
import experienceIcon from "../../../assets/experience_icon.svg";
import dollarIcon from "../../../assets/dollar_icon.svg";
import correctIcon from "../../../assets/correct_icon.svg";
import React from "react";
import { Link } from "react-router-dom";
import { skillsTable } from "../../../data/skillsData";

const EmployeeCard = ({ data }) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const modifiedSkills = skillsTable.slice(0, 4);

  return (
    <Stack sx={{ flexDirection: "row" }}>
      <Stack
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "#173433",
          borderRadius: { xs: "10px", sm: 0 },
          borderTopLeftRadius: { sm: "10px" },
          borderBottomLeftRadius: { sm: "10px" },
          gap: 2,
          py: 3,
          px: 2,
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Avatar
            src={profilePic}
            alt="Profile pic"
            sx={{ width: "75px", height: "75px" }}
          />

          <Typography
            variant="h5"
            color="#FFFFFF"
            sx={{
              textTransform: "capitalize",
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="h5"
            color="#FFFFFF"
            sx={{
              textTransform: "capitalize",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            jason ruly
          </Typography>

          <Stack sx={{ alignItems: "center" }}>
            <img src={progressBar} alt="Horizontal progress bar" />

            <Typography variant="body2" color="#FFFFFF">
              Match Level
            </Typography>
          </Stack>
        </Stack>

        <Link to={"/"}>
          <Button
            sx={{ width: "152px", background: (theme) => theme.palette.accent }}
          >
            <Typography variant="h6" color="darkGreen" textTransform="none">
              Contact Employee
            </Typography>
          </Button>
        </Link>

        <Link
          to={"/"}
          style={{ textDecoration: "underline", color: "#FFFFFF" }}
        >
          <Typography variant="body1" textTransform="none">
            View Profile
          </Typography>
        </Link>
      </Stack>

      {smMatches && (
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
            background: "FFFFFF",
            border: "1px solid #C0C0C0",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            px: 2,
          }}
        >
          <Stack sx={{ gap: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={experienceIcon} alt="Experience icon" />

              <Typography variant="h5" color="#788894">
                9 experience years
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={dollarIcon} alt="Dollar icon" />

              <Typography variant="h5" color="#788894">
                USD $1000 - 1500
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: "12px" }} />

          <Typography variant="h5" color="darkGreen" fontWeight="600" mb={1}>
            Proficiency
          </Typography>

          <Stack sx={{ gap: 1 }}>
            {modifiedSkills.map((skill) => (
              <Box
                key={skill.skillName}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  title={skill.skillName}
                  variant="body1"
                  color="#788894"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "80%",
                  }}
                >
                  {skill.skillName}
                </Typography>

                <img src={correctIcon} alt="Correct icon" />
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default EmployeeCard;
