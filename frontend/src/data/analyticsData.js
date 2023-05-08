import { faker } from "@faker-js/faker";

export const employeesData = {
  totalEmployees: 230,
  completedProfiles: 70,
};

export const averageGaplevel = {
  jobData: {
    labels: ["Operations", "Legal", "Retail", "Marketing", "HR"],
    datasets: [
      {
        label: "Dataset 1",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.float({ min: -1, max: 1, precision: 0.01 })
        ),
        borderColor: "rgb(170,220,254)",
        backgroundColor: "rgba(170,220,254,0.5)",
      },
    ],
  },
  skillData: {
    labels: ["JavaScript", "React", "Git", "SoftSkills", "Nodejs"],
    datasets: [
      {
        label: "Dataset 2",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.float({ min: -1, max: 1, precision: 0.01 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  },
};

export const skillGaps = {
  labels: ["JavaScript", "React", "Git", "SoftSkills", "Nodejs"],
  datasets: [
    {
      label: "Dataset 1",
      data: Array.from({ length: 6 }).map(() =>
        faker.datatype.number({ min: 0, max: 1500 })
      ),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: Array.from({ length: 6 }).map(() =>
        faker.datatype.number({ min: 0, max: 1500 })
      ),
      backgroundColor: "rgb(75, 192, 192)",
    },
  ],
};

export const skillGapsArea = {
  labels: ["JavaScript", "React", "Git", "SoftSkills", "Nodejs"],
  datasets: [
    {
      fill: true,
      label: "Dataset 1",
      data: Array.from({ length: 6 }).map(() =>
        faker.datatype.number({ min: 0, max: 1500 })
      ),
      backgroundColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      fill: true,
      label: "Dataset 2",
      data: Array.from({ length: 6 }).map(() =>
        faker.datatype.number({ min: 0, max: 1500 })
      ),
      backgroundColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const skillPresence = {
  JavaScript: {
    labels: ["Expert", "Advanced", "Intermediate", "Basic", "None"],
    datasets: [
      {
        label: "Employees possess",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: [
          "#FCD1C9",
          "#D1F7EA",
          "#AADCFE",
          "#B395F6",
          "#FFE9C3",
        ],
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
  },
  React: {
    labels: ["Expert", "Advanced", "Intermediate", "Basic", "None"],
    datasets: [
      {
        label: "Employees possess",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: [
          "#FCD1C9",
          "#D1F7EA",
          "#AADCFE",
          "#B395F6",
          "#FFE9C3",
        ],
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
  },
  Git: {
    labels: ["Expert", "Advanced", "Intermediate", "Basic", "None"],
    datasets: [
      {
        label: "Employees possess",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: [
          "#FCD1C9",
          "#D1F7EA",
          "#AADCFE",
          "#B395F6",
          "#FFE9C3",
        ],
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
  },
  SoftSkills: {
    labels: ["Expert", "Advanced", "Intermediate", "Basic", "None"],
    datasets: [
      {
        label: "Employees possess",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: [
          "#FCD1C9",
          "#D1F7EA",
          "#AADCFE",
          "#B395F6",
          "#FFE9C3",
        ],
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
  },
  Nodejs: {
    labels: ["Expert", "Advanced", "Intermediate", "Basic", "None"],
    datasets: [
      {
        label: "Employees possess",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: [
          "#FCD1C9",
          "#D1F7EA",
          "#AADCFE",
          "#B395F6",
          "#FFE9C3",
        ],
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
  },
};

export const topAndMissingSkills = {
  top: {
    labels: ["JavaScript", "React", "Git", "SoftSkills", "Nodejs"],
    datasets: [
      {
        label: "Dataset 1",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        borderColor: "rgb(170,220,254)",
        backgroundColor: "rgba(170,220,254,0.5)",
      },
    ],
  },
  missing: {
    labels: ["JavaScript", "React", "Git", "SoftSkills", "Nodejs"],
    datasets: [
      {
        label: "Dataset 2",
        data: Array.from({ length: 5 }).map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  },
};
