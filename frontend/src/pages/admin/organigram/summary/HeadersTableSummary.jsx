import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const typographyStyle = {
  color: "primary.main",
  fontSize: "20px",
  fontWeight: 400,
};

const HeadersTableSummary = () => {
  return (
    <Grid
      className="tableHeader__section"
      container
      columns={40}
      spacing={1}
      sx={{
        mb: { xs: 1, lg: 2.75 },
        pl: "8px",
      }}
    >
      <Grid xs={7} key={"Employee"}>
        <Typography sx={typographyStyle} variant="h3">
          Employee
        </Typography>
      </Grid>

      <Grid xs={11} key={"Email"} sx={{ pl: "58px" }}>
        <Typography sx={typographyStyle} variant="h3">
          Email
        </Typography>
      </Grid>

      <Grid
        xs={7}
        key={"Phone"}
        sx={{
          textAlign: { md: "center", lg: "left" },
          pl: "47px",
        }}
      >
        <Typography sx={typographyStyle} variant="h3">
          Phone
        </Typography>
      </Grid>

      <Grid
        xs={5}
        key={"Job Title"}
        sx={{
          textAlign: { md: "center", lg: "left" },
          pl: "37px",
        }}
      >
        <Typography sx={typographyStyle} variant="h3">
          Job Title
        </Typography>
      </Grid>

      <Grid
        xs={5}
        key={"Department"}
        sx={{
          textAlign: { md: "center", lg: "left" },
          pl: "31px",
        }}
      >
        <Typography sx={typographyStyle} variant="h3">
          Department
        </Typography>
      </Grid>

      <Grid
        xs={5}
        key={"Skill Profile"}
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

export default HeadersTableSummary;
