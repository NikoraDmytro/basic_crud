import React, { useEffect, useState } from "react";

import styles from "App.module.scss";

const url = "http://localhost:8080/users";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  residence: string;
  dateOfBirthday: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(url);
      const fetchedUsers = await res.json();

      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const parseDateString = (dateString: string) => {
    const date = new Date(dateString);

    return date.toDateString();
  };

  return (
    <div className={styles.mainBox}>
      <h1>Users List:</h1>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.residence}</p>
            <p>{parseDateString(user.dateOfBirthday)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
