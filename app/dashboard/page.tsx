"use client";
import React, { useState } from "react";
import { Gift, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const DashboardPage = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Sample donation listings
  const [donations] = useState([
    {
      id: 1,
      type: "Canned Goods",
      quantity: "12 cans",
      expiryDate: "2025-06-15",
      location: "Downtown Food Bank",
      distance: "1.2 miles",
    },
    {
      id: 2,
      type: "Fresh Produce",
      quantity: "5 lbs",
      expiryDate: "2025-04-05",
      location: "Community Center",
      distance: "0.8 miles",
    },
    {
      id: 3,
      type: "Bread & Bakery",
      quantity: "8 loaves",
      expiryDate: "2025-04-03",
      location: "St. Mary's Church",
      distance: "2.1 miles",
    },
  ]);

  // Available food listings
  const [availableFood] = useState([
    {
      id: 1,
      type: "Rice & Grains",
      quantity: "10 lbs",
      provider: "Metro Food Bank",
      distance: "0.5 miles",
      time: "9 AM - 5 PM",
    },
    {
      id: 2,
      type: "Dairy Products",
      quantity: "Limited",
      provider: "Community Fridge",
      distance: "1.3 miles",
      time: "24/7 Access",
    },
    {
      id: 3,
      type: "Mixed Groceries",
      quantity: "Family Pack",
      provider: "Hope Center",
      distance: "2.4 miles",
      time: "10 AM - 2 PM",
    },
  ]);

  // Sample volunteer opportunities
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Food Safety Inspector",
      organization: "City Food Coalition",
      schedule: "Weekends",
      location: "Multiple Locations",
    },
    {
      id: 2,
      title: "Distribution Helper",
      organization: "Hope Center",
      schedule: "Tuesdays & Thursdays",
      location: "123 Main St",
    },
    {
      id: 3,
      title: "Quality Control",
      organization: "Metro Food Bank",
      schedule: "Flexible Hours",
      location: "555 Park Ave",
    },
  ];

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header - Only visible on small screens */}
      <Header
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        toggleSidebar={toggleSidebar}
        isProfileDropdownOpen={isProfileDropdownOpen}
      />

      {/* Sidebar - Changes based on screen size */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 mt-14 md:mt-0 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg- p-4 md:p-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Donations Made</CardTitle>
                  <CardDescription>Your contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{donations.length}</div>
                  <p className="text-sm text-green-600 mt-1">
                    Keep up the good work!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Food Available</CardTitle>
                  <CardDescription>Nearby locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {availableFood.length}
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Within 3 miles of you
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Volunteer Roles</CardTitle>
                  <CardDescription>Safety & distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {volunteerOpportunities.length}
                  </div>
                  <p className="text-sm text-orange-600 mt-1">
                    Opportunities available
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.slice(0, 2).map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="bg-green-100 p-2 rounded-full">
                          <Gift size={16} className="text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {donation.type} donated
                          </p>
                          <p className="text-xs text-gray-500">
                            {donation.location}
                          </p>
                        </div>
                        <Badge variant="outline">{donation.quantity}</Badge>
                      </div>
                    ))}
                    {availableFood.slice(0, 1).map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MapPin size={16} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            Found {food.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {food.provider}
                          </p>
                        </div>
                        <Badge variant="outline">{food.distance}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Food Waste Reduction</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress
                        value={78}
                        className="h-2 bg-green-300 [&>*]:bg-blue-400"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Families Supported</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress
                        value={65}
                        className="h-2 bg-green-300 [&>*]:bg-blue-400"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Volunteer Engagement</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress
                        value={42}
                        className="h-2 bg-green-300 [&>*]:bg-blue-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
