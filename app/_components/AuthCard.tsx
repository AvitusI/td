"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, User, RectangleGoggles } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { access } from "fs";


const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  })
})

const signupSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
})

export default function AuthCard() {

  const [tab, setTab] = useState("login");

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const loginSubmit = (values: z.infer<typeof loginSchema>) => {
    // console.log(values)
    supabase.auth.signInWithPassword(
      {
        email: values.email,
        password: values.password
      }
    )
    .then((result) => {
      if (result.data?.user) {
        router.push("/home");
      } else {
        alert("Could not sign in");
      }
    })
  }

  const signupSubmit = async (values: z.infer<typeof signupSchema>) => {
    /*
    await axios.post("/api/register", {
      email: values.email,
      password: values.password
    })
    */

    const res = await axios.post("/api/register", values);

    const { redirectTo, success } = res.data;

    if (success) {
      router.push(redirectTo);
    }
    else {
      // Handle some other error logic
      router.push(redirectTo);
    }

  }


  const handleGoogleAuth = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/verify-oauth",
        queryParams: {
          access_type: "offline",
//          prompt: "consent"
        }
      }
    })
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
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(loginSubmit)} className="space-y-8">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </TabsContent>

        {/* SIGNUP FORM */}
        <TabsContent value="signup">
        <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(signupSubmit)} className="space-y-8">
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
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