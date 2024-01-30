import * as yup from "yup";

const validationsForm = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .required("Enter your password"),
};

export default validationsForm;
