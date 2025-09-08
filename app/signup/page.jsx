"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import { GoogleIcon } from "@/component/GoogleIcon";

const SignupPage = () => {
  const { signup, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
        <LoadingSpinner size={40} text="redirecting..." />
      </div>
    );
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "CREATOR",
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-cyan-700 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Join Peer Pop and connect with fellow creators.
            </p>
          </div>

          <Button
            type="button"
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`)
            }
            className="w-full flex items-center justify-center gap-3 py-6 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="relative border-t border-gray-300 my-6"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <InputGroup
              id="username"
              name="username"
              icon={<User className="w-5 h-5" />}
              type="text"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              label="Full Name"
            />

            {/* Email */}
            <InputGroup
              id="email"
              name="email"
              icon={<Mail className="w-5 h-5" />}
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              label="Email Address"
            />

            {/* Password */}
            <InputGroup
              id="password"
              name="password"
              icon={<Lock className="w-5 h-5" />}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              label="Password"
              togglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {/* General Error (if any, though field-specific errors are better) */}
            {errors.general && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {errors.general}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-gray-600 text-center text-sm mt-4">
              {" "}
              {/* Added mt-4 for spacing */}
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

// Reusable input group (no changes needed here beyond icon size)
const InputGroup = ({
  id,
  name,
  label,
  icon,
  type,
  value,
  placeholder,
  onChange,
  error,
  togglePassword,
  showPassword,
}) => (
  <div>
    <Label htmlFor={id} className="text-gray-700 font-medium">
      {label}
    </Label>
    <div className="relative mt-1">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-10 py-6 pr-10 border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none transition-all duration-200 ${
          error ? "border-red-500 ring-red-500" : ""
        }`}
      />
      {togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
