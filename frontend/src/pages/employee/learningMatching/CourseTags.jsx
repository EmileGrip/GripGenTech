import {
  Box,
  Stack,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import React from "react";
import CustomChip from "./CustomChip";
import info_icon from "../../../assets/info_icon.svg";
import RatingBar from "../../../components/RatingBar";

const CourseTags = ({ tags }) => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {tags.map((tag, index) => (
        <CustomChip
          sx={{
            flexDirection: "row-reverse",
            "& .MuiChip-icon": {
              ml: 0,
              mr: "6px",
            },
          }}
          label={tag}
          key={index}
          icon={
            // TODO
            <Tooltip
              placement="top"
              title={
                <Stack sx={{ gap: 2 }}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ flex: 2, color: "#737373" }}
                    >
                      Current proficiency level
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <RatingBar initialValue={2} requiredLevel={3} />
                    </Box>
                  </Stack>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ flex: 2, color: "#737373" }}
                    >
                      Projected proficiency{" "}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <RatingBar initialValue={3} requiredLevel={3} />
                    </Box>
                  </Stack>
                </Stack>
              }
            >
              <Box component="img" src={info_icon} />
            </Tooltip>
          }
        />
      ))}
    </Stack>
  );
};

export default CourseTags;
