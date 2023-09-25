import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import editIcon from "../../../assets/edit_icon.svg";
import addFileIcon from "../../../assets/add_file_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSkillsData } from "../../../redux/slices/Employee/mySkills/mySkillsActions";
import { fetchUserById } from "../../../redux/slices/admin/users/usersActions";
import SkillTableRowOverview from "./SkillTableRowOverview";
import { Link } from "react-router-dom";
import { EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE } from "../../../routes/paths";

const SkillsOverview = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { userInfo, token } = useSelector((state) => state.auth);
  const { skills, skillsDataLoading, skillsRecommendation } = useSelector(
    (state) => state.mySkills
  );
  const dispatch = useDispatch();

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
      <Stack className="displayData__section" sx={{ width: "100%" }}>
        {skillsDataLoading && <CircularProgress />}
        {!skillsDataLoading && (
          <>
            {modifiedSkills.length < 1 ? (
              <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <img src={addFileIcon} alt="Add file icon" />

                <Typography variant="h3" color="#788894" my="20px">
                  Your Skill information is empty
                </Typography>
              </Stack>
            ) : (
              <Box
                className="tableContent__section"
                sx={{
                  height: { xs: "200px", sm: "230px", lg: "250px" },
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Link to={EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE}>
                  <img
                    src={editIcon}
                    alt="Edit icon"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      cursor: "pointer",
                    }}
                  />
                </Link>

                {modifiedSkills.map((skill) => (
                  <SkillTableRowOverview skill={skill} key={skill.id} />
                ))}
              </Box>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default SkillsOverview;
