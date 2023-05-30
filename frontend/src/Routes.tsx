  import { Routes as Router, Route, BrowserRouter, Navigate } from "react-router-dom";
  import { AuthProvider } from "./contexts/auth-context";
  import { Album } from "./pages/album/Album";

  import { Login } from "./pages/auth/login/Login";
  import { Signup } from "./pages/auth/signup/Signup";
  import { Home } from "./pages/home/Home";
  import { MyListAlbum } from "./pages/my-list-album/MyListAlbum";
  import { ROUTE } from "./config/route";
  import { Profile } from "./pages/profile/Profile";
  import { PublicRoute } from "./components/route/PublicRoute";
  import { PrivateRoute } from "./components/route/PrivateRoute";

  export function Routes() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Router>
            <Route path={ROUTE.APP.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
            <Route path={ROUTE.APP.SIGN_UP} element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path={ROUTE.APP.HOME} element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path={ROUTE.APP.MY_LIST_ALBUMS} element={<PrivateRoute><MyListAlbum /></PrivateRoute>} />
            <Route path={ROUTE.APP.ALBUM_DETAIL} element={<PrivateRoute><Album /></PrivateRoute>} />
            <Route path={ROUTE.APP.PROFILE} element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<Navigate to={ROUTE.APP.LOGIN} replace/>} />
          </Router>
        </AuthProvider>
      </BrowserRouter>
    );
  }