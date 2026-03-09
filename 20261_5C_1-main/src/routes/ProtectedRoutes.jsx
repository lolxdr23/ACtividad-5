import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../security/authContext";

function ProtectedRoutes() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;