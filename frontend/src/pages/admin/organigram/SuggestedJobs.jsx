import { Box, Typography } from "@mui/material";

const SuggestedJobs = (props) => {
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
    cursor: "pointer",
    border: props.selectedJob === props.children && "1px solid #1E394C",
  };

  const chipHandler = (e) => {
    props.onClick(e.currentTarget.textContent);
  };
  return (
    <Box sx={style}>
      <Typography
        sx={{ flex: 1, textAlign: "center" }}
        variant="h5"
        onClick={(e) => chipHandler(e)}
      >
        {props.children}
      </Typography>
    </Box>
  );
};

export default SuggestedJobs;
