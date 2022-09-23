import React from "react";
import { Formik, Form } from "formik";

import { InputField } from "components/InputField";
import { Spinner } from "components/Loaders/Spinner/Spinner";

import { createUser } from "service/usersApi";
import { userValidation } from "./utils/userValidation";
import { useAxiosMutation } from "hooks/useAxiosMutation";

import styles from "./UserForm.module.scss";

type FormValues = {
  lastName: string;
  firstName: string;
  residence: string;
  dateOfBirthday: Date | "";
};

const initialValues: FormValues = {
  lastName: "",
  firstName: "",
  residence: "",
  dateOfBirthday: "",
};

export const UserForm = () => {
  const [addNewUser, { loading, error }] = useAxiosMutation(createUser);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidation}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const user = await addNewUser(values);

        if (user) {
          alert("User added!");

          resetForm();
        }

        setSubmitting(false);
      }}
    >
      <>
        <h1 className={styles.formLegend}>User Form</h1>

        <Form className={styles.userForm}>
          <InputField name="firstName" label="First Name" type="text" />
          <InputField name="lastName" label="Last Name" type="text" />
          <InputField name="residence" label="Residence" type="text" />
          <InputField name="dateOfBirthday" label="Birth Date" type="date" />

          {error && <h2 className={styles.submitError}>{error}</h2>}

          <button type="submit" className={styles.submitBtn}>
            {loading ? <Spinner /> : "Confirm"}
          </button>
        </Form>
      </>
    </Formik>
  );
};
