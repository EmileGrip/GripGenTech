import { Box, Stack, Typography } from "@mui/material";

const RecommendChip = ({ job }) => {
  const colorLevels = {
    "very high": "#39A430",
    high: "#39A430",
    moderate: "#F48B50",
    low: "#C7493E",
    "very low": "#C7493E",
  };

  const matchData = job?.matchStrength?.trim().toLowerCase();

  return (
    <Box
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        p: 2.25,
        justifyContent: "center",
        flex: 1,
        minWidth: "262px",
      }}
      title={job?.title}
    >
      <Typography
        variant="h4"
        fontWeight="500"
        sx={{
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {job?.title}
      </Typography>
      <Stack flexDirection="row" gap="9px" alignItems="center">
        <Typography variant="h5" color="#808080">
          Match strength:
        </Typography>
        <Typography variant="body1" color={colorLevels[matchData]}>
          {job?.matchStrength}
        </Typography>
      </Stack>
    </Box>
  );
};

export default RecommendChip;
