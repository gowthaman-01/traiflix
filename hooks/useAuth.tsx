import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../utils/firebase";
import { AuthProviderProps, IAuth } from "../types/Auth";

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [showUI, setShowUI] = useState(false);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setShowUI(true);
    });
  }, [auth]);
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/login");
    } catch (error: any) {}
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("Please sign up for an account");
        router.push("/signup");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("Wrong password");
      } else {
        alert(error.message);
      }
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      const userCredential = await signOut(auth);
      setUser(null);
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  const memo = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      loading,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memo}>
      {showUI && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
