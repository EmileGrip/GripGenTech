import { Box, Typography } from "@mui/material";

const SuggestedSkillChip = (props) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "20px",
    paddingLeft: "20px",
    color: "secondary.main",
    backgroundColor: "#E5F3FC",
    border:
      props.children === props.selectedSkill ? "1px solid #1E394C" : "none",
    cursor: "pointer",
  };

  return (
    <Box sx={style} title={props.title} onClick={props.onClick}>
      <Typography
        sx={{
          flex: 1,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        variant="h5"
      >
        {props.children}
      </Typography>
    </Box>
  );
};

export default SuggestedSkillChip;
