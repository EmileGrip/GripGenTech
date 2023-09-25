import * as yup from "yup";

const validationSchema = yup.object().shape({
  department: yup.string().required("Department is required"),
  role: yup.string().required("Role is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  description: yup.string().required("Description is required"),
});

export default validationSchema;
