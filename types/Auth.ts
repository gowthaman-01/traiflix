import { User } from "firebase/auth"

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuth {
    user: User | null; 
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    loading: boolean; 
}