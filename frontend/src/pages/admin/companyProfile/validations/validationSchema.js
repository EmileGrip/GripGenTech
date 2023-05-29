import * as yup from "yup";

const validationsForm = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  industry: yup.string().required("Industry is required"),
});

export default validationsForm;
