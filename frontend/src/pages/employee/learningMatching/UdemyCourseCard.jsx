import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CustomChip from "./CustomChip";

const UdemyCourseCard = ({ img, title, rate, students, price, tags }) => {
  return (
    <Paper
      elevation={1}
      component={Stack}
      sx={{
        pb: "20px",
        backgroundColor: "#f6f6f6",
        borderRadius: "10px",
        gap: "12px",
        width: "100%",
        maxWidth: { xs: "318px", sm: "273px", md: "300px", lg: "273px" },
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
          height: "135px",
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
          gap: "12px",
          px: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "#173433",
          }}
        >
          {/* Course Title */}
          {title}
        </Typography>

        {/* <Stack
          className="rating-row"
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <Stack
            className="rating-box"
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <StarIcon
              sx={{ width: "19px", height: "19px", color: "#fbb344" }}
            />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {rate}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: "#a1a1a1" }}>
            ({students})
          </Typography>
        </Stack> */}

        <Typography variant="h3" sx={{ color: "#173433" }}>
          {`USD $${price}`}
        </Typography>

        {/* <Stack
          className="tags-row"
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: "flex-start",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {tags.map((tag, index) => (
            <CustomChip
              sx={{
                "& .MuiChip-label": {
                  fontSize: "10px",
                },
              }}
              size="small"
              label={tag}
              key={index}
            />
          ))}
        </Stack> */}

        <Button
          variant="outlined"
          sx={{
            alignSelf: "stretch",
            p: "10px",
            borderRadius: "5px",
            border: "1px solid currentColor",
            fontWeight: 600,
            color: "#173433",
            textTransform: "capitalize",
          }}
        >
          Start course
        </Button>
      </Stack>
    </Paper>
  );
};

export default UdemyCourseCard;
