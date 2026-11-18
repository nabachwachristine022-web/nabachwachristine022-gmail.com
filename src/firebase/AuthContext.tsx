import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, testFirestoreConnection } from './config';
import { getUserProfile, saveUserProfile, UserProfile } from './firestoreService';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
});

export const ADMIN_EMAIL = 'nabachwachristine022@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Test connection on mount
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  const refreshProfile = async () => {
    if (!currentUser) {
      setUserProfile(null);
      return;
    }
    try {
      const profile = await getUserProfile(currentUser.uid);
      if (profile) {
        setUserProfile(profile);
      } else {
        // Create initial profile
        const newProfile = await saveUserProfile({
          userId: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || '',
        });
        if (newProfile) setUserProfile(newProfile);
      }
    } catch (err) {
      console.warn('Could not load user profile', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUserProfile(profile);
          } else {
            const initial = await saveUserProfile({
              userId: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
            });
            if (initial) setUserProfile(initial);
          }
        } catch (e) {
          console.warn('Profile fetch after auth error', e);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Google Sign In Error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAdmin,
        signInWithGoogle,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
