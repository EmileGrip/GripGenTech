import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  organizationSettings,
  peopleSettings,
  subscriptionSettings,
} from "../../data/settingsData";
import { ADMIN_SETTINGS_COMPANY_PROFILE_ROUTE } from "../../routes/paths";

const Settings = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path === ADMIN_SETTINGS_COMPANY_PROFILE_ROUTE) {
      localStorage.setItem("openMain", "main__1");
      localStorage.setItem("openSub", "sub__0");
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <Stack
          sx={{
            gap: "20px",
            background: "#FAFAFA",
            border: "2px solid #EEE",
            borderRadius: "10px",
            p: "20px",
          }}
        >
          <Typography variant="h3" color="darkGreen">
            Organization
          </Typography>

          {organizationSettings.map((setting) => (
            <Box
              onClick={() => handleNavigation(setting.path)}
              key={setting.title}
              sx={{
                background: "white",
                border: "2px solid #EEE",
                borderRadius: "10px",
                p: 1,
                cursor: "pointer",
              }}
            >
              <Typography variant="body1" color="#173433">
                {setting.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Stack
          sx={{
            gap: "20px",
            background: "#FAFAFA",
            border: "2px solid #EEE",
            borderRadius: "10px",
            p: "20px",
          }}
        >
          <Typography variant="h3" color="darkGreen">
            People
          </Typography>

          {peopleSettings.map((setting) => (
            <Box
              onClick={() => handleNavigation(setting.path)}
              key={setting.title}
              sx={{
                background: "white",
                border: "2px solid #EEE",
                borderRadius: "10px",
                p: 1,
                cursor: "pointer",
              }}
            >
              <Typography variant="body1" color="#173433">
                {setting.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Stack
          sx={{
            gap: "20px",
            background: "#FAFAFA",
            border: "2px solid #EEE",
            borderRadius: "10px",
            p: "20px",
          }}
        >
          <Typography variant="h3" color="darkGreen">
            Subscription & billing
          </Typography>

          {subscriptionSettings.map((setting) => (
            <Box
              onClick={() => handleNavigation(setting.path)}
              key={setting.title}
              sx={{
                background: "white",
                border: "2px solid #EEE",
                borderRadius: "10px",
                p: 1,
                cursor: "pointer",
              }}
            >
              <Typography variant="body1" color="#173433">
                {setting.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Settings;
