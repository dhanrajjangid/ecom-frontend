import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return !!storedUser;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId'));

  // Save to localStorage on login
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

    // Set sessionId for guest users
    const setGuestSession = () => {
      const newSessionId = `session_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    };
  
    // Clear session on logout
    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionId');
      setIsAuthenticated(false);
      setUser(null);
      setSessionId(null);
    };

    useEffect(() => {
      if (!sessionId) {
        setGuestSession();
      }
    }, [sessionId]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, sessionId ,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
