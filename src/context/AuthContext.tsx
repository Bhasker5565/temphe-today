import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { RegisteredUser } from '../types';

interface AuthResult {
  success: boolean;
  error?: string;
  loggedIn?: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: RegisteredUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (user: RegisteredUser, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  supportedOperators: string[];
  supportOperator: (operatorId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RegisteredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [supportedOperators, setSupportedOperators] = useState<string[]>([]);

  useEffect(() => {
    const loadProfile = async (userId: string) => {
      const { data } = await supabase
        .from('users')
        .select('full_name, email, mobile, country, investment_interest')
        .eq('id', userId)
        .single();

      if (data) {
        setUser({
          name: data.full_name,
          email: data.email,
          investmentInterest: data.investment_interest ?? '',
          mobile: data.mobile ?? undefined,
          country: data.country ?? undefined,
        });
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    const ops = localStorage.getItem('tt_supported');
    if (ops) {
      try {
        setSupportedOperators(JSON.parse(ops));
      } catch {
        localStorage.removeItem('tt_supported');
      }
    }

    return () => listener.subscription.unsubscribe();
  }, []);

  const register = async (newUser: RegisteredUser, password: string): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: newUser.email,
      password,
      options: {
        data: {
          full_name: newUser.name,
          mobile: newUser.mobile,
          country: newUser.country,
          investment_interest: newUser.investmentInterest,
        },
      },
    });
    if (error) return { success: false, error: error.message };
    // With email confirmation disabled, signUp returns an active session
    // immediately, so the investor is already logged in at this point.
    return { success: true, loggedIn: !!data.session };
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
        loading,
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
