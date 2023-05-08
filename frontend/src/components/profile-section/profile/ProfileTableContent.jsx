import RatingBar from "../../RatingBar";
import { skillsTable as data } from "../../../data/mySkillsProfileData";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import hintIcon from "../../../assets/hintIcon.svg";
import completeIcon from "../../../assets/completeIcon.svg";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";
import { Stack } from "@mui/system";

const ProfileTableContent = () => {
  const checkLastChild = (index, array) => index + 1 === array.length;
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));

  const imgStyles = {
    display: "block",
    maxWidth: "100%",
    height: "100%",
  };

  const gridStyles = {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    p: 0,
  };

  return (
    <Box className="tableContent__section">
      {data.map((skill, index) => (
        <Grid
          container
          spacing={1}
          columns={{ xs: 20, sm: 16 }}
          key={skill.skillName}
          sx={{
            background: "#f5f5f5",
            borderRadius: "10px",
            height: "45px",
            minHeight: "45px",
            mb: checkLastChild(index, data) ? 3.875 : 3.125,
          }}
        >
          <Grid xs={9.5} sm={5} sx={gridStyles}>
            <Stack>
              <Stack direction="row">
                <Typography
                  sx={{
                    color: "#737373",
                    fontSize: "20px",
                    fontWeight: 400,
                    mr: {
                      xs: "6px",
                      sm: 1.75,
                    },
                    pl: 2,
                    fontSize: {
                      xs: "13px",
                      sm: "16px",
                      md: "20px",
                    },
                    whiteSpace: "nowrap",
                  }}
                  variant="h5"
                >
                  {skill.skillName}
                </Typography>
                <DescriptionTooltip
                  title={skill.description}
                  placement="bottom-start"
                >
                  <img src={hintIcon} alt="icon" />
                </DescriptionTooltip>
              </Stack>
              {!smMatches && (
                <Typography
                  color="primary.main"
                  variant="body1"
                  sx={{ fontSize: "10px", ml: "16px" }}
                >
                  origin: {skill.origin}
                </Typography>
              )}
            </Stack>
          </Grid>

          {smMatches && (
            <Grid xs={4} sx={gridStyles}>
              <Typography color="primary.main" variant="body1">
                {skill.origin}
              </Typography>
            </Grid>
          )}

          <Grid xs={8} sm={5} sx={{ ...gridStyles, mt: "3px" }}>
            <Tooltip
              title={
                <>
                  <div style={{ textAlign: "center" }}>Proficiency needed</div>
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

            {/* <RatingBar initialValue={skill.currentProf} /> */}
          </Grid>

          <Grid xs={2} sx={{ ...gridStyles, justifyContent: "flex-end" }}>
            {skill.status === "complete" ? (
              <img src={completeIcon} style={imgStyles} alt="logo" />
            ) : (
              <Typography
                sx={{ fontSize: "20px", color: "primary.main", pr: 1 }}
              >
                {skill.status}
              </Typography>
            )}
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ProfileTableContent;
