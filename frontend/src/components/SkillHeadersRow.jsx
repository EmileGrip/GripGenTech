import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const SkillHeadersRow = ({ data }) => {
  const checkLastChild = (index, array) => index + 1 === array.length;
  const xsSpacingMap = [11, 8, 1];
  const smSpacingMap = [10, 8, 2];
  const mdSpacingMap = [10, 8, 2];
  const lgSpacingMap = [8, 4, 6, 2];
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const headerKeys = Object.keys(data);
  const smallScreenHeaders = headerKeys.filter(
    (header) => header !== "origin" && header !== "status"
  );
  const currentKeys = lgMatches ? headerKeys : smallScreenHeaders;
  console.log(currentKeys);
  return (
    <Grid
      className="tableHeader__section"
      container
      columns={20}
      spacing={1}
      mb={2.75}
    >
      {currentKeys.map((header, index) => (
        <Grid
          xs={xsSpacingMap[index]}
          sm={smSpacingMap[index]}
          md={mdSpacingMap[index]}
          lg={lgSpacingMap[index]}
          key={header}
        >
          <Typography
            sx={{
              color: "primary.main",
              textAlign: checkLastChild(index, headerKeys) ? "right" : "",
              fontWeight: checkLastChild(index, headerKeys) ? 400 : "",
            }}
            variant="h5"
          >
            {data[header]}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkillHeadersRow;
