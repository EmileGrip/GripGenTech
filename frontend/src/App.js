import { responsiveTheme, theme } from "./theme";
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
  ADMIN_ORGANIZATION_COMPANY_PROFILE_INITIAL_SETUP_ROUTE,
  ADMIN_ORGANIZATION_COMPANY_PROFILE_ROUTE,
  ADMIN_ORGANIZATION_COMPANY_PROFILE_COMPANY_INFO_ROUTE,
  ADMIN_SKILL_PROFILE,
  ADMIN_ORGANIZATION_ORGRANIGRAM_ROUTE,
  EMPLOYEE_MY_SKILLS_PROFILE,
  EMPLOYEE_ORGANIGRAM_ROUTE,
  ADMIN_EMPLOYEES_LIST_ROUTE,
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
import OrgInitialSetup from "./pages/admin/companyProfile/OrgInitialSetup";
import Profile from "./components/profile-section/profile/Profile";
import SkillProfile from "./pages/admin/skillProfile/SkillProfile";
import ChartTree from "./pages/admin/organigram/ChartTree";
import Summary from "./pages/admin/organigram/summary/Summary";
import { useState } from "react";
import ProtectedManager from "./components/ProtectedManager";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ProtectedEmplpoyee from "./components/ProtectedEmployee";
import Signup from "./pages/signup/signup";
import Recover from "./pages/recover/recover";

function App() {
  const [role, setRole] = useState(null);

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
                <ProtectedEmplpoyee>
                  <Employee />
                </ProtectedEmplpoyee>
              }
            >
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

              <Route
                path={EMPLOYEE_ORGANIGRAM_ROUTE}
                element={<Organigram />}
              />
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

            <Route
              path={ADMIN_PAGE_ROUTE}
              element={
                <ProtectedAdmin>
                  <AdminDashboard />
                </ProtectedAdmin>
              }
            >
              <Route path={AMDIN_EMPLOYEE_ROUTE} element={<Employees />} />

              <Route
                path={ADMIN_ORGANIZATION_COMPANY_PROFILE_ROUTE}
                element={<OrgInitialSetup />}
              />

              <Route
                path={ADMIN_ORGANIZATION_ORGRANIGRAM_ROUTE}
                element={<ChartTree />}
              />

              <Route path={ADMIN_EMPLOYEES_LIST_ROUTE} element={<Summary />} />

              <Route path={ADMIN_SKILL_PROFILE} element={<SkillProfile />} />

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
