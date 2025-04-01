import { Gift, HelpCircle, Home, LogOut, MapIcon, Settings, User, UserCheck, X } from "lucide-react";
import React from "react";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  setActiveTab,
  setIsSidebarOpen,
  activeTab,
}:any) => {
  return (
    <div
      className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-20 md:z-0
        transition-transform duration-300 ease-in-out md:static md:w-64 flex flex-col
      `}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-600">FoodShare</h1>
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-grow p-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
            Main
          </p>
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                  activeTab === "dashboard"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("dashboard");
                  setIsSidebarOpen(false);
                }}
              >
                <Home size={16} className="mr-2" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                  activeTab === "donate"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("donate");
                  setIsSidebarOpen(false);
                }}
              >
                <Gift size={16} className="mr-2" />
                <span>Donate Food</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                  activeTab === "find"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("find");
                  setIsSidebarOpen(false);
                }}
              >
                <MapIcon size={16} className="mr-2" />
                <span>Find Food</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                  activeTab === "volunteer"
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setActiveTab("volunteer");
                  setIsSidebarOpen(false);
                }}
              >
                <UserCheck size={16} className="mr-2" />
                <span>Safety & Volunteer</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
            Account
          </p>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                <User size={16} className="mr-2" />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                <HelpCircle size={16} className="mr-2" />
                <span>Help & Support</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
          <LogOut size={16} className="mr-2" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
