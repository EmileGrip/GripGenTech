import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DarkBtn from "../../../components/styled/StyledDarkBtn";
import StyledWrapper from "../../../components/styled/StyledWrapper";
import addFileIcon from "../../../assets/plus_paper.svg";
import finishedGoalsIcon from "../../../assets/finished_goals.svg";
import SuggestedGoalCard from "./SuggestedGoalCard";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { EMPLOYEE_ADD_GOAL_ROUTE } from "../../../routes/paths";
import { useEffect } from "react";

const GoalsPreview = () => {
  const location = useLocation();
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle(location.pathname.split("/").at(-1));
  }, [setTitle, location]);

  const navigate = useNavigate();

  return (
    <Stack sx={{ gap: 3 }}>
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          justifyContent: { lg: "space-between" },
          gap: 2,
        }}
      >
        <Stack sx={{ flexDirection: { xs: "column", lg: "row" } }}>
          <Typography
            sx={{
              px: 2,
              py: 1,
              borderBottom: `3px solid`,
              borderColor: "accent",
              alignSelf: "center",
              fontWeight: 600,
            }}
            variant="h4"
          >
            Development goals
          </Typography>
        </Stack>
        <DarkBtn
          onClick={() => navigate(EMPLOYEE_ADD_GOAL_ROUTE)}
          endIcon={<AddIcon />}
        >
          add new goal
        </DarkBtn>
      </Stack>
      <StyledWrapper sx={{ gap: 2 }}>
        <Typography sx={{ fontWeight: 600 }} variant="h4">
          My goals
        </Typography>
        <Box
          component={"img"}
          src={addFileIcon}
          sx={{ alignSelf: "center", width: "36px", height: "44.5px" }}
        />
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "inactive.main" }}
        >
          Nothing here yet!
          <br />
          Add a new goal for your career development
        </Typography>
        <IconButton
          sx={{
            alignSelf: "center",
            backgroundColor: "accent",
            width: "32px",
            height: "32px",
            "&:hover": {
              backgroundColor: "darkAccent",
            },
            boxShadow: "0px 2.909px 7.273px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          <AddIcon sx={{ width: "17.5px", height: "17.5px", color: "#fff" }} />
        </IconButton>
      </StyledWrapper>
      <StyledWrapper sx={{ gap: 2 }}>
        <Typography sx={{ fontWeight: 600 }} variant="h4">
          Completed goals{" "}
        </Typography>
        <Box
          component={"img"}
          src={finishedGoalsIcon}
          sx={{ alignSelf: "center", width: "36px", height: "44.5px" }}
        />
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "inactive.main" }}
        >
          Nothing here yet!
          <br />
          Here you can find your completed goals{" "}
        </Typography>
      </StyledWrapper>

      <StyledWrapper sx={{ gap: 2 }}>
        <Typography sx={{ fontWeight: 600 }} variant="h4">
          Suggested goals
        </Typography>
        <Stack
          sx={{
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: 2,
          }}
        >
          {[
            "Ultimate Web Designer & Web Developer Course",
            "Complete Web Designing Course | Web-Development BootCamp",
          ].map((card) => (
            <SuggestedGoalCard title={card} />
          ))}
        </Stack>
      </StyledWrapper>
    </Stack>
    // <div>goals preview</div>
  );
};

export default GoalsPreview;
