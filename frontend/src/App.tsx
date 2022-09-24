import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { UserLayout } from "layouts/UserLayout";
import { UsersList } from "components/UsersList";
import { AddUserForm } from "./components/UserForm/AddUserForm";
import { EditUserForm } from "components/UserForm/EditUserForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users" />} />

      <Route path="/users" element={<UserLayout />}>
        <Route index element={<UsersList />} />
        <Route path="add" element={<AddUserForm />} />
        <Route path="edit/:id" element={<EditUserForm />} />
      </Route>
    </Routes>
  );
}

export default App;
