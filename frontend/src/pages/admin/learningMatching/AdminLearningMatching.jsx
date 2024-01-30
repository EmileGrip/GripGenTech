import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import udemy from "../../../assets/udemy.svg";
import React, { useState } from "react";

const AdminLearningMatching = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [showMore, setShowMore] = useState(false);
  const description =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, ratione in. Alias assumenda incidunt fugit totam enim qui et laboriosam repudiandae fuga laudantium, quisquam repellat doloremque, voluptas, minima atque dignissimos.";

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Selected Providers
      </Typography>

      <Box
        sx={{
          width: { xs: "100%", md: "300px" },
          height: showMore ? "auto" : "360px",
          background: "#FAFAFA",
          border: "2px solid #EEE",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Stack
          sx={{ justifyContent: "center", alignItems: "center", gap: "12px" }}
        >
          <img src={udemy} alt="Udemy" />

          <Typography
            variant="h3"
            sx={{ textTransform: "capitalize", color: "#173433" }}
          >
            provider name
          </Typography>

          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "#788894" }}
          >
            Platforms{" "}
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>.</span>{" "}
            Pay methods{" "}
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>.</span>
            <br />
            Price range{" "}
            <span style={{ fontSize: "20px", verticalAlign: "super" }}>
              .
            </span>{" "}
            Language
          </Typography>

          <Divider sx={{ width: "230px", height: "2px", background: "#EEE" }} />

          <Box
            sx={{
              width: "100%",
              height: showMore ? "auto" : "63px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography variant="body1" color="#788894" width="100%">
              {description}
            </Typography>
          </Box>

          {description?.length >= 87 && mdMatches && (
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
                mt: { xs: -2 },
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "... show less" : "... show more"}
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default AdminLearningMatching;
