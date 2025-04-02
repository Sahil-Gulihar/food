"use client";
import React, { useState } from "react";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Edit,
  Save,
  Camera,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Sahil Gulihar",
    email: "sahilgulihar@gmail.com",
    phone: "+91231234567",
    address: "remote, Internet",
    joinDate: "January 12, 2023",
    bio: "Food enthusiast committed to reducing waste and helping the community. I volunteer at the local food bank on weekends and love connecting surplus food with those who need it.",
    avatar: "", // No image path by default
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes logic would go here
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Donation activity - sample data
  const donationHistory = [
    {
      id: 1,
      date: "March 28, 2025",
      type: "Canned Goods",
      quantity: "12 items",
      location: "Downtown Food Bank",
    },
    {
      id: 2,
      date: "February 15, 2025",
      type: "Fresh Produce",
      quantity: "8 lbs",
      location: "Community Center",
    },
    {
      id: 3,
      date: "January 5, 2025",
      type: "Bread & Bakery",
      quantity: "5 loaves",
      location: "St. Mary's Church",
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1  bg-white">
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            <Menu size={24} />
          </Button>
          <h1 className="text-xl font-bold text-green-600">FoodShare</h1>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1 shadow-none border rounded-lg">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4 relative">
                  <Avatar className="w-24 h-24">
                    {userData.avatar ? (
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                    ) : (
                      <AvatarFallback className="bg-green-100 text-green-600 text-2xl">
                        JD
                      </AvatarFallback>
                    )}
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-0 right-0 rounded-full p-2 bg-white"
                    >
                      <Camera size={14} />
                    </Button>
                  )}
                </div>
                <CardTitle>{userData.name}</CardTitle>
                <CardDescription>
                  Member since {userData.joinDate}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {!isEditing ? (
                    <>
                      <div className="flex items-start space-x-3">
                        <User size={18} className="text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p>{userData.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Mail size={18} className="text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{userData.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone size={18} className="text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Phone</p>
                          <p>{userData.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin size={18} className="text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Address</p>
                          <p>{userData.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Calendar size={18} className="text-gray-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-500">Joined</p>
                          <p>{userData.joinDate}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Full Name
                        </label>
                        <Input
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Phone
                        </label>
                        <Input
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-500 block mb-1">
                          Address
                        </label>
                        <Input
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    isEditing
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Activity & Settings */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="bio" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="bio">Bio & Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="activity">
                  <Card className="shadow-none border rounded-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Donation History</CardTitle>
                      <CardDescription>
                        Your recent food donations and contributions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {donationHistory.map((donation) => (
                          <div
                            key={donation.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md"
                          >
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{donation.type}</h3>
                                <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                                  {donation.quantity}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <span>
                                  {donation.location} • {donation.date}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 md:mt-0"
                            >
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">View All Activity</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="bio">
                  <Card className="shadow-none border rounded-lg">
                    <CardHeader className="pb-2">
                      <CardTitle>Bio & Preferences</CardTitle>
                      <CardDescription>
                        Tell the community a bit about yourself
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              About Me
                            </h3>
                            <p>{userData.bio}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                              Food Interests
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Produce
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Canned Goods
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Bread & Bakery
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Meal Kits
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                              Volunteer Interests
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Food Safety
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Distribution
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Transportation
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-500 block mb-1">
                              About Me
                            </label>
                            <textarea
                              name="bio"
                              value={userData.bio}
                              onChange={handleInputChange}
                              className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                          </div>

                          <div>
                            <label className="text-sm text-gray-500 block mb-1">
                              Food Interests
                            </label>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Produce
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Canned Goods
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Bread & Bakery
                              </Badge>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                Meal Kits
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6"
                              >
                                <Edit size={12} className="mr-1" /> Edit
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-gray-500 block mb-1">
                              Volunteer Interests
                            </label>
                            <div className="flex flex-wrap gap-2">
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Food Safety
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Distribution
                              </Badge>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                Transportation
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6"
                              >
                                <Edit size={12} className="mr-1" /> Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
