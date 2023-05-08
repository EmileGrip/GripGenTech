import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import workLogo from "../../../assets/workExp_icon.png";
import editaIcon from "../../../assets/edit_icon.svg";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ExpCard = ({
  jobTitle,
  company,
  field,
  jobState,
  date,
  iconPath,
  jobDescription,
  onEdit,
  onDelete,
}) => {
  const editBtnHandler = () => {
    onEdit({
      position: jobTitle,
      company: company,
      joinedDate: Date.now(),
      leftDate: Date.now(),
      description: jobDescription,
    });
  };
  const [showMore, setShowMore] = useState(false);
  const listItems = jobDescription
    .split("-")
    .map((line) => <li key={line}>{line}</li>);

  return (
    <Stack
      flexDirection="row"
      gap="50px"
      sx={{
        backgroundColor: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        pl: 5.25,
        pr: 3.75,
        pt: 2.5,
        pb: 1.5,
      }}
    >
      <img src={iconPath} alt="work logo" style={{ alignSelf: "center" }} />
      <Stack flex="1" flexDirection="row" justifyContent="space-between">
        <Stack>
          <Typography
            variant="h4"
            component="h3"
            color={"#707070"}
            sx={{ textTransform: "capitalize" }}
          >
            {jobTitle}
          </Typography>

          <Stack className="details" flexDirection="row" mb={1.5}>
            <Typography variant="body1" color="#808080">
              <Typography color="inherit" variant="span">
                {company}
              </Typography>
              {" - "}
              <Typography color="inherit" variant="span">
                {field}
              </Typography>
              {" . "}
              <Typography color="inherit" variant="span">
                {jobState}
              </Typography>
            </Typography>
            <Typography variant="body1" color="#AAAAAA" ml={3}>
              {date}
            </Typography>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <ul
            style={{
              paddingLeft: "0px",
              color: "#707070",
              margin: "0",
              listStyle: "inside",
            }}
          >
            {showMore
              ? listItems
              : [listItems[0], listItems[1]].map((item) => item)}
          </ul>
          <Button
            disableRipple={true}
            variant="text"
            sx={{
              color: "#66C1FF",
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontWeight: "400",
              lineHeight: "1.5",
              "&: hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? `... show less` : "... show more"}
          </Button>
        </Stack>
        <Stack spacing={2}>
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
            onClick={onDelete}
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
    </Stack>
  );
};

export default ExpCard;
