import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { Logo } from "../../assets/export";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      ErrorToast("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/admin/forgetPassword", { email });

      SuccessToast("Reset Link has been send to your email.");
      
      // Optional: Store email in localStorage or context if needed
      localStorage.setItem("resetEmail", email);

      // navigate("/auth/verification");
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to send OTP.";
      ErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border-8 border-[#0893F0] h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[548px] rounded-[19px] bg-white">
      <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
      
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Forgot Password</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
          Please enter your email to continue
        </p>
      </div>

      <form className="w-full md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="w-full flex flex-col gap-1">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[49px] border-[0.8px] bg-[#F8F8F899] outline-none rounded-[8px] placeholder:text-[#959393] text-[#262626] px-3 text-[16px] font-normal leading-[20.4px] border-[#D9D9D9]"
            placeholder="Email Address"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full h-[49px] rounded-[8px] flex gap-2 items-center justify-center text-md font-medium transition duration-300 ${
            loading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-[#0893F0] hover:bg-[#0078d4] text-white"
          }`}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Next</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
