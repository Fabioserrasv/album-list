import { Navigate} from "react-router-dom";
import { ROUTE } from "../../config/route";
import { useAuth } from "../../hooks/contexts/useAuth";

type PublicRoute = {
  children: JSX.Element;
}

export function PublicRoute({ children }: PublicRoute) {
  const { authed } = useAuth();
  return !authed ? children : <Navigate to={ROUTE.APP.HOME}  />
}
