// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Persist auth flag
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Persist user object
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // call this to log a user in
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    toast.success("Logged in!");
    return true;  // ensures your LoginPage sees a truthy response
  };

  // call this to update user profile (e.g. change name)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Profile updated!");
  };

  // call this to log a user out
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    // clear all related localStorage
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("checkoutTotal");

    toast.success("Logged out!");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
