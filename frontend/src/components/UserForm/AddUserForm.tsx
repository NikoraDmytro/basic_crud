import React from "react";
import { Formik } from "formik";

import { UserForm } from "./components/UserForm";

import { FormValues } from "./types/FormValues";

import { createUser } from "service/usersApi";
import { userValidation } from "./utils/userValidation";
import { useAxiosMutation } from "hooks/useAxiosMutation";

const initialValues: FormValues = {
  lastName: "",
  firstName: "",
  residence: "",
  dateOfBirthday: new Date(),
};

export const AddUserForm = () => {
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
      <UserForm submitting={loading} error={error} />
    </Formik>
  );
};
