import { Chip, styled } from "@mui/material";

const CustomChip = styled(Chip)(({ theme, id, selectedSkillId }) => ({
  "&.MuiChip-root": {
    backgroundColor:
      id === selectedSkillId ? "#0C1716" : "rgba(23, 52, 51, 0.40)",
    cursor: "pointer",
  },
  "& .MuiChip-label": {
    fontSize: "14px",
    fontWeight: 500,
    color: "white",
    textTransform: "capitalize",
  },
}));

export default CustomChip;
