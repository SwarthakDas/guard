/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/details`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      setIsAuthenticated(data.success);
    } catch (err) {
        console.error(err)
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = { isAuthenticated, loading, checkAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
