import { Box, Typography } from "@mui/material";

const SuggestedSkillChip = (props) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "400",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "20px",
    paddingLeft: "20px",
    color: "secondary.main",
    backgroundColor: "#E5F3FC",
    cursor: "pointer",
  };

  const chipHandler = (e) => {
    props.onClick(e.currentTarget.textContent);
  };
  return (
    <Box sx={style}>
      <Typography
        sx={{ flex: 1, textAlign: "center" }}
        variant="body1"
        onClick={(e) => chipHandler(e)}
      >
        {props.children}
      </Typography>
    </Box>
  );
};

export default SuggestedSkillChip;
