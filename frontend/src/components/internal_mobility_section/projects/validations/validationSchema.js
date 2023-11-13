import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  description: yup
    .string()
    .required("Description is required")
    .test({
      name: "characterLimit",
      test: (value) => {
        return value.length <= 700;
      },
      message: "Description must be within 700 characters",
    }),
});

export const roleValidationSchema = yup.object().shape({
  role: yup.string().required("Role is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  description: yup
    .string()
    .required("Description is required")
    .test({
      name: "characterLimit",
      test: (value) => {
        return value.length <= 700;
      },
      message: "Description must be within 700 characters",
    }),
});
