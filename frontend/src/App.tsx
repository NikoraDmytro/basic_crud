import React from "react";

import { useAxios } from "./hooks/useAxios";
import { IUser } from "shared/models/IUser";
import { getAllUsers } from "./service/usersApi";

import styles from "App.module.scss";

const User = ({ user }: { user: IUser }) => {
  return (
    <div>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.residence}</p>
      <p>{user.dateOfBirthday.toDateString()}</p>
    </div>
  );
};

function App() {
  const { data: users, loading, error } = useAxios<IUser[]>(getAllUsers);

  const renderUsersList = () => {
    if (!users) {
      return;
    }
    if (!users.length) {
      return <h1>List is empty!</h1>;
    }
    return users.map((user) => (
      <li key={user._id}>
        <User user={user} />
      </li>
    ));
  };

  return (
    <>
      {
        <div className={styles.mainBox}>
          <h1>Users List:</h1>

          <ul>
            {loading && <h1>Loading</h1>}
            {error && <h1>{error}</h1>}
            {renderUsersList()}
          </ul>
        </div>
      }
    </>
  );
}

export default App;
