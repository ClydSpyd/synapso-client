export interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

export interface User {
    id: string;
    name: string;
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
  loading: false,
  error: null,
};