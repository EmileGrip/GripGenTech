import React from "react";
import HeadersTableSummary from "./HeadersTableSummary";
import { summaryTable as tableData } from "../../../../data/summaryData";
import TableRowSummary from "./TableRowSummary";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Summary = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box>
        <IconButton sx={{ borderRadius: 1 }}>
          <Typography sx={{ color: "#66C1FF" }}>
            Bulk Upload | Choose from Template
          </Typography>
        </IconButton>
      </Box>
      {/* <Stack direction="row">
        <IconButton sx={{ borderRadius: 1 }}>
          <Typography sx={{ textTransform: "capitalize", color: "#66C1FF" }}>
            bulk upload
          </Typography>
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton sx={{ borderRadius: 1 }}>
          <Typography sx={{ color: "#66C1FF" }}>
            Choose from Template
          </Typography>
        </IconButton>
      </Stack> */}
      <Stack className="displayData__section" mt={5.5} sx={{ width: "100%" }}>
        {lgMatches && <HeadersTableSummary />}
        {tableData.map((employee) => (
          <TableRowSummary employee={employee} key={employee.employeeName} />
        ))}
      </Stack>
    </>
  );
};

export default Summary;
