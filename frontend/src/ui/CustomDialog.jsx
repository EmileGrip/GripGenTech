import {
  Avatar,
  Backdrop,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import styles from "./CustomDialog.module.css";

const paperStyle = {
  border: "2px solid #FFF",
  borderRadius: "25px",
  boxShadow:
    "0px 370px 148px rgba(0, 0, 0, 0.01), 0px 208px 125px rgba(0, 0, 0, 0.05), 0px 92px 92px rgba(0, 0, 0, 0.09), 0px 23px 51px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)",
  width: "840px !important",
  pl: 6.75,
  pr: 21.75,
  pt: 7.875,
  pb: 7.5,
};
// const contentStyle = {
//   // pl: 6.75,
//   // pr: 21.75,
//   // pt: 7.875,
//   // pb: 7.5,
// };

const CustomDialog = ({ open, onClose, data }) => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  // const dialogContentStyle = mdMatches && contentStyle;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={mdMatches ? false : true}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
      PaperProps={{
        style: {
          ...paperStyle,
        },
      }}
    >
      <DialogContent>
        <CloseIcon
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "secondary.main",
            cursor: "pointer",
          }}
          fontSize="medium"
          onClick={onClose}
        />
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "0", md: "45px" },
          }}
        >
          <Box mt={2} mb={2}>
            <Avatar
              src={data.thumbnail}
              sx={{
                width: { xs: "75px", md: "218px" },
                height: { xs: "75px", md: "218px" },
              }}
            />
          </Box>

          <Box sx={{ flex: "1", mr: 4 }}>
            <Box
              className="title__section"
              sx={{ mb: { xs: "35px", md: "70px" } }}
            >
              <Typography
                variant="h3"
                color={"secondary"}
                sx={{
                  fontSize: "30px",
                  fontWeight: "400",
                  textTransform: "capitalize",
                }}
              >
                {data.name}
              </Typography>
              <Typography
                variant="h4"
                color={"secondary"}
                sx={{ textTransform: "capitalize" }}
              >
                {data.jobTitle}
              </Typography>
              <Typography
                variant="h4"
                color={"secondary"}
                sx={{ opacity: "0.5", textTransform: "capitalize" }}
              >
                {data.gender}
              </Typography>
            </Box>

            <Box className="contact__section" sx={{ mb: { xs: 3, md: 6 } }}>
              <Typography
                variant="h4"
                color={"secondary"}
                sx={{ fontWeight: "600", mb: { xs: 1, md: 2 } }}
              >
                Contact
              </Typography>

              {Object.keys(data.contact).map((property, index) => (
                <Stack
                  key={index}
                  flexDirection="row"
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="h5"
                    color={"secondary"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {property}
                  </Typography>
                  <Typography variant="body1" color={"secondary"}>
                    {data.contact[property]}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Box className="info__section" sx={{ mb: { xs: 3, md: 6 } }}>
              <Typography
                variant="h4"
                color={"secondary"}
                sx={{ fontWeight: "600", mb: { xs: 1, md: 2 } }}
              >
                Info
              </Typography>

              {Object.keys(data.info).map((property, index) => (
                <Stack
                  key={index}
                  flexDirection="row"
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="h5"
                    color={"secondary"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {property}
                  </Typography>
                  <Typography variant="body1" color={"secondary"}>
                    {data.info[property]}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Link to={""} style={{ color: "#66c1ff" }}>
              See Full Bio
            </Link>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
