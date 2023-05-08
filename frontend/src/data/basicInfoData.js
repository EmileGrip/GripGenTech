import logo_company from "../assets/logo_company.svg";
export const industriesOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Accommodation-foodServices",
    label: "Accommodation and food services",
  },
  {
    value: "IT",
    label: "IT",
  },
  {
    value: "Engineering",
    label: "Engineering",
  },
  {
    value: "Agriculture",
    label: "Agriculture",
  },
  {
    value: "Arts-culture-entertainment-design",
    label: "Arts, culture, entertainment and design",
  },
  {
    value: "Construction",
    label: "Construction",
  },

  {
    value: "Education-training",
    label: "Education and training",
  },
  {
    value: "Fashion",
    label: "Fashion",
  },
  {
    value: "Financial-insurance",
    label: "Financial and insurance",
  },
  {
    value: "Fitness-sport",
    label: "Fitness and sport",
  },
  {
    value: "Healthcare-socialAssistance",
    label: "Healthcare and social assistance",
  },
  {
    value: "Marketing-advertising",
    label: "Marketing and advertising",
  },
  {
    value: "WholesaleTrade",
    label: "Wholesale trade",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const initialValues = {
  files: null,
  companyName: "",
  industry: "",
  companyWebsite: "",
  companyLinkedin: "",
  country: "",
  state: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  zipCode: "",
};

export const selectedValues = {
  files: logo_company,
  companyName: "GripHR",
  industry: "Financial-insurance",
  companyWebsite: "GripHR.com",
  companyLinkedin: "GripHR.com",
  country: "Netherlands-NL",
  state: "ZH",
  city: "Bloemendaal",
  addressLine1: "Block 25 street 2",
  addressLine2: "Block 25 street 2",
  zipCode: "02394",
};
