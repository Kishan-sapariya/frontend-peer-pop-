"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  Mail,
  Briefcase,
  Target,
  Star,
  Award,
  TrendingUp,
  Eye,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Camera,
  Video,
  Palette,
  Music,
  Megaphone,
  Film,
  PenTool,
  Code,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function BusinessLoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [error, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    password: "",
  });

  const { signup, login } = useAuthStore();

  const industries = [
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
    "Non-profit",
    "Government",
    "Consulting",
    "Manufacturing",
    "Retail",
    "Startups",
    "Other",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const businessFeatures = [
    {
      icon: Target,
      title: "Talent Discovery",
      description:
        "Find the perfect creators for your campaigns with advanced search and filtering",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Campaign Management",
      description:
        "Manage multiple campaigns, track progress, and collaborate with creative teams",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Track campaign performance, ROI, and creator engagement metrics",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Star,
      title: "Verified Creators",
      description:
        "Access our network of verified, professional creators across all platforms",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Briefcase,
      title: "Project Collaboration",
      description:
        "Streamlined workflows for briefing, feedback, and content approval",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Built-in quality checks and brand safety measures for all content",
      color: "bg-rose-100 text-rose-600",
    },
  ];

  const creatorCategories = [
    { name: "YouTubers", icon: Video, count: "2.5K+", color: "bg-red-500" },
    { name: "Influencers", icon: Camera, count: "1.8K+", color: "bg-pink-500" },
    {
      name: "Designers",
      icon: Palette,
      count: "4.2K+",
      color: "bg-emerald-500",
    },
    { name: "Musicians", icon: Music, count: "2.8K+", color: "bg-indigo-500" },
    {
      name: "Marketers",
      icon: Megaphone,
      count: "1.5K+",
      color: "bg-orange-500",
    },
    { name: "Filmmakers", icon: Film, count: "1.2K+", color: "bg-cyan-500" },
    { name: "Writers", icon: PenTool, count: "3.1K+", color: "bg-violet-500" },
    { name: "Developers", icon: Code, count: "1.9K+", color: "bg-blue-500" },
  ];

  const successStories = [
    {
      company: "TechFlow Inc.",
      campaign: "Product Launch Campaign",
      result: "300% increase in brand awareness",
      creators: 15,
      reach: "2.5M",
    },
    {
      company: "StyleCo Fashion",
      campaign: "Summer Collection 2024",
      result: "150% boost in sales",
      creators: 8,
      reach: "1.8M",
    },
    {
      company: "FoodieApp",
      campaign: "App Launch & User Acquisition",
      result: "500K new app downloads",
      creators: 12,
      reach: "3.2M",
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login({
        email: loginData.email,
        password: loginData.password,
      });
      if (result.success) {
        router.push("/feed");
      }
    } catch (error) {
      console.log(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!signupData.companyName.trim())
      newErrors.companyName = "Comapny Name is required";
    if (!signupData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email))
      newErrors.email = "Email is invalid";
    if (!signupData.password) newErrors.password = "Password is required";
    else if (signupData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!signupData.industry.trim())
      newErrors.industry = "Industry is required";
    if (!signupData.companySize.trim())
      newErrors.companySize = "Company size is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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
      if (result.success) {
        router.push("/verify-otp");
      }
    } catch (error) {
      console.log(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Right Side - Login/Signup Form */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Get Started Today
                </CardTitle>
                <p className="text-gray-600">
                  Join hundreds of brands already using Peerpop
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Business Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          placeholder="your.email@company.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                      >
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4"></div>
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={signupData.companyName}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              companyName: e.target.value,
                            })
                          }
                          placeholder="Your Company Inc."
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="industry">Industry</Label>
                          <Select
                            value={signupData.industry}
                            onValueChange={(value) =>
                              setSignupData({ ...signupData, industry: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="companySize">Company Size</Label>
                          <Select
                            value={signupData.companySize}
                            onValueChange={(value) =>
                              setSignupData({
                                ...signupData,
                                companySize: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              {companySizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
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
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          placeholder="your.email@company.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signupPassword">Password</Label>
                        <Input
                          id="signupPassword"
                          type="password"
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={signupData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              setSignupData({
                                ...signupData,
                                agreeToTerms: checked,
                              })
                            }
                            required
                          />
                          <Label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <Button
                              variant="link"
                              className="p-0 h-auto text-sm"
                            >
                              Terms of Service
                            </Button>{" "}
                            and{" "}
                            <Button
                              variant="link"
                              className="p-0 h-auto text-sm"
                            >
                              Privacy Policy
                            </Button>
                          </Label>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                        disabled={!signupData.agreeToTerms}
                      >
                        Create Business Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Need help getting started?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-300 hover:bg-orange-50 bg-transparent"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Sales
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-300 hover:bg-orange-50 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Left Side - Information */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div>
              <Badge className="bg-gradient-to-r from-orange-400 to-amber-500 text-white mb-4 shadow-lg">
                <Building2 className="w-3 h-3 mr-1" />
                For Businesses & Brands
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Connect with Top Creative Talent
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access our network of 18,000+ verified creators, influencers,
                and creative professionals. Launch campaigns, find talent, and
                grow your brand with authentic creative partnerships.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  18K+
                </div>
                <div className="text-sm text-gray-600">Verified Creators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Brand Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  2.5K+
                </div>
                <div className="text-sm text-gray-600">Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  95%
                </div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Creator Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Access Every Creative Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {creatorCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div
                        className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-medium text-sm text-gray-800">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Why Businesses Choose Peerpop
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Success Stories */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Success Stories
              </h2>
              <div className="space-y-4">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {story.company}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-green-300 text-green-600"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Success
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {story.campaign}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-orange-600">
                          {story.result}
                        </div>
                        <div className="text-xs text-gray-500">Result</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-amber-600">
                          {story.creators}
                        </div>
                        <div className="text-xs text-gray-500">Creators</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-yellow-600">
                          {story.reach}
                        </div>
                        <div className="text-xs text-gray-500">Reach</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
