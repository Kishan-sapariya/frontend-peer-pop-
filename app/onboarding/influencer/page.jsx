"use client";

import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Plus,
  Camera,
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Eye,
  BarChart3,
} from "lucide-react";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { useRouter } from "next/navigation";
import { LocationSelector } from "@/component/LocationSelector";

export default function InfluencerOnboarding() {
  const router = useRouter();
  const { createInfluencerProfile } = useInfluencerStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    customCity: "",
    website: "",
    bio: "",
    profileImage: null,
    coverImage: null,

    // Niche & Content
    primaryNiche: "",
    contentCategories: [],
    contentTypes: [],
    postingFrequency: "",
    contentStyle: [],

    // Social Media Stats
    socialPlatforms: {
      instagram: {
        link: "",
        followers: "",
        engagement: "",
        verified: false,
      },
      youtube: {
        link: "",
        subscribers: "",
        avgViews: "",
        verified: false,
      },
      twitter: {
        link: "",
        followers: "",
        engagement: "",
        verified: false,
      },
    },

    // Audience Demographics
    audienceAge: [],
    audienceGender: "",
    topLocations: [],
    audienceInterests: [],

    // Brand Partnerships
    brandPartnerships: "",
    campaignsCompleted: "",
    avgCampaignRate: "",
    preferredBrands: [],

    // Business
    availability: {
      sponsoredPosts: false,
      stories: false,
      reels: false,
      youtube: false,
      events: false,
      ambassadorships: false,
    },
    rates: {
      instagramPost: "",
      instagramStory: "",
      youtubeIntegration: "",
      eventAppearance: "",
    },

    // Content Creation
    equipment: [],
    editingSoftware: [],
    languages: [],

    // Preferences
    preferences: {
      publicStats: true,
      showRates: false,
      allowBrandOutreach: true,
      showContact: false,
    },
  });

  // Validation function (simple required fields)
  const validateForm = () => {
    const requiredFields = {
      firstName: "First Name",
      lastName: "Last Name",
      displayName: "Display Name",
      email: "Email Address",
      bio: "Bio",
    };
    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && formData[field].trim() === "")
      ) {
        missingFields.push(label);
      }
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }
    return true;
  };

  // handleSubmit function
  const handleAddLanguage = () => {
    if (!language.trim() || !level) return;
    setLanguages([...languages, { language, level }]);
    setLanguage("");
    setLevel("");
  };

  const handleRemoveLanguage = (idx) => {
    setLanguages(languages.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Prepare the profileData object for submission
      const profileData = {
        data: {
          // Basic Information
          personalInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            displayName: formData.displayName,
            email: formData.email,
            phone: formData.phone,
            state: formData.state,
            city: formData.city,
            customCity: formData.customCity,
            website: formData.website,
            bio: formData.bio,
            profileImage: formData.profileImage,
            coverImage: formData.coverImage,
          },
          // Niche & Content
          contentInfo: {
            primaryNiche: formData.primaryNiche,
            contentCategories: formData.contentCategories,
            contentTypes: formData.contentTypes,
            postingFrequency: formData.postingFrequency,
            contentStyle: formData.contentStyle,
          },
          // Social Media
          socialMedia: {
            platforms: formData.socialPlatforms,
          },
          // Audience
          audience: {
            age: formData.audienceAge,
            gender: formData.audienceGender,
            topLocations: formData.topLocations,
            interests: formData.audienceInterests,
          },
          // Brand Partnerships
          brand: {
            partnerships: formData.brandPartnerships,
            campaignsCompleted: formData.campaignsCompleted,
            avgCampaignRate: formData.avgCampaignRate,
            preferredBrands: formData.preferredBrands,
          },
          // Business
          business: {
            availability: formData.availability,
            rates: formData.rates,
          },
          // Content Creation
          contentCreation: {
            equipment: formData.equipment,
            editingSoftware: formData.editingSoftware,
            languages: languages,
          },
          preferences: formData.preferences,
        },
      };
      const result = await createInfluencerProfile(profileData);
      if (result) {
        window.location.href = "/feed";
      }
    } catch (error) {
      console.error("Error creating influencer profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const niches = [
    "Fashion & Style",
    "Beauty & Skincare",
    "Lifestyle",
    "Travel",
    "Food & Cooking",
    "Fitness & Health",
    "Technology",
    "Gaming",
    "Parenting",
    "Home & Decor",
    "Business & Finance",
    "Education",
    "Entertainment",
    "Art & Design",
    "Music",
    "Sports",
    "Automotive",
    "Pets",
    "Photography",
    "Sustainability",
  ];

  const contentTypes = [
    "Photos",
    "Videos",
    "Stories",
    "Reels/Short Videos",
    "Live Streams",
    "IGTV/Long Videos",
    "Carousels",
    "User-Generated Content",
    "Behind-the-Scenes",
    "Tutorials",
    "Reviews",
    "Unboxing",
    "Hauls",
    "Vlogs",
    "Challenges",
    "Collaborations",
  ];

  const contentStyles = [
    "Minimalist",
    "Colorful",
    "Dark & Moody",
    "Bright & Airy",
    "Vintage",
    "Modern",
    "Candid",
    "Posed",
    "Professional",
    "Casual",
    "Artistic",
    "Documentary",
    "Humorous",
    "Inspirational",
    "Educational",
    "Entertaining",
  ];

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
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Influencer!</h2>
              <p className="text-gray-600">
                Let's create your influencer profile
              </p>
            </div>

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
              <Label htmlFor="displayName">Display Name/Brand Name *</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                placeholder="How you want to be known (e.g., @username or brand name)"
              />
            </div>

            <div>
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
            </div>

            <LocationSelector
              selectedState={formData.state}
              city={formData.city}
              customCity={formData.customCity}
              onLocationChange={(updates) =>
                setFormData({ ...formData, ...updates })
              }
            />

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell your audience about yourself, your content, and what makes you unique..."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            <div>
              <Label htmlFor="website">Website/Link in Bio</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="www.yourwebsite.com or linktr.ee/username"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Content & Niche</h2>
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
                  <SelectValue placeholder="Select your main content niche" />
                </SelectTrigger>
                <SelectContent>
                  {niches.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche}
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
                {niches.map((category) => (
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
              <Label>Content Types</Label>
              <p className="text-sm text-gray-500 mb-3">
                What types of content do you create?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {contentTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.contentTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            contentTypes: [...formData.contentTypes, type],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            contentTypes: formData.contentTypes.filter(
                              (t) => t !== type
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={type} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Content Style</Label>
              <p className="text-sm text-gray-500 mb-3">
                How would you describe your aesthetic?
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

            <div>
              <Label htmlFor="postingFrequency">Posting Frequency</Label>
              <Select
                value={formData.postingFrequency}
                onValueChange={(value) =>
                  setFormData({ ...formData, postingFrequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often do you post?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-daily">
                    Multiple times daily
                  </SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="several-weekly">
                    Several times per week
                  </SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Instagram Statistics</h2>
              <p className="text-gray-600">
                Your Instagram presence and metrics
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instagramLink">Instagram Link *</Label>
                <div className="relative">
                  <Input
                    id="instagramLink"
                    value={formData.socialPlatforms.instagram.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          instagram: {
                            ...formData.socialPlatforms.instagram,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="https://www.instagram.com/instagram/"
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instagramFollowers">Followers *</Label>
                <Input
                  id="instagramFollowers"
                  value={formData.socialPlatforms.instagram.followers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialPlatforms: {
                        ...formData.socialPlatforms,
                        instagram: {
                          ...formData.socialPlatforms.instagram,
                          followers: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="instagramEngagement">Engagement Rate (%)</Label>
                <Input
                  id="instagramEngagement"
                  value={formData.socialPlatforms.instagram.engagement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialPlatforms: {
                        ...formData.socialPlatforms,
                        instagram: {
                          ...formData.socialPlatforms.instagram,
                          engagement: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="e.g., 4.5"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="instagramVerified"
                  checked={formData.socialPlatforms.instagram.verified}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      socialPlatforms: {
                        ...formData.socialPlatforms,
                        instagram: {
                          ...formData.socialPlatforms.instagram,
                          verified: checked,
                        },
                      },
                    })
                  }
                />
                <Label htmlFor="instagramVerified">Verified Account</Label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Other Social Platforms
              </h2>
              <p className="text-gray-600">
                Connect your other social media accounts
              </p>
            </div>

            {/* YouTube */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">YouTube</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="youtubeLink">Channel Link</Label>
                  <Input
                    id="youtubeLink"
                    value={formData.socialPlatforms.youtube.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          youtube: {
                            ...formData.socialPlatforms.youtube,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Your Channel link"
                  />
                </div>
                <div>
                  <Label htmlFor="youtubeSubscribers">Subscribers</Label>
                  <Input
                    id="youtubeSubscribers"
                    value={formData.socialPlatforms.youtube.subscribers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          youtube: {
                            ...formData.socialPlatforms.youtube,
                            subscribers: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g., 25000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="youtubeAvgViews">Average Views</Label>
                  <Input
                    id="youtubeAvgViews"
                    value={formData.socialPlatforms.youtube.avgViews}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          youtube: {
                            ...formData.socialPlatforms.youtube,
                            avgViews: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g., 15000"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="youtubeVerified"
                    checked={formData.socialPlatforms.youtube.verified}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          youtube: {
                            ...formData.socialPlatforms.youtube,
                            verified: checked,
                          },
                        },
                      })
                    }
                  />
                  <Label htmlFor="youtubeVerified">Verified Account</Label>
                </div>
              </div>
            </div>

            {/* Twitter */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">Twitter/X</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="twitterLink">Link</Label>
                  <div className="relative">
                    <Input
                      id="twitterLink"
                      value={formData.socialPlatforms.twitter.link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialPlatforms: {
                            ...formData.socialPlatforms,
                            twitter: {
                              ...formData.socialPlatforms.twitter,
                              link: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="your twitter link"
                      className="pl-8"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="twitterFollowers">Followers</Label>
                  <Input
                    id="twitterFollowers"
                    value={formData.socialPlatforms.twitter.followers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          twitter: {
                            ...formData.socialPlatforms.twitter,
                            followers: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g., 15000"
                  />
                </div>
                <div>
                  <Label htmlFor="twitterEngagement">Engagement (%)</Label>
                  <Input
                    id="twitterEngagement"
                    value={formData.socialPlatforms.twitter.engagement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialPlatforms: {
                          ...formData.socialPlatforms,
                          twitter: {
                            ...formData.socialPlatforms.twitter,
                            engagement: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g., 2.1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Audience Demographics</h2>
              <p className="text-gray-600">Tell us about your audience</p>
            </div>

            <div>
              <Label>Audience Age Groups</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select the age groups that make up your audience
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { range: "13-17", label: "13-17 years" },
                  { range: "18-24", label: "18-24 years" },
                  { range: "25-34", label: "25-34 years" },
                  { range: "35-44", label: "35-44 years" },
                  { range: "45-54", label: "45-54 years" },
                  { range: "55+", label: "55+ years" },
                ].map((age) => (
                  <div key={age.range} className="flex items-center space-x-2">
                    <Checkbox
                      id={age.range}
                      checked={formData.audienceAge.includes(age.range)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            audienceAge: [...formData.audienceAge, age.range],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            audienceAge: formData.audienceAge.filter(
                              (a) => a !== age.range
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={age.range}>{age.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="audienceGender">Primary Audience Gender</Label>
              <Select
                value={formData.audienceGender}
                onValueChange={(value) =>
                  setFormData({ ...formData, audienceGender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary gender demographic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mostly-female">
                    Mostly Female (70%+)
                  </SelectItem>
                  <SelectItem value="mostly-male">
                    Mostly Male (70%+)
                  </SelectItem>
                  <SelectItem value="balanced">Balanced Mix</SelectItem>
                  <SelectItem value="female-majority">
                    Female Majority (55-70%)
                  </SelectItem>
                  <SelectItem value="male-majority">
                    Male Majority (55-70%)
                  </SelectItem>
                </SelectContent>
              </Select>
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

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Brand Partnerships & Business
              </h2>
              <p className="text-gray-600">
                Your collaboration experience and rates
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brandPartnerships">
                  Total Brand Partnerships
                </Label>
                <Input
                  id="brandPartnerships"
                  value={formData.brandPartnerships}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brandPartnerships: e.target.value,
                    })
                  }
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <Label htmlFor="campaignsCompleted">Campaigns Completed</Label>
                <Input
                  id="campaignsCompleted"
                  value={formData.campaignsCompleted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      campaignsCompleted: e.target.value,
                    })
                  }
                  placeholder="e.g., 40"
                />
              </div>
            </div>

            <div>
              <Label>I'm Available For:</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {[
                  { key: "sponsoredPosts", label: "Sponsored Posts" },
                  { key: "stories", label: "Story Promotions" },
                  { key: "reels", label: "Reels/Short Videos" },
                  { key: "youtube", label: "YouTube Integrations" },
                  { key: "events", label: "Event Appearances" },
                  { key: "ambassadorships", label: "Brand Ambassadorships" },
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
                Help brands understand your pricing (you can keep this private)
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagramPostRate">Instagram Post</Label>
                  <Input
                    id="instagramPostRate"
                    value={formData.rates.instagramPost}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          instagramPost: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $500-1,500"
                  />
                </div>
                <div>
                  <Label htmlFor="instagramStoryRate">Instagram Story</Label>
                  <Input
                    id="instagramStoryRate"
                    value={formData.rates.instagramStory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          instagramStory: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $200-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <Label htmlFor="youtubeIntegrationRate">
                    YouTube Integration
                  </Label>
                  <Input
                    id="youtubeIntegrationRate"
                    value={formData.rates.youtubeIntegration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          youtubeIntegration: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $1,000-3,000"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Business Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
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
                  label: "Show social media statistics publicly",
                  description:
                    "Display follower counts, engagement rates, and other metrics",
                },
                {
                  key: "showRates",
                  label: "Show rates publicly",
                  description:
                    "Display your collaboration rates on your profile",
                },
                {
                  key: "allowBrandOutreach",
                  label: "Allow brand outreach",
                  description:
                    "Let brands and agencies contact you for partnerships",
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

            <div>
              <Label>Content Creation Equipment</Label>
              <Textarea
                value={formData.equipment.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    equipment: e.target.value.split(", "),
                  })
                }
                placeholder="List your camera, lighting, and other equipment (e.g., iPhone 15 Pro, Ring Light, Tripod)"
                rows={2}
              />
            </div>

            <div>
              <Label>Editing Software</Label>
              <Textarea
                value={formData.editingSoftware.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    editingSoftware: e.target.value.split(", "),
                  })
                }
                placeholder="What software do you use for editing? (e.g., VSCO, Lightroom, CapCut, Final Cut Pro)"
                rows={2}
              />
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-900 mb-2">
                ✨ Ready to influence!
              </h3>
              <p className="text-pink-800 text-sm">
                Your influencer profile will help you connect with brands, other
                creators, and grow your influence through the Peerpop community.
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
      <div className="max-w-2xl mx-auto px-4">
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
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Creating Profile...</>
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
