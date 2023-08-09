import { CircularProgress, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import TotalEmployeeChart from "../../../components/analytics_section/components/TotalEmployeeChart";
import axiosInstance from "../../../helper/axiosInstance";

const StaffAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      fetchAnalyticsData();
    }
  }, [token]);

  const fetchAnalyticsData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.get("analytics", config);
      setData(response.data.payload.usage);
      // console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  return (
    <>
      <Stack sx={{ mb: 3 }}>
        {loading && <CircularProgress size={20} />}
        {!loading && (
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            fontWeight="600"
            mb={4}
          >
            Total Employees:
            <span style={{ fontWeight: "400" }}> {data?.total_users}</span>
          </Typography>
        )}
        <Stack
          className="TotalEmployeeChart__wrapper"
          sx={{
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
          <TotalEmployeeChart
            accountCreation={data?.user_account_creation["2023"]}
          />
        </Stack>
      </Stack>
      <Stack>
        {loading && <CircularProgress size={20} />}
        {!loading && (
          <Typography
            variant="h4"
            component="h2"
            color="primary"
            fontWeight="600"
            mb={4}
          >
            Total Companies:
            <span style={{ fontWeight: "400" }}> {data?.total_customers}</span>
          </Typography>
        )}
      </Stack>
      <Stack
        className="TotalEmployeeChart__wrapper"
        sx={{
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
          Total Companies
        </Typography>
        <TotalEmployeeChart
          accountCreation={data?.company_account_creation["2023"]}
        />
      </Stack>
    </>
  );
};

export default StaffAnalytics;
