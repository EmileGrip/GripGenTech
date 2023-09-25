import RatingBar from "../../../components/RatingBar";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import hintIcon from "../../../assets/hintIcon.svg";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";

const SkillRow = ({ skill }) => {
  return (
    <Stack sx={{ mb: 2 }}>
      <Grid
        container
        spacing={1}
        columns={12}
        sx={{
          background: "#FFFFFF",
          borderRadius: "10px",
          p: 1,
        }}
      >
        <Grid item xs={6} sx={{ alignItems: "center" }}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              mt: "14px",
              pl: 1,
            }}
          >
            <Typography
              variant="h5"
              title={skill.skillName}
              sx={{
                color: "darkGreen",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {skill.skillName}
            </Typography>

            <DescriptionTooltip
              title={skill.description}
              placement="bottom-start"
            >
              <img src={hintIcon} alt="icon" style={{ alignSelf: "center" }} />
            </DescriptionTooltip>
          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip
              title={
                <>
                  <div style={{ textAlign: "center" }}>Proficiency needed</div>
                  <RatingBar initialValue={skill.status} />
                </>
              }
              placement="top-start"
              followCursor
            >
              <span
                style={{
                  marginTop: "7px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                <RatingBar initialValue={skill.currentProf} />
              </span>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SkillRow;
