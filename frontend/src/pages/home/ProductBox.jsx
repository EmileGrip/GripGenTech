import { Box, Link, Stack, Typography } from "@mui/material";

const ProductBox = ({ src, productName, href = "#" }) => {
  return (
    <Link href={href} sx={{ display: "block", flex: 1 }}>
      <Stack
        sx={{
          backgroundColor: "rgba(234, 0, 51, 0.50)",
          border: "1px solid #EA0033",
          px: { xs: 0.5 },
          pt: { xs: 0.75 },
          py: { md: 2 },
          borderRadius: "4px",
          alignItems: "center",
          textAlign: "center",
        }}
        elevation={2}
      >
        <Box
          component={"img"}
          src={src}
          sx={{
            width: { xs: "35px", sm: "45px", md: "52px", lg: "90px" },
            height: { xs: "22px", sm: "30px", md: "33px", lg: "58px" },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            textTransform: "capitalize",
            fontSize: { md: "1rem", lg: "1.25rem" },
          }}
        >
          {productName}
        </Typography>
      </Stack>
    </Link>
  );
};

export default ProductBox;
