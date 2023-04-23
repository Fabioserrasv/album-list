import { Routes as Router, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { Album } from "./pages/album/Album";
import { useAuth } from "./hooks/contexts/useAuth";

import { Login } from "./pages/auth/login/Login";
import { Signup } from "./pages/auth/signup/Signup";
import { Home } from "./pages/home/Home";
import { MyListAlbum } from "./pages/my-list-album/MyListAlbum";
import { ROUTE } from "./config/route";

const ProtectedRoute = () => {
  const { authed } = useAuth();
  if (!authed) {
    return (
      <Navigate
        to={ROUTE.APP.LOGIN}
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
          <Route path={ROUTE.APP.LOGIN} element={<Login />} />
          <Route path={ROUTE.APP.SIGN_UP} element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTE.APP.HOME} element={<Home />} />
            <Route path={ROUTE.APP.MY_LIST_ALBUMS} element={<MyListAlbum />} />
            <Route path={ROUTE.APP.ALBUM_DETAIL} element={<Album />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTE.APP.LOGIN} replace/>} />
        </Router>
      </AuthProvider>
    </BrowserRouter>
  );
}