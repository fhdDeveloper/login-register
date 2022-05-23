import { Button, Form } from "react-bootstrap";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { PostSubmissionTask } from "../../../api/_api";
import { toast } from "react-toastify";
import UserSubmission from "../../../_mocks_/UserSubmission";
import { useContext } from "react";
import { SubmissionDataContext } from "../../../context/SubmissionDataContext";

const TaskForm = ({ task_id, project_id, refetch }) => {
  const { SubmissionItems, setSubmissionItems } = useContext(SubmissionDataContext);

  const LoginSchema = Yup.object().shape({
    duration: Yup.string().required("فیلد ژمان اجباری است")
  });
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const initialValues = {
    duration: "",
    description: ""
  };
  const onSubmit = (values) => {
    let formData = new FormData();
    formData.append("duration", values.duration);
    formData.append("description", values.description);
    formData.append("project_id", project_id);
    formData.append("task_id", task_id);

    const token = localStorage.getItem("token");
    PostSubmissionTask(token, formData)
      .then(res => {
        if (res.data.status === "success") {
          toast.success("تسک با موفقیت ثبت شد!");
          refetch();
          UserSubmission().then(res => {
            setSubmissionItems(res[0].data);
          });
        } else {
          toast.error("خطا!");
        }
      })

      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema: LoginSchema
  });

  const { errors, touched, values, isSubmitting, getFieldProps, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <FormikProvider value={formik}>
      <div className="align-items-center">
        <Form noValidate onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>توضیحات</Form.Label>
            <div className="position-relative">
        <textarea
          className="form-control"
          rows="5"
          placeholder="متن توضیح"
          {...getFieldProps("description")}
          name="description"
          autoComplete="description"
          onChange={handleChange}
          onBlur={handleBlur}
        />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>زمان انجام تسک</Form.Label>
            <Form.Control
              type="number"
              placeholder="120"
              name="duration"
              {...getFieldProps("duration")}
              autoComplete="duration"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.duration && errors.duration ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.duration}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            ثبت
          </Button>
        </Form>
      </div>
    </FormikProvider>
  );
};

export default TaskForm;