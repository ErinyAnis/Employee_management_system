import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import axios, { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void; //will assure of this
  logout: () => void;
  loading: boolean;
}

interface AuthContextProps {
  children: ReactNode;
}

const UserContext = createContext<AuthContextType | null>(null);

const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        const err = error as AxiosError<{ success: boolean; error: string }>;
        if (err.response && !err.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
