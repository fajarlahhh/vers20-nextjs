import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { RecaptchaComponent } from "../recaptcha";
import axios from "axios";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";
import React, { useCallback, useState } from 'react';

const initialValues = {
    username: "",
    email: "",
    contract: 1,
    password: "",
    acceptTerms: false,
};

const SignupFormSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    contract: Yup.string().required("Package is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

const SignupForm = () => {
    const [username, contract, email, password] = useState('');
    const [query, setQuery] = useState({
        "g-recaptcha-response": ""
      });
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async data => {
        try {
            const newToken = await executeRecaptcha();
            console.log({ data, newToken });
        } catch (err) {
            throw new Error("Token error");
        }
    };
    return (
        <div>
                        
        <GoogleReCaptcha
        onVerify={(token) => {
            setQuery({ ...query, "g-recaptcha-response": token });
            console.log(token)
        }}
        />
            <Formik
                initialValues={initialValues}
                validationSchema={SignupFormSchema}
                onSubmit={async(fields) => {
                    const newToken = await executeRecaptcha();
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label className="form-label">Username</label>
                                <Field
                                    name="username"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.username && touched.username
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className={
                                        "form-control" +
                                        (errors.email && touched.email
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <label className="form-label">Package</label>
                                <select name="contract" defaultValue={1} className={"form-control" + (errors.contract && touched.contract? " is-invalid": "")}>
                                    <option value="1" hidden>-- Select Package --</option>
                                </select>
                                <ErrorMessage name="contract" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-12 mb-2">
                                <label className="form-label">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="acceptTerms"
                                        className={
                                            "form-check-input " +
                                            (errors.acceptTerms &&
                                            touched.acceptTerms
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <label className="form-check-label">
                                    I certify that I am 18 years of age or older, and agree to the <a href="#" className="text-primary">User Agreement</a> and <a href="#" className="text-primary">Privacy Policy</a>.
                                    </label>
                                    <ErrorMessage
                                        name="acceptTerms"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
                            >
                                Sign Up
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
const App = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeqoyQfAAAAADiHkt2nNb1rpSFCdb2rZB3jRtKW"
    >
        <SignupForm />
    </GoogleReCaptchaProvider>
  );
};

export default App;
