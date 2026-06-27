"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import AuthShowcase from "@/component/auth/AuthShowcase";

const INDUSTRIES = [
  "Technology",
  "Media & Entertainment",
  "Fashion & Beauty",
  "Food & Beverage",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Travel & Tourism",
  "Automotive",
  "Real Estate",
  "Sports & Fitness",
  "Consulting",
  "Retail",
  "Startups",
  "Other",
];

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const inputCls =
  "rounded-xl border border-gray-300 bg-gray-50 py-6 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400";

export default function BusinessLoginPage() {
  const router = useRouter();
  const { signup, login } = useAuthStore();

  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login({
        email: loginData.email,
        password: loginData.password,
      });
      if (result.success) window.location.href = "/feed";
      else setErrors({ general: result.message || "Login failed" });
    } catch (error) {
      setErrors({ general: error?.message || "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const e = {};
    if (!signupData.companyName.trim()) e.companyName = "Company Name is required";
    if (!signupData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) e.email = "Email is invalid";
    if (!signupData.password) e.password = "Password is required";
    else if (signupData.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (!signupData.industry.trim()) e.industry = "Industry is required";
    if (!signupData.companySize.trim()) e.companySize = "Company size is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result = await signup({
        username: signupData.companyName,
        companyName: signupData.companyName,
        email: signupData.email,
        password: signupData.password,
        companySize: signupData.companySize,
        industry: signupData.industry,
        role: "BUSINESS",
      });
      if (result.success) router.push("/verify-otp");
    } catch (error) {
      setErrors({ general: error?.message || "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left — form */}
      <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link href="/home" className="mb-8 inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black">
              <Image src="/logo.png" alt="PeerPop" width={20} height={20} className="h-5 w-5 object-contain" />
            </span>
            <span className="text-xl font-bold text-gray-900">PeerPop</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            For Brands & Businesses
          </h1>
          <p className="mt-2 text-gray-500">
            Sign in or create your business account.
          </p>

          {errors.general && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
              {errors.general}
            </p>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-7">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className={`mt-1.5 ${inputCls}`}
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className={`mt-1.5 ${inputCls}`}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  loading={isLoading}
                  loadingText="Signing In..."
                  className="w-full rounded-xl bg-yellow-400 py-6 text-lg font-bold text-gray-900 transition-all hover:scale-[1.01] hover:bg-yellow-500"
                >
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    className={`mt-1.5 ${inputCls}`}
                    value={signupData.companyName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, companyName: e.target.value })
                    }
                    placeholder="Your Company Inc."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Industry</Label>
                    <Select
                      value={signupData.industry}
                      onValueChange={(v) =>
                        setSignupData({ ...signupData, industry: v })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Company Size</Label>
                    <Select
                      value={signupData.companySize}
                      onValueChange={(v) =>
                        setSignupData({ ...signupData, companySize: v })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    className={`mt-1.5 ${inputCls}`}
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    className={`mt-1.5 ${inputCls}`}
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    placeholder="Create a strong password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  loading={isLoading}
                  loadingText="Creating Account..."
                  className="w-full rounded-xl bg-yellow-400 py-6 text-lg font-bold text-gray-900 transition-all hover:scale-[1.01] hover:bg-yellow-500"
                >
                  Create Business Account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-gray-500">
            Are you a creator?{" "}
            <Link
              href="/login"
              className="font-semibold text-yellow-600 transition-colors hover:text-yellow-700"
            >
              Creator login
            </Link>
          </p>
        </div>
      </div>

      {/* Right — abstract branded showcase */}
      <AuthShowcase
        tone="dark"
        eyebrow="For Brands & Businesses"
        title="Find the Right Creators for Your"
        highlight="Brand."
        subtitle="Access a network of verified creators and launch authentic campaigns that grow your brand."
        points={[
          "Discover & vet top creators",
          "Launch and manage campaigns",
          "Track performance & ROI",
        ]}
      />
    </div>
  );
}
