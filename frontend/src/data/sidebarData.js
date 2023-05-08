import {
  SKILLS_PATH,
  EMPLOYEE_MY_SKILLS_ROUTE,
  EMPLOYEE_DEVELOPMENT_ROUTE,
  NOT_FOUND_PATH,
  ORGANIGRAM_PATH,
  WORK_EXPREIENCE_PATH,
  EMPLOYEE_WORK_EXPREIENCE_PATH,
  EMPLOYEE_LEARNING_EXPREIENCE_PATH,
  MANAGER_EMPLOYEES_ROUTE,
  MANAGER_ORGANIGRAM_ROUTE,
  MANAGER_ANALYTICS_ROUTE,
  MANAGER_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
  MANAGER_ANALYTICS_USAGE_ROUTE,
  AMDIN_EMPLOYEE_ROUTE,
  ADMIN_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
  ADMIN_ANALYTICS_USAGE_ROUTE,
  ADMIN_FRAMEWORK_ORGRANIGRAM_ROUTE,
  ADMIN_FRAMEWORK_SKILL_PROFILE,
} from "../routes/paths";

import skills_active from "../assets/skills_active.svg";
import skills_inactive from "../assets/skills_inactive.svg";
import briefcase_active from "../assets/briefcase_active.svg";
import briefcase_inactive from "../assets/briefcase_inactive.svg";
import usertag_active from "../assets/usertag_active.svg";
import usertag_inactive from "../assets/usertag_inactive.svg";
import analytics_active from "../assets/analytics_icon_on.svg";
import analytics_inactive from "../assets/analytics_icon_off.svg";

export const sidebarEmployeeData = [
  {
    categoryName: "Skills",
    catergoryPath: EMPLOYEE_MY_SKILLS_ROUTE,
    iconsPath: {
      active: skills_active,
      inactive: skills_inactive,
    },
    subCategory: [
      { name: "My Skills", path: EMPLOYEE_MY_SKILLS_ROUTE },
      { name: "Development", path: EMPLOYEE_DEVELOPMENT_ROUTE },
    ],
  },
  {
    categoryName: "Experience",
    catergoryPath: EMPLOYEE_WORK_EXPREIENCE_PATH,
    iconsPath: {
      active: briefcase_active,
      inactive: briefcase_inactive,
    },
    subCategory: [
      { name: "Work Experience", path: EMPLOYEE_WORK_EXPREIENCE_PATH },
      { name: "Learning Experience", path: EMPLOYEE_LEARNING_EXPREIENCE_PATH },
    ],
  },
  {
    categoryName: "Organigram",
    catergoryPath: ORGANIGRAM_PATH,
    iconsPath: {
      active: usertag_active,
      inactive: usertag_inactive,
    },
    subCategory: [],
  },
];

export const sidebarManagerData = [
  {
    categoryName: "Employees",
    catergoryPath: MANAGER_EMPLOYEES_ROUTE,
    iconsPath: {
      active: briefcase_active,
      inactive: briefcase_inactive,
    },
    subCategory: [],
  },
  {
    categoryName: "Organigram",
    catergoryPath: MANAGER_ORGANIGRAM_ROUTE,
    iconsPath: {
      active: usertag_active,
      inactive: usertag_inactive,
    },
    subCategory: [],
  },
  {
    categoryName: "Analytics",
    catergoryPath: MANAGER_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
    iconsPath: {
      active: analytics_active,
      inactive: analytics_inactive,
    },
    subCategory: [
      {
        name: "Skills Analysis",
        path: MANAGER_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
      },
      { name: "Usage", path: MANAGER_ANALYTICS_USAGE_ROUTE },
    ],
  },
];

export const sidebarAdminData = [
  {
    categoryName: "Employees",
    catergoryPath: AMDIN_EMPLOYEE_ROUTE,
    iconsPath: {
      active: briefcase_active,
      inactive: briefcase_inactive,
    },
    subCategory: [],
  },
  {
    categoryName: "Framework",
    catergoryPath: ADMIN_FRAMEWORK_ORGRANIGRAM_ROUTE,
    iconsPath: {
      active: usertag_active,
      inactive: usertag_inactive,
    },
    subCategory: [
      {
        name: "Organigram",
        path: ADMIN_FRAMEWORK_ORGRANIGRAM_ROUTE,
      },
      { name: "Skill Profile", path: ADMIN_FRAMEWORK_SKILL_PROFILE },
    ],
  },
  {
    categoryName: "Analytics",
    catergoryPath: ADMIN_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
    iconsPath: {
      active: analytics_active,
      inactive: analytics_inactive,
    },
    subCategory: [
      {
        name: "Skills Analysis",
        path: ADMIN_ANALYTICS_SKILLS_ANALYSIS_ROUTE,
      },
      { name: "Usage", path: ADMIN_ANALYTICS_USAGE_ROUTE },
    ],
  },
];
