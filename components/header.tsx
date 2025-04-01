
import { HelpCircle, LogOut, Menu, Settings, User } from 'lucide-react';
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar';

export default function Header({
  setIsProfileDropdownOpen,
  toggleSidebar,
  isProfileDropdownOpen,
}:any) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-bold text-green-600">FoodShare</h1>
      <div className="relative">
        <Avatar
          className="h-8 w-8 cursor-pointer"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        >
          <AvatarFallback className="bg-green-100 text-green-600">
            JD
          </AvatarFallback>
        </Avatar>

        {/* Profile Dropdown Menu */}
        {isProfileDropdownOpen && (
          <div className="absolute right-4 top-14 w-52 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium">My Account</p>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  // Handle profile click
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="mr-2" />
                Profile
              </button>

              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  // Handle settings click
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </button>

              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  // Handle help click
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <HelpCircle size={16} className="mr-2" />
                Help
              </button>
            </div>

            <div className="border-t border-gray-200 py-1">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  // Handle logout click
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-2" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

