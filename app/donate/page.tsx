"use client";
import React, { useState } from "react";
import { Box, Calendar, ChevronRight, MapPin } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const DonatePage = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Sample donation listings
  const [donations, setDonations] = useState([
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

  // Handle donation submission
  const handleDonationSubmit = (e) => {
    e.preventDefault();

    // Create new donation
    const newDonation = {
      id: donations.length + 1,
      type: foodType,
      quantity: quantity,
      expiryDate: expiryDate,
      location: location,
      distance: "0.5 miles", // Mock distance
    };

    // Add to donations list
    setDonations([newDonation, ...donations]);

    // Reset form
    setFoodType("");
    setQuantity("");
    setExpiryDate("");
    setLocation("");
    setNotes("");

    // Show success message
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // For the alert component
  const CheckCircle = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-600"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

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
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="fixed top-4 right-4 z-50 w-72">
            <Alert className="bg-green-50 border-green-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <CheckCircle />
                </div>
                <div>
                  <AlertTitle className="text-green-800">Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your donation has been submitted.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg- p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold">Donate Food</h2>
            </div>

            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Quick Donation</TabsTrigger>
                <TabsTrigger value="history">Donation History</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Donate Food</CardTitle>
                    <CardDescription>
                      Fill out this form to donate food items
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDonationSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="food-type">Food Type</Label>
                          <Select
                            value={foodType}
                            onValueChange={setFoodType}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Canned Goods">
                                Canned Goods
                              </SelectItem>
                              <SelectItem value="Fresh Produce">
                                Fresh Produce
                              </SelectItem>
                              <SelectItem value="Bread & Bakery">
                                Bread & Bakery
                              </SelectItem>
                              <SelectItem value="Dairy Products">
                                Dairy Products
                              </SelectItem>
                              <SelectItem value="Meat & Protein">
                                Meat & Protein
                              </SelectItem>
                              <SelectItem value="Dry Goods">
                                Dry Goods
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            placeholder="e.g., 5 lbs, 10 cans"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">
                            Expiry Date (if applicable)
                          </Label>
                          <Input
                            id="expiry-date"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Pickup Location</Label>
                          <Input
                            id="location"
                            placeholder="Address or location name"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any details about condition, packaging, dietary information, etc."
                          className="min-h-[100px]"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Submit Donation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation History</CardTitle>
                    <CardDescription>Your past food donations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {donations.length > 0 ? (
                        donations.map((donation) => (
                          <Card key={donation.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center p-4">
                              <div className="flex items-center flex-1">
                                <div className="bg-green-100 p-3 rounded-lg">
                                  <Box size={20} className="text-green-600" />
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium">{donation.type}</p>
                                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 gap-2 sm:gap-3">
                                    <span className="flex items-center">
                                      <Calendar size={14} className="mr-1" />
                                      Expires:{" "}
                                      {new Date(
                                        donation.expiryDate
                                      ).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center">
                                      <MapPin size={14} className="mr-1" />
                                      {donation.location}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center mt-3 md:mt-0">
                                <Badge className="mr-4">
                                  {donation.quantity}
                                </Badge>
                                <Button variant="ghost" size="icon">
                                  <ChevronRight size={20} />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">No donations found</p>
                        </div>
                      )}
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

export default DonatePage;
