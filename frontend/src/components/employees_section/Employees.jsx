import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import {
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { employeeData as data } from "../../data/employeeData";
import rightArrows from "../../assets/chevrons-right.svg";
import filter from "../../assets/filter.svg";
import search from "../../assets/search.svg";
// import "./custom_styles.css";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CardEmployee from "../CardEmployee";
import { useState } from "react";
import CustomModal from "../../ui/CustomModal";
import EmployeeProfile from "../EmployeeProfile";

const Employees = () => {
  const location = useLocation();
  const [title, setTitle] = useOutletContext();
  useEffect(() => {
    setTitle(location.pathname.split("/").at(-1));
  }, [location, setTitle]);

  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(data.emlopyees[0]);

  const dialogHanlder = (selectedData) => {
    setOpen(true);
    setDialogData(selectedData);
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      {/* <CustomDialog open={open} onClose={handleClose} data={dialogData} /> */}
      <CustomModal open={open} onClose={handleClose} title=" ">
        <EmployeeProfile data={dialogData} />
      </CustomModal>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          pb: "25px",
          borderBottom: { xs: "none", md: "2px solid #e9e9e9" },
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
            {data["activeEmployees"]}
          </Typography>
          Total Active Employees
        </Typography>
        {mdMatches && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "2px", mr: "24px" }}
          />
        )}
        <Typography variant="body1" color="primary" sx={{ mr: "16px" }}>
          <Typography
            variant="span"
            color="primary"
            sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
          >
            {data["archivedEmployees"]}
          </Typography>
          Achived Employees
        </Typography>
        {mdMatches && <img src={rightArrows} alt="chevrons-right" />}
      </Stack>

      <Stack
        justifyContent="space-between"
        sx={{
          mt: "32px",
          mb: "42px",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          color="primary"
          sx={{ mb: { xs: 2 } }}
        >
          Overview
        </Typography>

        <Stack flexDirection="row" gap="20px" alignItems="center">
          <TextField
            name="search_employee"
            fullWidth
            size="small"
            type="search"
            variant="outlined"
            sx={
              {
                // background: "#f2f2f2",
                // opacity: 0.9,
                // "& .MuiOutlinedInput-notchedOutline": {
                //   borderRadius: "8px !important",
                //   borderColor: " rgba(242, 242, 242, 0.9) !important",
                // },
                // "& .MuiInputBase-input": {
                //   background: "#f2f2f2",
                //   opacity: 0.9,
                // },
              }
            }
            placeholder="Search Employee"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={search} alt="search icon" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            sx={{
              alignSelf: "center",
              textTransform: "capitalize",
              border: "2px solid #e9e9e9 ",
              borderRadius: "4px",
              color: "primary.main",
              fontWeight: "400",
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
        </Stack>
      </Stack>

      <Grid2
        container
        rowSpacing={"28px"}
        columnSpacing={"20px"}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 20 }}
      >
        {data.emlopyees.map((employee, index) => (
          <Grid2 xs={4} sm={4} md={4} lg={4} xl={4} key={index}>
            <CardEmployee onOpen={dialogHanlder} data={employee} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Employees;
