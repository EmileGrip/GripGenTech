export const adminSteps = [
  {
    placement: "center",
    target: "body",
  },
  {
    content: "Click on organization",
    placement: "right",
    target: "#admin__step__1",
    title: "Organization",
    spotlightClicks: true,
  },
  {
    content: "Start by filling in the company details",
    placement: "right",
    target: "#admin__step__2",
    title: "Company details",
  },
  {
    content: "Click on organigram",
    placement: "right",
    target: "#admin__step__3",
    title: "Organigram",
    spotlightClicks: true,
  },
  {
    content: "Add departments, roles and people",
    placement: "bottom",
    target: "#admin__step__4",
    title: "Company structure",
  },
  {
    content:
      "Add a new employee to Adepti and link them to a role. A previously added employee can also be linked to a role.",
    placement: "top",
    target: "#admin__step__5",
    title: "Add employees",
  },
  {
    content: "Click on skill profile",
    placement: "right",
    target: "#main__2", //#admin__step__6
    title: "Skill profile",
    spotlightClicks: true,
  },
  {
    content: "Choose a role added in the organization chart",
    placement: "right",
    target: "#admin__step__7",
    title: "Setup skill profiles",
  },
  {
    content:
      "Add suggested skills to the profile and search skills in the database. Determine the skill level once a skill has been added",
    placement: "left",
    target: "#admin__step__8",
    title: "Create skill profiles",
  },
  {
    content: "Click on internal mobility",
    placement: "right",
    target: "#admin__step__9",
    title: "Internal mobility",
    spotlightClicks: true,
  },
  {
    content:
      "Approve or reject jobs and projects posted by managers. Matches between jobs, projects and employees are made based on skills and ambitions",
    placement: "right",
    target: "#admin__step__10",
    title: "Internal jobs and projects",
  },
  {
    content: "Switch to manager or employee role",
    placement: "left",
    target: "#admin__step__11",
    title: "Change roles",
  },
];

export const managerSteps = [
  {
    placement: "center",
    target: "body",
  },
  {
    content:
      "Go to the profile of an employee in your team to view and validate their skills",
    placement: "right",
    target: "#manager__step__1",
    title: "Team members",
  },
  {
    content: "Click on internal mobility",
    placement: "right",
    target: "#manager__step__2",
    title: "Internal mobility",
    spotlightClicks: true,
  },
  {
    content:
      "Post a vacancy and determine which skills belong to this role. Matches are made internally based on skills and ambitions",
    placement: "left",
    target: "#manager__step__3",
    title: "Post a job",
  },
  {
    content:
      "A job and project must be approved by an admin. Once this is done, the assignment will appear here. Click on the assignment to see who the best matches are internally",
    placement: "right",
    target: "#manager__step__4",
    title: "Internal matches",
    spotlightClicks: true,
  },
  {
    content: "Switch to manager or employee role",
    placement: "left",
    target: "#manager__step__5",
    title: "Change roles",
  },
];

export const employeeSteps = [
  {
    placement: "center",
    target: "body",
  },
  {
    content:
      "Start by uploading your resume. Here we collect, if possible, your work and learning experience plus the skills you have developed.",
    placement: "right",
    target: "#employee__step__1",
    title: "Upload resume",
  },
  {
    content: "Click on skills",
    placement: "right",
    target: "#employee__step__2",
    title: "Skills",
    spotlightClicks: true,
  },
  {
    content:
      "Develop your personal skills profile. Choose skills from the skill recommendations that you want to add to your profile. These are the skills that match your current job",
    placement: "right",
    target: "#employee__step__3",
    title: "Setup skill profile",
  },
  {
    content:
      "You have many more skills than the skills we recommend. Search our database for skills you possess and add them to your profile. Once you have added a skill, determine the skill level",
    placement: "bottom",
    target: "#employee__step__4",
    title: "Search skills",
  },
  {
    content:
      "Discover what is needed for the next internal step. You can add a total of 9 new jobs that are available within [organization name] and gain insight into which skills you need to develop",
    placement: "right",
    target: "#employee__step__5",
    title: "Develop career path",
  },
  {
    content: "Click on internal mobility",
    placement: "right",
    target: "#employee__step__6",
    title: "Internal mobility",
    spotlightClicks: true,
  },
  {
    content:
      "Discover which vacancies there are internally and what best suits your skills and ambitions",
    placement: "right",
    target: "#employee__step__7",
    title: "Internal vacancies",
  },
  {
    content:
      "Discover which projects there are internally and which roles in these projects suit your skills and ambitions",
    placement: "right",
    target: "#employee__step__8",
    title: "Internal projects",
  },
];
