import { Navigate} from "react-router-dom";
import { ROUTE } from "../../config/route";
import { useAuth } from "../../hooks/contexts/useAuth";

type PrivateRoute = {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRoute) {
  const { authed } = useAuth();
  return authed ? children : <Navigate to={ROUTE.APP.LOGIN}  />
}
