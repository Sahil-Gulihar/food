"use client";
import React, { useState } from "react";
import {
  Bell,
  Moon,
  Globe,
  Lock,
  LogOut,
  Shield,
  ChevronRight,
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/sidebar";

const SettingsPage = () => {
  // State for settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [language, setLanguage] = useState("english");
  const [location, setLocation] = useState("automatic");
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  const SettingRow = ({ icon, title, description, action, className = "" }:any) => (
    <div className={`flex items-center justify-between py-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );

  const SettingActionButton = ({ onClick, children }:any) => (
    <Button
      variant="ghost"
      className="flex items-center text-blue-600 p-0 h-auto"
      onClick={onClick}
    >
      {children}
      <ChevronRight size={16} className="ml-1" />
    </Button>
  );

  const handleLogout = () => {
    // Logout logic would go here
    alert("Logging out...");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 m-2">
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

        {/* Settings Content */}
        <div className="">
          <h1 className="text-3xl items-center bg-gray-100 rounded-lg flex justify-center font-bold mb-6">
            Settings
          </h1>

          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <SettingRow
                      icon={<Bell size={20} className="text-blue-600" />}
                      title="Enable Notifications"
                      description="Receive updates about donations and food availability"
                      action={
                        <Switch
                          checked={notificationsEnabled}
                          onCheckedChange={setNotificationsEnabled}
                        />
                      }
                      className="border-b"
                    />

                    <div
                      className={`pl-10 transition-opacity duration-200 ${
                        notificationsEnabled
                          ? "opacity-100"
                          : "opacity-50 pointer-events-none"
                      }`}
                    >
                      <SettingRow
                        title="Email Notifications"
                        description="Receive notifications via email"
                        action={
                          <Switch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                            disabled={!notificationsEnabled}
                          />
                        }
                      />

                      <SettingRow
                        title="Push Notifications"
                        description="Receive notifications on your device"
                        action={
                          <Switch
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                            disabled={!notificationsEnabled}
                          />
                        }
                      />
                    </div>

                    <Separator className="my-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Display & Language</CardTitle>
                    <CardDescription>
                      Customize how information is displayed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <SettingRow
                      icon={<Globe size={20} className="text-green-600" />}
                      title="Language"
                      description="Select your preferred language"
                      action={
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Location"
                      description="How we determine your location"
                      action={
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Distance Units"
                      description="Choose how distance is displayed"
                      action={
                        <Select
                          value={distanceUnit}
                          onValueChange={setDistanceUnit}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="miles">Miles</SelectItem>
                            <SelectItem value="kilometers">
                              Kilometers
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="account">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>
                      Manage your account settings and access
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <SettingRow
                      title="Email Address"
                      description="johndoe@example.com"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Change
                        </SettingActionButton>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Password"
                      description="Last changed 3 months ago"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Update
                        </SettingActionButton>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Phone Number"
                      description="+1 (555) 123-4567"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Change
                        </SettingActionButton>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Connected Accounts"
                      description="Google, Facebook"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Manage
                        </SettingActionButton>
                      }
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences & Data</CardTitle>
                    <CardDescription>
                      Manage your notification and communication preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <SettingRow
                      title="Newsletter Subscription"
                      description="Receive updates, tips, and community stories"
                      action={
                        <Switch checked={true} onCheckedChange={() => {}} />
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Food Preferences"
                      description="Manage your food preferences and donations"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Customize
                        </SettingActionButton>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Export Data"
                      description="Download a copy of your account data"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Export
                        </SettingActionButton>
                      }
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Deactivate Account
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Delete Account
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and login options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <SettingRow
                      icon={<Lock size={20} className="text-yellow-600" />}
                      title="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                      action={
                        <Switch
                          checked={twoFactorEnabled}
                          onCheckedChange={setTwoFactorEnabled}
                        />
                      }
                      className="border-b"
                    />

                    {twoFactorEnabled && (
                      <div className="py-2 px-4 bg-yellow-50 rounded-md my-2 border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          Two-factor authentication is enabled. We'll send a
                          verification code to your phone when you sign in.
                        </p>
                      </div>
                    )}

                    <SettingRow
                      title="Login History"
                      description="See your recent account activity"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          View
                        </SettingActionButton>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Authorized Devices"
                      description="Manage devices that can access your account"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Manage
                        </SettingActionButton>
                      }
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control how your data is used and shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <SettingRow
                      icon={<Shield size={20} className="text-blue-600" />}
                      title="Data Sharing"
                      description="Allow sharing your donation data to improve recommendations"
                      action={
                        <Switch
                          checked={dataSharing}
                          onCheckedChange={setDataSharing}
                        />
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Profile Visibility"
                      description="Control who can see your profile and activity"
                      action={
                        <Select defaultValue="contacts">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="contacts">Contacts</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      }
                      className="border-b"
                    />

                    <SettingRow
                      title="Cookie Preferences"
                      description="Manage how we use cookies to improve your experience"
                      action={
                        <SettingActionButton onClick={() => {}}>
                          Manage
                        </SettingActionButton>
                      }
                    />
                  </CardContent>
                  <CardFooter>
                    <div className="w-full">
                      <h3 className="text-sm font-medium mb-2">
                        Privacy Documents
                      </h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-sm">
                          Privacy Policy
                        </Button>
                        <Button variant="outline" size="sm" className="text-sm">
                          Terms of Service
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
