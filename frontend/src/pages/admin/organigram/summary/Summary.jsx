import React, { useState } from "react";
import HeadersTableSummary from "./HeadersTableSummary";
import { summaryTable as tableData } from "../../../../data/summaryData";
import TableRowSummary from "./TableRowSummary";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../../redux/slices/admin/users/usersActions";
import { useEffect } from "react";

const Summary = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { token } = useSelector((state) => state.auth);
  const { data, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  console.log(employees);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token]);

  useEffect(() => {
    setEmployees(data?.data);
  }, [data]);

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
        {loading && <CircularProgress />}
        {!loading && (
          <>
            {employees?.length < 1 ? (
              <Typography variant="h3" color="primary" mb={3.125}>
                No Employees found
              </Typography>
            ) : (
              <>
                {lgMatches && <HeadersTableSummary />}
                {employees?.map((employee) => (
                  <TableRowSummary employee={employee} key={employee.id} />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default Summary;
