import RatingBar from "../../../components/RatingBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Stack,
  Box,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import hintIcon from "../../../assets/hintIcon.svg";
import completeIcon from "../../../assets/completeIcon.svg";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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

const RoleSkillTableRow = ({ skill }) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const skillName = smMatches
    ? skill?.title?.slice(0, 25)
    : skill?.title?.slice(0, 20);

  return (
    <Stack
      className="tableRow"
      sx={{
        mb: 3.125,
        gap: "4px",
        borderRadius: "10px",
        p: "4px ",
        background: "#f5f5f5",
      }}
    >
      <Grid
        container
        spacing={1}
        columns={{ xs: 20 }}
        sx={{
          height: "45px",
          minHeight: "45px",
          m: "0px",
        }}
      >
        <Grid xs={12} sm={10} sx={gridStyles}>
          <Stack sx={{ pl: { xs: "10px", lg: "15px" } }}>
            <Stack
              title={skill.title}
              sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
            >
              <Typography
                sx={{
                  color: "#737373",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: 400,
                }}
                variant="h5"
              >
                {skillName}
              </Typography>
              {lgMatches && (
                <DescriptionTooltip
                  title={skill.description}
                  placement="bottom-start"
                >
                  <img src={hintIcon} alt="icon" />
                </DescriptionTooltip>
              )}
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={6} sm={8} sx={{ ...gridStyles, mt: "3px", pl: { sm: 1 } }}>
          <Tooltip
            title={
              <>
                <div style={{ textAlign: "center" }}>Proficiency needed</div>
                <RatingBar initialValue={skill.required_level} />
              </>
            }
            placement="top-start"
            followCursor
          >
            <span>
              <RatingBar initialValue={skill.level} />
            </span>
          </Tooltip>

          {/* <RatingBar initialValue={skill.level} /> */}
        </Grid>

        <Grid xs={2} sm={2} sx={{ ...gridStyles, justifyContent: "flex-end" }}>
          {skill.status === 0 ? (
            <img src={completeIcon} style={imgStyles} alt="logo" />
          ) : lgMatches ? (
            <Typography
              variant="body1"
              sx={{
                fontSize: { lg: "20px" },
                color: "primary.main",
                pr: 2,
              }}
            >
              {skill.status}
            </Typography>
          ) : (
            <IconButton onClick={handleOpen}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Grid>
      </Grid>

      {skill.status !== 0 && !lgMatches && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid
            container
            spacing={1}
            columns={{ xs: 20 }}
            key={skill.title}
            sx={{
              height: "45px",
              minHeight: "45px",
              m: 0,
            }}
          >
            <Grid xs={12} sm={10} lg={8} sx={gridStyles}>
              <Stack>
                <Typography
                  sx={{
                    color: "#737373",
                    pl: { xs: "10px", lg: "15px" },
                    whiteSpace: "nowrap",
                    opacity: 0.61,
                    fontWeight: 400,
                  }}
                  variant="h5"
                >
                  Proficiency Needed
                </Typography>
              </Stack>
            </Grid>

            <Grid
              xs={6}
              sm={8}
              lg={4}
              sx={{ ...gridStyles, mt: "3px", pl: { sm: 1 } }}
            >
              <span>
                <RatingBar initialValue={skill.required_level} />
              </span>
            </Grid>

            <Grid
              xs={2}
              sm={2}
              lg={4}
              sx={{ ...gridStyles, justifyContent: "flex-end" }}
            >
              {skill.status === 0 ? (
                <img src={completeIcon} style={imgStyles} alt="logo" />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: "primary.main",
                    pr: 2,
                  }}
                >
                  {skill.status}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Collapse>
      )}
    </Stack>
  );
};

export default RoleSkillTableRow;
