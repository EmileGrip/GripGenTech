import * as yup from "yup";

export const validationsForm = yup.object().shape({
  skill: yup.string().required("Skill is required"),
});

export const resumeValidationSchema = yup.object().shape({
  resume: yup.mixed().required("You need to provide a file"),
});
