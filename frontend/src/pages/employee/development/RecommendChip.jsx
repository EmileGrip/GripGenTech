import { Box, Stack, Typography } from "@mui/material";

const RecommendChip = ({ title, match }) => {
  const colorLevels = {
    "very high": "#39A430",
    moderate: "#F48B50",
    low: "#C7493E",
  };

  const matchData = match.trim().toLowerCase();

  return (
    <Box
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        p: 2.25,
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Typography variant="h4" fontWeight="500">
        {title}
      </Typography>
      <Stack flexDirection="row" gap="9px" alignItems="center">
        <Typography variant="h5" color="#808080">
          Match strength:
        </Typography>
        <Typography variant="body1" color={colorLevels[matchData]}>
          {match}
        </Typography>
      </Stack>
    </Box>
  );
};

export default RecommendChip;
