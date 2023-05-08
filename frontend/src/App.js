import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import DevelopmentPage from "./pages/employee/development/DevelopmentPage";
import { CssBaseline } from "@mui/material";
import { Route, Router, Routes } from "react-router-dom";
import MySkills from "./pages/employee/mySkills/MySkills";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login/Login";
import Employee from "./pages/employee/Employee";
import {
  EMPLOYEE_LEARNING_EXPREIENCE_PATH,
  EMPLOYEE_DEVELOPMENT_ROUTE,
  EMPLOYEE_MY_SKILLS_ROUTE,
  EMPLOYEE_WORK_EXPREIENCE_PATH,
  EMPLOYEE_MY_SKILLS_INITIAL_ROUTE,
  EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE,
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
  ADMIN_FRAMEWORK,
  ADMIN_FRAMEWORK_ORGRANIGRAM_INITIAL_SETUP_ROUTE,
  ADMIN_FRAMEWORK_ORGRANIGRAM_ROUTE,
  ADMIN_FRAMEWORK_ORGRANIGRAM_COMPANY_INFO_ROUTE,
  ADMIN_FRAMEWORK_SKILL_PROFILE,
  EMPLOYEE_MY_SKILLS_PROFILE,
} from "./routes/paths";
import WorkExperience from "./pages/employee/workExperience/WorkExperience";
import LearningExperience from "./pages/employee/learningExperience/LearningExperience";
import InitialSetup from "./pages/employee/mySkills/InitialSetup";
import Overview from "./pages/employee/mySkills/Overview";
import ManagerDashBoard from "./pages/manager/ManagerDashBoard";
import Employees from "./components/employees_section/Employees";
import Organigram from "./pages/manager/organigram/Organigram";
import Analytics from "./components/analytics_section/Analytics";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Usage from "./components/analytics_section/Usage";
import SkillsAnalysis from "./components/analytics_section/SkillsAnalysis";
import AdminOrganigram from "./pages/admin/organigram/AdminOrganigram";
import OrgInitialSetup from "./pages/admin/organigram/OrgInitialSetup";
import Profile from "./components/profile-section/profile/Profile";
import SkillProfile from "./pages/admin/skillProfile/SkillProfile";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <main className="content">
          <Routes>
            <Route path={EMPLOYEE_PAGE_ROUTE} element={<Employee />}>
              <Route path={EMPLOYEE_MY_SKILLS_ROUTE} element={<MySkills />}>
                <Route index element={<InitialSetup />} />
                <Route
                  path={EMPLOYEE_MY_SKILLS_INITIAL_ROUTE}
                  element={<InitialSetup />}
                />
                <Route
                  path={EMPLOYEE_MY_SKILLS_OVERVIEW_ROUTE}
                  element={<Overview />}
                />
                <Route
                  path={EMPLOYEE_MY_SKILLS_PROFILE}
                  element={<Profile />}
                />
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
            </Route>

            <Route path={MANAGER_PAGE_ROUTE} element={<ManagerDashBoard />}>
              <Route path={MANAGER_EMPLOYEES_ROUTE} element={<Employees />} />
              <Route path={MANAGER_ORGANIGRAM_ROUTE} element={<Organigram />} />
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

            <Route index element={<AdminDashboard />} />

            <Route path={ADMIN_PAGE_ROUTE} element={<AdminDashboard />}>
              <Route path={AMDIN_EMPLOYEE_ROUTE} element={<Employees />} />
              <Route
                path={ADMIN_FRAMEWORK_ORGRANIGRAM_ROUTE}
                element={<AdminOrganigram />}
              >
                <Route index element={<OrgInitialSetup />} />
                <Route
                  path={ADMIN_FRAMEWORK_ORGRANIGRAM_INITIAL_SETUP_ROUTE}
                  element={<OrgInitialSetup />}
                />
                <Route
                  path={ADMIN_FRAMEWORK_ORGRANIGRAM_COMPANY_INFO_ROUTE}
                  element={<DevelopmentPage />}
                />
              </Route>

              <Route
                path={ADMIN_FRAMEWORK_SKILL_PROFILE}
                element={<SkillProfile />}
              />
              <Route path={ADMIN_ANALYTICS_ROUTE} element={<Analytics />}>
                <Route index element={<SkillsAnalysis />} />
                <Route
                  path={ADMIN_ANALYTICS_SKILLS_ANALYSIS_ROUTE}
                  element={<SkillsAnalysis />}
                />
                <Route path={ADMIN_ANALYTICS_USAGE_ROUTE} element={<Usage />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
