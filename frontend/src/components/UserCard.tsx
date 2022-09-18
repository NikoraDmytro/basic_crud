import React from "react";

import { IUser } from "shared/models/IUser";

import styles from "./UserCard.module.scss";

interface Props {
  user: IUser;
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.imageBox}>
        <span className={styles.imagePlaceholder}>Image placeholder</span>
      </div>

      <div className={styles.infoBox}>
        <h2 className={styles.infoHead}>
          {user.firstName} {user.lastName}
        </h2>

        <p className={styles.infoParagraph}>
          Birth date: <span>{user.dateOfBirthday.toLocaleDateString()}</span>
        </p>
        <p className={styles.infoParagraph}>
          Residence: <span>{user.residence}</span>
        </p>
      </div>
    </div>
  );
};
