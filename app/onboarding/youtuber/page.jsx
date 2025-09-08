"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Plus,
  Camera,
  DollarSign,
  Play,
  Video,
  Users,
  TrendingUp,
  Loader2,
  Youtube,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useYoutubeStore } from "@/store/useYoutubeStore";

export default function YouTuberOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [languages, setLanguages] = useState([]);

  const handleAddLanguage = () => {
    if (!language.trim() || !level) return;
    setLanguages([...languages, { language, level }]);
    setLanguage("");
    setLevel("");
  };
  const router = useRouter();
  const { createYoutubeProfile } = useYoutubeStore();

  const handleConnectYouTube = () => {
    window.location.href = "http://localhost:5000/api/youtube/auth";
  };

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    channelName: "",
    channelHandle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    profileImage: null,
    coverImage: null,

    // Channel Stats
    subscriberCount: "",
    totalViews: "",
    videoCount: "",
    avgViews: "",
    watchTimeHours: "",
    channelAge: "",

    // Content Info
    contentCategories: [],
    primaryNiche: "",
    uploadFrequency: "",
    videoLength: "",
    contentStyle: [],

    // Social Media
    socialLinks: {
      instagram: "",
      twitter: "",
      linkedin: "",
      tiktok: "",
      twitch: "",
    },
    socialStats: {
      instagram: "",
      twitter: "",
      tiktok: "",
      twitch: "",
    },

    availability: {
      sponsorships: false,
      collaborations: false,
      consulting: false,
      speaking: false,
    },
    rates: {
      sponsorship: "",
      collaboration: "",
      consulting: "",
      speaking: "",
    },

    // Languages & Audience
    languages: [],
    targetAudience: [],
    audienceAge: [],

    // Preferences
    preferences: {
      publicStats: true,
      showRates: false,
      allowCollabs: true,
      showContact: false,
    },
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const contentCategories = [
    "Tech Reviews",
    "Gaming",
    "Beauty & Fashion",
    "Lifestyle",
    "Education",
    "Comedy",
    "Music",
    "Cooking",
    "Travel",
    "Fitness",
    "DIY/Crafts",
    "News & Politics",
    "Science",
    "Entertainment",
    "Business",
    "Tutorials",
    "Vlogs",
    "Unboxing",
    "Product Reviews",
    "Animation",
  ];

  const contentStyles = [
    "Educational",
    "Entertainment",
    "Tutorial",
    "Review",
    "Vlog",
    "Comedy",
    "Documentary",
    "Live Streaming",
    "Shorts/Quick Content",
    "Long-form",
    "Interview",
    "Reaction",
  ];

  const validateForm = () => {
    const requiredFields = {
      firstName: "First Name",
      lastName: "Last Name",
      channelName: "Channel Name",
      channelHandle: "Channel Handle",
      email: "Email Address",
      location: "Location",
      subscriberCount: "Subscriber Count",
      totalViews: "Total Views",
      primaryNiche: "Primary Niche",
    };

    const missingFields = [];

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || formData[field].trim() === "") {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const syncedFormData = {
      ...formData,
      languages: languages,
    };

    try {
      const profileData = {
        data: {
          // Basic Information
          personalInfo: {
            firstName: syncedFormData.firstName,
            lastName: syncedFormData.lastName,
            email: syncedFormData.email,
            phone: syncedFormData.phone,
            location: syncedFormData.location,
            website: syncedFormData.website,
            bio: syncedFormData.bio,
            profileImage: syncedFormData.profileImage,
            coverImage: syncedFormData.coverImage,
          },

          // Channel Information
          channelInfo: {
            channelName: syncedFormData.channelName,
            channelHandle: syncedFormData.channelHandle,
            channelAge: syncedFormData.channelAge,
          },

          // Channel Statistics
          statistics: {
            subscriberCount: parseInt(syncedFormData.subscriberCount) || 0,
            totalViews: parseInt(syncedFormData.totalViews) || 0,
            videoCount: parseInt(syncedFormData.videoCount) || 0,
            avgViews: parseInt(syncedFormData.avgViews) || 0,
            watchTimeHours: parseInt(syncedFormData.watchTimeHours) || 0,
          },

          // Content Information
          contentInfo: {
            primaryNiche: syncedFormData.primaryNiche,
            contentCategories: syncedFormData.contentCategories,
            contentStyle: syncedFormData.contentStyle,
            uploadFrequency: syncedFormData.uploadFrequency,
            videoLength: syncedFormData.videoLength,
          },

          // Social Media
          socialMedia: {
            links: syncedFormData.socialLinks,
            stats: {
              instagram: parseInt(syncedFormData.socialStats.instagram) || 0,
              twitter: parseInt(syncedFormData.socialStats.twitter) || 0,
              tiktok: parseInt(syncedFormData.socialStats.tiktok) || 0,
              twitch: parseInt(syncedFormData.socialStats.twitch) || 0,
            },
          },

          // Business Information
          business: {
            availability: syncedFormData.availability,
            rates: syncedFormData.rates,
          },

          // Additional Information
          additional: {
            languages: syncedFormData.languages,
            targetAudience: syncedFormData.targetAudience,
            audienceAge: syncedFormData.audienceAge,
          },

          preferences: syncedFormData.preferences,
        },
      };

      // Call the Zustand store action
      const result = await createYoutubeProfile(profileData);

      if (result) {
        router.push("/feed");
      }
    } catch (error) {
      console.error("Error creating YouTube profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Creator!</h2>
              <p className="text-gray-600">
                Let's set up your YouTube creator profile
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center items-center">
                <Button
                  onClick={handleConnectYouTube}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                >
                  <Youtube className="w-5 h-5" />
                  <span className="font-medium">Connect with YouTube</span>
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Recommended for real-time insights. We only request{" "}
                <strong>read-only access</strong> to your public stats — we
                can’t post or modify anything in your account.
              </p>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="channelName">Channel Name *</Label>
              <Input
                id="channelName"
                value={formData.channelName}
                onChange={(e) =>
                  setFormData({ ...formData, channelName: e.target.value })
                }
                placeholder="Your YouTube channel name"
              />
            </div>

            <div>
              <Label htmlFor="channelHandle">Channel Handle *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  @
                </span>
                <Input
                  id="channelHandle"
                  value={formData.channelHandle}
                  onChange={(e) =>
                    setFormData({ ...formData, channelHandle: e.target.value })
                  }
                  placeholder="yourchannelhandle"
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, State/Country"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Channel Description *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell viewers about your channel, what content you create, and what makes you unique..."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Channel Statistics</h2>
              <p className="text-gray-600">
                Help peers understand your channel's reach and performance
              </p>
            </div>

            {/* Manual Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subscriberCount">Subscriber Count *</Label>
                <Input
                  id="subscriberCount"
                  value={formData.subscriberCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subscriberCount: e.target.value,
                    })
                  }
                  placeholder="e.g., 250000"
                />
              </div>
              <div>
                <Label htmlFor="totalViews">Total Views *</Label>
                <Input
                  id="totalViews"
                  value={formData.totalViews}
                  onChange={(e) =>
                    setFormData({ ...formData, totalViews: e.target.value })
                  }
                  placeholder="e.g., 15000000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="videoCount">Total Videos</Label>
                <Input
                  id="videoCount"
                  value={formData.videoCount}
                  onChange={(e) =>
                    setFormData({ ...formData, videoCount: e.target.value })
                  }
                  placeholder="e.g., 450"
                />
              </div>
              <div>
                <Label htmlFor="avgViews">Average Views per Video</Label>
                <Input
                  id="avgViews"
                  value={formData.avgViews}
                  onChange={(e) =>
                    setFormData({ ...formData, avgViews: e.target.value })
                  }
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="watchTimeHours">Total Watch Time (Hours)</Label>
                <Input
                  id="watchTimeHours"
                  value={formData.watchTimeHours}
                  onChange={(e) =>
                    setFormData({ ...formData, watchTimeHours: e.target.value })
                  }
                  placeholder="e.g., 500000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="channelAge">Channel Age</Label>
              <Select
                value={formData.channelAge}
                onValueChange={(value) =>
                  setFormData({ ...formData, channelAge: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="How long have you been creating?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-6months">0-6 months</SelectItem>
                  <SelectItem value="6months-1year">
                    6 months - 1 year
                  </SelectItem>
                  <SelectItem value="1-2years">1-2 years</SelectItem>
                  <SelectItem value="2-5years">2-5 years</SelectItem>
                  <SelectItem value="5+years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Content & Style</h2>
              <p className="text-gray-600">
                Tell us about the content you create
              </p>
            </div>

            <div>
              <Label>Primary Niche *</Label>
              <Select
                value={formData.primaryNiche}
                onValueChange={(value) =>
                  setFormData({ ...formData, primaryNiche: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your main content category" />
                </SelectTrigger>
                <SelectContent>
                  {contentCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Content Categories</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all categories you create content for
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {contentCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.contentCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            contentCategories: [
                              ...formData.contentCategories,
                              category,
                            ],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            contentCategories:
                              formData.contentCategories.filter(
                                (c) => c !== category
                              ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Content Style</Label>
              <p className="text-sm text-gray-500 mb-3">
                What's your content style?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {contentStyles.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={style}
                      checked={formData.contentStyle.includes(style)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            contentStyle: [...formData.contentStyle, style],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            contentStyle: formData.contentStyle.filter(
                              (s) => s !== style
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={style} className="text-sm">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="uploadFrequency">Upload Frequency</Label>
                <Select
                  value={formData.uploadFrequency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, uploadFrequency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How often do you upload?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="3-4times-week">
                      3-4 times per week
                    </SelectItem>
                    <SelectItem value="2-3times-week">
                      2-3 times per week
                    </SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="videoLength">Average Video Length</Label>
                <Select
                  value={formData.videoLength}
                  onValueChange={(value) =>
                    setFormData({ ...formData, videoLength: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Typical video duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1min">Under 1 minute</SelectItem>
                    <SelectItem value="1-5min">1-5 minutes</SelectItem>
                    <SelectItem value="5-10min">5-10 minutes</SelectItem>
                    <SelectItem value="10-20min">10-20 minutes</SelectItem>
                    <SelectItem value="20-30min">20-30 minutes</SelectItem>
                    <SelectItem value="30min-1hour">
                      30 minutes - 1 hour
                    </SelectItem>
                    <SelectItem value="over-1hour">Over 1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Social Media & Audience
              </h2>
              <p className="text-gray-600">
                Connect your other social platforms
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          instagram: e.target.value,
                        },
                      })
                    }
                    placeholder="@yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="instagramFollowers">
                    Instagram Followers
                  </Label>
                  <Input
                    id="instagramFollowers"
                    value={formData.socialStats.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialStats: {
                          ...formData.socialStats,
                          instagram: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 50000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter">Twitter/X Handle</Label>
                  <Input
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          twitter: e.target.value,
                        },
                      })
                    }
                    placeholder="@yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="twitterFollowers">Twitter/X Followers</Label>
                  <Input
                    id="twitterFollowers"
                    value={formData.socialStats.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialStats: {
                          ...formData.socialStats,
                          twitter: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 25000"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <Label>Content Languages</Label>
              <span className="ml-2 text-xs text-muted-foreground">
                {languages.length} added
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  placeholder="Language (e.g., English)"
                  className="flex-1"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="conversational">
                      Conversational
                    </SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddLanguage}
                  disabled={!language.trim() || !level}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {languages.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {languages.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <span className="font-medium">{item.language}</span>
                      <span className="ml-2 px-2 py-0.5 rounded bg-muted text-xs">
                        {item.level}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Business & Collaboration
              </h2>
              <p className="text-gray-600">Set your availability and rates</p>
            </div>

            <div>
              <Label>I'm Available For:</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {[
                  { key: "sponsorships", label: "Sponsored Content" },
                  { key: "collaborations", label: "Creator Collaborations" },
                  { key: "consulting", label: "YouTube Consulting" },
                  { key: "speaking", label: "Speaking Engagements" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center space-x-3 p-3 border rounded-lg"
                  >
                    <Checkbox
                      id={item.key}
                      checked={formData.availability[item.key]}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          availability: {
                            ...formData.availability,
                            [item.key]: checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={item.key}>{item.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Rates (Optional)</Label>
              <p className="text-sm text-gray-500 mb-3">
                Help brands and collaborators understand your pricing
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sponsorshipRate">Sponsorship Rate</Label>
                  <Input
                    id="sponsorshipRate"
                    value={formData.rates.sponsorship}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          sponsorship: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $5,000-10,000"
                  />
                </div>
                <div>
                  <Label htmlFor="consultingRate">
                    Consulting Rate (per hour)
                  </Label>
                  <Input
                    id="consultingRate"
                    value={formData.rates.consulting}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          consulting: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="collaborationRate">Collaboration Rate</Label>
                  <Input
                    id="collaborationRate"
                    value={formData.rates.collaboration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          collaboration: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Revenue Share"
                  />
                </div>
                <div>
                  <Label htmlFor="speakingRate">Speaking Fee</Label>
                  <Input
                    id="speakingRate"
                    value={formData.rates.speaking}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: { ...formData.rates, speaking: e.target.value },
                      })
                    }
                    placeholder="e.g., $2,500-5,000"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="www.yourwebsite.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Business Phone (Optional)</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 1234567890"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Privacy & Preferences</h2>
              <p className="text-gray-600">
                Control how your profile appears to others
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "publicStats",
                  label: "Show channel statistics publicly",
                  description:
                    "Display subscriber count, views, and other metrics",
                },
                {
                  key: "showRates",
                  label: "Show rates publicly",
                  description:
                    "Display your collaboration and sponsorship rates",
                },
                {
                  key: "allowCollabs",
                  label: "Allow collaboration requests",
                  description:
                    "Let other creators reach out for collaborations",
                },
                {
                  key: "showContact",
                  label: "Show contact information",
                  description: "Display your business email and phone number",
                },
              ].map((pref) => (
                <div
                  key={pref.key}
                  className="flex items-start space-x-3 p-4 border rounded-lg"
                >
                  <Checkbox
                    id={pref.key}
                    checked={formData.preferences[pref.key]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          [pref.key]: checked,
                        },
                      })
                    }
                  />
                  <div>
                    <Label htmlFor={pref.key} className="font-medium">
                      {pref.label}
                    </Label>
                    <p className="text-sm text-gray-500">{pref.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">
                🎬 You're ready to go live!
              </h3>
              <p className="text-red-800 text-sm">
                Your YouTube creator profile will help you connect with other
                creators, find collaboration opportunities, and grow your
                channel through the Peerpop community.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 mt-12">
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
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-8">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isSubmitting}
              >
                Previous
              </Button>
              <Button
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Profile...
                  </>
                ) : currentStep === totalSteps ? (
                  "Create Profile"
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
