import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import HeadersTableOverview from "./HeadersTableOverview";
import TableContentOverview from "./TableContentOverview";
import SkillsWishlistList from "../../../components/SkillsWishlistList";
import { Link, Outlet } from "react-router-dom";
import { EMPLOYEE_MY_SKILLS_ROUTE } from "../../../routes/paths";
import CustomModal from "../../../ui/CustomModal";
import { suggestedSkills as ModalSuggestedSkills } from "../../../data/skillsData";
import AddSkillForm from "./AddSkillForm";
import { skillsTableHeaders as headers } from "../../../data/skillsData";

const Overview = () => {
  console.log(headers);
  const anchorClass = {
    marginRight: "27px",
    color: "#66C1FF",
    ":active": "#66C1FF",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <CustomModal open={open} onClose={handleClose} title="Add Skill">
        <AddSkillForm data={ModalSuggestedSkills} />
      </CustomModal>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        mb={4}
        className="header__section"
      >
        <Box>
          <Typography variant="h3" mb={3} color={"primary.main"}>
            My Skills Overview
          </Typography>
          <Typography variant="h2" color={"primary.main"}>
            Senior UI Developer
          </Typography>
        </Box>
        <Stack flexDirection="row" alignItems="center">
          <Link to={EMPLOYEE_MY_SKILLS_ROUTE} style={anchorClass}>
            Reupload Resumé
          </Link>
          <Link to={EMPLOYEE_MY_SKILLS_ROUTE} style={anchorClass}>
            Reconnect Linkedin
          </Link>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 8.75,
              lineHeight: "1.5",
              textTransform: "capitalize",
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
        <HeadersTableOverview data={headers} />
        <TableContentOverview />
        <SkillsWishlistList />
      </Stack>
    </>
  );
};

export default Overview;
