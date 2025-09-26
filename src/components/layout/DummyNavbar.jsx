import { Logo } from "../../assets/export";

const DummyNavbar = () => {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Logo Section */}
      <img
        src={Logo}
        loading="lazy"
        alt="logo-organization"
        className="h-10 cursor-pointer"
      />

      {/* User Avatar and Profile Dropdown */}
      <div className="flex items-center space-x-3 relative">
        {/* User Avatar with Hover Effect */}
        
        <div className="relative group">
          {/* <img
            src={Logo} // Replace with actual user avatar
            alt="user-avatar"
            className="w-10 h-10 object-contain cursor-pointer rounded-full border-2 border-gray-300 transition-transform duration-300 ease-in-out transform group-hover:scale-110"
          /> */}

          {/* Hovered Profile Options */}
          {/* <div className="absolute right-0 w-40 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg py-2 text-gray-600 text-sm transition-all duration-200">
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              Profile
            </a>
            <a
              href="/"
              className="block px-4 py-2 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              Logout
            </a>
          </div> */}
        </div>

        {/* Dropdown Indicator Icon */}
        {/* <button className="relative group flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            className="text-gray-600 group-hover:text-orange-500 transition-all duration-200"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default DummyNavbar;
