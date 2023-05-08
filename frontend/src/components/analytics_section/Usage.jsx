import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import rightArrows from "../../assets/chevrons-right.svg";
import filter from "../../assets/filter.svg";
import { employeesData as data } from "../../data/analyticsData";
import TotalEmployeeChart from "./components/TotalEmployeeChart";
import ProfileChart from "./components/ProfileChart";
import RolesRatioChart from "./components/RolesRatioChart";

const Usage = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Stack
        className="employeeData__wrapper"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          pb: "25px",
          borderBottom: { xs: "none", md: "2px solid #e9e9e9" },
          mb: 3,
        }}
      >
        <Typography variant="body1" color="primary" sx={{ mr: "24px" }}>
          <Typography
            variant="span"
            color="primary"
            sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
          >
            {data["totalEmployees"]}
          </Typography>
          Total Employees
        </Typography>
        {mdMatches && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "2px", mr: "24px" }}
          />
        )}
        <Typography variant="body1" color="primary" sx={{ mr: "24px" }}>
          <Typography
            variant="span"
            color="primary"
            sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
          >
            {data["completedProfiles"]} %
          </Typography>
          Completed profiles
        </Typography>
        {mdMatches && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "2px", mr: "24px" }}
          />
        )}

        {mdMatches && <img src={rightArrows} alt="chevrons-right" />}
      </Stack>

      <Button
        sx={{
          alignSelf: "start",
          textTransform: "capitalize",
          border: "2px solid #e9e9e9 ",
          borderRadius: "4px",
          color: "primary.main",
          fontWeight: "400",
          mb: 2,
          px: 3,
          "&: hover": {
            border: "2px solid #e9e9e9 ",
          },
        }}
        disableElevation
        disableRipple
        startIcon={<img src={filter} alt="filter icon" />}
        variant="outlined"
      >
        Filter
      </Button>

      <Stack
        className="main__wrapper"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: "30px", lg: "0" },
          justifyContent: { xs: "auto", lg: "space-between" },
          flex: 1,
        }}
      >
        <Stack
          className="TotalEmployeeChart__wrapper"
          sx={{
            // flex: { xs: null, lg: 1 },
            background: "#FFFFFF",
            border: "2px solid #EAEAEA",
            borderRadius: "8px",
            py: 2,
            px: 4,
            width: { xs: "90vw", lg: "72%" },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            fontWeight="600"
            mb={4}
          >
            Total Employees
          </Typography>
          <TotalEmployeeChart />
        </Stack>

        <Stack
          className="sideCharts__wrapper"
          sx={{
            width: { xs: "90vw", lg: "25%" },
            gap: { xs: "30px", md: "38px" },
          }}
        >
          <Stack
            sx={{
              background: "#FFFFFF",
              border: "2px solid #EAEAEA",
              borderRadius: "4px",
              py: 1,
              px: 2,
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              color="primary"
              fontWeight="600"
            >
              Completed Profiles
            </Typography>

            <ProfileChart />
          </Stack>
          <Stack
            sx={{
              background: "#FFFFFF",
              border: "2px solid #EAEAEA",
              borderRadius: "4px",
              py: 1,
              px: 2,
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              color="primary"
              fontWeight="600"
            >
              Ratio of user roles
            </Typography>
            <RolesRatioChart />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Usage;
