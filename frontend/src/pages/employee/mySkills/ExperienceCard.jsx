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
import moment from "moment/moment";

const detailsTypographyStyle = {
  fontSize: { xs: "12px", md: "16px" },
};

const ExperienceCard = ({ data, onEdit, onDelete, hideOptions = false }) => {
  const editBtnHandler = () => {
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    onEdit({
      position: data.title,
      company: data.company,
      joinedDate: startDate,
      leftDate: endDate,
      description: data.description,
      id: data.id,
      current: data.is_current,
    });
  };

  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  const listItems = data.description.split("-").map((line) => (
    <li className="list__item" style={{ fontSize: "12px" }} key={line}>
      {line}
    </li>
  ));

  return (
    <Stack
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
            endIcon={<EditNoteIcon fontSize="small" />}
          >
            edit
          </Button>

          <IconButton
            onClick={() => onDelete(data.id)}
            sx={{ color: "#FE7777", alignSelf: "flex-start" }}
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
          {data.title}
        </Typography>

        <Stack
          className="details"
          sx={{ flexDirection: "row", gap: { xs: "8px", lg: "24px" } }}
        >
          <Typography
            variant="h3"
            color="secondary.main"
            sx={detailsTypographyStyle}
          >
            {data.company} {"-"}
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

        <ul
          style={{
            paddingLeft: "0px",
            color: "#707070",
            margin: "0",
            listStyle: "inside",
            width: "100%",
            height: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {[listItems[0], listItems[1], listItems[2]].map((item) => item)}
        </ul>
      </Stack>
    </Stack>
  );
};

export default ExperienceCard;
