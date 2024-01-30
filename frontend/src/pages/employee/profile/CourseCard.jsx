import { Box, Button, Paper, Stack, Typography } from "@mui/material";

const CourseCard = ({ img, title, price }) => {
  return (
    <Paper
      elevation={1}
      component={Stack}
      sx={{
        pb: "20px",
        backgroundColor: "#f6f6f6",
        borderRadius: "10px",
        gap: 1,
        width: "100%",
        maxWidth: { xs: "318px", sm: "273px", md: "300px", lg: "273px" },
        height: "300px",
      }}
    >
      <Box
        className="course-card-title"
        component="img"
        src={img}
        alt="course name"
        sx={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          width: "100%",
          height: "100px",
          objectFit: "cover",
          display: "block",
        }}
      />

      <Stack
        className="course-data-box"
        sx={{
          justifyContent: "space-between",
          height: "100%",
          alignItems: "center",
          px: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "darkGreenAccent",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontWeight: 700, color: "darkGreenAccent", py: "12px" }}
        >
          {`USD $${price}`}
        </Typography>

        <Button
          variant="outlined"
          sx={{
            width: "130px",
            height: "20px",
            p: "10px",
            borderRadius: "5px",
            border: "1px solid #6AE6A4",
            color: "darkGreenAccent",
            textTransform: "capitalize",
            "&:hover": {
              borderColor: "accent",
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: "accent" }}>
            Start Course
          </Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default CourseCard;
