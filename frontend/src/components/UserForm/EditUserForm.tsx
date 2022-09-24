import React, { useCallback } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import { UserForm } from "./components/UserForm";
import { Dots } from "components/Loaders/Dots/Dots";

import { editUser, getUserById } from "service/usersApi";
import { userValidation } from "./utils/userValidation";

import { useAxios } from "hooks/useAxios";
import { useAxiosMutation } from "hooks/useAxiosMutation";

import { IUser } from "shared/models/IUser";
import { FormValues } from "./types/FormValues";

import styles from "./styles.module.scss";

export const EditUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getById = useCallback(() => getUserById(id || ""), [id]);
  const {
    data: user,
    loading: fetchingUser,
    error: fetchingError,
  } = useAxios<IUser>(getById);

  const [changeUserData, { loading, error }] = useAxiosMutation(editUser);

  return (
    <>
      {fetchingUser && <Dots />}
      {fetchingError && <h1 className={styles.fetchError}>{error}</h1>}
      {user && (
        <Formik
          initialValues={user as FormValues}
          validationSchema={userValidation}
          onSubmit={async (values, { setSubmitting }) => {
            const confirm = window.confirm("Confirm changes?");

            if (confirm) {
              const edited = await changeUserData({ _id: user._id, ...values });

              if (edited) {
                alert("User data changed successfully!");

                navigate(-1);
              }
            }

            setSubmitting(false);
          }}
        >
          <UserForm submitting={loading} error={error} />
        </Formik>
      )}
    </>
  );
};
