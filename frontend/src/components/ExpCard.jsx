import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import workLogo from "../assets/workExp_icon.png";
import editaIcon from "../assets/edit_icon.svg";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const detailsTypographyStyle = {
  fontSize: { xs: "12px", md: "16px" },
};
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
  hideOptions = false,
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

  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  const [showMore, setShowMore] = useState(false);
  const listItems = jobDescription.split("-").map((line) => (
    <li
      className="list__item"
      style={{ fontSize: mdMatches ? "16px" : "12px" }}
      key={line}
    >
      {line}
    </li>
  ));

  return (
    <Stack
      className="expCard"
      flexDirection="row"
      gap="50px"
      sx={{
        backgroundColor: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        px: { xs: 2.5, lg: 5.25 },
        py: { xs: 1.25, lg: 2.5 },
      }}
    >
      {lgMatches && (
        <img src={iconPath} alt="work logo" style={{ alignSelf: "center" }} />
      )}
      <Stack
        sx={{
          flex: 1,
          flexDirection: { xs: "column" },
          justifyContent: { xs: "flex-start", lg: "space-between" },
          gap: { xs: 1, lg: 2 },
        }}
      >
        {!hideOptions && (
          <Stack
            className="btns__wrapper"
            sx={{
              flexDirection: { xs: "row" },
              alignItems: { xs: "center" },
              gap: { xs: "8px", lg: "16px" },
              alignSelf: "flex-end",
              mb: { xs: 1, lg: 0 },
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
            {/* {lgMatches && (
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
              endIcon={<DeleteIcon />}
            >
              delete
            </Button>
          )} */}
            <IconButton
              onClick={onDelete}
              sx={{ color: "#FE7777", alignSelf: "flex-start" }}
            >
              <DeleteIcon fontSize={lgMatches ? "medium" : "small"} />
            </IconButton>
          </Stack>
        )}

        <Stack
          sx={{
            flexDirection: { xs: "row" },
            gap: "22px",
            mb: { xs: "12px", lg: 0 },
          }}
        >
          {!lgMatches && (
            <img
              src={iconPath}
              alt="work logo"
              style={{ alignSelf: "center" }}
            />
          )}

          <Stack className="content__wrapper">
            <Typography
              variant={mdMatches ? "h4" : "h5"}
              component="h3"
              color={"#707070"}
              sx={{ textTransform: "capitalize", fontWeight: "400" }}
            >
              {jobTitle}
            </Typography>

            <Stack
              className="details"
              sx={{
                flexDirection: { xs: "column", lg: "row" },
                gap: { xs: "8px", lg: "24px" },
              }}
            >
              <Typography variant="body1" color="#808080">
                <Typography
                  color="inherit"
                  variant="span"
                  sx={detailsTypographyStyle}
                >
                  {company} {" - "}
                </Typography>

                <Typography
                  color="inherit"
                  variant="span"
                  sx={detailsTypographyStyle}
                >
                  {field} {" . "}
                </Typography>

                <Typography
                  color="inherit"
                  variant="span"
                  sx={detailsTypographyStyle}
                >
                  {jobState}
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                color="#AAAAAA"
                sx={detailsTypographyStyle}
              >
                {date}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider />

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
            fontSize: { xs: "12px", md: "16px" },
            mt: { xs: -1 },
          }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? `... show less` : "... show more"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ExpCard;
