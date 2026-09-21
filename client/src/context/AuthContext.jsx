import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import api from '../services/api';

const AuthContext = createContext();

const USER_STORAGE_KEY = 'mechconnect-user';

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Vehicle Owner',
          email: firebaseUser.email,
          role: 'user',
        };

        setUser(mappedUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      try {
        const response = await api.login({ email, password });
        const mappedUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || 'user',
          token: response.token,
        };
        setUser(mappedUser);
        return mappedUser;
      } catch (backendError) {
        if (!isFirebaseConfigured || !auth) {
          const mockUser = {
            id: 'user_1',
            name: 'Aarav Nair',
            email,
            role: 'user',
          };
          setUser(mockUser);
          return mockUser;
        }

        const response = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = response.user;
        const mappedUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Vehicle Owner',
          email: firebaseUser.email,
          role: 'user',
        };

        setUser(mappedUser);
        return mappedUser;
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields.');
      }

      try {
        const response = await api.signup({ name, email, password });
        const mappedUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role || 'user',
          token: response.token,
        };
        setUser(mappedUser);
        return mappedUser;
      } catch (backendError) {
        if (!isFirebaseConfigured || !auth) {
          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            role: 'user',
          };
          setUser(newUser);
          return newUser;
        }

        const response = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = response.user;
        const mappedUser = {
          id: firebaseUser.uid,
          name,
          email: firebaseUser.email,
          role: 'user',
        };

        setUser(mappedUser);
        return mappedUser;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, signup, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
