import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import SuggestedJobs from "./SuggestedJobs";
import { useState } from "react";
import { addRoleFormValidationSchema } from "./validations/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import axiosInstance from "../../../helper/axiosInstance";
import { fetchData } from "../../../redux/slices/admin/organigram/organigramActions";

const formControlWrapperStyle = {
  minHeight: "135px",
};

const EditRoleForm = ({ data, editRoleData, closeModal }) => {
  const [value, setValue] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    roleName: editRoleData.title ? editRoleData.title : "",
    department: editRoleData.department ? editRoleData.department : "",
  };

  const suggestedHandler = (value) => {
    setValue(value);
    selectValue({}, value);
  };

  const editData = useCallback(async (token, values) => {
    console.log(values);
    const isRoleNameEmpty = values.roleName.trim().length === 0 ? true : false;
    const isDepartmentEmpty =
      values.roleName.trim().length === 0 ? true : false;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: {
        id: editRoleData.id,
      },
    };
    try {
      const response = await axiosInstance.put(
        "role",
        {
          title: isRoleNameEmpty ? "0" : values.roleName,
          department: isDepartmentEmpty ? "0" : values.department,
        },
        config
      );
      console.log(response.data.payload);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      // setLoading(false);
      dispatch(fetchData(token));
      closeModal();
    }
  }, []);

  const formik = useFormik({
    initialValues,
    // validationSchema: addRoleFormValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit to the server
        // alert(JSON.stringify(values, null, 2));
        editData(token, formik.values);
        setSubmitting(false);
      }, 1000);
    },
  });

  const selectValue = (e, value) => {
    formik.setFieldValue("roleName", value !== null ? value : null);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack sx={{ px: { xs: 2.5, lg: 0 } }}>
        <Box mb={{ xs: 2.5, sm: 7 }}>
          <Box sx={formControlWrapperStyle}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="roleName"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              role name
            </Typography>
            <TextField
              id="roleName"
              name="roleName"
              type="text"
              value={formik.values.roleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.roleName ? formik.errors.roleName : ""}
              error={formik.touched.roleName && Boolean(formik.errors.roleName)}
              fullWidth
              sx={{ mt: "16px" }}
            />
          </Box>

          <Box sx={formControlWrapperStyle}>
            <Typography
              variant="h3"
              component="label"
              htmlFor="department"
              sx={{
                textTransform: "capitalize",
                fontWeight: 400,
                color: "secondary.main",
              }}
            >
              department
            </Typography>
            <TextField
              id="department"
              name="department"
              type="text"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.department ? formik.errors.department : ""
              }
              error={
                formik.touched.department && Boolean(formik.errors.department)
              }
              fullWidth
              sx={{ mt: "16px" }}
            />
          </Box>
        </Box>

        <Box>
          <Typography
            variant="h3"
            component="label"
            htmlFor="roleName"
            sx={{
              textTransform: "capitalize",
              fontWeight: 400,
              color: "secondary.main",
            }}
          >
            suggested job
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{ flexGrow: 1, mt: "16px" }}
            mb={"50px"}
          >
            {data.map((job) => (
              <Grid2 key={job} xs={4}>
                <SuggestedJobs onClick={suggestedHandler} selectedJob={value}>
                  {job}
                </SuggestedJobs>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "16px" }}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            color="secondary"
            sx={{
              alignSelf: "flex-start",
              textTransform: "capitalize",
              fontSize: "14px",
              px: "50px",
            }}
          >
            edit
          </Button>
          {formik.isSubmitting && <CircularProgress />}
        </Stack>
      </Stack>
    </form>
  );
};

export default EditRoleForm;
