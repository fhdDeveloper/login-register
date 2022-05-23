import * as Yup from "yup";
import {useState, useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useFormik, FormikProvider} from "formik";
import {Form} from "react-bootstrap";
import {Login} from "../../../api/_api";
import FormData from "form-data";

import {toast} from "react-toastify";

import {Button} from "react-bootstrap";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";


export default function LoginForm() {

    const navigate = useNavigate();
    const {search} = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: "",
        remember: true
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("آدرس ایمیل را به درستی وارد کنید").required("ایمیل خود را وارد نمایید"),
        password: Yup.string().required("رمز ورود را وارد نمایید")
    });


    const onSubmit = (values) => {
        let formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        let json = JSON.stringify(formData);
        console.log(json)
        Login(json)
            .then(res => {
                console.log(res)
                if (res) {
                    const {message} = res;
                    toast.success(message)
                }
            })
            .catch((err) => {
                const {message} = err;
                toast.error(message);

            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: onSubmit
    });

    const {errors, touched, values, isSubmitting, getFieldProps, handleSubmit, handleChange, handleBlur} = formik;
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    return (
        <FormikProvider value={formik}>
            <div className="vh-100 d-flex align-items-center">
                <Form noValidate onSubmit={handleSubmit}
                      className={"loginForm mx-auto border border-1 p-5 rounded-3 col-12 col-lg-4"}>
                    <CgProfile className="mb-4 d-block mx-auto w-25"/>
                    <div className="text-center fw-bold mb-4"><span>Login</span></div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            {...getFieldProps("email")}
                            autoComplete="email"
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        {touched.email && errors.email ? (
                            <div className="msgError">{errors.email}</div>
                        ) : null}

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password </Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="pass"
                                {...getFieldProps("password")}
                                name="password"
                                autoComplete="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <span role="button" className="ShowHide">
              {
                  showPassword ?
                      <AiFillEye className="text-dark ms-2" onClick={handleShowPassword}/>
                      :
                      <AiFillEyeInvisible className="text-dark ms-2" onClick={handleShowPassword}/>
              }
              </span>
                        </div>
                        {touched.password && errors.password ? (
                            <div className="msgError">{errors.password}</div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="mb-3 user-select-none" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="من را به خاطر بسپار" {...getFieldProps("remember")}
                                    checked={values.remember}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        ورود
                    </Button>
                </Form>
            </div>
        </FormikProvider>
    );
}