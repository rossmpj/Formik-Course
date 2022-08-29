import React from "react";
import DropList from "./DropList";
import { ErrorMessage, withFormik, Field, Form } from "formik";
import * as Yup from 'yup';
import Error from './Error';

const options = [
    { value: "item 1", label: "item1" },
    { value: "item 3", label: "item3" }
]
const formikWrapper = withFormik({
    mapPropsToValues: () => ({
        username: '',
        email: '',
        topics: []
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
            topics: values.topics.map(t => t.value)
        }
        setTimeout(() => {
            alert(JSON.stringify(payload, null, 2))
            setSubmitting(false)
        }, 2000)
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Campo obligatorio'),
        email: Yup.string().email("Ingrese mail valido").required('Campo obligatorio'),
        topics: Yup.array().min(2, 'seleccione 2 items')
            .of(Yup.object().shape({
                value: Yup.string().required('Campo obligatorio'),
                label: Yup.string().required('Campo obligatorio')
            }))
    })
});
const SignupForm = (props) => {
    const { values, setFieldValue, setFieldTouched,isSubmitting, dirty } = props;
    return (
        <Form className="p-5">
            <h1>Sign up form</h1>
            <div className="form-group">
                <label>User name:</label>
                <Field
                    name="username"
                    type="text"
                    placeholder="ingresa nombre"
                    className="form-control"
                />
                <ErrorMessage component={Error} name="username" />
            </div>

            <div className="form-group">
                <label>Email:</label>
                <Field
                    name="email"
                    type="email"
                    placeholder="ingresa email"
                    className="form-control"
                />
                <ErrorMessage component={Error} name="email" />
            </div>

            <div className="form-group">
                <label>Fav topics:</label>
                <DropList
                    options={options}
                    value={values.topics}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                />
                <ErrorMessage component={Error} name="topics" />
            </div>
            <span className="pr-1">
                <button className="btn btn-secondary" disabled={!dirty || isSubmitting}>Reset</button>
            </span>

            <span>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
            </span>
        </Form>
    )
}
const EnhancedForm = formikWrapper(SignupForm);
export default EnhancedForm;