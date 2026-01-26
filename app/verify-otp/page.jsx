"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Key } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/component/LoadingSpinner";

const VerifyOtpPage = () => {
  const { verifyOtp, signedUpEmail } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!signedUpEmail) {
      router.replace("/signup");
    }
  }, [signedUpEmail, router]);

  if (!signedUpEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size={40} text="Preparing verification..." />
      </div>
    );
  }

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
    if (!formData.otp.trim()) newErrors.otp = "OTP is required";
    else if (!/^\d{6}$/.test(formData.otp))
      newErrors.otp = "OTP must be a 6-digit number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const result = await verifyOtp({
        email: signedUpEmail,
        otp: formData.otp,
      });
      if (result.success) {
        router.push(
          `${
            result.user.role === "CREATOR"
              ? "/onboarding"
              : "/onboarding/business"
          }`
        );
        window.location.href = `${
          result.user.role === "CREATOR"
            ? "/onboarding"
            : "/onboarding/business"
        }`;
      } else {
        console.log(
          result.message || "OTP verification failed. Please try again."
        );
      }
    } catch (error) {
      console.log(error.message || "OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold text-gray-900">Peer Pop</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Verify OTP
            </h2>
            <p className="text-gray-700 mb-2 text-sm">
              Enter the 6-digit OTP sent to{" "}
              {signedUpEmail ? (
                <span className="font-semibold text-yellow-600">
                  {signedUpEmail}
                </span>
              ) : (
                "your email address"
              )}
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputGroup
              id="otp"
              name="otp"
              icon={<Key className="w-5 h-5" />}
              type="text"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleInputChange}
              error={errors.otp}
              label="OTP"
            />

            {errors.general && (
              <p className="text-red-600 text-sm mt-1 text-center font-medium">
                {errors.general}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <p className="text-gray-700 text-center text-sm mt-4">
              Didn't receive OTP?{" "}
              <span className="text-yellow-600 hover:text-yellow-700 font-semibold cursor-pointer transition-colors duration-200">
                Resend
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;

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
}) => (
  <div>
    <Label htmlFor={id} className="text-gray-900 font-medium">
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
        className={`pl-10 py-6 pr-10 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none transition-all duration-200 text-gray-900 ${
          error ? "border-red-600 ring-red-600" : ""
        }`}
      />
    </div>
    {error && <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>}
  </div>
);
