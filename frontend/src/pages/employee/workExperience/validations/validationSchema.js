import * as yup from "yup";

const validationsForm = yup.object().shape({
  position: yup.string().required("Position is required"),
  company: yup.string().required("Company is required"),
  joinedDate: yup.date().required("Joined Date is required"),
  leftDate: yup.date().required("Left Date is required"),
});

export default validationsForm;
