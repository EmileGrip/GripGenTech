import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  useThemeProps,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SkillHeadersRow from "../../../components/SkillHeadersRow";
import SkillsWishlistList from "../../../components/SkillsWishlistList";
import { Link, Outlet } from "react-router-dom";
import { EMPLOYEE_MY_SKILLS_ROUTE } from "../../../routes/paths";
import CustomModal from "../../../ui/CustomModal";
import { suggestedSkills as ModalSuggestedSkills } from "../../../data/skillsData";
import AddSkillForm from "./AddSkillForm";
import { skillsTableHeaders as headers } from "../../../data/skillsData";
import SkillTableRow from "../../../components/SkillTableRow";
import { skillsTable as dataTable } from "../../../data/skillsData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSkillsData } from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";
import SkillsRecommendation from "./SkillsRecommendations";

const Overview = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { userInfo, token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.users);
  const { skills, skillsDataLoading, skillsRecommendation } = useSelector(
    (state) => state.mySkills
  );
  const dispatch = useDispatch();
  console.log(skillsRecommendation);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const anchorClass = {
    color: "#66C1FF",
    ":active": "#66C1FF",
    fontSize: mdMatches ? "16px" : "12px",
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserById(userInfo.id));
      dispatch(fetchSkillsData(userInfo.id));
    }
  }, [token, dispatch]);

  const modifiedSkills = skills
    .slice()
    ?.sort((a, b) => a?.title?.localeCompare(b?.title));

  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillForm data={skillsRecommendation} closeModal={handleClose} />
      </CustomModal>
      <Stack
        className="header__section"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-between" },
          mb: 4,
        }}
      >
        <Box sx={{ mb: { xs: 2 } }}>
          <Typography variant="h3" mb={3} color={"primary.main"}>
            My Skills Overview
          </Typography>
          {loading && <CircularProgress />}
          {!loading && (
            <Typography
              variant="h2"
              color={"primary.main"}
              textTransform="capitalize"
            >
              {user?.role?.title ? user?.role?.title : "Current role unknown"}
            </Typography>
          )}
        </Box>
        <Stack
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            alignSelf: "flex-start",
            alignItems: { lg: "center" },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              mb: { xs: 3, lg: 0 },
            }}
          >
            <Link
              to={EMPLOYEE_MY_SKILLS_ROUTE}
              style={{ ...anchorClass, marginRight: "27px" }}
            >
              Reupload Resumé
            </Link>
            <Link to={EMPLOYEE_MY_SKILLS_ROUTE} style={anchorClass}>
              Reconnect Linkedin
            </Link>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          alignItems: { sm: "center" },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography variant={"h3"} color="primary.main" fontWeight={"400"}>
          My Skills
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            px: { xs: 4 },
            lineHeight: "1.5",
            textTransform: "capitalize",
            alignSelf: "flex-start",
          }}
          endIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Skill
        </Button>
      </Stack>

      <Stack className="displayData__section" mt={5.5} sx={{ width: "100%" }}>
        {skillsDataLoading && <CircularProgress />}
        {!skillsDataLoading && (
          <>
            {modifiedSkills.length < 1 ? (
              <Typography variant="h3" color="primary" mb={3.125}>
                No skills found
              </Typography>
            ) : (
              <Box className="tableContent__section">
                <SkillHeadersRow data={headers} />
                {modifiedSkills.map((skill) => (
                  <SkillTableRow skill={skill} key={skill.id} />
                ))}
              </Box>
            )}
          </>
        )}
        <SkillsRecommendation />
        <SkillsWishlistList />
      </Stack>
    </>
  );
};

export default Overview;
