import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext.jsx";
import AuthIllustration from "../components/AuthIllustration.jsx";
import { isValidEmail, isValidPassword } from "../utils/validators.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 6 characters and include a letter and a number");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    if (!emailOk || !passwordOk) return;
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Google sign-up failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 bg-white dark:bg-slate-800 rounded-sm shadow-md flex overflow-hidden">
      <div className="bg-flipblue text-white p-10 w-[280px] shrink-0 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold leading-snug">Looks like you're new here!</h2>
          <p className="mt-4 text-blue-100 text-sm leading-relaxed">
            Sign up with your details to get started
          </p>
        </div>
        <AuthIllustration />
      </div>

      <form onSubmit={submit} className="flex-1 p-10 space-y-6">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-gray-300 dark:border-slate-600 focus:border-flipblue py-2 outline-none bg-transparent text-gray-800 dark:text-gray-100 transition-colors"
            required
          />
        </div>
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
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            onBlur={validatePassword}
            className={`w-full border-b py-2 outline-none bg-transparent text-gray-800 dark:text-gray-100 transition-colors ${
              passwordError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-slate-600 focus:border-flipblue"
            }`}
            required
          />
          {passwordError ? (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              At least 6 characters, with a letter and a number
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to Flipkart Clone's{" "}
          <span className="text-flipblue cursor-pointer">Terms of Use</span> and{" "}
          <span className="text-flipblue cursor-pointer">Privacy Policy</span>.
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-flipaccent text-white py-3 rounded-sm font-semibold tracking-wide">
          CONTINUE
        </button>

        <Link
          to="/login"
          className="block text-center border border-gray-300 dark:border-slate-600 text-flipblue font-semibold py-3 rounded-sm hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          Existing User? Log in
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
          <FcGoogle size={20} /> Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
