import { Routes as Router, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuth, AuthProvider } from "./contexts/auth-context";

import { Login } from "./pages/login/Login";
import { Signup } from "./pages/login/Signup";

const ProtectedRoute = () => {
    const { authed } = useAuth();
    if (!authed) {
        return <Navigate to="/login" replace />;
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
                    {/* <Route element={<ProtectedRoute />}>
          
                    </Route> */}
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Router>
            </AuthProvider>
        </BrowserRouter>
    );
}