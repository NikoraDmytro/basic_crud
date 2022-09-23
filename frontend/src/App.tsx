import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { UserLayout } from "layouts/UserLayout";
import { UsersList } from "components/UsersList";
import { UserForm } from "components/UserForm/UserForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users" />} />

      <Route path="/users" element={<UserLayout />}>
        <Route index element={<UsersList />} />
        <Route path="add" element={<UserForm />} />
      </Route>
    </Routes>
  );
}

export default App;
