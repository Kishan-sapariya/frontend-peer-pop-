"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useBusinessStore } from "@/store/useBusinessStore";
import { useAuthStore } from "@/store/useAuthStore";
import { LocationSelector } from "@/component/LocationSelector";

export default function BusinessProfileUpdateForm() {
  const { businessProfileDetails, postBusinessDetails } = useBusinessStore();
  const { getCurrentUser } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const existingProfile = businessProfileDetails?.businessProfile || {};

  const [formData, setFormData] = useState({
    about: "",
    website: "",
    phone: "",
    email: "",
    businessType: "",
    state: "",
    city: "",
    customCity: "",
    foundingDate: "",
    facebook: "",
    facebookFollowers: "",
    twitter: "",
    twitterFollowers: "",
    linkedin: "",
    linkedinFollowers: "",
    instagram: "",
    instagramFollowers: "",
    gstNumber: "",
    panNumber: "",
    gstFile: null,
    panFile: null,
  });

  useEffect(() => {
    if (!existingProfile || Object.keys(existingProfile).length === 0) return;

    const [city = "", state = ""] =
      existingProfile.headquarters?.split(",") || [];

    setFormData((prev) => {
      if (prev.about === existingProfile.about) return prev;

      return {
        ...prev,
        about: existingProfile.about || "",
        website: existingProfile.website || "",
        phone: existingProfile.phone || "",
        email: existingProfile.supportEmail || "",
        businessType: existingProfile.businessType || "",
        state: state.trim(),
        city: city.trim(),
        foundingDate: existingProfile.foundedYear || "",
        facebook: existingProfile.facebookUrl || "",
        facebookFollowers: existingProfile.facebookFollowers || "",
        twitter: existingProfile.twitterUrl || "",
        twitterFollowers: existingProfile.twitterFollowers || "",
        linkedin: existingProfile.linkedinUrl || "",
        linkedinFollowers: existingProfile.linkedinFollowers || "",
        instagram: existingProfile.instagramUrl || "",
        instagramFollowers: existingProfile.instagramFollowers || "",
        gstNumber: existingProfile.gstNumber || "",
        panNumber: existingProfile.panNumber || "",
      };
    });
  }, [existingProfile?.id]);

  const progress = (currentStep / totalSteps) * 100;

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const payload = {
      basicInfo: {
        about: formData.about,
        businessType: formData.businessType,
        foundedYear: formData.foundingDate,
      },
      contact: {
        website: formData.website,
        phone: formData.phone,
        supportEmail: formData.email,
      },
      location: {
        headquarters: `${formData.customCity || formData.city}, ${
          formData.state
        }`,
      },

      socials: {
        linkedinUrl: formData.linkedin,
        linkedinFollowers: formData.linkedinFollowers,
        twitterUrl: formData.twitter,
        twitterFollowers: formData.twitterFollowers,
        instagramUrl: formData.instagram,
        instagramFollowers: formData.instagramFollowers,
        facebookUrl: formData.facebook,
        facebookFollowers: formData.facebookFollowers,
      },
    };

    try {
      setLoading(true);
      await postBusinessDetails(
        payload.basicInfo,
        payload.contact,
        payload.location,
        payload.socials,
        formData.gstNumber,
        formData.panNumber,
        formData.gstFile,
        formData.panFile
      );
      await getCurrentUser();
      window.location.href = "/feed";
    } catch (err) {
      console.error("Error updating business profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Company Details 📝
            </h2>

            <div>
              <Label htmlFor="about">About Your Company</Label>
              <Textarea
                id="about"
                placeholder="Describe your company and mission..."
                value={formData.about}
                onChange={(e) => handleChange("about", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                placeholder="https://www.yourcompany.com"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Support Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="support@yourcompany.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Business Profile 📈
            </h2>

            <div>
              <Label>Type of Business</Label>
              <Select
                value={formData.businessType}
                onValueChange={(v) => handleChange("businessType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soleProprietorship">
                    Sole Proprietorship
                  </SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="nonprofit">Non-Profit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Founding Date</Label>
                <Input
                  type="date"
                  value={formData.foundingDate}
                  onChange={(e) => handleChange("foundingDate", e.target.value)}
                />
              </div>

              <div>
                <LocationSelector
                  selectedState={formData.state}
                  city={formData.city}
                  customCity={formData.customCity}
                  onLocationChange={(updates) =>
                    setFormData((prev) => ({ ...prev, ...updates }))
                  }
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Social Presence 📱
            </h2>

            {["facebook", "twitter", "linkedin", "instagram"].map(
              (platform) => (
                <div
                  key={platform}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <Label>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)} URL
                    </Label>
                    <Input
                      placeholder={`https://${platform}.com/your-page`}
                      value={formData[platform]}
                      onChange={(e) => handleChange(platform, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Followers</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000"
                      value={formData[`${platform}Followers`]}
                      onChange={(e) =>
                        handleChange(
                          `${platform}Followers`,
                          parseInt(e.target.value, 10) || ""
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Tax Information 🧾
            </h2>

            <div>
              <Label>GST Number</Label>
              <Input
                placeholder="Enter GST number"
                value={formData.gstNumber}
                onChange={(e) => handleChange("gstNumber", e.target.value)}
              />
            </div>

            <div>
              <Label>Upload GST Certificate</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleChange("gstFile", e.target.files[0])}
              />
              {existingProfile.gstCertificateUrl && (
                <p className="text-xs text-gray-500 mt-1">
                  Current file:{" "}
                  <a
                    href={existingProfile.gstCertificateUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View GST Certificate
                  </a>
                </p>
              )}
            </div>

            <div>
              <Label>PAN Number</Label>
              <Input
                placeholder="Enter PAN number"
                value={formData.panNumber}
                onChange={(e) => handleChange("panNumber", e.target.value)}
              />
            </div>

            <div>
              <Label>Upload PAN Document</Label>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleChange("panFile", e.target.files[0])}
              />
              {existingProfile.panDocumentUrl && (
                <p className="text-xs text-gray-500 mt-1">
                  Current file:{" "}
                  <a
                    href={existingProfile.panDocumentUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View PAN Document
                  </a>
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        <Card className="rounded-xl shadow-lg border-none">
          <CardContent className="p-8">
            {renderStep()}

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : currentStep === totalSteps ? (
                  "Update Profile"
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
