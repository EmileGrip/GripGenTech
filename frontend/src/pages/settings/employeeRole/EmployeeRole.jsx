import React, { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/admin/users/usersActions";
import {
  Alert,
  CircularProgress,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import search from "../../../assets/search.svg";
import HeadersTableEmployeeRole from "./HeadersTableEmployeeRole";
import TableRowEmployeeRole from "./TableRowEmployeeRole";
import axiosInstance from "../../../helper/axiosInstance";

const EmployeeRole = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);
  const { token } = useSelector((state) => state.auth);
  const { data, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token]);

  useEffect(() => {
    setEmployees(data?.data);
  }, [data]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const modifiedEmployeesData = employees
    ?.slice()
    ?.sort((a, b) => {
      return a?.first_name?.localeCompare(b?.first_name);
    })
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const changeRole = useCallback(async (id, system_role) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.put(
        "user",
        { id, system_role },
        config
      );
      console.log(response.data.payload);
      handleOpenSnack(response.data.success, response.data.message);
    } catch (error) {
      console.log(error?.response.data);
      handleOpenSnack(false, error?.response.data.message);
    } finally {
      // setLoading(false);
      dispatch(fetchUsers(token));
    }
  }, []);

  const [openSnack, setOpenSnack] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(null);

  const handleOpenSnack = (status, message) => {
    setRequestSuccess({ status, message });
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={requestSuccess?.status ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {requestSuccess?.message}
        </Alert>
      </Snackbar>

      <Stack gap={3}>
        <TextField
          name="search_employee"
          fullWidth
          size="small"
          type="search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search Employee"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={search} alt="search icon" />
              </InputAdornment>
            ),
          }}
        />

        <Stack
          sx={{
            gap: "20px",
            background: "#FAFAFA",
            border: "2px solid #EEE",
            borderRadius: "10px",
            p: "20px",
          }}
        >
          {loading && <CircularProgress size={20} />}
          {!loading && (
            <>
              {modifiedEmployeesData?.length < 1 ? (
                <Typography variant="h3" color="primary" mb={3.125}>
                  No Employees found
                </Typography>
              ) : (
                <>
                  {lgMatches && <HeadersTableEmployeeRole />}
                  {modifiedEmployeesData?.map((employee) => (
                    <TableRowEmployeeRole
                      key={employee.id}
                      employee={employee}
                      changeRole={changeRole}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default EmployeeRole;
