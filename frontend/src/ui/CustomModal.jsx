import {
  Backdrop,
  Box,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const lgStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: "95%",
  border: "2px solid #FFF",
  borderRadius: "25px",
  pl: 13.625,
  pr: 13.625,
  pt: 9.25,
  pb: 7.5,
};

const xsStyle = {
  position: "fixed",
  inset: "0",
  width: "100%",
  height: "100%",
};

const CustomModal = ({ open, onClose, title, children }) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const currentStyle = lgMatches ? lgStyles : xsStyle;
  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <Box
        sx={{
          bgcolor: " #FFF",
          boxShadow:
            "0px 370px 148px rgba(0, 0, 0, 0.01), 0px 208px 125px rgba(0, 0, 0, 0.05), 0px 92px 92px rgba(0, 0, 0, 0.09), 0px 23px 51px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)",
          ...currentStyle,
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "95%",
            pr: 2,
          }}
        >
          <Stack
            sx={{
              flexDirection: { xs: "row" },
              justifyContent: { xs: "space-between" },
              alignItems: { xs: "center" },
              mb: { xs: "40px", lg: "70px" },
              px: { xs: 2.5, lg: 0 },
              py: { xs: 2 },
            }}
          >
            {!!title && (
              <Typography
                variant="h2"
                sx={{
                  fontSize: "30px",
                  textTransform: "capitalize",
                  fontWeight: "400",
                  position: { xs: "relative", md: "static" },

                  color: "secondary.main",
                }}
              >
                {title}
              </Typography>
            )}
            <CloseIcon
              sx={{
                // position: "absolute",
                // top: { xs: "20px", md: "36px" },
                // right: { xs: "20px", md: "41px" },
                color: "secondary.main",
                cursor: "pointer",
                zIndex: "1",
              }}
              fontSize="large"
              onClick={onClose}
            />
          </Stack>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
