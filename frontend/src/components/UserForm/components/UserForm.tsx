import React from "react";
import { Form } from "formik";

import { InputField } from "components/InputField";
import { DateInput } from "components/InputField/DateInput";
import { Spinner } from "components/Loaders/Spinner/Spinner";

import styles from "./UserForm.module.scss";

interface Props {
  error?: string;
  submitting: boolean;
}

export const UserForm = ({ error, submitting }: Props) => {
  return (
    <>
      <h1 className={styles.formLegend}>User Form</h1>

      <Form className={styles.userForm}>
        <InputField name="firstName" label="First Name" type="text" />
        <InputField name="lastName" label="Last Name" type="text" />
        <InputField name="residence" label="Residence" type="text" />

        <DateInput name="dateOfBirthday" label="Birth Date" type="date" />

        {error && <h2 className={styles.submitError}>{error}</h2>}

        <button type="submit" className={styles.submitBtn}>
          {submitting ? <Spinner /> : "Confirm"}
        </button>
      </Form>
    </>
  );
};
