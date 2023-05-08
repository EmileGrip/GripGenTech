import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const ProfileHeadersTable = ({ data }) => {
  const headerKeys = Object.keys(data);
  const checkLastChild = (index, array) => index + 1 === array.length;
  const xsSpacingMap = [5, 2, 5, 2];
  const smSpacingMap = [5, 4, 5, 2];
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      className="tableHeader__section"
      container
      columns={16}
      spacing={1}
      mb={2.75}
    >
      {headerKeys.map((header, index) => (
        <Grid xs={xsSpacingMap[index]} sm={smSpacingMap[index]} key={header}>
          <Typography
            sx={{
              color: "primary.main",
              textAlign: checkLastChild(index, headerKeys) ? "right" : "",
              fontWeight: checkLastChild(index, headerKeys) ? 400 : "",
              display: (index === 1 || index === 3) && !smMatches && "none",
              fontSize: { xs: "12px", sm: "16px" },
              whiteSpace: "nowrap",
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

export default ProfileHeadersTable;
