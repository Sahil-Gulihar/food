
"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  MapPin,
  Box,
  Heart,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Shield,
  RefreshCw,
  Home,
  Gift,
  MapIcon,
  UserCheck,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const FoodShareApp = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("donate");
  const [searchValue, setSearchValue] = useState("");
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  interface MapMarker {
    position: { lat: number; lng: number };
    title: string;
    foodType: string;
    distance: string;
    quantity: string;
    time: string;
  }

  // Google Maps state
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);

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

  // Available food listings - now managed with state
  const [availableFood, setAvailableFood] = useState([
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

  // Google Maps implementation
  useEffect(() => {
    // Function to get user's current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(userLocation);
            generateRandomLocations(userLocation);
          },
          () => {
            // If user denies location, use default and generate random locations
            generateRandomLocations(currentLocation);
          }
        );
      } else {
        // If geolocation not supported, use default location
        generateRandomLocations(currentLocation);
      }
    };

    // Function to generate 2-3 random nearby locations
    const generateRandomLocations = (center:any) => {
      const newMarkers = [];
      const numberOfLocations = Math.floor(Math.random() * 2) + 2; // 2-3 locations

      const foodBanks = [
        "Community Food Pantry",
        "Hope Hunger Relief",
        "Neighborhood Assistance",
        "Metro Food Bank",
        "City Harvest Center",
      ];

      const foodTypes = [
        "Mixed Groceries",
        "Produce & Vegetables",
        "Canned Goods",
        "Bread & Bakery",
        "Dairy Products",
      ];

      for (let i = 0; i < numberOfLocations; i++) {
        // Generate a random location within ~1-3 miles
        const randomLat = center.lat + Math.random() * 0.04 - 0.02;
        const randomLng = center.lng + Math.random() * 0.04 - 0.02;

        // Calculate approximate distance
        const latDiff = center.lat - randomLat;
        const lngDiff = center.lng - randomLng;
        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Approximate miles

        newMarkers.push({
          position: { lat: randomLat, lng: randomLng },
          title: foodBanks[Math.floor(Math.random() * foodBanks.length)],
          foodType: foodTypes[Math.floor(Math.random() * foodTypes.length)],
          distance: distance.toFixed(1) + " miles",
          quantity: Math.floor(Math.random() * 20) + 5 + " items available",
          time: `${Math.floor(Math.random() * 3) + 8} AM - ${
            Math.floor(Math.random() * 4) + 5
          } PM`,
        });
      }

      // Update both the map markers and the available food listings
      setMapMarkers(newMarkers);
      setAvailableFood(
        newMarkers.map((marker, index) => ({
          id: index + 1,
          type: marker.foodType,
          quantity: marker.quantity,
          provider: marker.title,
          distance: marker.distance,
          time: marker.time,
          location: marker.position,
        }))
      );
    };

    // Load Google Maps API
    if (!mapLoaded && activeTab === "find") {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = () => {
        setMapLoaded(true);
        getUserLocation();
      };
      document.head.appendChild(googleMapsScript);

      return () => {
        if (document.head.contains(googleMapsScript)) {
          document.head.removeChild(googleMapsScript);
        }
      };
    }
  }, [mapLoaded, activeTab]);

  // Function to initialize the map when API is loaded
  const initializeMap = () => {
    if (!mapLoaded || !document.getElementById("google-map")) return null;

    try {
      const map = new window.google.maps.Map(
        document.getElementById("google-map"),
        {
          center: currentLocation,
          zoom: 13,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }
      );

      // Add user marker
      new window.google.maps.Marker({
        position: currentLocation,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#FFFFFF",
        },
        title: "Your Location",
      });

      // Add food location markers
      mapMarkers.forEach((marker) => {
        const foodMarker = new window.google.maps.Marker({
          position: marker.position,
          map,
          title: marker.title,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          },
        });

        // Add info window for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="width: 200px">
              <h3 style="margin-bottom: 5px; font-weight: bold">${marker.title}</h3>
              <p style="margin: 2px 0">${marker.foodType}</p>
              <p style="margin: 2px 0">${marker.quantity}</p>
              <p style="margin: 2px 0">Distance: ${marker.distance}</p>
              <p style="margin: 2px 0">Hours: ${marker.time}</p>
            </div>
          `,
        });

        foodMarker.addListener("click", () => {
          infoWindow.open(map, foodMarker);
        });
      });

      return map;
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      return null;
    }
  };

  // Handle donation submission
  const handleDonationSubmit = (e: any) => {
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

  // Function to handle refreshing locations for map
  const handleRefreshLocations = () => {
    if (mapLoaded) {
      const generateRandomLocations = (center) => {
        const newMarkers = [];
        const numberOfLocations = Math.floor(Math.random() * 2) + 2; // 2-3 locations

        const foodBanks = [
          "Community Food Pantry",
          "Hope Hunger Relief",
          "Neighborhood Assistance",
          "Metro Food Bank",
          "City Harvest Center",
        ];

        const foodTypes = [
          "Mixed Groceries",
          "Produce & Vegetables",
          "Canned Goods",
          "Bread & Bakery",
          "Dairy Products",
        ];

        for (let i = 0; i < numberOfLocations; i++) {
          // Generate a random location within ~1-3 miles
          const randomLat = center.lat + Math.random() * 0.04 - 0.02;
          const randomLng = center.lng + Math.random() * 0.04 - 0.02;

          // Calculate approximate distance
          const latDiff = center.lat - randomLat;
          const lngDiff = center.lng - randomLng;
          const distance =
            Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // Approximate miles

          newMarkers.push({
            position: { lat: randomLat, lng: randomLng },
            title: foodBanks[Math.floor(Math.random() * foodBanks.length)],
            foodType: foodTypes[Math.floor(Math.random() * foodTypes.length)],
            distance: distance.toFixed(1) + " miles",
            quantity: Math.floor(Math.random() * 20) + 5 + " items available",
            time: `${Math.floor(Math.random() * 3) + 8} AM - ${
              Math.floor(Math.random() * 4) + 5
            } PM`,
          });
        }

        // Update both the map markers and the available food listings
        setMapMarkers(newMarkers);
        setAvailableFood(
          newMarkers.map((marker, index) => ({
            id: index + 1,
            type: marker.foodType,
            quantity: marker.quantity,
            provider: marker.title,
            distance: marker.distance,
            time: marker.time,
            location: marker.position,
          }))
        );
      };

      generateRandomLocations(currentLocation);
    }
  };

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
        setActiveTab={setActiveTab}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 mt-14 md:mt-0 overflow-hidden">
        {/* Header - Only visible on medium screens and up */}
        <header className="hidden md:flex bg-white border-b border-gray-200 p-4 items-center justify-between">
          <div className="relative w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 relative">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell size={20} />
            </button>
            <Avatar
              className="cursor-pointer"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <AvatarFallback className="bg-green-100 text-green-600">
                JD
              </AvatarFallback>
            </Avatar>
            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-10 w-52 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
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
        </header>

        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="fixed top-4 right-4 z-50 w-72">
            <Alert className="bg-green-50 border-green-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-2">
                  <CheckCircle size={16} className="text-green-600" />
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
          {activeTab === "dashboard" && (
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
          )}

          {activeTab === "donate" && (
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
                      <CardDescription>
                        Your past food donations
                      </CardDescription>
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
                                    <p className="font-medium">
                                      {donation.type}
                                    </p>
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
          )}

          {activeTab === "find" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold">Find Food Nearby</h2>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={handleRefreshLocations}
                  >
                    <RefreshCw size={14} className="mr-1" />
                    <span>Refresh</span>
                  </Button>

                  <div className="flex items-center text-sm bg-gray-100 px-3 py-1.5 rounded-md">
                    <MapPin size={14} className="text-gray-500 mr-1" />
                    <span className="text-gray-600">Current Location</span>
                  </div>
                </div>
              </div>

              {/* Map with Google Maps */}
              <Card className="w-full overflow-hidden">
                {mapLoaded ? (
                  <div
                    id="google-map"
                    className="h-64 w-full"
                    ref={initializeMap}
                  ></div>
                ) : (
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <div className="text-gray-500">Loading Map...</div>
                  </div>
                )}
              </Card>

              {/* Available Food Listings */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Food</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableFood.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold">{item.type}</h4>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                {item.provider}
                              </Badge>
                            </div>
                            <p className="text-sm mb-3">
                              Quantity: {item.quantity}
                            </p>
                            <div className="flex flex-col space-y-1 mb-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin size={14} className="mr-1" />
                                <span>{item.distance}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-1" />
                                <span>{item.time}</span>
                              </div>
                            </div>
                          </div>

                          <Button className="mt-auto w-full bg-green-600 hover:bg-green-700">
                            Get Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "volunteer" && (
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
                              Keep cold foods below 40°F and hot foods above
                              140°F
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
                            <h4 className="font-medium mb-1">
                              Expiration Dates
                            </h4>
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
                        Join our team to help ensure food safety and
                        distribution
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
          )}
        </main>
      </div>
    </div>
  );
};

const Bell = Clock; // Using Clock icon as a placeholder for Bell

const CheckCircle = Shield; // Using Shield icon as a placeholder for CheckCircle

export default FoodShareApp;
