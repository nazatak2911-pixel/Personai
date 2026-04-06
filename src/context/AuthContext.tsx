import React, { createContext, useContext, useState } from 'react';

export interface CVData {
  photoBase64: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; role: string; duration: string; description: string }[];
  skills: string;
  languages: string;
  aiEnhancement: string;
}

interface User {
  name: string;
  email: string;
  password: string;
  hasCompletedSurvey?: boolean;
  surveyResults?: string | null;
  affinityScores?: Record<string, number> | null;
  cvData?: CVData | null;
  isBanned?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  loginError: string | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  updateName: (newName: string) => void;
  logout: () => void;
  enterAsGuest: () => void;
  completeSurvey: (results: string, affinityScores: Record<string, number>) => void;
  saveCV: (cvData: CVData) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isGuest: false,
  loginError: null,
  login: () => false,
  signup: () => ({ success: false }),
  updateName: () => {},
  logout: () => {},
  enterAsGuest: () => {},
  completeSurvey: () => {},
  saveCV: () => {},
});

const loadAccounts = (): User[] => {
  const stored = localStorage.getItem('persona_accounts');
  return stored ? JSON.parse(stored) : [];
};

const saveAccounts = (accounts: User[]) => {
  localStorage.setItem('persona_accounts', JSON.stringify(accounts));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedSession = localStorage.getItem('persona_current_user');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return sessionStorage.getItem('persona_guest') === 'true';
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const login = (email: string, password: string): boolean => {
    const accounts = loadAccounts();
    const found = accounts.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
    if (!found) {
      setLoginError('No account found with these credentials. Please sign up first.');
      return false;
    }
    if (found.isBanned) {
      setLoginError('This account has been suspended. Please contact support.');
      return false;
    }
    setLoginError(null);
    setUser(found);
    localStorage.setItem('persona_current_user', JSON.stringify(found));
    return true;
  };

  const signup = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    const accounts = loadAccounts();
    const exists = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }
    const newUser: User = { name, email, password, hasCompletedSurvey: false, surveyResults: null, affinityScores: null, cvData: null };
    saveAccounts([...accounts, newUser]);
    setUser(newUser);
    localStorage.setItem('persona_current_user', JSON.stringify(newUser));
    return { success: true };
  };

  const updateName = (newName: string) => {
    if (!user) return;
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    const accounts = loadAccounts().map(a => a.email === user.email ? updatedUser : a);
    saveAccounts(accounts);
    localStorage.setItem('persona_current_user', JSON.stringify(updatedUser));
  };

  const enterAsGuest = () => {
    setIsGuest(true);
    sessionStorage.setItem('persona_guest', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    setLoginError(null);
    localStorage.removeItem('persona_current_user');
    sessionStorage.removeItem('persona_guest');
  };

  const completeSurvey = (results: string, affinityScores: Record<string, number>) => {
    if (!user) return;
    const updatedUser = { ...user, hasCompletedSurvey: true, surveyResults: results, affinityScores };
    setUser(updatedUser);
    const accounts = loadAccounts().map(a => a.email === user.email ? updatedUser : a);
    saveAccounts(accounts);
    localStorage.setItem('persona_current_user', JSON.stringify(updatedUser));
  };

  const saveCV = (cvData: CVData) => {
    if (!user) return;
    const updatedUser = { ...user, cvData };
    setUser(updatedUser);
    const accounts = loadAccounts().map(a => a.email === user.email ? updatedUser : a);
    saveAccounts(accounts);
    localStorage.setItem('persona_current_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isGuest, loginError, login, signup, updateName, logout, enterAsGuest, completeSurvey, saveCV }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
