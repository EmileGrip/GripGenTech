import * as yup from "yup";

export const validationsForm = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
};

export const resetPasswordValidationsForm = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  token: yup.string().required("Token is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .required("Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
};
