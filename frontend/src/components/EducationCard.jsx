import {
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import editaIcon from "../assets/edit_icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";
const detailsTypographyStyle = {
  fontSize: { xs: "12px", md: "16px" },
};
const EducationCard = ({
  degree,
  institution,
  date,
  level,
  onEdit,
  onDelete,
  hideOptions = false,
}) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  const editBtnHandler = () => {
    onEdit(
      {
        degree,
        institution,
        level,
        started: Date.now(),
        finished: Date.now(),
      },
      "Education"
    );
  };

  return (
    <Stack
      className="education__Card"
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        px: { xs: 2.5, lg: 4 },
        py: { xs: 1.25, lg: 2.5 },
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
          {degree}
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
              endIcon={<img src={editaIcon} alt="edit icon" />}
            >
              edit
            </Button>
            <IconButton
              onClick={() => onDelete("Degree")}
              sx={{ color: "#FE7777" }}
            >
              <DeleteIcon fontSize={lgMatches ? "medium" : "small"} />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <Stack>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            justifyContent: { xs: "flex-start" },
          }}
        >
          <Typography
            variant="body1"
            sx={detailsTypographyStyle}
            color="#808080"
          >
            {institution}
          </Typography>
          <Typography
            variant="body1"
            sx={detailsTypographyStyle}
            color="#AAAAAA"
          >
            {date}
          </Typography>
        </Stack>
        <Typography variant="h5" sx={detailsTypographyStyle} color="#AAAAAA">
          {level}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EducationCard;
