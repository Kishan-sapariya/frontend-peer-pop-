"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDancerStore } from "@/store/useDancerStore";
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
  Music,
  DollarSign,
  Users,
  Award,
  Star,
  Heart,
} from "lucide-react";

export default function DancerOnboarding() {
  const { createDancerProfile } = useDancerStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
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

    // Dance Background
    primaryStyle: "",
    danceStyles: [],
    experience: "",
    performanceType: "",
    training: [],

    // Career & Performance
    yearsActive: "",
    performancesCompleted: "",
    competitionsEntered: "",
    awardsWon: "",
    musicVideos: "",
    teachingExperience: "",

    // Skills & Training
    techniques: [],
    certifications: [],
    languages: [],
    specialSkills: [],

    // Social Media & Portfolio
    socialLinks: {
      instagram: "",
      tiktok: "",
      youtube: "",
      facebook: "",
      twitter: "",
    },
    socialStats: {
      instagram: "",
      tiktok: "",
      youtube: "",
    },
    portfolioLinks: [],

    // Services & Business
    services: {
      performances: false,
      choreography: false,
      teaching: false,
      workshops: false,
      musicVideos: false,
      commercials: false,
    },
    rates: {
      performance: "",
      choreography: "",
      privateLesson: "",
      groupClass: "",
      workshop: "",
      musicVideo: "",
    },

    // Availability & Preferences
    availability: {
      weekdays: false,
      weekends: false,
      evenings: false,
      travel: false,
    },
    travelWillingness: "",

    // Preferences
    preferences: {
      publicStats: true,
      showRates: false,
      allowBookings: true,
      showContact: false,
    },
  });

  const handleAddLanguage = () => {
    if (!language.trim() || !level) return;
    setFormData({
      ...formData,
      languages: [...formData.languages, { language, level }],
    });
    setLanguage("");
    setLevel("");
  };

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const danceStyles = [
    "Ballet",
    "Contemporary",
    "Jazz",
    "Hip-Hop",
    "Tap",
    "Musical Theater",
    "Lyrical",
    "Commercial",
    "Ballroom",
    "Latin",
    "Salsa",
    "Bachata",
    "Swing",
    "Breakdancing",
    "Popping",
    "Locking",
    "House",
    "Voguing",
    "Krump",
    "Afro",
    "Bollywood",
    "Belly Dance",
    "Flamenco",
    "Irish Step",
    "Folk Dance",
  ];

  const techniques = [
    "Improvisation",
    "Partnering",
    "Acrobatics",
    "Flexibility/Contortion",
    "Aerial Dance",
    "Floor Work",
    "Turns/Pirouettes",
    "Jumps/Leaps",
    "Acting Through Dance",
    "Rhythm/Musicality",
    "Choreography",
    "Dance Composition",
    "Movement Analysis",
    "Dance History",
    "Anatomy for Dancers",
  ];

  const specialSkills = [
    "Choreography",
    "Teaching",
    "Dance Notation",
    "Video Editing",
    "Social Media Marketing",
    "Event Planning",
    "Costume Design",
    "Makeup Artistry",
    "Photography",
    "Live Performance",
    "Competition Judging",
    "Dance Therapy",
    "Fitness Training",
    "Yoga Instruction",
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Dancer!</h2>
              <p className="text-gray-600">Let's create your dance profile</p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={formData.profileImage || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    <Music className="w-8 h-8 text-gray-400" />
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
              <Label htmlFor="stageName">Stage/Performance Name</Label>
              <Input
                id="stageName"
                value={formData.stageName}
                onChange={(e) =>
                  setFormData({ ...formData, stageName: e.target.value })
                }
                placeholder="Your stage or performance name (if different from real name)"
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
              <Label htmlFor="bio">Dance Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about your dance journey, style, and what drives your passion for movement..."
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
                placeholder="www.yourdance.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Dance Background</h2>
              <p className="text-gray-600">
                Tell us about your dance styles and training
              </p>
            </div>

            <div>
              <Label>Primary Dance Style *</Label>
              <Select
                value={formData.primaryStyle}
                onValueChange={(value) =>
                  setFormData({ ...formData, primaryStyle: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your main dance style" />
                </SelectTrigger>
                <SelectContent>
                  {danceStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Additional Dance Styles</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all dance styles you perform
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {danceStyles
                  .filter((style) => style !== formData.primaryStyle)
                  .map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox
                        id={style}
                        checked={formData.danceStyles.includes(style)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              danceStyles: [...formData.danceStyles, style],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              danceStyles: formData.danceStyles.filter(
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
                <Label htmlFor="experience">Years of Experience *</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How long have you been dancing?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years (Beginner)</SelectItem>
                    <SelectItem value="3-5">
                      3-5 years (Intermediate)
                    </SelectItem>
                    <SelectItem value="6-10">6-10 years (Advanced)</SelectItem>
                    <SelectItem value="11-15">
                      11-15 years (Professional)
                    </SelectItem>
                    <SelectItem value="15+">15+ years (Expert)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="performanceType">Performance Type</Label>
                <Select
                  value={formData.performanceType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, performanceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How do you primarily perform?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Performer</SelectItem>
                    <SelectItem value="group">Group/Ensemble</SelectItem>
                    <SelectItem value="partner">Partner Dance</SelectItem>
                    <SelectItem value="company">
                      Dance Company Member
                    </SelectItem>
                    <SelectItem value="freelance">
                      Freelance Performer
                    </SelectItem>
                    <SelectItem value="teacher">Primarily Teaching</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Formal Training</Label>
              <Textarea
                value={formData.training.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    training: e.target.value.split(", "),
                  })
                }
                placeholder="List your formal dance training, schools, or programs (e.g., Juilliard, Broadway Dance Center, local studios)"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Career & Performance Experience
              </h2>
              <p className="text-gray-600">
                Share your professional dance experience
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsActive">Years Professionally Active</Label>
                <Input
                  id="yearsActive"
                  value={formData.yearsActive}
                  onChange={(e) =>
                    setFormData({ ...formData, yearsActive: e.target.value })
                  }
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <Label htmlFor="performancesCompleted">
                  Performances Completed
                </Label>
                <Input
                  id="performancesCompleted"
                  value={formData.performancesCompleted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      performancesCompleted: e.target.value,
                    })
                  }
                  placeholder="e.g., 150"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="competitionsEntered">
                  Competitions Entered
                </Label>
                <Input
                  id="competitionsEntered"
                  value={formData.competitionsEntered}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      competitionsEntered: e.target.value,
                    })
                  }
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <Label htmlFor="awardsWon">Awards/Recognitions Won</Label>
                <Input
                  id="awardsWon"
                  value={formData.awardsWon}
                  onChange={(e) =>
                    setFormData({ ...formData, awardsWon: e.target.value })
                  }
                  placeholder="e.g., 8"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="musicVideos">
                  Music Videos/Commercial Work
                </Label>
                <Input
                  id="musicVideos"
                  value={formData.musicVideos}
                  onChange={(e) =>
                    setFormData({ ...formData, musicVideos: e.target.value })
                  }
                  placeholder="e.g., 12"
                />
              </div>
              <div>
                <Label htmlFor="teachingExperience">
                  Teaching Experience (years)
                </Label>
                <Input
                  id="teachingExperience"
                  value={formData.teachingExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      teachingExperience: e.target.value,
                    })
                  }
                  placeholder="e.g., 3"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Skills & Techniques</h2>
              <p className="text-gray-600">
                What techniques and special skills do you have?
              </p>
            </div>

            <div>
              <Label>Dance Techniques</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all techniques you're proficient in
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {techniques.map((technique) => (
                  <div key={technique} className="flex items-center space-x-2">
                    <Checkbox
                      id={technique}
                      checked={formData.techniques.includes(technique)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            techniques: [...formData.techniques, technique],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            techniques: formData.techniques.filter(
                              (t) => t !== technique
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={technique} className="text-sm">
                      {technique}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Special Skills</Label>
              <p className="text-sm text-gray-500 mb-3">
                Additional skills that complement your dance abilities
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specialSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={formData.specialSkills.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            specialSkills: [...formData.specialSkills, skill],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            specialSkills: formData.specialSkills.filter(
                              (s) => s !== skill
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`skill-${skill}`} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Certifications</Label>
              <Textarea
                value={formData.certifications.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    certifications: e.target.value.split(", "),
                  })
                }
                placeholder="List any dance certifications, teaching credentials, or professional qualifications"
                rows={2}
              />
            </div>

            <div>
              <Label>Languages</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Language (e.g., English)"
                    className="flex-1"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  />
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="native">Native</SelectItem>
                      <SelectItem value="fluent">Fluent</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddLanguage} disabled={!language.trim() || !level}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.languages.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {formData.languages.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <span className="font-medium">{item.language}</span>
                        <span className="ml-2 px-2 py-0.5 rounded bg-muted text-xs">{item.level}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Services & Business</h2>
              <p className="text-gray-600">
                What services do you offer and at what rates?
              </p>
            </div>

            <div>
              <Label>Services Offered</Label>
              <p className="text-sm text-gray-500 mb-4">
                Select all services you provide
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.services).map(([service, offered]) => (
                  <div
                    key={service}
                    className="flex items-center space-x-3 p-3 border rounded-lg"
                  >
                    <Checkbox
                      id={service}
                      checked={offered}
                      onCheckedChange={(checked) => {
                        setFormData({
                          ...formData,
                          services: {
                            ...formData.services,
                            [service]: checked,
                          },
                        });
                      }}
                    />
                    <Label htmlFor={service} className="capitalize text-sm">
                      {service.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Rates (Optional)</Label>
              <p className="text-sm text-gray-500 mb-4">
                Set your rates for the services you offer
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="performanceRate">Performance</Label>
                  <Input
                    id="performanceRate"
                    value={formData.rates.performance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          performance: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $500-2,000"
                  />
                </div>
                <div>
                  <Label htmlFor="choreographyRate">Choreography</Label>
                  <Input
                    id="choreographyRate"
                    value={formData.rates.choreography}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          choreography: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $1,000-5,000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="privateLessonRate">Private Lesson</Label>
                  <Input
                    id="privateLessonRate"
                    value={formData.rates.privateLesson}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          privateLesson: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $75-150"
                  />
                </div>
                <div>
                  <Label htmlFor="groupClassRate">Group Class</Label>
                  <Input
                    id="groupClassRate"
                    value={formData.rates.groupClass}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          groupClass: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $25-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="workshopRate">Workshop</Label>
                  <Input
                    id="workshopRate"
                    value={formData.rates.workshop}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: { ...formData.rates, workshop: e.target.value },
                      })
                    }
                    placeholder="e.g., $200-800"
                  />
                </div>
                <div>
                  <Label htmlFor="musicVideoRate">Music Video</Label>
                  <Input
                    id="musicVideoRate"
                    value={formData.rates.musicVideo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          musicVideo: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $800-3,000"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Availability</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {Object.entries(formData.availability).map(
                  ([time, available]) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={available}
                        onCheckedChange={(checked) => {
                          setFormData({
                            ...formData,
                            availability: {
                              ...formData.availability,
                              [time]: checked,
                            },
                          });
                        }}
                      />
                      <Label htmlFor={time} className="capitalize text-sm">
                        {time}
                      </Label>
                    </div>
                  )
                )}
              </div>
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
                  <SelectValue placeholder="How far will you travel for performances?" />
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Social Media & Preferences
              </h2>
              <p className="text-gray-600">
                Connect your social profiles and set your preferences
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    @
                  </span>
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
                    placeholder="yourdance"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tiktok">TikTok Handle</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    @
                  </span>
                  <Input
                    id="tiktok"
                    value={formData.socialLinks.tiktok}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: {
                          ...formData.socialLinks,
                          tiktok: e.target.value,
                        },
                      })
                    }
                    placeholder="yourdance"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="youtube">YouTube Channel</Label>
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
                  placeholder="youtube.com/@yourdance"
                />
              </div>

              <div>
                <Label htmlFor="facebook">Facebook Page</Label>
                <Input
                  id="facebook"
                  value={formData.socialLinks.facebook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        facebook: e.target.value,
                      },
                    })
                  }
                  placeholder="facebook.com/yourdancepage"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">
                Social Media Statistics (Optional)
              </h3>
              <div className="grid grid-cols-2 gap-4">
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
                    placeholder="e.g., 15000"
                  />
                </div>
                <div>
                  <Label htmlFor="tiktokFollowers">TikTok Followers</Label>
                  <Input
                    id="tiktokFollowers"
                    value={formData.socialStats.tiktok}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialStats: {
                          ...formData.socialStats,
                          tiktok: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 25000"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="youtubeSubscribers">YouTube Subscribers</Label>
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
                  placeholder="e.g., 8000"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Privacy & Preferences</h3>
              {[
                {
                  key: "publicStats",
                  label: "Show performance statistics publicly",
                  description:
                    "Display follower counts, performance numbers, and other metrics",
                },
                {
                  key: "showRates",
                  label: "Show rates publicly",
                  description: "Display your service rates on your profile",
                },
                {
                  key: "allowBookings",
                  label: "Allow booking inquiries",
                  description:
                    "Let venues and clients contact you for performances",
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

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                💃 Ready to dance!
              </h3>
              <p className="text-purple-800 text-sm">
                Your dance profile will help you connect with choreographers,
                venues, students, and other dancers to grow your dance career
                through the Peerpop community.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Basic validation (optional, can be expanded)
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "location",
      "bio",
      "primaryStyle",
      "experience",
    ];
    for (const field of requiredFields) {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && formData[field].trim() === "")
      ) {
        alert("Please fill in all required fields.");
        return false;
      }
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const result = await createDancerProfile(formData);
      if (result) {
        router.push("/feed");
      }
    } catch (error) {
      console.error("Error creating dancer profile:", error);
    } finally {
      setIsSubmitting(false);
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
