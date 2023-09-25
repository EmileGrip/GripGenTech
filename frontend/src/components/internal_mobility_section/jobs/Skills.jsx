import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import editIcon from "../../../assets/edit_icon_light.svg";
import hintIcon from "../../../assets/hintIcon.svg";
import increaseIcon from "../../../assets/increase_icon.svg";
import decreaseIcon from "../../../assets/decrease_icon.svg";
import { skillsTable } from "../../../data/skillsData";
import { useState } from "react";
import DescriptionTooltip from "../../../ui/DescriptionTooltip";
import RatingBar from "../../RatingBar";

const Skills = ({ roles = false }) => {
  const [chosenSkill, setChosenSkill] = useState(null);

  return (
    <Stack
      sx={{
        background: "#FAFAFA",
        border: "2px solid #EEEEEE",
        borderRadius: "10px",
        gap: "20px",
        p: { xs: "12px", lg: "20px" },
      }}
    >
      <Typography variant="h3" color="#173433">
        {roles ? "Role Skills" : "Skills"}
      </Typography>

      <Typography variant="body1" color="#173433">
        Suggested Skills
      </Typography>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: { xs: "center", lg: "flex-start" },
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {skillsTable.length >= 1 && (
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: { xs: "center", lg: "flex-start" },
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {skillsTable.map((skill) => (
              <Box
                onClick={() => setChosenSkill({ ...skill, addSkill: true })}
                key={skill.skillName}
                sx={{
                  background: "rgba(23, 52, 51, 0.40)",
                  borderRadius: "100px",
                  py: "4px",
                  px: "12px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="h6"
                  textTransform="none"
                  color="#FFFFFF"
                  fontWeight="500"
                >
                  {skill.skillName}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        <Button
          sx={{
            width: "124px",
            height: "29px",
            color: "rgba(23, 52, 51, 0.40)",
            border: "1px solid rgba(23, 52, 51, 0.40)",
            borderRadius: "100px",
          }}
        >
          <Typography variant="h6" textTransform="none" pr="12px">
            Add Skill
          </Typography>

          <AddIcon />
        </Button>
      </Stack>

      {chosenSkill?.addSkill && (
        <Stack
          sx={{
            background: "#FFFFFF",
            border: "1px solid #EEEEEE",
            borderRadius: "5px",
            p: "20px ",
            width: "100%",
          }}
        >
          <Grid
            container
            spacing={1}
            columns={12}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              gap: { xs: 3, md: 0 },
              m: "0px",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
            >
              <Stack
                sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
              >
                <Typography variant="h5" color="darkGreen">
                  {chosenSkill.skillName}
                </Typography>

                <DescriptionTooltip
                  title={chosenSkill.description}
                  placement="bottom-start"
                >
                  <img
                    src={hintIcon}
                    alt="icon"
                    style={{ alignSelf: "center" }}
                  />
                </DescriptionTooltip>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ flexDirection: "row", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignItems: "center",
                }}
              >
                <img
                  src={decreaseIcon}
                  alt="Decrease icon"
                  style={{ cursor: "pointer" }}
                />

                <Tooltip
                  title={
                    <>
                      <div style={{ textAlign: "center" }}>
                        Proficiency needed
                      </div>
                      <RatingBar initialValue={chosenSkill.status} />
                    </>
                  }
                  placement="top-start"
                  followCursor
                >
                  <span
                    style={{
                      marginTop: "7px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    <RatingBar initialValue={chosenSkill.currentProf} />
                  </span>
                </Tooltip>

                <img
                  src={increaseIcon}
                  alt="Increase icon"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: { md: 3 } }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 3, sm: 4 },
                }}
              >
                <Button
                  sx={{
                    width: "93px",
                    height: "22px",
                    background: (theme) => theme.palette.accent,
                  }}
                >
                  <Typography
                    variant="body2"
                    textTransform="none"
                    fontWeight="500"
                  >
                    Confirm
                  </Typography>
                </Button>

                <Button
                  onClick={() => setChosenSkill(null)}
                  sx={{
                    width: "93px",
                    height: "22px",
                    border: "1px solid #788894",
                  }}
                >
                  <Typography
                    variant="body2"
                    textTransform="none"
                    color="#788894"
                    fontWeight="500"
                  >
                    Cancel
                  </Typography>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      )}

      <Typography variant="body1" color="#173433">
        Skills selected
      </Typography>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: { xs: "center", lg: "flex-start" },
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {skillsTable.length >= 1 && (
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: { xs: "center", lg: "flex-start" },
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {skillsTable.map((skill) => (
              <Box
                key={skill.skillName}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  background: "#0C1716",
                  borderRadius: "100px",
                  py: "4px",
                  px: "12px",
                }}
              >
                <Typography
                  variant="h6"
                  textTransform="none"
                  color="#FFFFFF"
                  fontWeight="500"
                >
                  {skill.skillName}
                </Typography>

                <img
                  onClick={() => setChosenSkill({ ...skill, editSkill: true })}
                  src={editIcon}
                  alt="Edit icon"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>

      {chosenSkill?.editSkill && (
        <Stack
          sx={{
            background: "#FFFFFF",
            border: "1px solid #EEEEEE",
            borderRadius: "5px",
            p: "20px ",
            width: "100%",
          }}
        >
          <Grid
            container
            spacing={1}
            columns={12}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              gap: { xs: 3, md: 0 },
              m: "0px",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
            >
              <Stack
                sx={{ flexDirection: "row", gap: { xs: "6px", lg: "14px" } }}
              >
                <Typography variant="h5" color="darkGreen">
                  {chosenSkill.skillName}
                </Typography>

                <DescriptionTooltip
                  title={chosenSkill.description}
                  placement="bottom-start"
                >
                  <img
                    src={hintIcon}
                    alt="icon"
                    style={{ alignSelf: "center" }}
                  />
                </DescriptionTooltip>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ flexDirection: "row", alignItems: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                  alignItems: "center",
                }}
              >
                <img
                  src={decreaseIcon}
                  alt="Decrease icon"
                  style={{ cursor: "pointer" }}
                />

                <Tooltip
                  title={
                    <>
                      <div style={{ textAlign: "center" }}>
                        Proficiency needed
                      </div>
                      <RatingBar initialValue={chosenSkill.status} />
                    </>
                  }
                  placement="top-start"
                  followCursor
                >
                  <span
                    style={{
                      marginTop: "7px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    <RatingBar initialValue={chosenSkill.currentProf} />
                  </span>
                </Tooltip>

                <img
                  src={increaseIcon}
                  alt="Increase icon"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ mt: { md: 3 } }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 3, sm: 4 },
                }}
              >
                <Button
                  sx={{
                    width: "93px",
                    height: "22px",
                    background: (theme) => theme.palette.accent,
                  }}
                >
                  <Typography
                    variant="body2"
                    textTransform="none"
                    fontWeight="500"
                  >
                    Confirm
                  </Typography>
                </Button>

                <Button
                  onClick={() => setChosenSkill(null)}
                  sx={{
                    width: "93px",
                    height: "22px",
                    border: "1px solid #788894",
                  }}
                >
                  <Typography
                    variant="body2"
                    textTransform="none"
                    color="#788894"
                    fontWeight="500"
                  >
                    Cancel
                  </Typography>
                </Button>

                <IconButton sx={{ color: "#FE7777" }}>
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Stack>
  );
};

export default Skills;
