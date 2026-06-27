"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";
import { GoogleIcon } from "@/component/GoogleIcon";
import AuthShowcase from "@/component/auth/AuthShowcase";

const SignupPage = () => {
  const { signup, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // All hooks must run unconditionally (before any early return).
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "CREATOR",
      });
      if (result.success) {
        window.location.href = "/verify-otp";
      }
    } catch (error) {
      console.error(error.message || "Signup failed. Please try again.");
      setErrors({ general: error.message || "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <LoadingSpinner className="text-gray-900" size={40} text="redirecting..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left — branded showcase (alternated vs login) */}
      <AuthShowcase
        image="/auth-creators.webp"
        eyebrow="Join the community"
        title="Start Your Creator"
        highlight="Journey."
        subtitle="Create your free account and unlock opportunities with brands and fellow creators."
        points={[
          "Free to join — no credit card",
          "Build a standout creator profile",
          "Get discovered by leading brands",
        ]}
      />

      {/* Right — form */}
      <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link href="/home" className="mb-10 inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black">
              <Image src="/logo.png" alt="PeerPop" width={20} height={20} className="h-5 w-5 object-contain" />
            </span>
            <span className="text-xl font-bold text-gray-900">PeerPop</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-500">
            Join PeerPop and connect with fellow creators.
          </p>

          <Button
            type="button"
            disabled={isLoading}
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`)
            }
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-6 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="relative my-7 border-t border-gray-200">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-400">
              or sign up with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputGroup
              id="username"
              name="username"
              icon={<User className="h-5 w-5" />}
              type="text"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              label="Full Name"
            />
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
              loadingText="Creating Account..."
              className="w-full rounded-xl bg-yellow-400 py-6 text-lg font-bold text-gray-900 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-yellow-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
            >
              Sign Up
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-yellow-600 transition-colors hover:text-yellow-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

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
