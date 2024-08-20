import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = userData?.accessToken;

        if (token) {
          const id = userData?.result._id;
          const response = await axios.get(
            `http://localhost:7070/api/user/getuser/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsAuthenticated(false);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.accessToken) {
      fetchUserProfile();
    }
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7070/api/user/signup",
        { name, email, password }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during signup"
      );
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:7070/api/user/login", {
        email,
        password,
      });
      if (res.data.accessToken) {
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.result);
        setMessage("Login successful!");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
      await axios.post(
        "http://localhost:7070/api/user/logout",
        { token },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      setMessage("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(prev => !prev);
    setMessage("");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isModalOpen,
        isLoginForm,
        openModal,
        closeModal,
        handleLogin,
        handleSignup,
        handleLogout,
        toggleForm,
        message,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
