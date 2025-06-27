import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  joinedDate: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.warn("⚠️ Corrupt user data in localStorage");
      localStorage.removeItem('user');
      setUser(null);
    }
  }
  setIsLoading(false);
}, []);


  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();

      const userData: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        joinedDate: new Date().toISOString(),
        token: data.token
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // ✅ matches Auth.tsx
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();

      const userData: User = {
      id: data.id,
      email: data.email,
      name: data.name,
      joinedDate: new Date().toISOString(), // or pass this from backend too
      token: data.token
      };

      
    localStorage.removeItem('user'); // ✅ Clean up any stale user data
    localStorage.setItem('user', JSON.stringify(userData)); // ✅ Save fresh data
    setUser(data); // update context

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // ✅ same key as login
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};