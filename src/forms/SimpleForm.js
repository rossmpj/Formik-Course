import React from "react";
import { Formik, ErrorMessage } from "formik";

const SimpleForm = () => {
    return (
        <Formik
            initialValues={{ name: '' }}
            validate={values => {
                let errors = {};
                if (!values.name || values.name === '') {
                    errors.name = "ingrese nombre"
                }
                return errors;
            }}
            render={({ handleSubmit, handleChange, values, errors, handleBlur, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        value={values.name}
                        type="text"
                        name="name"
                        placeholder="Ingrese nombre"
                        onBlur={handleBlur}
                    />
                    <button disabled={isSubmitting} type="submit">Submit</button>

                    
                    <ErrorMessage name="name"/>
                </form>
            )}
            onSubmit={(values, { setSubmitting }) => {
                console.log("val", values)
                setTimeout(() => {
                    alert(values.name)
                    setSubmitting(false)
                }, 500)
            }
            }
        />
    )
}

export default SimpleForm;