import Grid from "@mui/material/Unstable_Grid2";
import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { STAFF_COMPANIES_OVERVIEW_ROUTE } from "../../../routes/paths.js";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  py: "10px",
  textTransform: "capitalize",
};

const TableRowCompanies = ({ company }) => {
  return (
    <Grid
      container
      spacing={1}
      columns={12}
      alignItems="center"
      sx={{
        flex: 1,
        minHeight: "72px",
      }}
    >
      <Grid xs={7} sx={gridStyles}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            src={company?.logo?.url}
            alt="Company logo"
            sx={{ width: "30px", height: "30px" }}
          />
          <Typography
            sx={{
              color: "#788894",
              fontSize: "16px",
              fontWeight: 400,
              mr: 1.75,
              pl: 2,
            }}
            variant="h5"
          >
            {company.name}
          </Typography>
        </Stack>
      </Grid>

      <Grid xs={5} sx={gridStyles}>
        <Typography
          sx={{
            color: "#788894",
            fontSize: "16px",
            fontWeight: 400,
            mr: 1.75,
            pl: 2,
          }}
          variant="h5"
        >
          <Link
            to={`${STAFF_COMPANIES_OVERVIEW_ROUTE}/${company.id}`}
            style={{
              color: "#66c1ff",
              textDecoration: "1px underline",
              pointerEvents: "auto",
            }}
          >
            Go to Company Profile
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TableRowCompanies;
