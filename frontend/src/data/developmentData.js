const position = { x: 0, y: 0 };
const edgeType = "Bezier";

export const initialNodes = [
  {
    id: "1a",
    type: "custom",
    data: {
      label: "Customer Specialist",
      skills: [
        {
          skillName: "Analytical Thinking",
          description: "skills description",
          origin: "Linkedin",
          currentProf: 4,
          status: "complete",
        },
        {
          skillName: "Project Management",
          description: "Project management description",
          origin: "Resume",
          currentProf: 3,
          status: "-1",
        },
        {
          skillName: "Campaign Structuring",
          description: "skills description",
          origin: "Job Position",
          currentProf: 2,
          status: "complete",
        },
        {
          skillName: "Innovative Thinking",
          description: "skills description",
          origin: "Linkedin",
          currentProf: 1,
          status: "-2",
        },
      ],
    },
    position,
  },
  // {
  //   id: "2a",
  //   type: "custom",
  //   data: {
  //     label: "Business Analyst",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
  // {
  //   id: "2b",
  //   type: "custom",
  //   data: {
  //     label: "Operations Associate",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
  // {
  //   id: "3a",
  //   type: "custom",
  //   data: {
  //     label: "Product Marketer",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
  // {
  //   id: "3b",
  //   type: "custom",
  //   data: {
  //     label: "Solutions Engineer",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
  // {
  //   id: "4a",
  //   type: "custom",
  //   data: {
  //     label: "Marketing VP",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
  // {
  //   id: "4b",
  //   type: "custom",
  //   data: {
  //     label: "Operations VP",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
  // {
  //   id: "4c",
  //   type: "custom",
  //   data: {
  //     label: "Data Analysis Specialist",
  //     skills: [
  //       {
  //         skillName: "Analytical Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 4,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Project Management",
  //         description: "Project management description",
  //         origin: "Resume",
  //         currentProf: 3,
  //         status: "-1",
  //       },
  //       {
  //         skillName: "Campaign Structuring",
  //         description: "skills description",
  //         origin: "Job Position",
  //         currentProf: 2,
  //         status: "complete",
  //       },
  //       {
  //         skillName: "Innovative Thinking",
  //         description: "skills description",
  //         origin: "Linkedin",
  //         currentProf: 1,
  //         status: "-2",
  //       },
  //     ],
  //   },
  //   position,
  // },
];

export const initialEdges = [
  { id: "e1a2a", source: "1a", target: "2a", type: edgeType, animated: true },
  // { id: "e1a2b", source: "1a", target: "2b", type: edgeType, animated: true },
  // { id: "e2a3a", source: "2a", target: "3a", type: edgeType, animated: true },
  // { id: "e2b3a", source: "2b", target: "3a", type: edgeType, animated: true },
  // { id: "e2b3b", source: "2b", target: "3b", type: edgeType, animated: true },
  // { id: "e3a4a", source: "3a", target: "4a", type: edgeType, animated: true },
  // { id: "e3b4a", source: "3b", target: "4a", type: edgeType, animated: true },
  // { id: "e3b4b", source: "3b", target: "4b", type: edgeType, animated: true },
  // { id: "e3b4c", source: "3b", target: "4c", type: edgeType, animated: true },
];
