import * as yup from "yup";

const validationsForm = {
  skill: yup.string().max(255).required("Skill is required"),
};

export default validationsForm;
