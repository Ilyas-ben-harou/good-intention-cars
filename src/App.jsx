import React from "react";
import { RouterProvider } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ClientAuthProvider } from "./context/ClientAuthContext";
import router from "./router";

const App = () => {
  return (
    <AdminAuthProvider>
      <ClientAuthProvider>
        <RouterProvider router={router} />
      </ClientAuthProvider>
    </AdminAuthProvider>
  );
};

export default App;