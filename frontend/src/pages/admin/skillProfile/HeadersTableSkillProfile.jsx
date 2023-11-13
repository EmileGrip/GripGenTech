import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const HeadersTable = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid
      className="tableHeader__section"
      container
      columns={16}
      spacing={1}
      sx={{
        mb: { xs: 1, lg: 2.75 },
        pl: "38px",
      }}
    >
      <Grid xs={8} sm={10} md={9} lg={5} key={"Skill"} sx={{ pl: { lg: 2 } }}>
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 400,
          }}
          variant="h3"
        >
          Skill
        </Typography>
      </Grid>

      {lgMatches && (
        <Grid xs={0} lg={7} xl={6} key={"Description"}>
          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 400,
            }}
            variant="h3"
          >
            Description
          </Typography>
        </Grid>
      )}

      <Grid
        xs={8}
        sm={6}
        lg={4}
        xl={5}
        key={"Proficiency"}
        sx={{
          textAlign: { md: "center", lg: "left" },
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 400,
          }}
          variant="h3"
        >
          Proficiency
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeadersTable;
