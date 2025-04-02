"use client";
import React, { useState } from "react";
import { Calendar, Heart, MapPin, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const VolunteerPage = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold">Food Safety & Volunteer</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                Become a Volunteer
              </Button>
            </div>

            <Tabs defaultValue="safety" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="safety">Food Safety</TabsTrigger>
                <TabsTrigger value="volunteer">
                  Volunteer Opportunities
                </TabsTrigger>
              </TabsList>

              <TabsContent value="safety" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Food Safety Guidelines</CardTitle>
                    <CardDescription>
                      Ensure all food donations meet these safety standards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="bg-green-100 p-3 rounded-full shrink-0">
                        <Shield size={24} className="text-green-600" />
                      </div>
                      <p className="text-gray-600">
                        Ensure all food donations meet safety standards. Check
                        that packaging is sealed, items aren't expired, and
                        temperature-sensitive foods are properly stored.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">
                            Temperature Control
                          </h4>
                          <p className="text-gray-600">
                            Keep cold foods below 40°F and hot foods above 140°F
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Packaging</h4>
                          <p className="text-gray-600">
                            All donated items must be in original, sealed
                            packaging
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">Expiration Dates</h4>
                          <p className="text-gray-600">
                            Check "use by" dates before donating or consuming
                            items
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">
                            Cross-Contamination
                          </h4>
                          <p className="text-gray-600">
                            Keep raw meats separate from ready-to-eat foods
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <h3 className="text-lg font-medium mb-3">
                      Food Safety Training
                    </h3>
                    <div className="space-y-3">
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-blue-100 rounded-md mr-3">
                                <div className="text-blue-600 text-sm font-medium">
                                  PDF
                                </div>
                              </div>
                              <span>Basic Food Handling Guidelines</span>
                            </div>
                            <Button variant="link" className="text-blue-600">
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-red-100 rounded-md mr-3">
                                <div className="text-red-600 text-sm font-medium">
                                  VIDEO
                                </div>
                              </div>
                              <span>Food Safety Certification Course</span>
                            </div>
                            <Button variant="link" className="text-blue-600">
                              Watch
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 bg-green-100 rounded-md mr-3">
                                <div className="text-green-600 text-sm font-medium">
                                  QUIZ
                                </div>
                              </div>
                              <span>Food Safety Assessment Test</span>
                            </div>
                            <Button variant="link" className="text-blue-600">
                              Start
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteer" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Volunteer Opportunities</CardTitle>
                    <CardDescription>
                      Join our team to help ensure food safety and distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {volunteerOpportunities.map((opportunity) => (
                        <Card key={opportunity.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <h4 className="font-semibold">
                                  {opportunity.title}
                                </h4>
                                <p className="text-sm text-blue-600 mt-1">
                                  {opportunity.organization}
                                </p>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-gray-500 mt-2">
                                  <span className="flex items-center">
                                    <Calendar size={14} className="mr-1" />
                                    {opportunity.schedule}
                                  </span>
                                  <span className="flex items-center">
                                    <MapPin size={14} className="mr-1" />
                                    {opportunity.location}
                                  </span>
                                </div>
                              </div>

                              <Button className="mt-3 md:mt-0 bg-green-100 text-green-700 hover:bg-green-200">
                                <Heart size={14} className="mr-1" />
                                <span>Apply</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VolunteerPage;
