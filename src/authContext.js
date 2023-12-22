import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    return storedAuthData ? JSON.parse(storedAuthData) : false;
  });

  const login = (token) => {
    setAuthData({ isLoggedIn: true, token });
    localStorage.setItem('authData', JSON.stringify({ isLoggedIn: true, token }));
  };

 const logout = () => {
    setAuthData({ isLoggedIn: false, token: null });
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};