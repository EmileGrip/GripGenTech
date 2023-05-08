import { Stack, Typography } from "@mui/material";

const EducationCard = ({ degree, institution, date, level }) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        padding: "12px 21px 18px",
      }}
    >
      <Stack>
        <Typography
          variant="h4"
          component="h3"
          color={"#707070"}
          sx={{ textTransform: "capitalize" }}
        >
          {degree}
        </Typography>
        <Stack flexDirection="row">
          <Typography variant="body1" color="#808080">
            {institution}
          </Typography>
          <Typography variant="body1" color="#AAAAAA" ml={3}>
            {date}
          </Typography>
        </Stack>
        <Typography variant="h5" color="#AAAAAA">
          {level}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default EducationCard;
