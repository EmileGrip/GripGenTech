import { Typography, Stack, CircularProgress, Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../helper/axiosInstance";

const rowStackStyle = {
  flexDirection: { xs: "column", md: "row" },
  justifyContent: { md: "space-between" },
  gap: { md: "40px", lg: "65px", xl: "120px" },
};

const WrapperStackStyle = {
  flexDirection: "row",
  alignItems: "baseline",
  gap: { xs: "20px", lg: "40px", xl: "60px" },
  minHeight: "82px",
  flex: 1,
};

const labelStyle = {
  fontWeight: "500",
  color: "secondary.main",
};

const StaffCompanyProfile = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id,
      },
    };

    try {
      const response = await axiosInstance.get(`company`, config);
      console.log(response.data.payload);
      setFetchedData(response.data.payload.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Avatar
            src={fetchedData?.logo?.url}
            alt="Company logo"
            sx={{ width: "250px", height: "250px", mb: 5 }}
          />
          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>Company name:</Typography>
              <Typography>{fetchedData.name}</Typography>
            </Stack>

            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>Industry:</Typography>
              <Typography>{fetchedData.industry}</Typography>
            </Stack>
          </Stack>

          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>Website:</Typography>
              <a
                href={addHttpProtocol(fetchedData.website)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#66c1ff",
                  textDecoration: "1px underline",
                  pointerEvents: "auto",
                }}
              >
                {fetchedData.website}
              </a>
            </Stack>

            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>LinkedIn:</Typography>
              <a
                href={addHttpProtocol(fetchedData.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#66c1ff",
                  textDecoration: "1px underline",
                  pointerEvents: "auto",
                }}
              >
                {fetchedData.linkedin}
              </a>
            </Stack>
          </Stack>

          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>Country:</Typography>
              <Typography>{fetchedData.country}</Typography>
            </Stack>

            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>State:</Typography>
              <Typography>{fetchedData.state}</Typography>
            </Stack>
          </Stack>
          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>City:</Typography>
              <Typography>{fetchedData.city}</Typography>
            </Stack>

            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>Address Line 1:</Typography>
              <Typography>{fetchedData.address1}</Typography>
            </Stack>
          </Stack>
          <Stack className="rowStackStyle" sx={rowStackStyle}>
            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>Address Line 2:</Typography>
              <Typography>{fetchedData.address2}</Typography>
            </Stack>

            <Stack className="stack__wrapper" sx={WrapperStackStyle}>
              <Typography sx={labelStyle}>ZIP code:</Typography>
              <Typography>{fetchedData.postal_code}</Typography>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

// Function to add 'http://' or 'https://' to the URL if not present
const addHttpProtocol = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

export default StaffCompanyProfile;
