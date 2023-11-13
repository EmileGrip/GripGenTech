import * as yup from "yup";

const validationSchema = yup.object().shape({
  role: yup.string().required("Role is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  description: yup.string().test({
    name: "characterLimit",
    test: (value) => {
      return !value || value.length <= 700;
    },
    message: "Description must be within 700 characters",
  }),
});

export const validationsForm = yup.object().shape({
  skill: yup.string().required("Skill is required"),
});

export default validationSchema;
