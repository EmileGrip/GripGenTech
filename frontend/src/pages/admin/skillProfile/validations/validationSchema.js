import * as yup from "yup";

const validationsForm = yup.object().shape({
  skill: yup.string().required("Skill is required"),
});

export default validationsForm;
