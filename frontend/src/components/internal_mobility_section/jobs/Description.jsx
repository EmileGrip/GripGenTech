import { Stack, TextareaAutosize, Typography } from "@mui/material";

const Description = ({ formik, roles = false }) => {
  const error = formik.touched.description && formik.errors.description;

  return (
    <Stack
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        gap: "20px",
        p: { xs: "12px", lg: "20px" },
      }}
    >
      <Typography variant="h3" color="#173433">
        {roles ? "Role Description" : "Description"}
      </Typography>

      <TextareaAutosize
        id="description"
        name="description"
        placeholder="Description"
        minRows={4}
        maxRows={10}
        aria-label="Textarea"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "16px",
          border: error ? "1px solid #d32f2f" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {error && (
        <Typography
          sx={{
            color: "#d32f2f",
            fontSize: "0.8571428571428571rem",
            mt: "3px",
          }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default Description;
