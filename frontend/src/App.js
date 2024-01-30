import { responsiveTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import DevelopmentPage from "./pages/employee/development/DevelopmentPage";
import { CssBaseline } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MySkills from "./pages/employee/mySkills/MySkills";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/authentication/Login/Login";
import Employee from "./pages/employee/Employee";
import {
  EMPLOYEE_LEARNING_EXPREIENCE_PATH,
  EMPLOYEE_DEVELOPMENT_ROUTE,
  EMPLOYEE_MY_SKILLS_ROUTE,
  EMPLOYEE_WORK_EXPREIENCE_PATH,
  MANAGER_PAGE_ROUTE,
  MANAGER_EMPLOYEES_ROUTE,
  MANAGER_ORGANIGRAM_ROUTE,
  MANAGER_ANALYTICS_ROUTE,
  MANAGER_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
  MANAGER_ANALYTICS_USAGE_ROUTE,
  EMPLOYEE_PAGE_ROUTE,
  ADMIN_PAGE_ROUTE,
  AMDIN_EMPLOYEE_ROUTE,
  ADMIN_ANALYTICS_ROUTE,
  ADMIN_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
  ADMIN_ANALYTICS_USAGE_ROUTE,
  ADMIN_SETTINGS_COMPANY_PROFILE_ROUTE,
  ADMIN_SKILL_PROFILE,
  ADMIN_ORGANIZATION_ORGRANIGRAM_ROUTE,
  EMPLOYEE_ORGANIGRAM_ROUTE,
  ADMIN_EMPLOYEES_LIST_ROUTE,
  STAFF_PAGE_ROUTE,
  MANAGER_EMPLOYEES_PROFILE,
  ADMIN_EMPLOYEES_PROFILE,
  EMPLOYEE_EMPLOYEES_PROFILE,
  STAFF_COMPANIES_ADD_COMPANY_ROUTE,
  STAFF_COMPANIES_OVERVIEW_ROUTE,
  STAFF_ANALYTICS_ROUTE,
  EMPLOYEE_PROFILE_PATH,
  EMPLOYEE_JOBS_ROUTE,
  EMPLOYEE_PROJECTS_ROUTE,
  MANAGER_JOBS_ROUTE,
  MANAGER_PROJECTS_ROUTE,
  ADMIN_JOBS_ROUTE,
  ADMIN_PROJECTS_ROUTE,
  EMPLOYEE_NEW_JOB_ROUTE,
  MANAGER_NEW_JOB_ROUTE,
  ADMIN_NEW_JOB_ROUTE,
  EMPLOYEE_JOB_DETAILS_ROUTE,
  MANAGER_JOB_DETAILS_ROUTE,
  ADMIN_JOB_DETAILS_ROUTE,
  EMPLOYEE_NEW_PROJECT_ROUTE,
  MANAGER_NEW_PROJECT_ROUTE,
  MANAGER_INTERNAL_MOBILITY_ROUTE,
  EMPLOYEE_INTERNAL_MOBILITY_ROUTE,
  ADMIN_INTERNAL_MOBILITY_ROUTE,
  ADMIN_NEW_PROJECT_ROUTE,
  EMPLOYEE_PROJECT_OVERVIEW_ROUTE,
  MANAGER_PROJECT_OVERVIEW_ROUTE,
  ADMIN_PROJECT_OVERVIEW_ROUTE,
  EMPLOYEE_PROJECT_DETAILS_ROUTE,
  MANAGER_PROJECT_DETAILS_ROUTE,
  ADMIN_PROJECT_DETAILS_ROUTE,
  ROLES_REQUIRED_ROUTE,
  EMPLOYEE_JOBS_OVERVIEW_ROUTE,
  EMPLOYEE_PROJECTS_OVERVIEW_ROUTE,
  EMPLOYEE_LEARNING_MATCHING,
  ADMIN_LEARNING_MATCHING_ROUTE,
  ADMIN_PROVIDERS_ROUTE,
  EMPLOYEE_LEARNING_MATCHING_COURSES,
  ADMIN_SETTINGS_ROUTE,
  ADMIN_SETTINGS_EMPLOYEE_ROLE_ROUTE,
  ADMIN_SETTINGS_BILLING_ROUTE,
  EMPLOYEE_GOALS_ROUTE,
  EMPLOYEE_ADD_GOAL_ROUTE,
} from "./routes/paths";
import WorkExperience from "./pages/employee/workExperience/WorkExperience";
import LearningExperience from "./pages/employee/learningExperience/LearningExperience";
import Overview from "./pages/employee/mySkills/Overview";
import ManagerDashBoard from "./pages/manager/ManagerDashBoard";
import Employees from "./components/employees_section/Employees";
import Organigram from "./pages/manager/organigram/Organigram";
import Analytics from "./components/analytics_section/Analytics";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Usage from "./components/analytics_section/Usage";
import SkillsAnalysis from "./components/analytics_section/SkillsAnalysis";
import CompanyProfile from "./pages/admin/companyProfile/CompanyProfile";
import Profile from "./components/profile-section/profile/Profile";
import SkillProfile from "./pages/admin/skillProfile/SkillProfile";
import ChartTree from "./pages/admin/organigram/ChartTree";
import Summary from "./pages/admin/organigram/summary/Summary";
import { useState } from "react";
import ProtectedManager from "./components/ProtectedManager";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ProtectedEmployee from "./components/ProtectedEmployee";
import Signup from "./pages/authentication/signup/signup";
import Recover from "./pages/authentication/recover/recover";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ProtectedStaff from "./components/ProtectedStaff";
import { useSelector } from "react-redux";
import AddCompany from "./pages/staff/companies/AddCompany";
import CompaniesOverview from "./pages/staff/companies/CompaniesOverview";
import StaffAnalytics from "./pages/staff/analytics/StaffAnalytics";
import StaffCompanyProfile from "./pages/staff/companies/StaffCompanyProfile";
import InternalMobility from "./components/internal_mobility_section/InternalMobility";
import Jobs from "./components/internal_mobility_section/jobs/Jobs";
import Projects from "./components/internal_mobility_section/projects/Projects";
import AddJobForm from "./components/internal_mobility_section/jobs/AddJobForm";
import JobDetails from "./components/internal_mobility_section/jobs/JobDetails";
import AddProjectForm from "./components/internal_mobility_section/projects/AddProjectForm";
import ProjectOverview from "./components/internal_mobility_section/projects/ProjectOverview";
import ProjectDetails from "./components/internal_mobility_section/projects/ProjectDetails";
import RolesRequired from "./components/internal_mobility_section/projects/RolesRequired";
import SkillProfilePage from "./pages/admin/skillProfile/SkillProfilePage";
import JobsOverview from "./components/internal_mobility_section/jobs/JobsOverview";
import ProjectsOverview from "./components/internal_mobility_section/projects/ProjectsOverview";
import EmployeeLearningMatching from "./pages/employee/learningMatching/EmployeeLearningMatching";
import LearningMatching from "./pages/admin/learningMatching/LearningMatching";
import AdminLearningMatching from "./pages/admin/learningMatching/AdminLearningMatching";
import CoursePreview from "./pages/employee/learningMatching/CoursePreview";
import SettingsPage from "./pages/settings/SettingsPage";
import Settings from "./pages/settings/Settings";
import EmployeeRole from "./pages/settings/employeeRole/EmployeeRole";
import BillingPlans from "./pages/settings/billing/BillingPlans";
import HomePage from "./pages/employee/profile/HomePage";
import GoalsPreview from "./pages/employee/goals/GoalsPreview";
import AddGoal from "./pages/employee/goals/AddGoal";

function App() {
  const [role, setRole] = useState(null);
  const { token, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   // Check if the user is logged out (you might have a more specific condition)
  //   if (!token && location.pathname !== "/recover") {
  //     navigate("/login"); // Redirect to the login page
  //   }
  // }, [token, navigate]);

  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Routes>
            <Route index element={<Login />} />

            <Route
              path={EMPLOYEE_PAGE_ROUTE}
              element={
                <ProtectedEmployee>
                  <Employee />
                </ProtectedEmployee>
              }
            >
              <Route path={EMPLOYEE_PROFILE_PATH} element={<HomePage />} />
              <Route path={EMPLOYEE_GOALS_ROUTE} element={<GoalsPreview />} />
              <Route path={EMPLOYEE_ADD_GOAL_ROUTE} element={<AddGoal />} />
              <Route path={EMPLOYEE_MY_SKILLS_ROUTE} element={<MySkills />}>
                <Route index element={<Overview />} />
              </Route>

              <Route
                path={EMPLOYEE_DEVELOPMENT_ROUTE}
                element={<DevelopmentPage />}
              />

              <Route
                path={EMPLOYEE_WORK_EXPREIENCE_PATH}
                element={<WorkExperience />}
              />

              <Route
                path={EMPLOYEE_LEARNING_EXPREIENCE_PATH}
                element={<LearningExperience />}
              />

              <Route
                path={EMPLOYEE_ORGANIGRAM_ROUTE}
                element={<Organigram />}
              />

              <Route
                path={EMPLOYEE_LEARNING_MATCHING}
                element={<LearningMatching />}
              >
                <Route index element={<EmployeeLearningMatching />} />

                <Route
                  path={EMPLOYEE_LEARNING_MATCHING_COURSES}
                  element={<EmployeeLearningMatching />}
                />

                <Route
                  path={`${EMPLOYEE_LEARNING_MATCHING}/:courseId`}
                  element={<CoursePreview />}
                />
              </Route>

              <Route
                path={EMPLOYEE_INTERNAL_MOBILITY_ROUTE}
                element={<InternalMobility />}
              >
                <Route index element={<Jobs />} />

                <Route path={EMPLOYEE_JOBS_ROUTE} element={<Jobs />} />

                <Route
                  path={EMPLOYEE_JOBS_OVERVIEW_ROUTE}
                  element={<JobsOverview />}
                />

                <Route path={EMPLOYEE_NEW_JOB_ROUTE} element={<AddJobForm />} />

                <Route
                  path={`${EMPLOYEE_JOB_DETAILS_ROUTE}/:id`}
                  element={<JobDetails />}
                />

                <Route path={EMPLOYEE_PROJECTS_ROUTE} element={<Projects />} />

                <Route
                  path={EMPLOYEE_PROJECTS_OVERVIEW_ROUTE}
                  element={<ProjectsOverview />}
                />

                <Route
                  path={EMPLOYEE_NEW_PROJECT_ROUTE}
                  element={<AddProjectForm />}
                />

                <Route
                  path={EMPLOYEE_PROJECT_OVERVIEW_ROUTE}
                  element={<ProjectOverview />}
                />

                <Route
                  path={`${EMPLOYEE_PROJECT_DETAILS_ROUTE}/:id`}
                  element={<ProjectDetails />}
                />

                <Route
                  path={`${EMPLOYEE_PROJECT_DETAILS_ROUTE}/:id${ROLES_REQUIRED_ROUTE}/:roleId`}
                  element={<RolesRequired />}
                />
              </Route>

              {userInfo?.system_role === "employee" && (
                <Route
                  path={`${EMPLOYEE_EMPLOYEES_PROFILE}/:id`}
                  element={<Profile />}
                />
              )}
            </Route>

            <Route
              path={MANAGER_PAGE_ROUTE}
              element={
                <ProtectedManager>
                  <ManagerDashBoard />
                </ProtectedManager>
              }
            >
              <Route path={MANAGER_EMPLOYEES_ROUTE} element={<Employees />} />
              {userInfo?.system_role === "manager" && (
                <Route
                  path={`${MANAGER_EMPLOYEES_PROFILE}/:id`}
                  element={<Profile />}
                />
              )}

              <Route path={MANAGER_ORGANIGRAM_ROUTE} element={<Organigram />} />

              <Route
                path={MANAGER_INTERNAL_MOBILITY_ROUTE}
                element={<InternalMobility />}
              >
                <Route index element={<Jobs />} />

                <Route path={MANAGER_JOBS_ROUTE} element={<Jobs />} />

                <Route path={MANAGER_NEW_JOB_ROUTE} element={<AddJobForm />} />

                <Route
                  path={`${MANAGER_JOB_DETAILS_ROUTE}/:id`}
                  element={<JobDetails />}
                />

                <Route path={MANAGER_PROJECTS_ROUTE} element={<Projects />} />

                <Route
                  path={MANAGER_NEW_PROJECT_ROUTE}
                  element={<AddProjectForm />}
                />

                <Route
                  path={MANAGER_PROJECT_OVERVIEW_ROUTE}
                  element={<ProjectOverview />}
                />

                <Route
                  path={`${MANAGER_PROJECT_DETAILS_ROUTE}/:id`}
                  element={<ProjectDetails />}
                />

                <Route
                  path={`${MANAGER_PROJECT_DETAILS_ROUTE}/:id${ROLES_REQUIRED_ROUTE}/:roleId`}
                  element={<RolesRequired />}
                />
              </Route>

              <Route path={MANAGER_ANALYTICS_ROUTE} element={<Analytics />}>
                <Route index element={<SkillsAnalysis />} />
                <Route
                  path={MANAGER_ANALYTICS_SKILLS_ANALYSIS_ROUTE}
                  element={<SkillsAnalysis />}
                />
                <Route
                  path={MANAGER_ANALYTICS_USAGE_ROUTE}
                  element={<Usage />}
                />
              </Route>
            </Route>

            <Route
              path={ADMIN_PAGE_ROUTE}
              element={
                <ProtectedAdmin>
                  <AdminDashboard />
                </ProtectedAdmin>
              }
            >
              <Route path={AMDIN_EMPLOYEE_ROUTE} element={<Employees />} />
              {userInfo?.system_role === "admin" && (
                <Route
                  path={`${ADMIN_EMPLOYEES_PROFILE}/:id`}
                  element={<Profile />}
                />
              )}

              <Route
                path={ADMIN_ORGANIZATION_ORGRANIGRAM_ROUTE}
                element={<ChartTree />}
              />

              <Route path={ADMIN_EMPLOYEES_LIST_ROUTE} element={<Summary />} />

              <Route path={ADMIN_SKILL_PROFILE} element={<SkillProfilePage />}>
                <Route index element={<SkillProfile />} />
              </Route>

              <Route path={ADMIN_ANALYTICS_ROUTE} element={<Analytics />}>
                <Route index element={<SkillsAnalysis />} />
                <Route
                  path={ADMIN_ANALYTICS_SKILLS_ANALYSIS_ROUTE}
                  element={<SkillsAnalysis />}
                />
                <Route path={ADMIN_ANALYTICS_USAGE_ROUTE} element={<Usage />} />
              </Route>

              <Route
                path={ADMIN_LEARNING_MATCHING_ROUTE}
                element={<LearningMatching />}
              >
                <Route index element={<AdminLearningMatching />} />

                <Route
                  path={ADMIN_PROVIDERS_ROUTE}
                  element={<AdminLearningMatching />}
                />
              </Route>

              <Route
                path={ADMIN_INTERNAL_MOBILITY_ROUTE}
                element={<InternalMobility />}
              >
                <Route index element={<Jobs />} />

                <Route path={ADMIN_JOBS_ROUTE} element={<Jobs />} />

                <Route path={ADMIN_NEW_JOB_ROUTE} element={<AddJobForm />} />

                <Route
                  path={`${ADMIN_JOB_DETAILS_ROUTE}/:id`}
                  element={<JobDetails />}
                />

                <Route path={ADMIN_PROJECTS_ROUTE} element={<Projects />} />

                <Route
                  path={ADMIN_NEW_PROJECT_ROUTE}
                  element={<AddProjectForm />}
                />

                <Route
                  path={ADMIN_PROJECT_OVERVIEW_ROUTE}
                  element={<ProjectOverview />}
                />

                <Route
                  path={`${ADMIN_PROJECT_DETAILS_ROUTE}/:id`}
                  element={<ProjectDetails />}
                />

                <Route
                  path={`${ADMIN_PROJECT_DETAILS_ROUTE}/:id${ROLES_REQUIRED_ROUTE}/:roleId`}
                  element={<RolesRequired />}
                />
              </Route>

              <Route path={ADMIN_SETTINGS_ROUTE} element={<SettingsPage />}>
                <Route index element={<Settings />} />
              </Route>

              <Route
                path={ADMIN_SETTINGS_COMPANY_PROFILE_ROUTE}
                element={<CompanyProfile />}
              />

              <Route
                path={ADMIN_SETTINGS_EMPLOYEE_ROLE_ROUTE}
                element={<EmployeeRole />}
              />

              <Route
                path={ADMIN_SETTINGS_BILLING_ROUTE}
                element={<BillingPlans />}
              />
            </Route>

            <Route
              path={STAFF_PAGE_ROUTE}
              element={
                <ProtectedStaff>
                  <StaffDashboard />
                </ProtectedStaff>
              }
            >
              <Route
                path={STAFF_COMPANIES_ADD_COMPANY_ROUTE}
                element={<AddCompany />}
              />

              <Route
                path={STAFF_COMPANIES_OVERVIEW_ROUTE}
                element={<CompaniesOverview />}
              />

              <Route
                path={`${STAFF_COMPANIES_OVERVIEW_ROUTE}/:id`}
                element={<StaffCompanyProfile />}
              />

              <Route
                path={STAFF_ANALYTICS_ROUTE}
                element={<StaffAnalytics />}
              />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recover" element={<Recover />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
