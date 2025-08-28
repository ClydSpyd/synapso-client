export interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    submitting: boolean;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

export const defaultAuthContext: AuthContextData = {
  isAuthenticated: false,
  user: null,
  login: async () => {
    throw new Error("login function not implemented");
  },
  logout: async () => {
    throw new Error("logout function not implemented");
  },
  signup: async () => {
    throw new Error("signup function not implemented");
  },
  loading: false,
  error: null,
  setError: () => {
    throw new Error("setError function not implemented");
  },
  submitting: false,
};