import React, { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { Logo } from "../../assets/export";

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next field
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = () => {
    // Navigate to dashboard on verify
    navigate("/auth/reset-password");
  };

  return (
    <div className="w-full border-8 border-[#0893F0]  flex flex-col items-center justify-center md:w-[499px] md:h-[548px] rounded-[19px] bg-white px-6">
      {/* Back button */}
     <div className="w-auto flex flex-col mt-4 justify-center items-center">
              <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
        
        <h2 className="text-[32px] font-bold leading-[48px]">Verification</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
        Enter the OTP code send to your email
        </p>
      </div>
      {/* OTP Inputs */}
      <div className="flex gap-3 mt-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-[80px] h-[70px] border border-gray-300 rounded-lg text-center text-[20px] font-semibold text-blue-500 focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>

      {/* Resend link */}
      <p className="text-gray-600 mt-6 text-[14px]">
        Didn’t receive OTP code?{" "}
        <button className="text-blue-500 font-medium">Resend now</button>
      </p>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="w-full max-w-sm mt-8 h-[52px] bg-[#0893F0] text-white rounded-lg text-[16px] font-medium"
      >
        Verify
      </button>
    </div>
  );
};

export default Verification;
