import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import fileIcon from "../../../assets/add_file_icon.svg";
import correctIcon from "../../../assets/green_correct_icon.svg";
import React from "react";
import { EMPLOYEE_MY_SKILLS_ROUTE } from "../../../routes/paths";
import StyledWrapper from "../../../components/styled/StyledWrapper";

const SkillsSection = ({
  skillsDataLoading,
  sortedSkills,
  handleNavigation,
}) => {
  return (
    <StyledWrapper
      sx={{
        position: "relative",
        gap: 2,
        height: { xs: "450px", lg: "303.6px" },
      }}
    >
      <Typography variant="h3" color="darkGreen">
        Skills
      </Typography>

      <Stack
        className="displayData__section"
        sx={{
          width: "100%",
          maxHeight: { xs: "320px", lg: "160px" },
          overflow: "hidden",
        }}
      >
        {skillsDataLoading && <CircularProgress size={20} />}
        {!skillsDataLoading && (
          <>
            {sortedSkills.length < 1 ? (
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  mt: 2,
                }}
              >
                <img src={fileIcon} alt="File icon" />

                <Typography variant="h4" sx={{ color: "#788894" }}>
                  No skills found
                </Typography>
              </Stack>
            ) : (
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: { xs: "10px", lg: "12px" },
                  flexWrap: "wrap",
                }}
              >
                {sortedSkills.length >= 1 && (
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {sortedSkills.map((skill) =>
                      skill.verified ? (
                        <Box
                          key={skill.title}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            backgroundColor: "softAccent",
                            borderRadius: "100px",
                            py: "4px",
                            px: "12px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            textTransform="none"
                            color="darkGreenAccent"
                            fontWeight="500"
                          >
                            {skill.title}
                          </Typography>

                          <img
                            src={correctIcon}
                            alt="Status validation icon"
                            style={{ width: "16px", height: "16px" }}
                          />
                        </Box>
                      ) : (
                        <Box
                          key={skill.title}
                          sx={{
                            backgroundColor: "rgba(23, 52, 51, 0.40)",
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
                            {skill.title}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Stack>
                )}
              </Stack>
            )}
          </>
        )}
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: "auto",
        }}
      >
        <Button
          onClick={() =>
            handleNavigation("main__1", "sub__0", EMPLOYEE_MY_SKILLS_ROUTE)
          }
          sx={{
            width: "150px",
            height: "40px",
            backgroundColor: "darkGreenAccent",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#17343390",
            },
          }}
        >
          <Typography variant="h6" color="white">
            See all skills
          </Typography>
        </Button>
      </Box>
    </StyledWrapper>
  );
};

export default SkillsSection;
