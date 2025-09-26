import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { sidebarData } from "../../static/Sidebar";
import { LogOut } from "lucide-react";

const DummySidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // ✅ Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // ✅ Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // ✅ Navigate to login page (or home)
    navigate("/auth/login");
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 overflow-y-auto px-5 py-6 flex flex-col gap-4">
      {sidebarData?.map((sidebar) => (
        <NavLink
          key={sidebar?.link}
          className={({ isActive }) =>
            isActive
              ? "text-sm flex items-center gap-4 px-6 py-3 rounded-xl bg-[#0893F0] text-white hover:bg-[#0893F0] transition-all duration-200 ease-in-out"
              : "text-sm flex items-center gap-4 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-[#0893F0] transition-all duration-200 ease-in-out"
          }
          to={sidebar?.link}
        >
          <div
            className={({ isActive }) =>
              isActive ? " text-md text-white" : "w-6 h-6 text-xl text-gray-800"
            }
          >
            {sidebar?.icon}
          </div>
          <span className="font-medium">{sidebar?.title}</span>
        </NavLink>
      ))}

      {/* ✅ Logout Button */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="text-sm flex items-center gap-4 font-semibold px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-[#0893F0] transition-all duration-200 ease-in-out"
      >
        <LogOut className="inline-block mr-2 ml-3" /> Logout
      </button>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DummySidebar;
