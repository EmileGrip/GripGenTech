import {
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";

const detailsTypographyStyle = {
  fontSize: { xs: "12px", md: "16px" },
};

const CouCard = ({ data, onEdit, onDelete, hideOptions = false }) => {
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
        level: data.level,
        description: "",
        started: startDate,
        finished: endDate,
        id: data.id,
      },
      "Education"
    );
  };

  return (
    <Stack
      className="education__Card"
      sx={{
        position: "relative",
        flex: 1,
        flexDirection: "column",
        gap: { xs: 1, lg: 2 },
        backgroundColor: "#FFFFFF",
        border: "1px solid #EEEEEE",
        borderRadius: "10px",
        py: 4,
        px: 2,
        mb: 1,
      }}
    >
      {!hideOptions && (
        <Stack
          className="btns__wrapper"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            flexDirection: { xs: "row" },
            alignItems: { xs: "center" },
            gap: 1,
            alignSelf: "flex-end",
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
            endIcon={<EditNoteIcon />}
          >
            edit
          </Button>
          <IconButton
            onClick={() => onDelete(data.id)}
            sx={{ color: "#FE7777" }}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}

      <Stack className="content__wrapper">
        <Typography
          variant="h3"
          color="secondary.main"
          sx={{ textTransform: "capitalize", fontWeight: "600" }}
        >
          {data.degree}
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            justifyContent: { xs: "flex-start" },
          }}
        >
          <Typography
            variant="h3"
            color="secondary.main"
            sx={detailsTypographyStyle}
          >
            {data.institution} {"-"}
          </Typography>

          <Typography
            variant="body1"
            color="#AAAAAA"
            sx={detailsTypographyStyle}
          >
            {moment(data.start_date).format("MMM YYYY")} {" - "}
            {moment(data.end_date).format("MMM YYYY")}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CouCard;
