import { Box, IconButton, Typography } from "@mui/material";
import StyledDarkWrapper from "../../../components/styled/StyledDarkWrapper";
import LinesEllipsis from "react-lines-ellipsis";
import viewIcon from "../../../assets/view_icon.svg";

const CourseAction = ({ img, title }) => {
  return (
    <StyledDarkWrapper
      sx={{ flexDirection: "row", gap: "12px", alignItems: "center" }}
    >
      <Box
        component={"img"}
        src={img}
        sx={{
          flex: 1,
          objectFit: "cover",
          objectPosition: "center",
          width: "50px",
          height: "50px",
        }}
      />
      <Typography
        variant="h5"
        sx={{ flex: 4, color: "darkGreenAccent", fontWeight: 600 }}
      >
        <LinesEllipsis
          text={title}
          maxLine="2"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </Typography>
      <IconButton>
        <Box
          component={"img"}
          src={viewIcon}
          sx={{
            flex: 1,
            width: "24px",
            height: "24px",
          }}
        />
      </IconButton>
    </StyledDarkWrapper>
  );
};

export default CourseAction;
