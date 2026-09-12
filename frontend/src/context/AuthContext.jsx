import { createContext, useContext, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import api from "../api/axios.js";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("flipkart_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("flipkart_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("flipkart_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      // Shaped like an axios error so existing catch blocks
      // (err.response?.data?.message) display it the same way.
      throw {
        response: {
          data: {
            message: "Google sign-in isn't set up yet. Add your Firebase config to frontend/.env.",
          },
        },
      };
    }
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const { data } = await api.post("/auth/google", { idToken });
    localStorage.setItem("flipkart_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("flipkart_user");
    localStorage.removeItem("flipkart_cart");
    setUser(null);
    window.location.assign("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
