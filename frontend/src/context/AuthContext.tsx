import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ Update: User interface includes token
export interface User {
  id: string;
  email: string;
  name: string;
  joinedDate: string;
  token: string;  // <-- NEW: Store token here
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('moodmate-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  try {
    const response = await fetch('https://moodmate-d4ei.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setIsLoading(false);
      return false;
    }

    const data = await response.json();

    const userData: User = {
      id: data.id,       // ✅ Use data.id, data.email, etc.
      email: data.email,
      name: data.name,
      joinedDate: new Date().toISOString(),  // You can set this yourself if not provided by backend
      token: data.token
    };

    setUser(userData);
    localStorage.setItem('moodmate-user', JSON.stringify(userData));
    setIsLoading(false);
    return true;
  } catch (err) {
    console.error(err);
    setIsLoading(false);
    return false;
  }
};

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('https://moodmate-d4ei.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        setIsLoading(false);
        return false;
      }

      const data = await response.json();

      const userData: User = {
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        joinedDate: data.user.joinedDate,
        token: data.token
      };

      setUser(userData);
      localStorage.setItem('moodmate-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('moodmate-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
