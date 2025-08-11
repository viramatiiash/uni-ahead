import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  exp: number;
}

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const isAdmin = decoded.role === "admin";
    const isExpired = decoded.exp * 1000 < Date.now();

    if (!isAdmin || isExpired) return <Navigate to="/login" />;

    return children;
  } catch {
    return <Navigate to="/login" />;
  }
};
