import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import editaIcon from "../../../assets/edit_icon.svg";

const propertyStyle = {
  fontSize: { xs: "16px", sm: "20px" },
  fontWeight: "600",
  mb: { xs: 1, md: 2 },
};

const stackStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const typographyStyle = {
  textTransform: "capitalize",
  flex: 1,
  fontSize: { xs: "12px", sm: "16px" },
};

const buttonStyle = {
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: "600",
  width: "226px",
  height: "35px",
  borderRadius: "4px",
};

const InfoModal = ({ data }) => {
  return (
    <Stack
      className="info__modal"
      sx={{
        mt: { xs: "-40px" },
        px: { xs: "44px", sm: "95px", lg: "0px" },
      }}
    >
      <Stack
        sx={{
          mb: { xs: "40px" },
        }}
      >
        <Stack
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center" },
            gap: { xs: "12px", sm: "45px" },
            mb: { xs: "87px" },
          }}
        >
          <Avatar
            src={data.thumbnail}
            alt="avatar image"
            sx={{
              width: { xs: "121px", sm: "217px" },
              height: { xs: "122px", sm: "218px" },
              filter:
                "drop-shadow(0px 62px 25px rgba(0, 0, 0, 0.01)) drop-shadow(0px 35px 21px rgba(0, 0, 0, 0.05)) drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.09)) drop-shadow(0px 4px 9px rgba(0, 0, 0, 0.1)) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1))",
            }}
          />

          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h3"
              sx={{
                textTransform: "capitalize",
                color: "#1E394C",
                fontSize: { xs: "18px", sm: "30px" },
                fontWeight: 400,
              }}
            >
              {data.name}
            </Typography>
            <Stack
              sx={{
                flexDirection: { xs: "row", sm: "column" },
                justifyContent: "flex-start",
                alignItems: { xs: "center", sm: "flex-start" },
                gap: "15px",
              }}
            >
              <Typography
                sx={{
                  color: "#1E394C",
                  fontSize: { xs: "13px", sm: "20px" },
                }}
              >
                {data.jobTitle}
              </Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  opacity: 0.5,
                  fontSize: { xs: "12px", sm: "20px" },
                }}
              >
                {data.gender}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ flex: "1" }}>
          <Stack
            sx={{
              flexDirection: { md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            <Box
              className="info__section"
              sx={{ flex: "1", mb: { xs: 3, md: 6 } }}
            >
              <Typography variant="h4" color={"secondary"} sx={propertyStyle}>
                Info
              </Typography>

              {Object.keys(data.info).map((property, index) => (
                <Stack key={index} sx={stackStyle}>
                  <Typography
                    variant="h5"
                    color={"secondary"}
                    sx={typographyStyle}
                  >
                    {property}
                  </Typography>
                  <Typography
                    variant="body1"
                    color={"secondary"}
                    sx={{ flex: 2 }}
                  >
                    {data.info[property]}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Box
              className="contact__section"
              sx={{ flex: "1", mb: { xs: 3, md: 6 } }}
            >
              <Typography variant="h4" color={"secondary"} sx={propertyStyle}>
                Contact
              </Typography>

              {Object.keys(data.contact).map((property, index) => (
                <Stack key={index} sx={stackStyle}>
                  <Typography
                    variant="h5"
                    color={"secondary"}
                    sx={typographyStyle}
                  >
                    {property}
                  </Typography>
                  <Typography
                    variant="body1"
                    color={"secondary"}
                    sx={{ flex: 2 }}
                  >
                    {data.contact[property]}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          flexDirection: { sm: "row" },
          alignItems: { xs: "center" },
          gap: { xs: "18px", sm: "13px" },
        }}
      >
        <Button variant="contained" color="secondary" sx={buttonStyle}>
          See Full Bio
        </Button>
        <Button
          variant="text"
          sx={{
            ...buttonStyle,
            border: "1px solid #1E394C",
            color: "#1E394C",
          }}
          endIcon={<img src={editaIcon} alt="edit icon" />}
        >
          Edit Position
        </Button>
      </Stack>
    </Stack>
  );
};

export default InfoModal;
