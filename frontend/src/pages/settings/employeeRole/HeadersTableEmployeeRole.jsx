import { Grid, Typography } from "@mui/material";

const typographyStyle = {
  color: "primary.main",
  fontSize: "20px",
  fontWeight: 500,
};

const HeadersTableEmployeeRole = () => {
  return (
    <Grid container spacing={1} pl="40px">
      <Grid item xs={3} key="Employee">
        <Typography sx={typographyStyle} variant="h3">
          Employee
        </Typography>
      </Grid>

      <Grid item xs={4} key="Email">
        <Typography sx={typographyStyle} variant="h3" ml="-20px">
          Email
        </Typography>
      </Grid>

      <Grid item xs={3} key="Job Title">
        <Typography sx={typographyStyle} variant="h3">
          Job Title
        </Typography>
      </Grid>

      <Grid item xs={2} key="Role">
        <Typography sx={typographyStyle} variant="h3">
          Role
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HeadersTableEmployeeRole;
