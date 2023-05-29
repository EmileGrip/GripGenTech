import * as yup from "yup";

const validationsForm = yup.object().shape({
  job: yup.string().required("Job is required"),
});

export default validationsForm;
