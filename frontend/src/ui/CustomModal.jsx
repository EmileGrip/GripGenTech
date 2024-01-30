import {
  Backdrop,
  Box,
  IconButton,
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
  width: 800,
  // height: "95%",
  border: "2px solid #FFF",
  borderRadius: "4px",
  p: 3,
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
            "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
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
              mb: { xs: "40px", lg: "20px" },
              p: { xs: 2, lg: 0 },
              pt: { lg: 2 },
            }}
          >
            {!!title && (
              <Typography
                variant="h2"
                sx={{
                  textTransform: "capitalize",
                  position: { xs: "relative", md: "static" },

                  color: "secondary.main",
                }}
              >
                {title}
              </Typography>
            )}

            <IconButton onClick={onClose}>
              <CloseIcon
                sx={{
                  color: "grey",
                  cursor: "pointer",
                  zIndex: "1",
                }}
              />
            </IconButton>
          </Stack>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
