import React from "react";
import { useNavigate } from "react-router";  // Import useNavigate from react-router-dom
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Logo } from "../../assets/export";

const ResetPassword = () => {
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const handleLoginClick = () => {
    // Navigate to the dashboard after login button click
    navigate("/");
  };

  return (
    <div className="w-full border-8 border-[#0893F0] h-auto flex flex-col items-center p-6 justify-center md:w-[499px] md:h-[548px]  rounded-[19px] bg-white">
      <img src={Logo} alt="orange_logo" className="w-[148.4px]" />
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <h2 className="text-[32px] font-bold leading-[48px]">Reset Password</h2>
        <p className="text-[18px] font-normal text-center leading-[27px] text-[#3C3C43D9]">
          Please enter your new password to continue
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
          />
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
          <div className="h-[49px] flex justify-start bg-[#F8F8F899] items-start w-full relative border-[0.8px] border-[#D9D9D9] rounded-[8px]">
            <input
              type="password"
              id="password"
              name="password"
              className="w-[90%] h-full bg-transparent rounded-l-[8px] placeholder:text-[#959393] outline-none text-[#262626] px-3 text-[16px] font-normal leading-[20.4px]"
              placeholder="Password"
            />
            <button
              type="button"
              className="w-[10%] h-full rounded-r-[8px] bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              <FaRegEyeSlash />
            </button>
          </div>
        </div>

        

        <button
          type="button"  // Change from <NavLink> to <button> with onClick
          onClick={handleLoginClick}  // Trigger the navigate function
          className="w-full h-[49px] rounded-[8px] bg-[#0893F0] text-white flex gap-2 items-center justify-center text-md font-medium"
        >
          <span>Update</span>
          {/* Optionally show a loading spinner */}
          {/* <FiLoader className="animate-spin text-lg" /> */}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
