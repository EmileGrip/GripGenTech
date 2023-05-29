import {
  Box,
  Button,
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

const Overview = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const anchorClass = {
    marginRight: "27px",
    color: "#66C1FF",
    ":active": "#66C1FF",
    fontSize: mdMatches ? "16px" : "12px",
  };

  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillForm data={ModalSuggestedSkills} />
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
          <Typography variant="h2" color={"primary.main"}>
            Senior UI Developer
          </Typography>
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
            <Link to={EMPLOYEE_MY_SKILLS_ROUTE} style={anchorClass}>
              Reupload Resumé
            </Link>
            <Link
              to={EMPLOYEE_MY_SKILLS_ROUTE}
              style={{
                ...anchorClass,
                marginRight: mdMatches && !lgMatches ? 0 : "27px",
              }}
            >
              Reconnect Linkedin
            </Link>
          </Stack>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: { xs: 4 },
              lineHeight: "1.5",
              textTransform: "capitalize",
              alignSelf: { xs: "flex-start", md: "flex-end", lg: "flex-start" },
            }}
            endIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add Skill
          </Button>
        </Stack>
      </Stack>

      <Typography
        variant={"h3"}
        color="primary.main"
        fontWeight={"400"}
        gutterBottom
      >
        Skills based on your job, your Linkedin Profile and Resumé
      </Typography>

      <Stack className="displayData__section" mt={5.5} sx={{ width: "100%" }}>
        <SkillHeadersRow data={headers} />
        <Box className="tableContent__section">
          {dataTable.map((skill, index) => (
            <SkillTableRow skill={skill} key={skill.skillName} index={index} />
          ))}
        </Box>
        <SkillsWishlistList />
      </Stack>
    </>
  );
};

export default Overview;
