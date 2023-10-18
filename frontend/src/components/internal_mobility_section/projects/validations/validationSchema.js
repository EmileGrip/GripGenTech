import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  department: yup.string().required("Department is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  description: yup.string().required("Description is required"),
});

export const roleValidationSchema = yup.object().shape({
  role: yup.string().required("Role is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  description: yup.string().required("Description is required"),
});
