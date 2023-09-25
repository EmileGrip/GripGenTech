import * as yup from "yup";

export const addRoleFormValidationSchema = yup.object().shape({
  roleName: yup.string().required("Role name is required"),
  department: yup.string().required("Department is required"),
});

export const existingEmployeeFormValidationSchema = yup.object().shape({
  employee: yup.string().required("Employee name is required"),
});

export const creatingNewEmployeeFormValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  lastName: yup.string().required("Last name is required"),
  // phone: yup.string().required("Phone is required"),
  // joinDate: yup
  //   .date()
  //   .required("Join date is required")
  //   .typeError("Join date is required"),
  // location: yup.string().required("Location is required"),
  role: yup.array().min(1, "Please select at least one role"),
});

export const bulkUploadValidationSchema = yup.object().shape({
  files: yup.mixed().required("You need to provide a file"),
});
