import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// DarkGreen: {
//     100: "#ced1d0",
//     200: "#9ea2a2",
//     300: "#6d7473",
//     400: "#3d4545",
//     500: "#0c1716",
//     600: "#0a1212",
//     700: "#070e0d",
//     800: "#050909",
//     900: "#020504"
// },
// green: {
//     100: "#e1faed",
//     200: "#c3f5db",
//     300: "#a6f0c8",
//     400: "#88ebb6",
//     500: "#6ae6a4",
//     600: "#55b883",
//     700: "#408a62",
//     800: "#2a5c42",
//     900: "#152e21"
// },
const theme = createTheme({
  palette: {
    primary: {
      main: "#353C44",
    },
    secondary: {
      main: "#1E394C",
    },
    darkerGreen: "#0a1212",
    darkGreen: "#0C1716",
    lightGreen: "#3d4545",
    softGreen: "#A2AEAD",
    lightGrey: "#eee",
    darkGrey: "#C0C0C0",
    accent: "#6AE6A4",
    softAccent: "#E1FAED",
    darkAccent: "#55b883",
    darkGreenAccent: "#173433",
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
      acitve: "#E1FAED",
      hover: "#E1FAED80",
      selected: "#E1FAED",
    },
    background: {
      default: "#fcfcfc",
      dark: "#fafafa",
      newMain: "#F8F8F8",
      white: "#fff",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 16,
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 32,
      fontWeight: 600,
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 600,
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
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
