"use client";
import React, { useState, useEffect } from "react";
import { Clock, MapPin, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const FindFoodPage = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Google Maps state
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [mapMarkers, setMapMarkers] = useState([]);

  // Available food listings
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
    if (!mapLoaded) {
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
  }, [mapLoaded]);

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
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0 mt-14 md:mt-0 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg- p-4 md:p-6">
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
        </main>
      </div>
    </div>
  );
};

export default FindFoodPage;