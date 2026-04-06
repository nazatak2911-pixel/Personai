import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  hasCompletedSurvey?: boolean;
  surveyResults?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  completeSurvey: (results: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  completeSurvey: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('persona_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, name?: string) => {
    // For local dummy auth, we'll just sign them in with whatever name is in storage or the provided one
    // We check if a user with this email has existing survey progress (for demo we just assume false unless stored)
    const existing = localStorage.getItem('persona_user');
    let newUser: User = { name: name || 'Demo User', email, hasCompletedSurvey: false, surveyResults: null };
    if (existing) {
        const parsed = JSON.parse(existing);
        if (parsed.email === email) {
            newUser = parsed;
        }
    }
    setUser(newUser);
    localStorage.setItem('persona_user', JSON.stringify(newUser));
  };

  const signup = (name: string, email: string) => {
    const newUser: User = { name, email, hasCompletedSurvey: false, surveyResults: null };
    setUser(newUser);
    localStorage.setItem('persona_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('persona_user');
  };

  const completeSurvey = (results: string) => {
    if (user) {
        const updatedUser = { ...user, hasCompletedSurvey: true, surveyResults: results };
        setUser(updatedUser);
        localStorage.setItem('persona_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, completeSurvey }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
