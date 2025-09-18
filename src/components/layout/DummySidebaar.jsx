import { NavLink } from "react-router";
import { sidebarData } from "../../static/Sidebar";

const DummySidebar = () => {
  return (
    <div className="w-64 h-full bg-white  overflow-y-auto px-5 py-6 flex flex-col gap-4 shadow">
      {sidebarData?.map((sidebar) => {
        return (
          <NavLink
            key={sidebar?.link}
            className={({ isActive }) =>
              isActive
                ? "text-sm flex items-center gap-4 px-6 py-3 rounded-xl bg-[#0893F0] text-white hover:bg-[#0893F0] transition-all duration-200 ease-in-out"
                : "text-sm flex items-center gap-4 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-[#0893F0] transition-all duration-200 ease-in-out"
            }
            to={sidebar?.link}
          >
            {/* Icon */}
            <div className={({ isActive }) =>
              isActive ? " text-md text-white" : "w-6 h-6 text-xl text-gray-800"
            }>{sidebar?.icon}</div> 
            <span className="font-medium">{sidebar?.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default DummySidebar;
