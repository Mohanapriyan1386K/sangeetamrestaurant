import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }:any) {
  const isLogin = localStorage.getItem("isLogin");

  return isLogin === "true" ? children : <Navigate to="/login" replace />;
}