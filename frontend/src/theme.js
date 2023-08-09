import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#353C44",
    },
    secondary: {
      main: "#1E394C",
    },
    inactive: {
      main: "#788894",
    },
    settings: {
      main: "#25282C",
    },
    alert: {
      main: "#E2425C",
    },
    action: {
      acitve: "#B4F4D2",
      hover: "#B4F4D280",
      selected: "#B4F4D2",
    },
    background: {
      default: "#fcfcfc",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 16,
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 18,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
    },
    h6: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#353C44",
          backgroundColor: "#FAFAFA",
          boxShadow:
            "0px 73px 29px rgba(0, 0, 0, 0.01), 0px 41px 25px rgba(0, 0, 0, 0.05), 0px 18px 18px rgba(0, 0, 0, 0.09), 0px 5px 10px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "16px 28px 16px 28px",
        },
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
