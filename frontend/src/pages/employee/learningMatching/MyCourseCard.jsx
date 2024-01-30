import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import statusValidateIcon from "../../../assets/status_validate.svg";
import moreHorizIcon from "../../../assets/moreHoriz__icon.svg";
import correctIcon from "../../../assets/correct_icon_btn.svg";
import deleteIcon from "../../../assets/delete_icon.svg";
import { ReactSVG } from "react-svg";
import { StyledSVG } from "./CourseDetails";
import { Link } from "react-router-dom";
import { EMPLOYEE_LEARNING_MATCHING } from "../../../routes/paths";

const StyledCourseCard = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "12px",
  padding: "12px",
  height: "77px",
  alignItems: "center",
  borderRadius: " 10px",
  border: "2px solid  #EEE",
  background: "#FAFAFA",
  // width: "100%",
  // [theme.breakpoints.up("md")]: {
  //   width: `calc(50% - 8px)`,
  // },
  // [theme.breakpoints.up("xl")]: {
  //   width: `calc(33.13% - 8px)`,
  // },
}));

const MyCourseCard = ({ course, onModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;
  return (
    <StyledCourseCard>
      <Box
        component="img"
        src={course?.img}
        alt="course image"
        sx={{ objectFit: "cover", width: "50px", height: "50px" }}
      />
      <Link
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
        to={`${EMPLOYEE_LEARNING_MATCHING}/courseId`}
      >
        <Typography
          variant="h5"
          title={course?.title}
          sx={{
            fontWeight: 600,
            color: "#173433",
            lineHeight: "1.5",
          }}
        >
          <LinesEllipsis
            text={course?.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="words"
          />
        </Typography>
      </Link>
      {course?.status === "finished" ? (
        <Box
          sx={{ width: "26px", height: "26px" }}
          component="img"
          src={statusValidateIcon}
          alt="stauts icon"
        />
      ) : (
        <IconButton
          onClick={handleClick}
          sx={{ width: "24px", height: "24px" }}
        >
          <Box component="img" src={moreHorizIcon} alt="stauts icon" />
        </IconButton>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack sx={{ p: 2, gap: 2, alignItems: "flex-end" }}>
          <Button
            sx={{
              p: 0.25,
              lineHeight: 1.5,
              color: "#788894",
              textTransform: "initial",
            }}
            onClick={() => onModal(course?.title, course?.skills, "complete")}
            endIcon={
              <ReactSVG
                wrapper="svg"
                style={{ width: "24px", height: "24px" }}
                src={correctIcon}
                beforeInjection={(svg) => {
                  const [firstGElement] = [...svg.querySelectorAll("g")];
                  const paths = [...firstGElement.querySelectorAll("path")];
                  paths.forEach((element) => {
                    element.setAttribute("stroke", "#788894");
                  });
                }}
              />
            }
          >
            Mark as completed
          </Button>

          <Button
            sx={{
              p: 0.25,
              lineHeight: 1.5,
              color: "#788894",
              textTransform: "initial",
            }}
            onClick={() => onModal(course?.title, "remove")}
            endIcon={
              <StyledSVG
                wrapper="svg"
                style={{ width: "24px", height: "24px" }}
                src={deleteIcon}
              />
            }
          >
            Remove course
          </Button>
        </Stack>
      </Popover>
    </StyledCourseCard>
  );
};

export default MyCourseCard;
