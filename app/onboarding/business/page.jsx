"use client";
import { useEffect, useState } from "react";
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
import { useBusinessStore } from "@/store/useBusinessStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BusinessOnboardingForm() {
  const { postBusinessDetails } = useBusinessStore();
  const router=useRouter()
  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const [formData, setFormData] = useState({
    about: "",
    website: "",
    phone: "",
    email: "",
    businessType: "",
    headquarters: "",
    subBranches: [""],
    foundingDate: "",
    facebook: "",
    facebookFollowers: null,
    twitter: "",
    twitterFollowers: null,
    linkedin: "",
    linkedinFollowers: null,
    instagram: "",
    instagramFollowers: null,

    gstNumber: "",
    panNumber: "",
    gstFile: null,
    panFile: null,
  });

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBranchChange = (index, value) => {
    const newBranches = [...formData.subBranches];
    newBranches[index] = value;
    handleChange("subBranches", newBranches);
  };

  const addBranch = () => {
    handleChange("subBranches", [...formData.subBranches, ""]);
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
        headquarters: formData.headquarters,
        subBranches: formData.subBranches.filter((b) => b.trim() !== ""),
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
      router.push("/feed")
    } catch (err) {
      console.error("Error submitting business profile:", err);
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
            <p className="text-sm text-gray-500">
              Let's start with the basics. Please provide your company's core
              information.
            </p>
            <div>
              <Label htmlFor="about">About Your Company</Label>
              <Textarea
                id="about"
                placeholder="Tell us about your company, its mission, and what you do..."
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
            <p className="text-sm text-gray-500">
              Help us understand your business structure and industry.
            </p>
            <div>
              <Label htmlFor="businessType">Type of Business</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => handleChange("businessType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soleProprietorship">
                    Sole Proprietorship
                  </SelectItem>
                  <SelectItem value="llc">
                    LLC (Limited Liability Company)
                  </SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="nonprofit">
                    Non-Profit Organization
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[30%]">
              <div>
                <Label htmlFor="foundingDate">Founding Date</Label>
                <Input
                  id="foundingDate"
                  type="date"
                  value={formData.foundingDate}
                  onChange={(e) => handleChange("foundingDate", e.target.value)}
                />
              </div>
            </div>
            <div className="w-[30%]">
              <div>
                <Label htmlFor="headquater">Headquater</Label>
                <Input
                  id="headquater"
                  type="text"
                  placeholder="mumbai,etc"
                  value={formData.headquarters}
                  onChange={(e) => handleChange("headquarters", e.target.value)}
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
            <p className="text-sm text-gray-500">
              Share your social media links and audience size to help people
              find you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook Profile URL</Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/your-page"
                  value={formData.facebook}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="facebookFollowers">Followers</Label>
                <Input
                  id="facebookFollowers"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.facebookFollowers}
                  onChange={(e) =>
                    handleChange(
                      "facebookFollowers",
                      parseInt(e.target.value, 10) || null
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter Profile URL</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/your-handle"
                  value={formData.twitter}
                  onChange={(e) => handleChange("twitter", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="twitterFollowers">Followers</Label>
                <Input
                  id="twitterFollowers"
                  type="number"
                  placeholder="e.g., 10000"
                  value={formData.twitterFollowers}
                  onChange={(e) =>
                    handleChange(
                      "twitterFollowers",
                      parseInt(e.target.value, 10) || null
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/your-company"
                  value={formData.linkedin}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="linkedinFollowers">Followers</Label>
                <Input
                  id="linkedinFollowers"
                  type="number"
                  placeholder="e.g., 2500"
                  value={formData.linkedinFollowers}
                  onChange={(e) =>
                    handleChange(
                      "linkedinFollowers",
                      parseInt(e.target.value, 10) || null
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram Profile URL</Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/your-profile"
                  value={formData.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="instagramFollowers">Followers</Label>
                <Input
                  id="instagramFollowers"
                  type="number"
                  placeholder="e.g., 7500"
                  value={formData.instagramFollowers}
                  onChange={(e) =>
                    handleChange(
                      "instagramFollowers",
                      parseInt(e.target.value, 10) || null
                    )
                  }
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Tax Information 🧾
            </h2>
            <p className="text-sm text-gray-500">
              Please provide your tax and identification documents.
            </p>
            <div>
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                placeholder="Enter GST number"
                value={formData.gstNumber}
                onChange={(e) => handleChange("gstNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gstFile">Upload GST Certificate</Label>
              <Input
                id="gstFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleChange("gstFile", e.target.files[0])}
              />
            </div>
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                placeholder="Enter PAN number"
                value={formData.panNumber}
                onChange={(e) => handleChange("panNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="panFile">Upload PAN Document</Label>
              <Input
                id="panFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleChange("panFile", e.target.files[0])}
              />
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
                className="hover:bg-gray-100"
              >
                Previous
              </Button>
              <Button
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
              >
                {currentStep === totalSteps ? (
                  loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      uploading docs & creating profile
                    </>
                  ) : (
                    "Create Profile"
                  )
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
