import * as yup from "yup";

const validationsForm = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
};

export default validationsForm;
