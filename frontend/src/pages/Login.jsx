import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext.jsx";
import AuthIllustration from "../components/AuthIllustration.jsx";
import { isValidEmail } from "../utils/validators.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail()) return;
    try {
      await login(email, password);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Google sign-in failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 bg-white dark:bg-slate-800 rounded-sm shadow-md flex overflow-hidden">
      <div className="bg-flipblue text-white p-10 w-[280px] shrink-0 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold">Login</h2>
          <p className="mt-4 text-blue-100 text-sm leading-relaxed">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        <AuthIllustration />
      </div>

      <form onSubmit={submit} className="flex-1 p-10 space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            onBlur={validateEmail}
            className={`w-full border-b py-2 outline-none bg-transparent text-gray-800 dark:text-gray-100 transition-colors ${
              emailError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-slate-600 focus:border-flipblue"
            }`}
            required
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 dark:border-slate-600 focus:border-flipblue py-2 outline-none bg-transparent text-gray-800 dark:text-gray-100 transition-colors"
            required
          />
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to Flipkart Clone's{" "}
          <span className="text-flipblue cursor-pointer">Terms of Use</span> and{" "}
          <span className="text-flipblue cursor-pointer">Privacy Policy</span>.
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-flipaccent text-white py-3 rounded-sm font-semibold tracking-wide">
          LOGIN
        </button>

        <Link
          to="/register"
          className="block text-center border border-gray-300 dark:border-slate-600 text-flipblue font-semibold py-3 rounded-sm hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          New Customer? Sign Up
        </Link>

        <div className="flex items-center gap-3 text-gray-400 text-xs">
          <div className="flex-1 border-t dark:border-slate-600" />
          OR
          <div className="flex-1 border-t dark:border-slate-600" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-slate-600 py-3 rounded-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          <FcGoogle size={20} /> Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
