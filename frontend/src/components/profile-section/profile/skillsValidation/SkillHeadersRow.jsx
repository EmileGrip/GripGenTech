import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const SkillHeadersRow = ({ data }) => {
  const checkLastChild = (index, array) => index + 1 === array.length;
  const checkFirstChild = (index, array) => index + 1 === array.length - 3;
  const xsSpacingMap = [6.75, 4.25, 1];
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const headerKeys = Object.keys(data);

  return (
    <Grid
      className="tableHeader__section"
      container
      columns={12}
      spacing={1}
      mb={2.75}
    >
      {headerKeys.map((header, index) => (
        <Grid xs={xsSpacingMap[index]} key={header}>
          <Typography
            sx={{
              color: "darkGreen",
              fontWeight: "500",
              textAlign: checkLastChild(index, headerKeys) ? "right" : "",
              pl: checkFirstChild(index, headerKeys) ? "16px" : 0,
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
