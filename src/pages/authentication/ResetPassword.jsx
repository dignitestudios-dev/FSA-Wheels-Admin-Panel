import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"; // Import useNavigate and useParams
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";
import axios from "../../axios";  // Assuming axios is configured in your project

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();  // Extract the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");  // Redirect to home if token is not present
    }
  }, [token, navigate]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (loading) return;  // Prevent double submits
    setLoading(true);

    try {
      const response = await axios.post("/user/reset-password", {
        newPassword,
        token,  // Pass the token extracted from URL
      });

      // On successful response, redirect to login or show a success message
      alert("Password reset successful!");
      navigate("/login");  // Redirect to login page after successful reset
    } catch (error) {
      // Handle error appropriately
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full border-8 border-[#0893F0] h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[548px] rounded-[19px] bg-white">
      <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Reset Password</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
          Please enter your new password to continue
        </p>
      </div>

      <form className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4" onSubmit={handleResetPassword}>
        {/* New Password Input */}
        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <div className="h-[49px] flex justify-start bg-[#F8F8F899] items-start w-full relative border-[0.8px] border-[#D9D9D9] rounded-[8px]">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-[90%] h-full bg-transparent rounded-l-[8px] placeholder:text-[#959393] outline-none text-[#262626] px-3 text-[16px] font-normal leading-[20.4px]"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="w-[10%] h-full rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-[49px] rounded-[8px] bg-[#0893F0] text-white flex gap-2 items-center justify-center text-md font-medium ${loading ? "cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-white text-lg" />
              <span>Resetting...</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
