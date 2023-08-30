import * as yup from "yup";

const loginValidationSchema = {
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
};

export default loginValidationSchema;
