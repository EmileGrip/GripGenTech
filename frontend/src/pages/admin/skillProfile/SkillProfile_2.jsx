import React from "react";
import CustomModal from "../../../ui/CustomModal";
import AddSkillForm from "../../employee/mySkills/AddSkillForm";
import { useState } from "react";
import { suggestedSkills as ModalSuggestedSkills } from "../../../data/skillsData";
import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  NativeSelect,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { jobPositions } from "../../../data/jobPositionsData";

const SkillProfile_2 = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        title="Add Skill"
      >
        <AddSkillForm data={ModalSuggestedSkills} />
      </CustomModal>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-between" },
        }}
      >
        <TextField
          select
          defaultValue="Skills"
          SelectProps={{
            native: true,
          }}
        >
          {jobPositions.map((option, index) => (
            <option key={option.jobTitle} value={option.jobTitle}>
              {option.jobTitle}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

export default SkillProfile_2;
