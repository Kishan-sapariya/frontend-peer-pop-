"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleIcon } from "@/component/GoogleIcon";
import AuthShowcase from "@/component/auth/AuthShowcase";

const LoginPage = () => {
  const { login } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        router.push("/feed");
        window.location.href = "/feed";
      } else {
        setErrors({ general: result.message || "Login failed" });
      }
    } catch (error) {
      console.error("🔥 Login error:", error);
      setErrors({ general: error?.message || "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left — form */}
      <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/home" className="mb-10 inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black">
              <Image src="/logo.png" alt="PeerPop" width={20} height={20} className="h-5 w-5 object-contain" />
            </span>
            <span className="text-xl font-bold text-gray-900">PeerPop</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-gray-500">
            Sign in to continue your creative journey.
          </p>

          {/* Google */}
          <Button
            type="button"
            loading={isLoading}
            loadingText="Redirecting..."
            onClick={() => {
              setIsLoading(true);
              window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`;
            }}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-6 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="relative my-7 border-t border-gray-200">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-400">
              or sign in with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputGroup
              id="email"
              name="email"
              icon={<Mail className="h-5 w-5" />}
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              label="Email Address"
            />

            <InputGroup
              id="password"
              name="password"
              icon={<Lock className="h-5 w-5" />}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              label="Password"
              togglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {errors.general && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                {errors.general}
              </p>
            )}

            <Button
              type="submit"
              loading={isLoading}
              loadingText="Signing In..."
              className="w-full rounded-xl bg-yellow-400 py-6 text-lg font-bold text-gray-900 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-yellow-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-yellow-600 transition-colors hover:text-yellow-700"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Are you a brand?{" "}
            <Link
              href="/login/business"
              className="font-semibold text-gray-700 transition-colors hover:text-gray-900"
            >
              Business login
            </Link>
          </p>
        </div>
      </div>

      {/* Right — branded showcase */}
      <AuthShowcase
        image="/auth-creators.webp"
        eyebrow="Welcome to PeerPop"
        title="Where Creators Meet"
        highlight="Opportunity."
        subtitle="Connect, collaborate, and grow with a community built for creators and brands."
        points={[
          "Discover paid collaborations",
          "Connect with leading brands",
          "Grow your creative career",
        ]}
      />
    </div>
  );
};

export default LoginPage;

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
    <Label htmlFor={id} className="font-medium text-gray-700">
      {label}
    </Label>
    <div className="relative mt-1.5">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-xl border border-gray-300 bg-gray-50 py-6 pl-10 pr-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0 ${
          error
            ? "border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500"
            : ""
        }`}
      />
      {togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);
