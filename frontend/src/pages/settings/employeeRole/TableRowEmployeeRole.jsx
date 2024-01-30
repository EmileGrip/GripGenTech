import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect } from "react";

const gridStyles = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  alignItems: "center",
  py: "10px",
  textTransform: "capitalize",
};

const stackStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
};

const typographyStyle = {
  textTransform: "capitalize",
  fontSize: "12px",
  color: "#353C44",
};

const typographyStyle2 = {
  fontSize: "12px",
  color: "#788894",
  textTransform: "capitalize",
};

const TableRowEmployeeRole = ({ employee, changeRole }) => {
  const theme = useTheme();
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const [isRowOpen, setIsRowOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(employee?.system_role);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeRole = () => {
    changeRole(employee.id, selectedRole);
    handleCloseDialog();
  };

  const handleRoleChange = (event) => {
    const newRole = event.target.name;
    setSelectedRole(newRole);
    handleMenuClose();
    handleOpenDialog();
  };

  useEffect(() => {
    setSelectedRole(employee?.system_role);
  }, [employee]);

  return (
    <>
      {lgMatches ? (
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{
            flex: 1,
            minHeight: "45px",
            background: "white",
            borderRadius: "5px",
          }}
        >
          <Grid item xs={3} sx={gridStyles}>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                src={employee?.profile_picture?.url}
                alt={employee?.profile_picture?.name}
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
                {`${employee.first_name} ${employee.last_name}`}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={4} sx={{ ...gridStyles, textTransform: "initial" }}>
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
              {employee.email}
            </Typography>
          </Grid>

          <Grid item xs={3} sx={gridStyles}>
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
              {employee?.role?.title}
            </Typography>
          </Grid>

          <Grid item xs={2} sx={gridStyles}>
            <Box
              sx={{
                width: "110px",
                height: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#E5F3FC",
                borderRadius: "4px",
                textTransform: "capitalize",
                p: 1,
              }}
            >
              <Typography variant="body1" color="#788894">
                {employee?.system_role}
              </Typography>

              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                {menuAnchorEl ? (
                  <ExpandLessIcon
                    sx={{
                      color: "primary",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                ) : (
                  <ExpandMoreIcon
                    sx={{
                      color: "primary",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                )}
              </IconButton>
            </Box>

            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  width: "210px",
                },
              }}
            >
              <FormGroup>
                <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedRole === "employee"}
                        onChange={handleRoleChange}
                        name="employee"
                      />
                    }
                    label="Employee"
                  />
                </MenuItem>

                <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedRole === "admin"}
                        onChange={handleRoleChange}
                        name="admin"
                      />
                    }
                    label="Admin"
                  />
                </MenuItem>

                <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedRole === "manager"}
                        onChange={handleRoleChange}
                        name="manager"
                      />
                    }
                    label="Manager"
                  />
                </MenuItem>
              </FormGroup>
            </Menu>

            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Confirm Role Change`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {`Are you sure you want to change this role?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} autoFocus>
                  cancel
                </Button>
                <Button onClick={handleChangeRole} color="error">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            px: "26px",
            pb: "14px",
            ...(isRowOpen && {
              background: "#FAFAFA",
              border: "2px solid #EEEEEE",
              borderRadius: "10px",
              mb: isRowOpen && 1,
            }),
          }}
        >
          <Stack
            sx={{
              flexDirection: { xs: "row" },
              flex: 1,
              minHeight: "72px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar
                  src={employee?.profile_picture?.url}
                  alt={employee?.profile_picture?.name}
                  sx={{ width: "30px", height: "30px" }}
                />

                <Typography
                  sx={{
                    color: "#788894",
                    fontSize: "16px",
                    fontWeight: 400,
                    pl: 2,
                    textTransform: "capitalize",
                  }}
                  variant="h5"
                >
                  {`${employee.first_name} ${employee.last_name}`}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#788894",
                  fontSize: "12px",
                  fontWeight: 400,
                  pl: "46px",
                  textTransform: "capitalize",
                }}
                variant="h5"
              >
                {employee?.role?.title}
              </Typography>
            </Box>

            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsRowOpen(!isRowOpen)}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Stack>

          {!isRowOpen && <Divider />}

          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <Grid container spacing={1} sx={{ pl: "46px", py: 2 }}>
              <Grid item xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Email:
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ ...typographyStyle2, textTransform: "initial" }}
                  >
                    {employee.email}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Job Title:
                  </Typography>

                  <Typography variant="body1" sx={typographyStyle2}>
                    {employee?.role?.title}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack sx={stackStyle}>
                  <Typography variant="h5" sx={typographyStyle}>
                    Role:
                  </Typography>

                  <Typography variant="body1" sx={typographyStyle2}>
                    {employee?.system_role}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default TableRowEmployeeRole;
