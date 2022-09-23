import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import classNames from "classnames";

import styles from "./InputField.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const InputField = ({ name, label, ...props }: Props) => {
  const [field, meta] = useField(name);

  const className = classNames(styles.inputField, {
    [styles.invalid]: meta.touched && meta.error,
    [styles.valid]: meta.value && !meta.error,
  });

  return (
    <div className={className}>
      <label className={styles.floatingLabel} htmlFor={props.id || name}>
        {label}
      </label>

      <span className={styles.tooltipBox}>
        <input id={props.id || name} {...field} {...props} />

        {meta.touched && meta.error ? (
          <div className={styles.errorTooltip}>{meta.error}</div>
        ) : null}
      </span>
    </div>
  );
};
