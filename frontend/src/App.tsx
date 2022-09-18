import React from "react";

import { useAxios } from "./hooks/useAxios";
import { IUser } from "shared/models/IUser";
import { getAllUsers } from "./service/usersApi";

import { Loader } from "components/Loader";
import { UserCard } from "components/UserCard";

import styles from "App.module.scss";

function App() {
  const { data: users, loading, error } = useAxios<IUser[]>(getAllUsers);

  const renderUsersList = () => {
    if (!users) return;
    if (!users.length) return <h1>List is empty!</h1>;

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

  return (
    <>
      {
        <div className={styles.mainBox}>
          <h1>Users List</h1>

          {loading && <Loader />}
          {error && <h1>{error}</h1>}
          {renderUsersList()}
        </div>
      }
    </>
  );
}

export default App;
