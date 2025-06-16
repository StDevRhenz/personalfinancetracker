import { useCallback } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuthContext } from './AuthProvider';

export function useAuth() {
  const { user, loading } = useAuthContext();

  // Email/password signup
  const signup = useCallback(async (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  // Email/password login
  const login = useCallback(async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  // Google login
  const loginWithGoogle = useCallback(async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { user, loading, signup, login, loginWithGoogle, logout };
}
