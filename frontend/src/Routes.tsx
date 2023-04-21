import { Routes as Router, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { Album } from "./pages/album/Album";
import { useAuth } from "./hooks/contexts/useAuth";

import { Login } from "./pages/auth/login/Login";
import { Signup } from "./pages/auth/signup/Signup";
import { Home } from "./pages/home/Home";

const ProtectedRoute = () => {
  const { authed } = useAuth();
  if (!authed) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/album/:artist/:album" element={<Album />} />
          </Route>
          <Route path="*" element={<p>{"There's nothing here: 404!"}</p>} />
        </Router>
      </AuthProvider>
    </BrowserRouter>
  );
}