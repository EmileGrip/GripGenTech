import { createTheme, responsiveFontSizes } from "@mui/material";
const colors = {
  primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  grey: {
    100: "#f5f5f5",
    200: "#ececec",
    300: "#e2e2e2",
    400: "#d9d9d9",
    500: "#cfcfcf",
    600: "#a6a6a6",
    700: "#7c7c7c",
    800: "#535353",
    900: "#292929",
  },
  redAccent: {
    100: "#fbccd6",
    200: "#f799ad",
    300: "#f26685",
    400: "#ee335c",
    500: "#ea0033",
    600: "#bb0029",
    700: "#8c001f",
    800: "#5e0014",
    900: "#2f000a",
  },
  white: {
    100: "#ffffff",
    200: "#ffffff",
    300: "#ffffff",
    400: "#ffffff",
    500: "#ffffff",
    600: "#cccccc",
    700: "#999999",
    800: "#666666",
    900: "#333333",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
    },
    secondary: {
      dark: colors.redAccent[600],
      main: colors.redAccent[500],
      light: colors.redAccent[400],
      extraLight: colors.redAccent[200],
    },
    neutral: {
      dark: colors.grey[700],
      main: colors.grey[500],
      light: colors.grey[300],
      btnBg: colors.grey[400],
    },
    background: {
      default: colors.white[500],
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 16,
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.5,
      textTransform: "capitalize",
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "capitalize",
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
      lineHeight: 1.5,
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
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          background: colors.grey[400],
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: "1px solid #E46945",
          borderWidth: { xs: "1px", md: "2px" },
          width: { xs: "32px", md: "65px" },
          height: { xs: "32px", md: "65px" },
        },
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
