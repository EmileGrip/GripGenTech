import * as yup from "yup";

const validationsForm = yup.object().shape({
  name: yup.string().required("Company name is required"),
  industry: yup.string().required("Industry is required"),
  firstName: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  lastName: yup.string().required("Last name is required"),
});

export default validationsForm;
