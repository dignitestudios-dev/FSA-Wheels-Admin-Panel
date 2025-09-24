import React, { useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate from react-router-dom
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";
import axios from "../../axios"; // Import axios instance
import Cookies from "js-cookie";
import { ErrorToast } from "../../components/global/Toaster"; // Import your toaster function

const DummyLogin = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // State for managing form fields and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [emailError, setEmailError] = useState(""); // Email error state
  const [passwordError, setPasswordError] = useState(""); // Password error state

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle password input change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleForgotClick = () => {
    // Navigate to the forgot password page
    navigate("/auth/forgot-password");
  };

 const handleLogin = async () => {
  // Clear previous error messages
  setEmailError("");
  setPasswordError("");

  // Validation checks
  if (!email || !password) {
    ErrorToast("Please enter both email and password.");
    return;
  }

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    setEmailError("Please enter a valid email address.");
    return;
  }

  // Password length validation
  if (password.length < 8) {
    setPasswordError("Password must be at least 8 characters long.");
    return;
  }

  setLoading(true); // Start loading

  try {
    // Make login request to API
    const response = await axios.post("/admin/login", {
      email,
      password,
    });

    if (response.data.success) {
      // On success, store token in cookies
      Cookies.set("token", response.data.data.token);
      Cookies.set("user", JSON.stringify(response.data.data.admin));

      // Navigate to the dashboard
      navigate("/app/dashboard");
    } else {
      // Handle validation errors from API response
      if (response.data.message) {
        // Show the error message returned from the backend
        ErrorToast(response.data.message);
      } else {
        ErrorToast("An unknown error occurred. Please try again.");
      }
    }
  } catch (error) {
    // Handle API errors
    console.error("Login error:", error);

    if (error.response && error.response.data) {
      // If error is from the server
      if (error.response.data.message) {
        // Show the error message from the backend
        ErrorToast(error.response.data.message);
      } else {
        // Show a generic error message
        ErrorToast("An error occurred while logging in. Please try again.");
      }
    } else {
      // If error is network-related or not from the server
      ErrorToast("An error occurred. Please check your connection and try again.");
    }
  } finally {
    setLoading(false); // Stop loading
  }
};


  return (
    <div className="w-full border-8 border-[#0893F0] h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[548px] rounded-[19px] bg-white">
      <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Welcome Back</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
          Please enter your details to continue
        </p>
      </div>

      <form className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4">
        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <input
            type="text"
            id="email"
            name="email"
            className="w-full h-[49px] border-[0.8px] bg-[#F8F8F899] outline-none rounded-[8px] placeholder:text-[#959393] text-[#262626] px-3 text-[16px] font-normal leading-[20.4px] border-[#D9D9D9]"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          {/* Display email error */}
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <div className="h-[49px] flex justify-start bg-[#F8F8F899] items-start w-full relative border-[0.8px] border-[#D9D9D9] rounded-[8px]">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              id="password"
              name="password"
              className="w-[90%] h-full bg-transparent rounded-l-[8px] placeholder:text-[#959393] outline-none text-[#262626] px-3 text-[16px] font-normal leading-[20.4px]"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="w-[10%] h-full rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {/* Display password error */}
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <div className="w-full -mt-1 flex items-center justify-end">
          <button
            type="button"
            onClick={handleForgotClick}
            className="text-[#0893F0] hover:no-underline hover:text-blue-600 text-[16px] font-normal leading-[20.4px]"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="w-full h-[49px] rounded-[8px] bg-[#0893F0] text-white flex gap-2 items-center justify-center text-md font-medium"
          disabled={loading} // Disable button when loading
        >
          <span>Log In</span>
          {loading && <FiLoader className="animate-spin text-lg" />}
        </button>
      </form>
    </div>
  );
};

export default DummyLogin;
