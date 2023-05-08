import { Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const SemiCircle = ({ onMenu }) => {
  return (
    <Box
      onClick={() => onMenu(true)}
      sx={{
        position: "fixed",
        width: "40px",
        height: "60px",
        borderRadius: "0 150px 150px 0",
        backgroundColor: "#e9e9e9",
        left: "0",
        top: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        cursor: "pointer",
        transition: "0.3s",
        transform: "translateX(-10px)",

        "&:hover": {
          transform: "translateX(0)",
        },
      }}
    >
      <KeyboardArrowRightIcon
        sx={{ mb: 0.5, mr: 0.5, color: "rgba(0, 0, 0, 0.54)" }}
      />
    </Box>
  );
};

export default SemiCircle;
