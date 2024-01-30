import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import filter from "../../../assets/filter.svg";
import search_icon from "../../../assets/search.svg";
import { useState } from "react";

const SearchWrapperBox = ({ selectedLevel, setSelectedLevel }) => {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatch = useMediaQuery(theme.breakpoints.up("lg"));
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.name);
    handleMenuClose();
  };

  return (
    <Stack
      className="search__wrapper"
      sx={{
        flexDirection: { md: "row" },
        justifyContent: { md: "space-between" },
        alignItems: "center",
        py: "24px",
        px: "0",
        gap: "16px",
      }}
    >
      <Typography variant="h3" sx={{ color: "darkGreen", fontWeight: 600 }}>
        Suggestions based on your job
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Button
          onClick={handleMenuOpen}
          sx={{
            alignSelf: "center",
            textTransform: "none",
            border: "2px solid #e9e9e9 ",
            borderRadius: "4px",
            color: "primary.main",
            fontWeight: "400",
            px: 3,
            "&: hover": {
              border: "2px solid #e9e9e9 ",
            },
          }}
          disableElevation
          disableRipple
          startIcon={<img src={filter} alt="Filter icon" />}
          variant="outlined"
          aria-controls="filter-menu"
          aria-haspopup="true"
        >
          {selectedLevel}
        </Button>

        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
                    checked={selectedLevel === "Beginner"}
                    onChange={handleLevelChange}
                    name="Beginner"
                  />
                }
                label="Beginner"
              />
            </MenuItem>
            <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLevel === "Intermediate"}
                    onChange={handleLevelChange}
                    name="Intermediate"
                  />
                }
                label="Intermediate"
              />
            </MenuItem>
            <MenuItem sx={{ fontSize: "16px", color: "#788894" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedLevel === "Advanced"}
                    onChange={handleLevelChange}
                    name="Advanced"
                  />
                }
                label="Advanced"
              />
            </MenuItem>
          </FormGroup>
        </Menu>

        <Box sx={{ width: "100%", maxWidth: { xs: "318px", md: "173px" } }}>
          <TextField
            type="search"
            name="search"
            id="search"
            size="small"
            placeholder="Search course"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ mr: { xs: "auto", md: "0" } }}
                >
                  {!search && (
                    <Box
                      sx={{ width: "24px", height: "24px" }}
                      component="img"
                      src={search_icon}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                pr: { xs: 0, md: "10px" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#C0C0C0",
              },
              "& .MuiInputBase-input": {
                textAlign: { xs: "center", md: "left" },
                pr: { xs: "14px", md: "0px" },
              },
              "& .MuiInputAdornment-root ": {
                position: { xs: "absolute", md: "relative" },
                right: { xs: "28%", md: "auto" },
                transform: { xs: " translateX(50%)", md: "none" },
              },
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default SearchWrapperBox;
