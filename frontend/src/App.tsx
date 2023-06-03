import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/auth-context";
import { Routes } from "./Routes";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}