import {
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import editaIcon from "../assets/edit_icon.svg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";

const CourseCard = ({ data, onEdit, onDelete, hideOptions = false }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  const editBtnHandler = () => {
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    onEdit(
      {
        degree: data.degree,
        institution: data.institution,
        started: startDate,
        finished: endDate,
        id: data.id,
      },
      "Course"
    );
  };

  const detailsTypographyStyle = {
    fontSize: { xs: "12px", md: "16px" },
  };

  return (
    <Stack
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        px: { xs: 2.5, lg: 4 },
        py: { xs: 1.25, lg: 2.5 },
        height: "100%",
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "row" },
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: { xs: "20px" },
          mb: { xs: 1 },
        }}
      >
        <Typography
          variant={mdMatches ? "h4" : "h5"}
          component="h3"
          color={"#707070"}
          sx={{ textTransform: "capitalize", fontWeight: "400" }}
        >
          {data.degree}
        </Typography>
        {!hideOptions && (
          <Stack
            className="btns__wrapper"
            sx={{
              flexDirection: { xs: "row" },
              alignItems: { xs: "center" },
              gap: { xs: "8px", lg: "16px" },
            }}
          >
            <Button
              onClick={editBtnHandler}
              variant="text"
              sx={{
                color: "rgba(30, 57, 76, 0.5)",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "1.5",
              }}
              endIcon={<EditNoteIcon fontSize="small" />}
            >
              edit
            </Button>
            <IconButton
              onClick={() => onDelete("Course", data.id)}
              sx={{ color: "#FE7777" }}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <Stack flexDirection="row">
        <Typography variant="body1" sx={detailsTypographyStyle} color="#808080">
          {data.institution}
        </Typography>
        <Typography
          variant="body1"
          sx={detailsTypographyStyle}
          color="#AAAAAA"
          ml={3}
        >
          {data.start_date} - {data.end_date}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CourseCard;
