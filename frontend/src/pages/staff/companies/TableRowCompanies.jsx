import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { STAFF_COMPANIES_OVERVIEW_ROUTE } from "../../../routes/paths.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance.js";
import moreHoriz__icon from "../../../assets/moreHoriz__icon.svg";
import DeleteIcon from "@mui/icons-material/Delete";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  py: "10px",
  textTransform: "capitalize",
};

const TableRowCompanies = ({ company, fetchData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = !!anchorEl;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id: company.id,
      },
    };
    try {
      const response = await axiosInstance.delete("company", config);
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      fetchData();
    }
  }, []);

  const handleDeleteData = () => {
    deleteData();
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        mb: 3.125,
      }}
    >
      <Stack sx={{ justifyContent: "center" }}>
        <IconButton
          sx={{ alignSelf: "center", p: 0, mr: 1 }}
          onClick={handleClick}
        >
          <img src={moreHoriz__icon} alt="icon" />
        </IconButton>

        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
            }}
          >
            <Typography variant="h6" color="primary.main">
              Delete Company
            </Typography>

            <IconButton onClick={handleOpenDialog}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        </Popover>
      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Confirm Company Delete`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete this company?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            cancel
          </Button>
          <Button onClick={handleDeleteData} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        container
        spacing={1}
        columns={12}
        alignItems="center"
        sx={{
          flex: 1,
          minHeight: "72px",
        }}
      >
        <Grid xs={7} sx={gridStyles}>
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              src={company?.logo?.url}
              alt="Company logo"
              sx={{ width: "30px", height: "30px" }}
            />
            <Typography
              sx={{
                color: "#788894",
                fontSize: "16px",
                fontWeight: 400,
                mr: 1.75,
                pl: 2,
              }}
              variant="h5"
            >
              {company.name}
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={5} sx={gridStyles}>
          <Typography
            sx={{
              color: "#788894",
              fontSize: "16px",
              fontWeight: 400,
              mr: 1.75,
              pl: 2,
            }}
            variant="h5"
          >
            <Link
              to={`${STAFF_COMPANIES_OVERVIEW_ROUTE}/${company.id}`}
              style={{
                color: "#66c1ff",
                textDecoration: "1px underline",
                pointerEvents: "auto",
              }}
            >
              Go to Company Profile
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TableRowCompanies;
