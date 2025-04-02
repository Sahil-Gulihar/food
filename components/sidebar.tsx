import {
  BotIcon,
  Gift,
  HelpCircle,
  Home,
  LogOut,
  MapIcon,
  Settings,
  User,
  UserCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ isSidebarOpen, toggleSidebar, setIsSidebarOpen }:any) => {
  const pathname = usePathname();

  // Function to check if the current path matches the link
  const isActive = (path:any) => {
    return pathname === path;
  };

  // Safe close function that checks if setIsSidebarOpen is a function
  const handleClose = () => {
    if (typeof setIsSidebarOpen === "function") {
      setIsSidebarOpen(false);
    } else if (typeof toggleSidebar === "function" && isSidebarOpen) {
      toggleSidebar();
    }
  };

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
              <Link href="/dashboard">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive("/dashboard")
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={handleClose}
                >
                  <Home size={16} className="mr-2" />
                  <span>Dashboard</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/donate">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive("/donate")
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={handleClose}
                >
                  <Gift size={16} className="mr-2" />
                  <span>Donate Food</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/find">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive("/find")
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={handleClose}
                >
                  <MapIcon size={16} className="mr-2" />
                  <span>Find Food</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/volunteer">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive("/volunteer")
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={handleClose}
                >
                  <UserCheck size={16} className="mr-2" />
                  <span>Safety & Volunteer</span>
                </button>
              </Link>
            </li>
            <li>
              <Link href="/chat">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm ${
                    isActive("/chat")
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={handleClose}
                >
                  <BotIcon size={16} className="mr-2" />
                  <span>Chatbot AI</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
            Account
          </p>
          <ul className="space-y-1">
            <li>
              <Link href="/profile">
              <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                <User size={16} className="mr-2" />
                <span>Profile</span>
              </button>
              </Link>
            </li>
            <li>
              <Link href="/settings">
              <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </button>
              </Link>
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
        <Link href="/">
        <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
          <LogOut size={16} className="mr-2" />
          <span>Sign Out</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
