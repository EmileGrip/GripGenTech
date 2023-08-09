import React, { useEffect } from "react";
import DevelopmentFlow from "./DevelopmentFlow";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCareerPathData,
  fetchCareerPathDataByUserId,
} from "../../../redux/slices/Employee/development/developmentActions";

const MockContent = ({ isProfile = false, userId }) => {
  const { token } = useSelector((state) => state.auth);
  const { data, loading, profileData, profileDataLoading } = useSelector(
    (state) => state.development
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      if (!isProfile) {
        dispatch(fetchCareerPathData());
      } else {
        dispatch(fetchCareerPathDataByUserId(userId));
      }
    }
  }, [token, dispatch]);

  return (
    <>
      {!isProfile ? (
        <>
          {loading && <CircularProgress />}
          {!loading && (
            <>
              {data?.jobs?.length < 1 ? (
                <Typography variant="h3" color="primary" mb={3.125}>
                  No career path found
                </Typography>
              ) : (
                <Box sx={{ minHeight: { xs: "400px", md: "500px" } }}>
                  <DevelopmentFlow data={data} isProfile={isProfile} />
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {profileDataLoading && <CircularProgress />}
          {!profileDataLoading && (
            <>
              {profileData?.jobs?.length < 1 ? (
                <Typography variant="h3" color="primary" mb={3.125}>
                  No career path found
                </Typography>
              ) : (
                <Box sx={{ minHeight: { xs: "400px", md: "500px" } }}>
                  <DevelopmentFlow data={profileData} isProfile={isProfile} />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MockContent;
