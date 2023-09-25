import {
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import HeadersTableCompanies from "./HeadersTableCompanies";
import TableRowCompanies from "./TableRowCompanies";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import { useState } from "react";

const CompaniesOverview = () => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const { token } = useSelector((state) => state.auth);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.get(`company`, config);
      console.log(response.data.payload);
      setFetchedData(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedCompanies = fetchedData?.data
    ?.slice()
    ?.sort((a, b) => a?.name?.localeCompare(b?.name));

  return (
    <>
      <Stack className="displayData__section" mt={5.5} sx={{ width: "100%" }}>
        {loading && <CircularProgress />}
        {!loading && (
          <>
            {sortedCompanies?.length < 1 ? (
              <Typography variant="h3" color="primary" mb={3.125}>
                No Companies found
              </Typography>
            ) : (
              <>
                {lgMatches && <HeadersTableCompanies />}
                {sortedCompanies?.map((company) => (
                  <TableRowCompanies
                    key={company.id}
                    company={company}
                    fetchData={fetchData}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default CompaniesOverview;
