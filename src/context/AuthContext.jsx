import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("syncUser")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("syncToken") || null
  );

  const loginUser = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("syncUser", JSON.stringify(data.user));
    localStorage.setItem("syncToken", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
