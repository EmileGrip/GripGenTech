import RatingBar from "../../../components/RatingBar";
import { skillsTable as data } from "../../../data/skillProfileData";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import { useState } from "react";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  p: 0,
};

const TableContent = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const proficiencyMap = {
    1: "Basic",
    2: "Intermediate",
    3: "Advanced",
    4: "Expert",
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {data.map((skill, index) => (
        <Stack
          sx={{
            flexDirection: { xs: "row" },
          }}
          className="tableContent__section"
          key={index}
        >
          <IconButton sx={{ alignSelf: "center" }}>
            <img src={moreHoriz__icon} alt="icon" />
          </IconButton>

          <Grid
            container
            spacing={1}
            columns={16}
            alignItems="center"
            sx={{
              flex: 1,
              minHeight: "72px",
              borderBottom: "2px solid #E9E9E9",
            }}
          >
            <Grid xs={8} sm={10} lg={5} sx={gridStyles}>
              <Typography
                sx={{
                  color: "#788894",
                  fontSize: "20px",
                  fontWeight: 400,
                  mr: 1.75,
                  pl: 2,
                  fontSize: {
                    xs: "13px",
                    sm: "16px",
                    md: "20px",
                  },
                }}
                variant="h5"
              >
                {skill.skillName}
              </Typography>
            </Grid>

            {lgMatches && (
              <Grid xs={0} lg={7} sx={{ ...gridStyles, pt: 2, pb: 1 }}>
                <Typography
                  color="primary.main"
                  variant="body1"
                  sx={{
                    color: "#788894",
                    width: "80%",
                  }}
                >
                  {showMore
                    ? skill.description + "... "
                    : skill.description.substring(0, 100) + "... "}
                  <Button
                    disableRipple={true}
                    variant="text"
                    sx={{
                      color: "#66C1FF",
                      alignSelf: "flex-start",
                      fontWeight: "400",
                      textTransform: "lowercase",
                      lineHeight: "1.5",
                      p: 0,
                      "&: hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? ` Show less` : " Show more"}
                  </Button>
                </Typography>
              </Grid>
            )}

            <Grid
              xs={8}
              sm={6}
              lg={4}
              sx={{
                ...gridStyles,
                justifyContent: { md: "center", lg: "flex-start" },
                gap: { lg: "34px" },
              }}
            >
              <Tooltip
                title={
                  <>
                    <div style={{ textAlign: "center" }}>
                      Proficiency needed
                    </div>
                    <RatingBar initialValue={4 - skill.currentProf} />
                  </>
                }
                placement="top-start"
                followCursor
              >
                <span>
                  <RatingBar initialValue={skill.currentProf} />
                </span>
              </Tooltip>
              {lgMatches && (
                <Typography
                  variant="body2"
                  sx={{ color: "#788894", fontSize: "14px" }}
                >
                  {proficiencyMap[String(skill.currentProf)]}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
      ))}
    </>
  );
};

export default TableContent;
