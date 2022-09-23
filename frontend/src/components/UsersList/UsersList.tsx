import React from "react";

import { useAxios } from "hooks/useAxios";
import { IUser } from "shared/models/IUser";
import { getAllUsers } from "service/usersApi";

import { Loader } from "components/Loader";
import { UserCard } from "components/UserCard";

import styles from "./UsersList.module.scss";

export const UsersList = () => {
  const { data: users, loading, error } = useAxios<IUser[]>(getAllUsers);

  if (loading) return <Loader />;

  if (error) return <h1>{error}</h1>;

  if (!users || !users.length) return <h1>List is empty!</h1>;

  return (
    <ul className={styles.usersList}>
      {users.map((user) => (
        <li key={user._id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};
