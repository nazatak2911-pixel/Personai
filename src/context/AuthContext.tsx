import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  hasCompletedSurvey?: boolean;
  surveyResults?: string | null;
  affinityScores?: Record<string, number> | null;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  updateName: (newName: string) => void;
  logout: () => void;
  completeSurvey: (results: string, affinityScores: Record<string, number>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  signup: () => {},
  updateName: () => {},
  logout: () => {},
  completeSurvey: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('persona_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, name?: string) => {
    // For local dummy auth, we'll just sign them in with whatever name is in storage or the provided one
    // We check if a user with this email has existing survey progress (for demo we just assume false unless stored)
    const existing = localStorage.getItem('persona_user');
    let newUser: User = { name: name || 'Demo User', email, hasCompletedSurvey: false, surveyResults: null, affinityScores: null };
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
    const newUser: User = { name, email, hasCompletedSurvey: false, surveyResults: null, affinityScores: null };
    setUser(newUser);
    localStorage.setItem('persona_user', JSON.stringify(newUser));
  };

  const updateName = (newName: string) => {
    if (user) {
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        localStorage.setItem('persona_user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('persona_user');
  };

  const completeSurvey = (results: string, affinityScores: Record<string, number>) => {
    if (user) {
        const updatedUser = { ...user, hasCompletedSurvey: true, surveyResults: results, affinityScores };
        setUser(updatedUser);
        localStorage.setItem('persona_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, updateName, logout, completeSurvey }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
