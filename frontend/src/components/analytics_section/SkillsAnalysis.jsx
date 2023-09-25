import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import rightArrows from "../../assets/chevrons-right.svg";
import filter from "../../assets/filter.svg";
import { employeesData } from "../../data/analyticsData";
import { skillPresence } from "../../data/analyticsData";
import ChartWrapper from "./components/ChartWrapper";
import AverageGapChart from "./components/AverageGapChart";
import SkillGapsChart from "./components/SkillGapsChart";
import SkillGapsChartArea from "./components/SkillGapsChartArea";
import SkillPresenceChart from "./components/SkillPresenceChart";
import TopMissingChart from "./components/TopMissingChart";
import { useSelector } from "react-redux";
import axiosInstance from "../../helper/axiosInstance";
import EmployeeGapsChartArea from "./components/EmployeeGapsChartArea";

const SkillsAnalysis = () => {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const totalEmployees = data?.usage?.total_users;
  const completedProfiles = (
    (data?.usage?.profile_completed?.data[0] / totalEmployees) *
    100
  ).toFixed(1);
  const skillPresenceKeys = Object.keys(data?.analysis?.skill_presence ?? {});
  const [modifiedData, setModifiedData] = useState({});

  useEffect(() => {
    if (skillPresenceKeys.length > 0) {
      const modifiedData = {};
      skillPresenceKeys.forEach((key) => {
        modifiedData[key] = {
          labels: data?.analysis?.skill_presence[key]?.labels,
          datasets: [
            {
              label: "Employees possess",
              data: data?.analysis?.skill_presence[key]?.data,
              backgroundColor: [
                "#FCD1C9",
                "#D1F7EA",
                "#AADCFE",
                "#B395F6",
                "#FFE9C3",
              ],
              borderWidth: 1,
            },
          ],
        };
      });
      setModifiedData(modifiedData);
    } else {
      setModifiedData({});
    }
  }, [data]);

  useEffect(() => {
    setSkill(modifiedData[skillPresenceKeys[0]]);
  }, [modifiedData]);

  const [activeTab, setActiveTab] = useState("graph__1");
  const ActiveTabHandler = (e) => {
    setActiveTab(e.target.id);
  };

  const [activeGapBtn, setActiveGapBtn] = useState("select__job");
  const AverageGapLevelBtnsHandler = (e) => {
    setActiveGapBtn(e.target.id);
  };

  const [activeSkillGapBtn, setActiveSkillGapBtn] =
    useState("select__absolute");
  const AverageSkillGapLevelBtnsHandler = (e) => {
    setActiveSkillGapBtn(e.target.id);
  };

  const [activeEmployeeGapBtn, setActiveEmployeeGapBtn] =
    useState("select__absolute");
  const AverageEmployeeGapLevelBtnsHandler = (e) => {
    setActiveEmployeeGapBtn(e.target.id);
  };

  const [skill, setSkill] = useState(modifiedData[skillPresenceKeys[0]]);
  const selectSkillHandleChange = (event) => {
    setSkill(modifiedData[event.target.value]);
  };

  const [activeTopMissBtn, setActiveTopMissBtn] = useState("top");
  const topMissBtnsHandler = (e) => {
    setActiveTopMissBtn(e.target.id);
  };

  useEffect(() => {
    if (token) {
      fetchAnalyticsData();
    }
  }, [token]);

  const fetchAnalyticsData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axiosInstance.get("analytics", config);
      setData(response.data.payload);
      // console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Calculate dynamic height for each graph
  const [graphHeight, setGraphHeight] = useState("400px");

  useEffect(() => {
    if (data && activeGapBtn === "select__job") {
      setGraphHeight(`${data?.analysis?.job_avg_gaps?.labels?.length * 50}px`);
    } else if (data && activeGapBtn === "select__skill") {
      setGraphHeight(
        `${data?.analysis?.skill_avg_gaps?.labels?.length * 50}px`
      );
    } else if (data && activeGapBtn === "select__employee") {
      setGraphHeight(
        `${data?.analysis?.employee_avg_gaps?.labels?.length * 50}px`
      );
    } else if (
      data &&
      (activeSkillGapBtn === "select__absolute" ||
        activeSkillGapBtn === "select__percentage")
    ) {
      setGraphHeight(`${data?.analysis?.skill_gaps?.labels?.length * 50}px`);
    } else if (
      data &&
      (activeEmployeeGapBtn === "select__absolute" ||
        activeEmployeeGapBtn === "select__percentage")
    ) {
      setGraphHeight(`${data?.analysis?.employee_gaps?.labels?.length * 50}px`);
    } else if (data && activeTopMissBtn === "top") {
      setGraphHeight(`${data?.analysis?.top_skills?.labels?.length * 50}px`);
    } else if (data && activeTopMissBtn === "missing") {
      setGraphHeight(
        `${data?.analysis?.missing_skills?.labels?.length * 50}px`
      );
    }
  }, [
    data,
    activeGapBtn,
    activeSkillGapBtn,
    activeEmployeeGapBtn,
    activeTopMissBtn,
  ]);

  return (
    <>
      <Stack
        className="employeeData__wrapper"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          pb: "25px",
          borderBottom: { xs: "none", md: "2px solid #e9e9e9" },
          mb: 3,
        }}
      >
        <Typography variant="body1" color="primary" sx={{ mr: "24px" }}>
          {loading && <CircularProgress size={20} />}
          {!loading && (
            <Typography
              variant="span"
              color="primary"
              sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
            >
              {totalEmployees}
            </Typography>
          )}
          Total Employees
        </Typography>
        {mdMatches && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "2px", mr: "24px" }}
          />
        )}
        <Typography variant="body1" color="primary" sx={{ mr: "24px" }}>
          {loading && <CircularProgress size={20} />}
          {!loading && (
            <Typography
              variant="span"
              color="primary"
              sx={{ fontSize: "20px", fontWeight: "700", mr: "20px" }}
            >
              {completedProfiles} %
            </Typography>
          )}
          Completed profiles
        </Typography>
        {/* {mdMatches && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ width: "2px", mr: "24px" }}
          />
        )}

        {mdMatches && <img src={rightArrows} alt="chevrons-right" />} */}
      </Stack>

      {/* <Button
        sx={{
          alignSelf: "start",
          textTransform: "capitalize",
          border: "2px solid #e9e9e9 ",
          borderRadius: "4px",
          color: "primary.main",
          fontWeight: "400",
          mb: 2,
          px: 3,
          "&: hover": {
            border: "2px solid #e9e9e9 ",
          },
        }}
        disableElevation
        disableRipple
        startIcon={<img src={filter} alt="filter icon" />}
        variant="outlined"
      >
        Filter
      </Button> */}

      {/* <Grid2 container spacing={4}>
        <Grid2 xs={12} lg={6}>
          <ChartWrapper>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid  #B3B3B3",
                pb: 2,
                mb: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                color="primary"
                fontWeight="600"
              >
                Average gap level
              </Typography>

              <Box>
                <Button
                  onClick={(e) => AverageGapLevelBtnsHandler(e)}
                  id="select__job"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "5px",
                    p: 1,
                    mr: "36px",
                    backgroundColor:
                      activeGapBtn === "select__job" ? "#E5F3FC" : "transparent",
                    color: activeGapBtn === "select__job" ? "primary" : "#788894",
                  }}
                >
                  by job
                </Button>
                <Button
                  onClick={(e) => AverageGapLevelBtnsHandler(e)}
                  id="select__skill"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "5px",
                    p: 1,
                    backgroundColor:
                      activeGapBtn === "select__skill" ? "#E5F3FC" : "transparent",
                    color:
                      activeGapBtn === "select__skill" ? "primary" : "#788894",
                  }}
                >
                  by skill
                </Button>
              </Box>
            </Stack>
            <AverageGapChart select={activeGapBtn} />
          </ChartWrapper>
        </Grid2>
        <Grid2 xs={12} lg={6}>
          <ChartWrapper>
            <Typography
              variant="h4"
              component="h2"
              color="primary"
              fontWeight="600"
              sx={{ borderBottom: "1px solid  #B3B3B3", pb: "30px", mb: 2 }}
            >
              Skill Gaps
            </Typography>

            <SkillGapsChartArea />
          </ChartWrapper>
        </Grid2>
        <Grid2 xs={12} lg={6}>
          <ChartWrapper></ChartWrapper>
        </Grid2>
        <Grid2 xs={12} lg={6}>
          <ChartWrapper></ChartWrapper>
        </Grid2>
      </Grid2> */}

      <Stack sx={{ flexDirection: { sm: "row" }, gap: "10px", mb: 3 }}>
        <Stack sx={{ flexDirection: "row", gap: 1 }}>
          <Button
            onClick={(e) => ActiveTabHandler(e)}
            id="graph__1"
            sx={{
              textTransform: "none",
              borderRadius: "5px",
              p: 1,
              backgroundColor:
                activeTab === "graph__1" ? "#E1FAED" : "transparent",
              color: activeTab === "graph__1" ? "primary" : "#788894",
            }}
          >
            Average gap
          </Button>

          <Button
            onClick={(e) => ActiveTabHandler(e)}
            id="graph__2"
            sx={{
              textTransform: "none",
              borderRadius: "5px",
              p: 1,
              backgroundColor:
                activeTab === "graph__2" ? "#E1FAED" : "transparent",
              color: activeTab === "graph__2" ? "primary" : "#788894",
            }}
          >
            Job gap
          </Button>
        </Stack>

        <Stack sx={{ flexDirection: "row", gap: 1 }}>
          <Button
            onClick={(e) => ActiveTabHandler(e)}
            id="graph__3"
            sx={{
              textTransform: "none",
              borderRadius: "5px",
              p: 1,
              backgroundColor:
                activeTab === "graph__3" ? "#E1FAED" : "transparent",
              color: activeTab === "graph__3" ? "primary" : "#788894",
            }}
          >
            Employee gap
          </Button>

          <Button
            onClick={(e) => ActiveTabHandler(e)}
            id="graph__4"
            sx={{
              textTransform: "none",
              borderRadius: "5px",
              p: 1,
              backgroundColor:
                activeTab === "graph__4" ? "#E1FAED" : "transparent",
              color: activeTab === "graph__4" ? "primary" : "#788894",
            }}
          >
            Skill presence
          </Button>
        </Stack>

        <Stack sx={{ flexDirection: "row" }}>
          <Button
            onClick={(e) => ActiveTabHandler(e)}
            id="graph__5"
            sx={{
              textTransform: "none",
              borderRadius: "5px",
              p: 1,
              backgroundColor:
                activeTab === "graph__5" ? "#E1FAED" : "transparent",
              color: activeTab === "graph__5" ? "primary" : "#788894",
            }}
          >
            Top and missing skills
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack
        className="main__wrapper"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          rowGap: { xs: "30px", lg: "30px" },
          flexWrap: "wrap",
          justifyContent: { xs: "auto", lg: "space-between" },
        }}
      >
        {activeTab === "graph__1" && (
          <Stack
            className="AverageGapLevel__wrapper"
            sx={{
              width: { xs: "90vw", lg: "100%" },
            }}
          >
            {activeGapBtn === "select__job" && (
              <Box pb={3}>
                <Typography variant="body2" color="secondary.main">
                  Subtracting the sum of the required skills levels from the sum
                  of the employee's skills levels, taking into account only the
                  skills coming from the specific job description, divided by
                  the number of skills in this specific job description and the
                  number of employees with the specific job title.
                </Typography>
              </Box>
            )}

            {activeGapBtn === "select__skill" && (
              <Box pb={3}>
                <Typography variant="body2" color="secondary.main">
                  Subtracting the sum of the required skill levels from the sum
                  of the employee's skill levels, divided by the total number of
                  times the skill appears in a job description.
                </Typography>
              </Box>
            )}

            {activeGapBtn === "select__employee" && (
              <Box pb={3}>
                <Typography variant="body2" color="secondary.main">
                  Subtracting the sum of the required skills levels for a
                  specific job from the sum of the specific employee skills
                  levels, taking into account only the skills coming from the
                  specific job description, divided by the number of skills in
                  this specific job description.
                </Typography>
              </Box>
            )}

            <ChartWrapper>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  borderBottom: "1px solid  #B3B3B3",
                  pb: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  fontWeight="600"
                >
                  Average gap
                </Typography>

                <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                  <Button
                    onClick={(e) => AverageGapLevelBtnsHandler(e)}
                    id="select__job"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeGapBtn === "select__job"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeGapBtn === "select__job" ? "primary" : "#788894",
                    }}
                  >
                    by job
                  </Button>
                  <Button
                    onClick={(e) => AverageGapLevelBtnsHandler(e)}
                    id="select__skill"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeGapBtn === "select__skill"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeGapBtn === "select__skill"
                          ? "primary"
                          : "#788894",
                    }}
                  >
                    by skill
                  </Button>
                  <Button
                    onClick={(e) => AverageGapLevelBtnsHandler(e)}
                    id="select__employee"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeGapBtn === "select__employee"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeGapBtn === "select__employee"
                          ? "primary"
                          : "#788894",
                    }}
                  >
                    by employee
                  </Button>
                </Stack>
              </Stack>

              <Box
                sx={{
                  height: "50vh",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Box sx={{ height: graphHeight }}>
                  <AverageGapChart
                    select={activeGapBtn}
                    jobAvgGapData={data?.analysis?.job_avg_gaps}
                    skillAvgGapData={data?.analysis?.skill_avg_gaps}
                    employeeAvgGapData={data?.analysis?.employee_avg_gaps}
                  />
                </Box>
              </Box>
            </ChartWrapper>
          </Stack>
        )}

        {activeTab === "graph__2" && (
          <Stack
            className="skillGaps__wrapper"
            sx={{
              // height: "400px",
              width: { xs: "90vw", lg: "100%" },
            }}
          >
            <Box pb={3}>
              <Typography variant="body2" color="secondary.main">
                Sum of required skill levels and the sum of the skill levels of
                employees with this specific job, taking into account the
                highest score between them.
              </Typography>
            </Box>

            <ChartWrapper>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid  #B3B3B3",
                  pb: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  fontWeight="600"
                >
                  Job gap
                </Typography>

                <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                  <Button
                    onClick={(e) => AverageSkillGapLevelBtnsHandler(e)}
                    id="select__absolute"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeSkillGapBtn === "select__absolute"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeSkillGapBtn === "select__absolute"
                          ? "primary"
                          : "#788894",
                    }}
                  >
                    absolute
                  </Button>
                  <Button
                    onClick={(e) => AverageSkillGapLevelBtnsHandler(e)}
                    id="select__percentage"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeSkillGapBtn === "select__percentage"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeSkillGapBtn === "select__percentage"
                          ? "primary"
                          : "#788894",
                    }}
                  >
                    percentage
                  </Button>
                </Stack>
              </Stack>

              <Box
                sx={{
                  height: "50vh",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Box sx={{ height: graphHeight }}>
                  <SkillGapsChartArea
                    select={activeSkillGapBtn}
                    data={data?.analysis?.skill_gaps}
                  />
                </Box>
              </Box>
            </ChartWrapper>
          </Stack>
        )}

        {activeTab === "graph__3" && (
          <Stack
            className="employeeGaps__wrapper"
            sx={{
              // height: "400px",
              width: { xs: "90vw", lg: "100%" },
            }}
          >
            <Box pb={3}>
              <Typography variant="body2" color="secondary.main">
                Sum of required skill levels and the sum of the skill levels of
                the employee that are in the job description, taking into
                account the highest score between them. An overscore on a skill
                is not counted.
              </Typography>
            </Box>

            <ChartWrapper>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid  #B3B3B3",
                  pb: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  fontWeight="600"
                >
                  Employee gap
                </Typography>

                <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                  <Button
                    onClick={(e) => AverageEmployeeGapLevelBtnsHandler(e)}
                    id="select__absolute"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeEmployeeGapBtn === "select__absolute"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeEmployeeGapBtn === "select__absolute"
                          ? "primary"
                          : "#788894",
                    }}
                  >
                    absolute
                  </Button>
                  <Button
                    onClick={(e) => AverageEmployeeGapLevelBtnsHandler(e)}
                    id="select__percentage"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeEmployeeGapBtn === "select__percentage"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeEmployeeGapBtn === "select__percentage"
                          ? "primary"
                          : "#788894",
                    }}
                  >
                    percentage
                  </Button>
                </Stack>
              </Stack>

              <Box
                sx={{
                  height: "50vh",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Box sx={{ height: graphHeight }}>
                  <EmployeeGapsChartArea
                    select={activeEmployeeGapBtn}
                    data={data?.analysis?.employee_gaps}
                  />
                </Box>
              </Box>
            </ChartWrapper>
          </Stack>
        )}

        {activeTab === "graph__4" && (
          <Stack
            className="skillPresence__wrapper"
            sx={{
              // height: "400px",
              width: { xs: "90vw", lg: "100%" },
            }}
          >
            <Box pb={3}>
              <Typography variant="body2" color="secondary.main">
                Number of times a skill is present at the specific proficiency
                level.
              </Typography>
            </Box>

            <ChartWrapper>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid  #B3B3B3",
                  pb: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  fontWeight="600"
                >
                  Skill presence
                </Typography>

                {/* <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    value={skill}
                    size="medium"
                    onChange={selectSkillHandleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {Object.keys(skillPresence).map((key, index) => (
                      <MenuItem
                        selected={index === 0 ? true : false}
                        key={index}
                        value={`${skillPresence[key]}`}
                      >
                        {key}
                        {console.log(key, skillPresence[key])}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}
                <Box sx={{ minWidth: 120 }}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    inputProps={{ "aria-label": "Without label" }}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={selectSkillHandleChange}
                  >
                    {skillPresenceKeys.map((key, index) => (
                      <option key={index} value={key}>
                        {key}
                      </option>
                    ))}
                  </TextField>
                </Box>
              </Stack>
              <SkillPresenceChart data={skill} />
            </ChartWrapper>
          </Stack>
        )}

        {activeTab === "graph__5" && (
          <Stack
            className="AverageGapLevel__wrapper"
            sx={{
              // height: "400px",
              width: { xs: "90vw", lg: "100%" },
            }}
          >
            <Box pb={3}>
              <Typography variant="body2" color="secondary.main">
                Skill gaps sorted in descending and ascending order.
              </Typography>
            </Box>

            <ChartWrapper>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid  #B3B3B3",
                  pb: 2,
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  fontWeight="600"
                >
                  Top and missing skills
                </Typography>

                <Box>
                  <Button
                    onClick={(e) => topMissBtnsHandler(e)}
                    id="top"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      mr: "36px",
                      backgroundColor:
                        activeTopMissBtn === "top" ? "#E1FAED" : "transparent",
                      color: activeTopMissBtn === "top" ? "primary" : "#788894",
                    }}
                  >
                    Top
                  </Button>
                  <Button
                    onClick={(e) => topMissBtnsHandler(e)}
                    id="missing"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "5px",
                      p: 1,
                      backgroundColor:
                        activeTopMissBtn === "missing"
                          ? "#E1FAED"
                          : "transparent",
                      color:
                        activeTopMissBtn === "missing" ? "primary" : "#788894",
                    }}
                  >
                    Missing
                  </Button>
                </Box>
              </Stack>

              <Box
                sx={{
                  height: "50vh",
                  maxHeight: "50vh",
                  overflowY: "auto",
                  pr: 2,
                }}
              >
                <Box sx={{ height: graphHeight }}>
                  <TopMissingChart
                    select={activeTopMissBtn}
                    topSkillsData={data?.analysis?.top_skills}
                    missingSkillsData={data?.analysis?.missing_skills}
                  />
                </Box>
              </Box>
            </ChartWrapper>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default SkillsAnalysis;
