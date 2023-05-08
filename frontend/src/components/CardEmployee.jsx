import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const CardEmployee = ({ onOpen, data }) => {
  const style = {
    px: "35px",
    py: "22px",
    background: "#FAFAFA",
    border: " 1.5px solid #EAEAEA",
    borderRadius: "8px",
    height: "100%",
  };

  return (
    <Stack alignItems={"center"} sx={style}>
      <Avatar
        src={data.thumbnail}
        alt="employee avatar"
        sx={{
          width: "93px",
          height: "93px",
          mb: "14px",
          border: "9px solid #E5F3FC",
        }}
      ></Avatar>
      <Typography
        component="h3"
        mb={0.5}
        color="primary"
        sx={{
          fontWeight: "700",
          fontSize: "18px",
          textTransform: "capitalize",
        }}
      >
        {data.name}
      </Typography>
      <Typography
        variant="body1"
        mb={3.5}
        color="primary"
        sx={{ opacity: "0.7", textAlign: "center" }}
      >
        {data.jobTitle}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onOpen(data)}
        sx={{
          textTransform: "capitalize",
          // px: "10px",
          width: "100%",
          py: "8px",
          fontSize: "14px",
          mt: "auto",
        }}
      >
        View Profile
      </Button>
    </Stack>
  );
};

export default CardEmployee;
