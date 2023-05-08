import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const HeadersTable = ({ data }) => {
  const headerKeys = Object.keys(data);
  const checkLastChild = (index, array) => index + 1 === array.length;
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const spacingOverviewPageMap = [5, 4, 5, 2];

  return (
    <Grid
      className="tableHeader__section"
      container
      columns={16}
      spacing={1}
      mb={2.75}
    >
      {headerKeys.map((header, index) => (
        <Grid xs={spacingOverviewPageMap[index]} key={header}>
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

export default HeadersTable;
