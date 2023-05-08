import RatingBar from "../../../components/RatingBar";
import { skillsTable as data } from "../../../data/skillsData";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import hintIcon from "../../../assets/hintIcon.svg";
import completeIcon from "../../../assets/completeIcon.svg";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";

const TableContent = () => {
  const checkLastChild = (index, array) => index + 1 === array.length;
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
          columns={16}
          key={skill.skillName}
          sx={{
            background: "#f5f5f5",
            borderRadius: "10px",
            height: "45px",
            minHeight: "45px",
            mb: checkLastChild(index, data) ? 3.875 : 3.125,
          }}
        >
          <Grid xs={5} sx={gridStyles}>
            <Typography
              sx={{
                color: "#737373",
                fontSize: "20px",
                fontWeight: 400,
                mr: 1.75,
                pl: 2,
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
          </Grid>

          <Grid xs={4} sx={gridStyles}>
            <Typography color="primary.main" variant="body1">
              {skill.origin}
            </Typography>
          </Grid>

          <Grid xs={5} sx={{ ...gridStyles, mt: "3px" }}>
            <Tooltip
              title={
                <>
                  <div style={{ textAlign: "center" }}>Profiencey needed</div>
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

export default TableContent;
