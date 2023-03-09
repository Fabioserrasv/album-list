import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/auth-context";
import { Login } from "./pages/login/Login";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Login />   
      </AuthProvider>
    </BrowserRouter>
  );
}