import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { withFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { EMPLOYEE_MY_SKILLS_ROUTE } from "../../../routes/paths";
import validationsForm from "../validations/validationSchema";

const SignupForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ maxWidth: "307px" }}>
        <TextField
          id="email"
          name='email'
          label="Email"
          size="medium"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email ? errors.email : ""}
          error={touched.email && Boolean(errors.email)}
          margin="normal"
          variant="outlined"
          fullWidth
        />

        <TextField
          id="password"
          name='password'
          label="Password"
          size="medium"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password ? errors.password : ""}
          error={touched.password && Boolean(errors.password)}
          margin="normal"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          disabled={isSubmitting}
          sx={{
            mb: 2,
            py: "12px",

            fontWeight: "400 !important",
            fontSize: "20px !important",
            textTransform: "capitalize !important",
            borderRadius: "10px",
          }}
        >
          Log In
        </Button>
        <Typography variant="body1" sx={{ color: "#8E9CA5", mb: 1 }}>
          Don't Have an Account?{" "}
          <Link
            to="*"
            style={{ color: "#66C1FF", textDecoration: "1px underline" }}
          >
            Sign up
          </Link>
        </Typography>
        <Typography variant="body1" sx={{ color: "#8E9CA5" }}>
          Forgot your Password?{" "}
          <Link
            to="*"
            style={{ color: "#66C1FF", textDecoration: "1px underline" }}
          >
            Recover it
          </Link>
        </Typography>
      </Stack>
    </form>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ email, password }) => {
    return {
      email: email || "",
      password: password || "",
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));

      setSubmitting(false);
    }, 1000);
  },
})(SignupForm);

export default Form;
