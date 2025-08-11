"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFilmMakerStore } from "@/store/useFilmMakerStore";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  X,
  Plus,
  Camera,
  Clock,
  Users,
  Film,
  Star,
  Mic,
  Lightbulb,
  Eye,
} from "lucide-react";

export default function FilmmakerOnboardingForm() {
  const { createFilmMakerProfile } = useFilmMakerStore();
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

    // Professional Info
    primaryRole: "",
    secondaryRoles: [],
    experience: "",
    specializations: [],
    genres: [],
    unions: [],

    // Skills & Equipment
    skills: [],
    equipment: {
      cameras: [],
      lenses: [],
      lighting: [],
      audio: [],
    },
    software: [],
    languages: [],

    // Portfolio/Filmography
    portfolioItems: [],
    reelUrl: "",
    imdbProfile: "",

    // Availability & Rates
    availability: {
      directing: false,
      cinematography: false,
      producing: false,
      editing: false,
      consulting: false,
      workshops: false,
    },
    rates: {
      directingMin: "",
      directingMax: "",
      cinematographyMin: "",
      cinematographyMax: "",
      consulting: "",
      workshops: "",
    },

    // Social & Professional Links
    socialLinks: {
      linkedin: "",
      instagram: "",
      twitter: "",
      vimeo: "",
      youtube: "",
      behance: "",
    },

    // Preferences
    preferences: {
      publicProfile: true,
      showRates: false,
      allowMessages: true,
      showEmail: false,
      showPhone: false,
    },
  });

  // Language state for add/remove logic
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [languages, setLanguages] = useState([]);

  // Sync formData.languages with local languages state
  // (for backward compatibility, if user adds via Enter, keep in formData.languages)
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, languages: languages }));
  }, [languages]);

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const primaryRoles = [
    "Director",
    "Cinematographer",
    "Producer",
    "Editor",
    "Screenwriter",
    "Production Designer",
    "Sound Engineer",
    "VFX Supervisor",
    "Gaffer",
    "Script Supervisor",
  ];

  const specializations = [
    "Feature Films",
    "Short Films",
    "Documentaries",
    "Commercials",
    "Music Videos",
    "Corporate Videos",
    "Wedding Films",
    "Event Coverage",
    "Web Series",
    "Branded Content",
    "Educational Content",
    "Training Videos",
  ];

  const genres = [
    "Drama",
    "Comedy",
    "Thriller",
    "Horror",
    "Action",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Documentary",
    "Animation",
    "Experimental",
    "Musical",
  ];

  const equipmentOptions = {
    cameras: [
      "RED Komodo 6K",
      "Sony FX9",
      "Canon C300 Mark III",
      "ARRI Alexa Mini",
      "Blackmagic URSA Mini Pro",
      "Sony A7S III",
      "Canon R5C",
      "Panasonic GH6",
    ],
    lenses: [
      "Zeiss CP.3 Prime Set",
      "Canon CN-E Cinema Primes",
      "Cooke S4/i Primes",
      "ARRI Master Primes",
      "Sigma Cine Primes",
      "Rokinon Xeen Primes",
    ],
    lighting: [
      "ARRI SkyPanel S60",
      "Aputure 600D Pro",
      "Kino Flo Diva-Lite",
      "HMI Fresnel Kit",
      "LED Panel Kit",
      "Tungsten Fresnel Kit",
    ],
    audio: [
      "Sound Devices 833",
      "Zoom F8n Pro",
      "Sennheiser MKH 416",
      "Rode NTG3",
      "Lectrosonics Wireless",
      "Audio-Technica AT875R",
    ],
  };

  const softwareOptions = [
    "DaVinci Resolve",
    "Adobe Premiere Pro",
    "Final Cut Pro",
    "Avid Media Composer",
    "After Effects",
    "Cinema 4D",
    "Blender",
    "Pro Tools",
    "Logic Pro",
    "Photoshop",
    "Illustrator",
  ];

  const unions = [
    "Directors Guild of America (DGA)",
    "International Cinematographers Guild (ICG)",
    "Producers Guild of America (PGA)",
    "Motion Picture Editors Guild",
    "International Alliance of Theatrical Stage Employees (IATSE)",
    "Screen Actors Guild (SAG-AFTRA)",
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

  // Language add/remove logic
  const handleAddLanguage = () => {
    if (!language.trim() || !level) return;
    if (!languages.some((l) => l.name === language && l.level === level)) {
      setLanguages([...languages, { name: language, level }]);
    }
    setLanguage("");
    setLevel("");
  };
  const handleRemoveLanguage = (idx) => {
    setLanguages(languages.filter((_, i) => i !== idx));
  };

  // Validation function
  const validateForm = () => {
    const requiredFields = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      location: "Location",
      bio: "Professional Bio",
      primaryRole: "Primary Role",
      experience: "Experience",
      specializations: "Specializations",
    };
    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field])
          ? formData[field].length === 0
          : formData[field].trim() === "")
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
        data: syncedFormData,
      };
      const result = await createFilmMakerProfile(profileData);
      if (result) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating filmmaker profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = (skill) => {
    if (!formData.skills.some((s) => s.name === skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: skill, level: "intermediate" }],
      });
    }
  };

  const removeSkill = (skillName) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s.name !== skillName),
    });
  };

  const addPortfolioItem = () => {
    const newItem = {
      id: Date.now(),
      title: "",
      type: "",
      role: "",
      year: "",
      description: "",
      url: "",
    };
    setFormData({
      ...formData,
      portfolioItems: [...formData.portfolioItems, newItem],
    });
  };

  const updatePortfolioItem = (id, field, value) => {
    setFormData({
      ...formData,
      portfolioItems: formData.portfolioItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removePortfolioItem = (id) => {
    setFormData({
      ...formData,
      portfolioItems: formData.portfolioItems.filter((item) => item.id !== id),
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Peerpop Film!
              </h2>
              <p className="text-gray-600">
                Let's start with your basic information
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={formData.profileImage || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    <Camera className="w-8 h-8 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
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
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="stageName">Professional/Stage Name</Label>
              <Input
                id="stageName"
                value={formData.stageName}
                onChange={(e) =>
                  setFormData({ ...formData, stageName: e.target.value })
                }
                placeholder="If different from your real name"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be displayed on your profile
              </p>
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
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
              <Label htmlFor="website">Portfolio Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="www.yourportfolio.com"
              />
            </div>

            <div>
              <Label htmlFor="bio">Professional Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about your filmmaking journey, your style, and what drives your passion for cinema..."
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
              <h2 className="text-2xl font-bold mb-2">
                Professional Information
              </h2>
              <p className="text-gray-600">
                Tell us about your role and experience in filmmaking
              </p>
            </div>

            <div>
              <Label htmlFor="primaryRole">Primary Role *</Label>
              <Select
                value={formData.primaryRole}
                onValueChange={(value) =>
                  setFormData({ ...formData, primaryRole: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary role" />
                </SelectTrigger>
                <SelectContent>
                  {primaryRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Secondary Roles</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select additional roles you can perform
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {primaryRoles
                  .filter((role) => role !== formData.primaryRole)
                  .map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={role}
                        checked={formData.secondaryRoles.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              secondaryRoles: [
                                ...formData.secondaryRoles,
                                role,
                              ],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              secondaryRoles: formData.secondaryRoles.filter(
                                (r) => r !== role
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={role} className="text-sm">
                        {role}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) =>
                  setFormData({ ...formData, experience: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years (Entry Level)</SelectItem>
                  <SelectItem value="3-5">3-5 years (Junior)</SelectItem>
                  <SelectItem value="6-10">6-10 years (Mid-Level)</SelectItem>
                  <SelectItem value="11-15">11-15 years (Senior)</SelectItem>
                  <SelectItem value="15+">15+ years (Veteran)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Specializations *</Label>
              <p className="text-sm text-gray-500 mb-3">
                What types of content do you create?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {specializations.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={formData.specializations.includes(spec)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            specializations: [
                              ...formData.specializations,
                              spec,
                            ],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            specializations: formData.specializations.filter(
                              (s) => s !== spec
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={spec} className="text-sm">
                      {spec}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Preferred Genres</Label>
              <p className="text-sm text-gray-500 mb-3">
                What genres do you enjoy working in?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={formData.genres.includes(genre)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            genres: [...formData.genres, genre],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            genres: formData.genres.filter((g) => g !== genre),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={genre} className="text-sm">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Union Memberships</Label>
              <p className="text-sm text-gray-500 mb-3">
                Are you a member of any film industry unions?
              </p>
              <div className="space-y-2">
                {unions.map((union) => (
                  <div key={union} className="flex items-center space-x-2">
                    <Checkbox
                      id={union}
                      checked={formData.unions.includes(union)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            unions: [...formData.unions, union],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            unions: formData.unions.filter((u) => u !== union),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={union} className="text-sm">
                      {union}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Skills & Equipment</h2>
              <p className="text-gray-600">
                What skills and equipment do you bring to projects?
              </p>
            </div>

            <div>
              <Label>Technical Skills</Label>
              <p className="text-sm text-gray-500 mb-3">
                Add your key technical skills
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill.name}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(skill.name)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Directing",
                  "Cinematography",
                  "Color Grading",
                  "Screenwriting",
                  "Producing",
                  "Editing",
                  "Sound Design",
                  "VFX Supervision",
                  "Lighting Design",
                  "Camera Operation",
                ].map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    onClick={() => addSkill(skill)}
                    disabled={formData.skills.some((s) => s.name === skill)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label>Equipment Owned</Label>
              <p className="text-sm text-gray-500 mb-4">
                Select equipment you own and can bring to projects
              </p>

              {Object.entries(equipmentOptions).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h4 className="font-medium mb-3 capitalize flex items-center">
                    {category === "cameras" && (
                      <Camera className="w-4 h-4 mr-2" />
                    )}
                    {category === "lenses" && <Eye className="w-4 h-4 mr-2" />}
                    {category === "lighting" && (
                      <Lightbulb className="w-4 h-4 mr-2" />
                    )}
                    {category === "audio" && <Mic className="w-4 h-4 mr-2" />}
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {items.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={formData.equipment[category].includes(item)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                equipment: {
                                  ...formData.equipment,
                                  [category]: [
                                    ...formData.equipment[category],
                                    item,
                                  ],
                                },
                              });
                            } else {
                              setFormData({
                                ...formData,
                                equipment: {
                                  ...formData.equipment,
                                  [category]: formData.equipment[
                                    category
                                  ].filter((i) => i !== item),
                                },
                              });
                            }
                          }}
                        />
                        <Label htmlFor={item} className="text-sm">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div>
              <Label>Software Proficiency</Label>
              <p className="text-sm text-gray-500 mb-3">
                What software are you proficient in?
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {softwareOptions.map((software) => (
                  <div key={software} className="flex items-center space-x-2">
                    <Checkbox
                      id={software}
                      checked={formData.software.includes(software)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            software: [...formData.software, software],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            software: formData.software.filter(
                              (s) => s !== software
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={software} className="text-sm">
                      {software}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Languages</Label>
              <p className="text-sm text-gray-500 mb-3">
                What languages can you work in?
              </p>
              <div className="flex gap-2">
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
                    <SelectItem value="conversational">Conversational</SelectItem>
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.map((lang, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {lang.name}
                      <span className="ml-1 text-xs bg-muted px-1 rounded">
                        {lang.level}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveLanguage(idx)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Portfolio & Filmography
              </h2>
              <p className="text-gray-600">
                Showcase your best work and projects
              </p>
            </div>

            <div>
              <Label htmlFor="reelUrl">Demo Reel URL</Label>
              <Input
                id="reelUrl"
                value={formData.reelUrl}
                onChange={(e) =>
                  setFormData({ ...formData, reelUrl: e.target.value })
                }
                placeholder="https://vimeo.com/your-demo-reel"
              />
              <p className="text-sm text-gray-500 mt-1">
                Link to your demo reel (Vimeo, YouTube, etc.)
              </p>
            </div>

            <div>
              <Label htmlFor="imdbProfile">IMDb Profile</Label>
              <Input
                id="imdbProfile"
                value={formData.imdbProfile}
                onChange={(e) =>
                  setFormData({ ...formData, imdbProfile: e.target.value })
                }
                placeholder="https://www.imdb.com/name/nm1234567/"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Featured Projects</Label>
                <Button onClick={addPortfolioItem} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              <div className="space-y-4">
                {formData.portfolioItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-medium">Project Details</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removePortfolioItem(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Project Title *</Label>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              updatePortfolioItem(
                                item.id,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Enter project title"
                          />
                        </div>
                        <div>
                          <Label>Project Type *</Label>
                          <Select
                            value={item.type}
                            onValueChange={(value) =>
                              updatePortfolioItem(item.id, "type", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="feature">
                                Feature Film
                              </SelectItem>
                              <SelectItem value="short">Short Film</SelectItem>
                              <SelectItem value="documentary">
                                Documentary
                              </SelectItem>
                              <SelectItem value="commercial">
                                Commercial
                              </SelectItem>
                              <SelectItem value="music-video">
                                Music Video
                              </SelectItem>
                              <SelectItem value="web-series">
                                Web Series
                              </SelectItem>
                              <SelectItem value="corporate">
                                Corporate Video
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Your Role *</Label>
                          <Input
                            value={item.role}
                            onChange={(e) =>
                              updatePortfolioItem(
                                item.id,
                                "role",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Director, Cinematographer"
                          />
                        </div>
                        <div>
                          <Label>Year *</Label>
                          <Input
                            value={item.year}
                            onChange={(e) =>
                              updatePortfolioItem(
                                item.id,
                                "year",
                                e.target.value
                              )
                            }
                            placeholder="2024"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) =>
                            updatePortfolioItem(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Brief description of the project..."
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label>Project URL</Label>
                        <Input
                          value={item.url}
                          onChange={(e) =>
                            updatePortfolioItem(item.id, "url", e.target.value)
                          }
                          placeholder="https://vimeo.com/project-link"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {formData.portfolioItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>
                      No projects added yet. Click "Add Project" to showcase
                      your work.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Availability & Rates</h2>
              <p className="text-gray-600">
                Let potential collaborators know your availability and rates
              </p>
            </div>

            <div>
              <Label>Services Available</Label>
              <p className="text-sm text-gray-500 mb-4">
                What services are you currently offering?
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.availability).map(
                  ([service, available]) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={available}
                        onCheckedChange={(checked) => {
                          setFormData({
                            ...formData,
                            availability: {
                              ...formData.availability,
                              [service]: checked,
                            },
                          });
                        }}
                      />
                      <Label htmlFor={service} className="text-sm capitalize">
                        {service.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <Separator />

            <div>
              <Label>Rate Information</Label>
              <p className="text-sm text-gray-500 mb-4">
                Set your rates (optional - you can choose to hide these on your
                profile)
              </p>

              <div className="space-y-4">
                <div>
                  <Label>Directing (per project)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        value={formData.rates.directingMin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rates: {
                              ...formData.rates,
                              directingMin: e.target.value,
                            },
                          })
                        }
                        placeholder="Min rate ($)"
                        type="number"
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.rates.directingMax}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rates: {
                              ...formData.rates,
                              directingMax: e.target.value,
                            },
                          })
                        }
                        placeholder="Max rate ($)"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Cinematography (per day)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        value={formData.rates.cinematographyMin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rates: {
                              ...formData.rates,
                              cinematographyMin: e.target.value,
                            },
                          })
                        }
                        placeholder="Min rate ($)"
                        type="number"
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.rates.cinematographyMax}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rates: {
                              ...formData.rates,
                              cinematographyMax: e.target.value,
                            },
                          })
                        }
                        placeholder="Max rate ($)"
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Consulting (per hour)</Label>
                    <Input
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
                      placeholder="Hourly rate ($)"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Workshops (per hour)</Label>
                    <Input
                      value={formData.rates.workshops}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rates: {
                            ...formData.rates,
                            workshops: e.target.value,
                          },
                        })
                      }
                      placeholder="Hourly rate ($)"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    Availability Tips
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Keep your availability updated to help collaborators know
                    when you're free for projects. You can always adjust your
                    rates and availability later in your profile settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Social & Professional Links
              </h2>
              <p className="text-gray-600">
                Connect your professional profiles and social media
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
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
                  placeholder="instagram.com/yourhandle"
                />
              </div>

              <div>
                <Label htmlFor="vimeo">Vimeo</Label>
                <Input
                  id="vimeo"
                  value={formData.socialLinks.vimeo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        vimeo: e.target.value,
                      },
                    })
                  }
                  placeholder="vimeo.com/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="youtube">YouTube</Label>
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
                  placeholder="youtube.com/@yourchannel"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter/X</Label>
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
                  placeholder="twitter.com/yourhandle"
                />
              </div>

              <div>
                <Label htmlFor="behance">Behance</Label>
                <Input
                  id="behance"
                  value={formData.socialLinks.behance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        behance: e.target.value,
                      },
                    })
                  }
                  placeholder="behance.net/yourprofile"
                />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">
                    Professional Network
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Connecting your professional profiles helps other filmmakers
                    discover your work and builds credibility. We'll verify
                    these profiles to add trust badges to your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Privacy & Preferences</h2>
              <p className="text-gray-600">
                Control what information is visible on your profile
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Public Profile</h4>
                  <p className="text-sm text-gray-600">
                    Make your profile visible to other users
                  </p>
                </div>
                <Checkbox
                  checked={formData.preferences.publicProfile}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        publicProfile: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Show Rates</h4>
                  <p className="text-sm text-gray-600">
                    Display your rates on your profile
                  </p>
                </div>
                <Checkbox
                  checked={formData.preferences.showRates}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        showRates: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Allow Messages</h4>
                  <p className="text-sm text-gray-600">
                    Let other users send you direct messages
                  </p>
                </div>
                <Checkbox
                  checked={formData.preferences.allowMessages}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        allowMessages: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Show Email</h4>
                  <p className="text-sm text-gray-600">
                    Display your email address on your profile
                  </p>
                </div>
                <Checkbox
                  checked={formData.preferences.showEmail}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        showEmail: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Show Phone</h4>
                  <p className="text-sm text-gray-600">
                    Display your phone number on your profile
                  </p>
                </div>
                <Checkbox
                  checked={formData.preferences.showPhone}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      preferences: {
                        ...formData.preferences,
                        showPhone: checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Star className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Almost Done!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    You're about to join the Peerpop Film community! Review your
                    settings and click "Create Profile" to get started
                    connecting with fellow filmmakers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Profile Summary</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Name:</strong> {formData.firstName}{" "}
                  {formData.lastName}
                </p>
                <p>
                  <strong>Role:</strong> {formData.primaryRole}
                </p>
                <p>
                  <strong>Location:</strong> {formData.location}
                </p>
                <p>
                  <strong>Specializations:</strong>{" "}
                  {formData.specializations.slice(0, 3).join(", ")}
                </p>
                <p>
                  <strong>Projects:</strong> {formData.portfolioItems.length}{" "}
                  added
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Join Peerpop Film
            </h1>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Star className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Creating Profile..." : "Create Profile"}
                </Button>
              ) : (
                <Button onClick={handleNext} size="lg">
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
