import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import correctLightIcon from "../../../assets/status_invalidate.svg";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../helper/axiosInstance";
import { useLocation } from "react-router-dom";
import { fetchData } from "../../../redux/slices/admin/companyProfile/companyProfileSlice";
import moment from "moment";

const BillingPlans = () => {
  const { token } = useSelector((state) => state.auth);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { fetchedData } = useSelector((state) => state.companyProfile);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const inputDateString1 = fetchedData?.start_date;
  const inputDateString2 = fetchedData?.end_date;
  const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSSSZ";
  const outputFormat = "DD MMM YYYY";

  const startDate = moment(inputDateString1, inputFormat).format(outputFormat);
  const endDate = moment(inputDateString2, inputFormat).format(outputFormat);

  useEffect(() => {
    fetchPlansData();
    dispatch(fetchData(token));
  }, []);

  const fetchPlansData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      //   setLoading(true);
      const response = await axiosInstance.get(`subscription/products`, config);
      setPlans(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  }, [token]);

  const upgradePlan = useCallback(async (value) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.post(
        `subscription/create-payment-intent`,
        {
          plan_name: value,
        },
        config
      );
      console.log(response.data);
      // handleOpenSnack(response.data.success, response.data.message);
      const redirectUrl = new URL(
        response.data.payload.redirect_url,
        window.location.href
      );
      window.location.href = redirectUrl.href;
    } catch (error) {
      console.log(error?.response.data);
      handleOpenSnack(false, error?.response.data.message);
    } finally {
      // setLoading(false);
      fetchPlansData();
      dispatch(fetchData(token));
    }
  }, []);

  const cancelPlan = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.post(
        `subscription/cancel`,
        {},
        config
      );
      console.log(response.data);
      handleOpenSnack(response.data.success, response.data.message);
    } catch (error) {
      console.log(error?.response.data);
      handleOpenSnack(false, error?.response.data.message);
    } finally {
      // setLoading(false);
      fetchPlansData();
      dispatch(fetchData(token));
    }
  }, []);

  useEffect(() => {
    const paymentUrlParam = queryParams.get("payment_success");

    if (paymentUrlParam !== null) {
      const paymentSuccess = paymentUrlParam === "true";

      handleOpenSnack(
        paymentSuccess,
        paymentSuccess
          ? "Subscription updated successfully"
          : "Something went wrong, please try again later"
      );
    }
  }, []);

  const handleOpenDialog = (value) => {
    setOpenDialog(true);
    setSelectedPlan(value);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpgradePlan = () => {
    upgradePlan(selectedPlan);
    handleCloseDialog();
  };

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

  const modifiedPlans = plans.slice()?.sort((a, b) => a?.price - b?.price);

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

      <Stack
        sx={{
          gap: 2,
          background: "#FAFAFA",
          border: "2px solid #EEE",
          borderRadius: "10px",
          p: "20px",
          mb: "20px",
        }}
      >
        <Typography variant="h3" color="darkGreen">
          Plan
        </Typography>

        <Typography variant="body1" color="darkGreen">
          Current Status Plan:
        </Typography>

        <Typography variant="body1" color="#788894">
          Plan: {fetchedData?.plan}
        </Typography>

        <Typography variant="body1" color="#788894">
          Status: {fetchedData?.status}
        </Typography>

        <Typography variant="body1" color="#788894">
          Start Date: {startDate}
        </Typography>

        <Typography variant="body1" color="#788894">
          End Date: {endDate}
        </Typography>
      </Stack>

      <Stack
        sx={{
          gap: 2,
          background: "#FAFAFA",
          border: "2px solid #EEE",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Typography variant="h3" color="darkGreen">
          Plans
        </Typography>

        <Typography variant="body1" color="#788894">
          Here you can find your actual plan and can change it
        </Typography>

        <Grid container spacing={2}>
          {modifiedPlans?.map((plan) => (
            <Grid key={plan?.name} item xs={12} sm={6} lg={4}>
              <Stack
                sx={{
                  justifyContent: "space-between",
                  height: "360px",
                  background: "#FAFAFA",
                  border: "2px solid #EEE",
                  borderRadius: "10px",
                  p: "12px",
                }}
              >
                <Stack>
                  <Typography variant="h3" color="#173433">
                    {plan?.name}
                  </Typography>

                  {plan?.price === 0 ? (
                    <Typography variant="body1" color="#788894" mb="12px">
                      Your free trial ends in 30 days
                    </Typography>
                  ) : (
                    <Typography variant="body1" color="#173433" mb="12px">
                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        €{plan?.price}
                      </span>{" "}
                      per user/per month
                    </Typography>
                  )}

                  <Stack gap="20px">
                    {plan?.features.map((item) => (
                      <Box
                        key={item}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img src={correctLightIcon} alt="correct light icon" />

                        <Typography variant="body1" color="#788894">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>

                {plan?.price !== 0 &&
                  (plan?.is_subscribed ? (
                    <Button
                      onClick={cancelPlan}
                      sx={{
                        width: "220px",
                        backgroundColor: "accent",
                      }}
                    >
                      <Typography
                        variant="h6"
                        textTransform="capitalize"
                        color="darkGreen"
                      >
                        Cancel Plan
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleOpenDialog(plan?.name)}
                      sx={{
                        width: "220px",
                        backgroundColor: "accent",
                      }}
                    >
                      <Typography
                        variant="h6"
                        textTransform="capitalize"
                        color="darkGreen"
                      >
                        Upgrade Now
                      </Typography>
                    </Button>
                  ))}

                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {`Confirm Plan Upgrade`}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {`Are you sure you want to upgrade plan? Once you confirm this button, your current plan will be cancelled`}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} autoFocus>
                      cancel
                    </Button>
                    <Button onClick={handleUpgradePlan} color="error">
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default BillingPlans;
