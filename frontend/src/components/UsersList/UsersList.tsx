import React from "react";

import { useAxios } from "hooks/useAxios";
import { getAllUsers } from "service/usersApi";

import { UserCard } from "components/UserCard";
import { Dots } from "components/Loaders/Dots/Dots";

import { IUser } from "shared/models/IUser";
import styles from "./UsersList.module.scss";

export const UsersList = () => {
  const {
    data: users,
    setData: setUsers,
    loading,
    error,
  } = useAxios<IUser[]>(getAllUsers);

  const removeFromList = (id: string) => {
    setUsers((prev) => prev?.filter((user) => user._id !== id));
  };

  if (loading) return <Dots />;
  if (error) return <h1 className={styles.fetchError}>{error}</h1>;
  if (!users || !users.length) return <h1>List is empty!</h1>;

  return (
    <ul className={styles.usersList}>
      {users.map((user) => (
        <li key={user._id}>
          <UserCard user={user} removeFromList={removeFromList} />
        </li>
      ))}
    </ul>
  );
};
