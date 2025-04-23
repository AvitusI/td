"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, User, RectangleGoggles } from "lucide-react";

export default function AuthCard() {
    const [tab, setTab] = useState("login");
    // You'd wire these up to real handlers!
    const handleEmailAuth = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle login or signup...
      alert(`${tab === "login" ? "Login" : "Signup"} not implemented.`);
    };
    const handleGoogleAuth = () => {
      alert("Google login not implemented.");
    };
  
    return (
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 glass-morphism">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
          {tab === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-500 mb-4 text-center">
          {tab === "login"
            ? "Login to your account below"
            : "Sign up to get started!"}
        </p>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full flex bg-gray-100 rounded-lg mb-6">
            <TabsTrigger
              value="login"
              className={`flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white px-4 py-2 rounded-lg transition-colors`}
            >
              <LogIn className="mr-2 w-5 h-5" /> Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={`flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white px-4 py-2 rounded-lg transition-colors`}
            >
              <User className="mr-2 w-5 h-5" /> Signup
            </TabsTrigger>
          </TabsList>
  
          {/* LOGIN FORM */}
          <TabsContent value="login">
            <form className="flex flex-col gap-4" onSubmit={handleEmailAuth}>
              <div>
                <Label htmlFor="login-email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="login-password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-2"
              >
                <LogIn className="mr-2 w-5 h-5" /> Log In
              </Button>
            </form>
          </TabsContent>
  
          {/* SIGNUP FORM */}
          <TabsContent value="signup">
            <form className="flex flex-col gap-4" onSubmit={handleEmailAuth}>
              <div>
                <Label htmlFor="signup-name" className="text-gray-700">
                  Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Eduardo Gonzalez"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="signup-email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="signup-password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-2"
              >
                <User className="mr-2 w-5 h-5" /> Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
  
        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <span className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-xs uppercase">or</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
  
        {/* Google Button */}
        <Button
          onClick={handleGoogleAuth}
          className="w-full bg-[#ea384c] hover:bg-[#d8293b] text-white flex justify-center items-center font-semibold gap-2 text-base"
          type="button"
        >
          <RectangleGoggles className="w-5 h-5 mr-2" /> Continue with Google
        </Button>
      </div>
    );
  }