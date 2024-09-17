import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { route } from ".";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {

    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) return <Navigate to={route.login} replace />;

    if (!user?.isVerified) return <Navigate to={route.emailVerification} replace />;

    return children;
};

export default ProtectedRoute;