import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const typographyStyle = {
  color: "primary.main",
  fontSize: "20px",
  fontWeight: 400,
};

const HeadersTableCompanies = () => {
  return (
    <Grid
      className="tableHeader__section"
      container
      columns={12}
      spacing={1}
      sx={{
        mb: { xs: 1, lg: 2.75 },
        pl: "8px",
      }}
    >
      <Grid xs={7} key={"Company"}>
        <Typography sx={typographyStyle} variant="h3">
          Company name
        </Typography>
      </Grid>

      <Grid
        xs={5}
        key={"Company Profile"}
        sx={{
          textAlign: { md: "center", lg: "left" },
        }}
      >
        <Typography sx={typographyStyle} variant="h3">
          {" "}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeadersTableCompanies;
