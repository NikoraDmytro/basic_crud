import React from "react";
import { Formik, Form } from "formik";

import { InputField } from "components/InputField";
import { userValidation } from "./utils/userValidation";

type FormValues = {
  lastName: string;
  firstName: string;
  residence: string;
  dateOfBirthday: Date | undefined;
};

const initialValues: FormValues = {
  lastName: "",
  firstName: "",
  residence: "",
  dateOfBirthday: undefined,
};

export const UserForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidation}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        resetForm();
        setSubmitting(false);
      }}
    >
      <Form>
        <InputField name="firstName" label="First Name" type="text" />
        <InputField name="lastName" label="Last Name" type="text" />
        <InputField name="residence" label="Residence" type="text" />
        <InputField name="dateOfBirthday" label="Birth Date" type="date" />
      </Form>
    </Formik>
  );
};
