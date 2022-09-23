import React from "react";

import styles from "./Loader.module.scss";

export const Dots = () => {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
