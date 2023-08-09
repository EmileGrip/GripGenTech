import * as yup from "yup";

const validationsForm = yup.object().shape({
  position: yup.string().required("Position is required"),
  company: yup.string().required("Company is required"),
  joinedDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date is required"),
  current: yup.boolean(),
  leftDate: yup.date().when("current", {
    is: false,
    then: () => {
      return yup
        .date()
        .required("End date is required")
        .typeError("End date is required")
        .min(yup.ref("joinedDate"), "Must be after start date");
    },
    otherwise: () => {
      return yup.date().notRequired();
    },
  }),
});

export default validationsForm;
