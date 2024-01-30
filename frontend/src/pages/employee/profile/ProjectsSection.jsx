import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import openInFullIcon from "../../../assets/open_in_full_icon.svg";
import React from "react";
import {
  EMPLOYEE_PROJECTS_ROUTE,
  EMPLOYEE_PROJECT_DETAILS_ROUTE,
} from "../../../routes/paths";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import { Link } from "react-router-dom";

const ProjectsSection = ({
  expandedComponent,
  girdRowValue2,
  handleClick,
  handleNavigation,
  projectsData,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const getGridPlacement = () => {
    switch (expandedComponent) {
      case 2:
        return { gridColumn: "1/4", gridRow: "1/3" };
      case null:
        return { gridColumn: "2/3", gridRow: "1/3" };
      default:
        return { gridColumn: "4/5", gridRow: girdRowValue2 };
    }
  };

  return (
    <StyledWrapper
      className={`gird-item `}
      sx={{
        gap: 2,
        transition: "all 0.3s ease",
        position: "relative",
        height: lgMatches
          ? expandedComponent === 2
            ? "616px"
            : "300px"
          : expandedComponent === 2
          ? "auto"
          : "300px",
        ...getGridPlacement(),
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="darkGreen">
          Projects
        </Typography>

        <IconButton onClick={() => handleClick(2)} sx={{ p: 0 }}>
          <img
            src={openInFullIcon}
            alt="Open in full icon"
            style={{ width: "24px", height: "24px" }}
          />
        </IconButton>
      </Box>

      {expandedComponent === 2 ? (
        <Stack gap={2}>
          <Typography variant="h6" sx={{ fontWeight: 500, color: "darkGreen" }}>
            Current Project
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75px",
              background: "#FAFAFA",
              border: "2px solid #EEE",
              borderRadius: "10px",
              px: "12px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: "inactive.main",
                textAlign: "center",
              }}
            >
              You still don’t have projects, you could choose one and add it
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 500, color: "darkGreen" }}>
            New Project Matches
          </Typography>

          {projectsData?.profile_based?.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              No projects found
            </Typography>
          ) : (
            <Grid container spacing="12px">
              {projectsData?.profile_based?.slice(0, 3).map((project) => (
                <Grid key={project?.id} item xs={12} lg={4}>
                  <Stack
                    sx={{
                      alignItems: "center",
                      gap: "12px",
                      p: "12px",
                      height: "300px",
                      background: "#FAFAFA",
                      border: "2px solid #EEE",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack alignItems="center">
                      <Typography
                        variant="h3"
                        sx={{
                          textTransform: "capitalize",
                          color: "darkGreenAccent",
                          textAlign: "center",
                        }}
                      >
                        {project?.roles[0]?.title}
                      </Typography>

                      <Link
                        to={`${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${project?.id}`}
                      >
                        <Typography
                          variant="h6"
                          sx={{ textAlign: "center", color: "darkGreenAccent" }}
                        >
                          {project?.name}
                        </Typography>
                      </Link>
                    </Stack>

                    <Box
                      sx={{
                        width: "160px",
                        height: "8px",
                        border: "transparent",
                        borderRadius: "10px",
                        backgroundColor: "softAccent",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#6ae6a4",
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "100%",
                          width: `${project?.percentage}%`,
                          border: "transparent",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", color: "inactive.main" }}
                    >
                      Start date: {project?.start_date}{" "}
                      <span
                        style={{
                          fontSize: "20px",
                          verticalAlign: "super",
                        }}
                      >
                        .
                      </span>{" "}
                      USD ${project?.roles[0]?.salary}
                    </Typography>

                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px",
                        maxWidth: "100%",
                        overflowX: "auto",
                        overflowY: "hidden",
                        whiteSpace: "nowrap",
                        p: 2,
                      }}
                    >
                      {project?.roles[0]?.skills < 1 ? (
                        <Typography color="primary" fontSize="16px">
                          No skills found
                        </Typography>
                      ) : (
                        project?.roles[0]?.skills?.map((skill) => (
                          <Box
                            key={skill?.title}
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
                              {skill?.title}
                            </Typography>
                          </Box>
                        ))
                      )}
                    </Stack>

                    <Typography
                      variant="body2"
                      title={project?.description}
                      color="inactive.main"
                      sx={{
                        height: "70px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {project?.description}
                    </Typography>

                    <Link
                      to={`mailto:${project?.email}`}
                      style={{ marginTop: "auto" }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          width: "130px",
                          height: "20px",
                          p: "10px",
                          borderRadius: "5px",
                          border: "1px solid #6AE6A4",
                          color: "darkGreenAccent",
                          textTransform: "capitalize",
                          "&:hover": {
                            borderColor: "accent",
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: "accent" }}
                        >
                          Apply
                        </Typography>
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      ) : (
        <>
          <Typography variant="h6" sx={{ fontWeight: 500, color: "#707070" }}>
            Latest Matches
          </Typography>

          {projectsData?.profile_based?.length < 1 ? (
            <Typography variant="h3" color="primary" mb={3.125}>
              No projects found
            </Typography>
          ) : (
            projectsData?.profile_based?.slice(0, 1).map((project) => (
              <Stack
                key={project?.id}
                sx={{
                  gap: "12px",
                  p: "12px",
                  background: "white",
                  border: "2px solid #EEE",
                  borderRadius: "10px",
                }}
              >
                <Link to={`${EMPLOYEE_PROJECT_DETAILS_ROUTE}/${project?.id}`}>
                  <Typography
                    variant="body1"
                    sx={{
                      textTransform: "capitalize",
                      color: "darkGreenAccent",
                    }}
                  >
                    {project?.name}
                  </Typography>
                </Link>

                <Typography variant="body2" color="inactive.main">
                  {project?.department ? `${project?.department} -` : ""} Start
                  date: {project?.start_date}{" "}
                </Typography>
              </Stack>
            ))
          )}
        </>
      )}

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
            handleNavigation("main__4", "sub__1", EMPLOYEE_PROJECTS_ROUTE)
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
            See all projects
          </Typography>
        </Button>
      </Box>
    </StyledWrapper>
  );
};

export default ProjectsSection;
