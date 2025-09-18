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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Plus,
  Camera,
  DollarSign,
  Mic,
  Laugh,
  Users,
  Star,
} from "lucide-react";
import { useComedianStore } from "@/store/useComedianStore";

export default function ComedianOnboarding() {
  const { createComedianProfile } = useComedianStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    profileImage: null,
    coverImage: null,

    // Comedy Career
    yearsPerforming: "",
    showsPerformed: "",
    avgAudienceSize: "",
    comedyStyle: [],
    primaryVenues: [],
    performanceFrequency: "",

    // Performance Stats
    totalAudience: "",
    specialsReleased: "",
    awardsWon: [],
    mediaAppearances: [],

    // Social Media
    socialLinks: {
      instagram: "",
      twitter: "",
      youtube: "",
    },
    socialStats: {
      instagram: "",
      twitter: "",
      youtube: "",
    },

    // Business
    availability: {
      standup: false,
      corporate: false,
      private: false,
      writing: false,
      podcasts: false,
    },
    rates: {
      standup: "",
      corporate: "",
      private: "",
      writing: "",
      podcast: "",
    },

    // Performance Details
    setLength: "",
    contentRating: "",
    languages: [],
    travelWillingness: "",

    // Preferences
    preferences: {
      publicStats: true,
      showRates: false,
      allowBookings: true,
      showContact: false,
    },
  });

  // Language state for add/remove logic
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [languages, setLanguages] = useState([]);

  const handleAddLanguage = () => {
    if (!language.trim() || !level) return;
    setLanguages([...languages, { language, level }]);
    setLanguage("");
    setLevel("");
  };

  // Validation function similar to YouTuber onboarding
  const validateForm = () => {
    const requiredFields = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      location: "Location",
      yearsPerforming: "Years Performing",
      bio: "Comedy Bio",
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
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const syncedFormData = {
        ...formData,
        languages: languages,
      };
      const profileData = {
        data: {
          // Basic Information
          personalInfo: {
            firstName: syncedFormData.firstName,
            lastName: syncedFormData.lastName,
            stageName: syncedFormData.stageName,
            email: syncedFormData.email,
            phone: syncedFormData.phone,
            location: syncedFormData.location,
            website: syncedFormData.website,
            bio: syncedFormData.bio,
            profileImage: syncedFormData.profileImage,
            coverImage: syncedFormData.coverImage,
          },
          // Comedy Career
          comedyCareer: {
            yearsPerforming: syncedFormData.yearsPerforming,
            showsPerformed: syncedFormData.showsPerformed,
            avgAudienceSize: syncedFormData.avgAudienceSize,
            comedyStyle: syncedFormData.comedyStyle,
            primaryVenues: syncedFormData.primaryVenues,
            performanceFrequency: syncedFormData.performanceFrequency,
          },
          // Performance Stats
          performanceStats: {
            totalAudience: syncedFormData.totalAudience,
            specialsReleased: syncedFormData.specialsReleased,
            awardsWon: syncedFormData.awardsWon,
            mediaAppearances: syncedFormData.mediaAppearances,
          },
          // Social Media
          socialMedia: {
            links: syncedFormData.socialLinks,
            stats: {
              instagram: parseInt(syncedFormData.socialStats.instagram) || 0,
              twitter: parseInt(syncedFormData.socialStats.twitter) || 0,
              youtube: parseInt(syncedFormData.socialStats.youtube) || 0,
            },
          },
          // Business
          business: {
            availability: syncedFormData.availability,
            rates: syncedFormData.rates,
          },
          // Performance Details
          performanceDetails: {
            setLength: syncedFormData.setLength,
            contentRating: syncedFormData.contentRating,
            languages: syncedFormData.languages,
            travelWillingness: syncedFormData.travelWillingness,
          },
          preferences: syncedFormData.preferences,
        },
      };
      const result = await createComedianProfile(profileData);
      if (result) {
        window.location.href = "/feed";
      }
    } catch (error) {
      console.error("Error creating comedian profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const comedyStyles = [
    "Observational",
    "Self-Deprecating",
    "Storytelling",
    "One-Liners",
    "Physical Comedy",
    "Impressions",
    "Musical Comedy",
    "Prop Comedy",
    "Dark Comedy",
    "Clean Comedy",
    "Political Comedy",
    "Social Commentary",
    "Family Humor",
    "Relationship Humor",
    "Workplace Humor",
    "Cultural Comedy",
    "Roast Comedy",
    "Improvisational",
  ];

  const venueTypes = [
    "Comedy Clubs",
    "Bars & Pubs",
    "Theaters",
    "Corporate Events",
    "Private Parties",
    "Colleges & Universities",
    "Festivals",
    "Open Mics",
    "Cruise Ships",
    "Casinos",
    "Coffee Shops",
    "Restaurants",
    "Online Shows",
    "Street Performance",
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
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Laugh className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Comedian!</h2>
              <p className="text-gray-600">Let's set up your comedy profile</p>
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
              <Label htmlFor="stageName">Stage Name</Label>
              <Input
                id="stageName"
                value={formData.stageName}
                onChange={(e) =>
                  setFormData({ ...formData, stageName: e.target.value })
                }
                placeholder="Your comedy stage name (if different from real name)"
              />
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
              <Label htmlFor="bio">Comedy Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about your comedy style, what makes you unique, and your comedy journey..."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="www.yourcomedysite.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Comedy Experience</h2>
              <p className="text-gray-600">Tell us about your comedy career</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsPerforming">Years Performing *</Label>
                <Select
                  value={formData.yearsPerforming}
                  onValueChange={(value) =>
                    setFormData({ ...formData, yearsPerforming: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How long have you been performing?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-6months">0-6 months</SelectItem>
                    <SelectItem value="6months-1year">
                      6 months - 1 year
                    </SelectItem>
                    <SelectItem value="1-2years">1-2 years</SelectItem>
                    <SelectItem value="2-5years">2-5 years</SelectItem>
                    <SelectItem value="5-10years">5-10 years</SelectItem>
                    <SelectItem value="10+years">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="showsPerformed">Shows Performed</Label>
                <Input
                  id="showsPerformed"
                  value={formData.showsPerformed}
                  onChange={(e) =>
                    setFormData({ ...formData, showsPerformed: e.target.value })
                  }
                  placeholder="e.g., 150"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="avgAudienceSize">Average Audience Size</Label>
                <Input
                  id="avgAudienceSize"
                  value={formData.avgAudienceSize}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      avgAudienceSize: e.target.value,
                    })
                  }
                  placeholder="e.g., 75"
                />
              </div>
              <div>
                <Label htmlFor="totalAudience">Total Audience Reached</Label>
                <Input
                  id="totalAudience"
                  value={formData.totalAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, totalAudience: e.target.value })
                  }
                  placeholder="e.g., 25000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="performanceFrequency">
                Performance Frequency
              </Label>
              <Select
                value={formData.performanceFrequency}
                onValueChange={(value) =>
                  setFormData({ ...formData, performanceFrequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often do you perform?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="several-times-week">
                    Several times per week
                  </SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="occasionally">Occasionally</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="setLength">Typical Set Length</Label>
                <Select
                  value={formData.setLength}
                  onValueChange={(value) =>
                    setFormData({ ...formData, setLength: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How long are your sets?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">5 minutes</SelectItem>
                    <SelectItem value="10min">10 minutes</SelectItem>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="20min">20 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="45min">45 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="1hour+">1+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contentRating">Content Rating</Label>
                <Select
                  value={formData.contentRating}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contentRating: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Content rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clean">Clean (All Ages)</SelectItem>
                    <SelectItem value="pg13">PG-13</SelectItem>
                    <SelectItem value="mature">Mature (18+)</SelectItem>
                    <SelectItem value="adult">Adult Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Comedy Style & Venues</h2>
              <p className="text-gray-600">
                What's your comedy style and where do you perform?
              </p>
            </div>

            <div>
              <Label>Comedy Style *</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all styles that describe your comedy
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {comedyStyles.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={style}
                      checked={formData.comedyStyle.includes(style)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            comedyStyle: [...formData.comedyStyle, style],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            comedyStyle: formData.comedyStyle.filter(
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
              <Label>Performance Venues</Label>
              <p className="text-sm text-gray-500 mb-3">
                Where do you typically perform?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {venueTypes.map((venue) => (
                  <div key={venue} className="flex items-center space-x-2">
                    <Checkbox
                      id={venue}
                      checked={formData.primaryVenues.includes(venue)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            primaryVenues: [...formData.primaryVenues, venue],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            primaryVenues: formData.primaryVenues.filter(
                              (v) => v !== venue
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={venue} className="text-sm">
                      {venue}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center mb-2">
              <Label>Performance Languages</Label>
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

            <div>
              <Label htmlFor="travelWillingness">Travel Willingness</Label>
              <Select
                value={formData.travelWillingness}
                onValueChange={(value) =>
                  setFormData({ ...formData, travelWillingness: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="How far will you travel for shows?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">
                    Local only (within 50 miles)
                  </SelectItem>
                  <SelectItem value="regional">
                    Regional (within state/province)
                  </SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Social Media & Online Presence
              </h2>
              <p className="text-gray-600">
                Connect your social media accounts
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram link</Label>
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
                    placeholder="your instagram link"
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
                    placeholder="e.g., 5000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="youtube">YouTube Channel link</Label>
                  <Input
                    id="youtube"
                    value={formData.socialLinks.youtube}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          youtube: e.target.value,
                        },
                      })
                    }
                    placeholder="Channel URL"
                  />
                </div>
                <div>
                  <Label htmlFor="youtubeSubscribers">
                    YouTube Subscribers
                  </Label>
                  <Input
                    id="youtubeSubscribers"
                    value={formData.socialStats.youtube}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialStats: {
                          ...formData.socialStats,
                          youtube: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 2500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter">Twitter/X link</Label>
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
                    placeholder="your twitter link"
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
                    placeholder="e.g., 3000"
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
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking & Business</h2>
              <p className="text-gray-600">Set your availability and rates</p>
            </div>

            <div>
              <Label>I'm Available For:</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {[
                  { key: "standup", label: "Stand-up Shows" },
                  { key: "corporate", label: "Corporate Events" },
                  { key: "private", label: "Private Shows" },
                  { key: "writing", label: "Comedy Writing" },
                  { key: "podcasts", label: "Podcast Appearances" },
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
                Help bookers understand your pricing (you can keep this private)
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="standupRate">Stand-up Shows</Label>
                  <Input
                    id="standupRate"
                    value={formData.rates.standup}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: { ...formData.rates, standup: e.target.value },
                      })
                    }
                    placeholder="e.g., $500-1,500"
                  />
                </div>
                <div>
                  <Label htmlFor="corporateRate">Corporate Events</Label>
                  <Input
                    id="corporateRate"
                    value={formData.rates.corporate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: { ...formData.rates, corporate: e.target.value },
                      })
                    }
                    placeholder="e.g., $2,000-5,000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="privateRate">Private Shows</Label>
                  <Input
                    id="privateRate"
                    value={formData.rates.private}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: { ...formData.rates, private: e.target.value },
                      })
                    }
                    placeholder="e.g., $1,000-3,000"
                  />
                </div>
                <div>
                  <Label htmlFor="writingRate">Comedy Writing (per hour)</Label>
                  <Input
                    id="writingRate"
                    value={formData.rates.writing}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: { ...formData.rates, writing: e.target.value },
                      })
                    }
                    placeholder="e.g., $100"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="podcastRate">Podcast Appearances</Label>
                <Input
                  id="podcastRate"
                  value={formData.rates.podcast}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rates: { ...formData.rates, podcast: e.target.value },
                    })
                  }
                  placeholder="e.g., $200-500"
                />
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

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
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
                  label: "Show performance statistics publicly",
                  description:
                    "Display show count, audience size, and other metrics",
                },
                {
                  key: "showRates",
                  label: "Show rates publicly",
                  description: "Display your booking rates on your profile",
                },
                {
                  key: "allowBookings",
                  label: "Allow booking requests",
                  description:
                    "Let venues and event organizers contact you for bookings",
                },
                {
                  key: "showContact",
                  label: "Show contact information",
                  description: "Display your business phone and email",
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

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">
                🎤 Ready to make them laugh!
              </h3>
              <p className="text-yellow-800 text-sm">
                Your comedy profile will help you connect with venues, other
                comedians, and grow your comedy career through the Peerpop
                community.
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
