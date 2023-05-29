import * as yup from "yup";

export const AddEducationValidationForm = yup.object().shape({
  degree: yup.string().required("Degree is required"),
  institution: yup.string().required("Institution is required"),
  level: yup.string().required("Level is required"),
  started: yup.date().required("Started Date is required"),
  finished: yup.date().required("Finished Date is required"),
});

export const AddCourseValidationForm = yup.object().shape({
  degree: yup.string().required("Degree is required"),
  institution: yup.string().required("Institution is required"),
  started: yup.date().required("Started Date is required"),
  finished: yup.date().required("Finished Date is required"),
});
