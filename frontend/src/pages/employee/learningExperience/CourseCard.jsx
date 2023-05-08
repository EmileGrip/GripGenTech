import { Button, Stack, Typography } from "@mui/material";
import editaIcon from "../../../assets/edit_icon.svg";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CourseCard = ({ degree, institution, date, onEdit, onDelete }) => {
  const editBtnHandler = () => {
    onEdit(
      {
        degree,
        institution,
        started: Date.now(),
        finished: Date.now(),
      },
      "Course"
    );
  };
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        padding: "12px 21px 18px",
      }}
    >
      <Stack>
        <Typography
          variant="h4"
          component="h3"
          color={"#707070"}
          sx={{ textTransform: "capitalize" }}
        >
          {degree}
        </Typography>
        <Stack flexDirection="row">
          <Typography variant="body1" color="#808080">
            {institution}
          </Typography>
          <Typography variant="body1" color="#AAAAAA" ml={3}>
            {date}
          </Typography>
        </Stack>
      </Stack>
      <Stack justifyContent="space-between">
        <Button
          onClick={editBtnHandler}
          variant="text"
          sx={{
            color: "rgba(30, 57, 76, 0.5)",
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            alignSelf: "flex-start",
          }}
          endIcon={<img src={editaIcon} alt="edit icon" />}
        >
          edit
        </Button>
        <Button
          onClick={() => onDelete("Course")}
          variant="text"
          sx={{
            color: "#FE7777",
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            alignSelf: "flex-start",
          }}
          endIcon={<RemoveCircleOutlineIcon />}
        >
          delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default CourseCard;
