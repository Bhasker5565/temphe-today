import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { RegisteredUser } from '../types';

interface AuthContextType {
  isLoggedIn: boolean;
  user: RegisteredUser | null;
  login: (email: string, password: string) => boolean;
  register: (user: RegisteredUser, password: string) => void;
  logout: () => void;
  supportedOperators: string[];
  supportOperator: (operatorId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RegisteredUser | null>(null);
  const [supportedOperators, setSupportedOperators] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tt_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('tt_user');
      }
    }
    const ops = localStorage.getItem('tt_supported');
    if (ops) {
      try {
        setSupportedOperators(JSON.parse(ops));
      } catch {
        localStorage.removeItem('tt_supported');
      }
    }
  }, []);

  const register = (newUser: RegisteredUser, _password: string) => {
    const stored = JSON.stringify(newUser);
    localStorage.setItem('tt_user', stored);
    setUser(newUser);
  };

  const login = (email: string, _password: string): boolean => {
    const stored = localStorage.getItem('tt_user');
    if (!stored) return false;
    try {
      const u: RegisteredUser = JSON.parse(stored);
      if (u.email.toLowerCase() === email.toLowerCase()) {
        setUser(u);
        return true;
      }
    } catch {
      // invalid storage
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const supportOperator = (operatorId: string) => {
    setSupportedOperators(prev => {
      const updated = prev.includes(operatorId) ? prev : [...prev, operatorId];
      localStorage.setItem('tt_supported', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        register,
        logout,
        supportedOperators,
        supportOperator,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
