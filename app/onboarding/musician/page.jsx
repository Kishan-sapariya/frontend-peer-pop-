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
  Music,
  DollarSign,
  Users,
  Award,
  Star,
  Headphones,
} from "lucide-react";
import { useMusicianStore } from "@/store/useMusicianStore";
import { useRouter } from "next/navigation";

export default function MusicianOnboarding() {
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

    // Musical Background
    primaryGenre: "",
    genres: [],
    primaryInstrument: "",
    instruments: [],
    musicalRole: "",

    // Experience & Career
    yearsActive: "",
    experience: "",
    performanceType: "",
    songsReleased: "",
    albumsReleased: "",
    concertsPerformed: "",

    // Skills & Training
    musicalSkills: [],
    training: [],
    certifications: [],
    languages: [],

    // Streaming & Social
    streamingStats: {
      spotify: "",
      appleMusic: "",
      youtube: "",
      soundcloud: "",
    },
    socialLinks: {
      instagram: "",
      tiktok: "",
      youtube: "",
      facebook: "",
      twitter: "",
      spotify: "",
      soundcloud: "",
    },

    // Equipment & Setup
    equipment: [],
    homeStudio: false,
    recordingCapability: "",

    // Services & Business
    services: {
      livePerformances: false,
      studioRecording: false,
      songwriting: false,
      musicLessons: false,
      sessionWork: false,
      musicProduction: false,
    },
    rates: {
      livePerformance: "",
      studioSession: "",
      songwritingSession: "",
      musicLesson: "",
      sessionMusician: "",
      production: "",
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

  const { createMusicianProfile } = useMusicianStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languageInput, setLanguageInput] = useState("");
  const [levelInput, setLevelInput] = useState("");

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const genres = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "R&B",
    "Country",
    "Folk",
    "Indie",
    "Alternative",
    "Electronic",
    "Dance",
    "Jazz",
    "Blues",
    "Classical",
    "Reggae",
    "Punk",
    "Metal",
    "Funk",
    "Soul",
    "Gospel",
    "World Music",
    "Latin",
    "Acoustic",
    "Singer-Songwriter",
    "Experimental",
  ];

  const instruments = [
    "Vocals",
    "Guitar (Acoustic)",
    "Guitar (Electric)",
    "Bass Guitar",
    "Piano",
    "Keyboard",
    "Drums",
    "Violin",
    "Cello",
    "Saxophone",
    "Trumpet",
    "Flute",
    "Clarinet",
    "Harmonica",
    "Ukulele",
    "Banjo",
    "Mandolin",
    "Harp",
    "Accordion",
    "DJ Equipment",
    "Music Production",
    "Beatboxing",
  ];

  const musicalSkills = [
    "Songwriting",
    "Music Composition",
    "Music Production",
    "Audio Engineering",
    "Mixing",
    "Mastering",
    "Live Performance",
    "Studio Recording",
    "Improvisation",
    "Music Theory",
    "Sight Reading",
    "Ear Training",
    "Arrangement",
    "Orchestration",
    "Sound Design",
    "Beat Making",
    "Sampling",
    "Loop Creation",
    "MIDI Programming",
    "Music Teaching",
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Musician!</h2>
              <p className="text-gray-600">Let's create your music profile</p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={formData.profileImage || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    <Headphones className="w-8 h-8 text-gray-400" />
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
              <Label htmlFor="stageName">Stage/Artist Name</Label>
              <Input
                id="stageName"
                value={formData.stageName}
                onChange={(e) =>
                  setFormData({ ...formData, stageName: e.target.value })
                }
                placeholder="Your stage or artist name (if different from real name)"
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
              <Label htmlFor="bio">Musical Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about your musical journey, style, and what drives your passion for music..."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            <div>
              <Label htmlFor="website">Website/Music Portfolio</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="www.yourmusic.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Musical Background</h2>
              <p className="text-gray-600">
                Tell us about your musical style and instruments
              </p>
            </div>

            <div>
              <Label>Primary Genre *</Label>
              <Select
                value={formData.primaryGenre}
                onValueChange={(value) =>
                  setFormData({ ...formData, primaryGenre: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your main musical genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Additional Genres</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all genres you perform or create
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {genres
                  .filter((genre) => genre !== formData.primaryGenre)
                  .map((genre) => (
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
                              genres: formData.genres.filter(
                                (g) => g !== genre
                              ),
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
              <Label>Primary Instrument *</Label>
              <Select
                value={formData.primaryInstrument}
                onValueChange={(value) =>
                  setFormData({ ...formData, primaryInstrument: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your main instrument" />
                </SelectTrigger>
                <SelectContent>
                  {instruments.map((instrument) => (
                    <SelectItem key={instrument} value={instrument}>
                      {instrument}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Additional Instruments</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all instruments you play
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {instruments
                  .filter(
                    (instrument) => instrument !== formData.primaryInstrument
                  )
                  .map((instrument) => (
                    <div
                      key={instrument}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={instrument}
                        checked={formData.instruments.includes(instrument)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              instruments: [
                                ...formData.instruments,
                                instrument,
                              ],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              instruments: formData.instruments.filter(
                                (i) => i !== instrument
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={instrument} className="text-sm">
                        {instrument}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <Label htmlFor="musicalRole">Musical Role *</Label>
              <Select
                value={formData.musicalRole}
                onValueChange={(value) =>
                  setFormData({ ...formData, musicalRole: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="What's your primary role in music?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo-artist">Solo Artist</SelectItem>
                  <SelectItem value="band-member">Band Member</SelectItem>
                  <SelectItem value="session-musician">
                    Session Musician
                  </SelectItem>
                  <SelectItem value="songwriter">Songwriter</SelectItem>
                  <SelectItem value="producer">Producer</SelectItem>
                  <SelectItem value="composer">Composer</SelectItem>
                  <SelectItem value="music-teacher">Music Teacher</SelectItem>
                  <SelectItem value="dj">DJ</SelectItem>
                  <SelectItem value="multi-role">Multiple Roles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Experience & Career</h2>
              <p className="text-gray-600">
                Share your musical experience and achievements
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsActive">Years Musically Active</Label>
                <Input
                  id="yearsActive"
                  value={formData.yearsActive}
                  onChange={(e) =>
                    setFormData({ ...formData, yearsActive: e.target.value })
                  }
                  placeholder="e.g., 8"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience Level *</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      Beginner (0-2 years)
                    </SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate (3-5 years)
                    </SelectItem>
                    <SelectItem value="advanced">
                      Advanced (6-10 years)
                    </SelectItem>
                    <SelectItem value="professional">
                      Professional (10+ years)
                    </SelectItem>
                    <SelectItem value="expert">
                      Expert/Master (15+ years)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  <SelectItem value="band">Band/Group</SelectItem>
                  <SelectItem value="duo">Duo</SelectItem>
                  <SelectItem value="orchestra">Orchestra/Ensemble</SelectItem>
                  <SelectItem value="studio-only">Studio Only</SelectItem>
                  <SelectItem value="live-and-studio">Live & Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="songsReleased">Songs Released</Label>
                <Input
                  id="songsReleased"
                  value={formData.songsReleased}
                  onChange={(e) =>
                    setFormData({ ...formData, songsReleased: e.target.value })
                  }
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <Label htmlFor="albumsReleased">Albums/EPs Released</Label>
                <Input
                  id="albumsReleased"
                  value={formData.albumsReleased}
                  onChange={(e) =>
                    setFormData({ ...formData, albumsReleased: e.target.value })
                  }
                  placeholder="e.g., 3"
                />
              </div>
              <div>
                <Label htmlFor="concertsPerformed">Live Performances</Label>
                <Input
                  id="concertsPerformed"
                  value={formData.concertsPerformed}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      concertsPerformed: e.target.value,
                    })
                  }
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            <div>
              <Label>Musical Skills</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select all musical skills you have
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {musicalSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={formData.musicalSkills.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            musicalSkills: [...formData.musicalSkills, skill],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            musicalSkills: formData.musicalSkills.filter(
                              (s) => s !== skill
                            ),
                          });
                        }
                      }}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Training & Equipment</h2>
              <p className="text-gray-600">
                Tell us about your musical education and setup
              </p>
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
                placeholder="List your formal music education, schools, or programs (e.g., Berklee College of Music, local conservatory, private lessons)"
                rows={3}
              />
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
                placeholder="List any music certifications, teaching credentials, or professional qualifications"
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
                    value={languageInput}
                    onChange={(e) => setLanguageInput(e.target.value)}
                  />
                  <Select value={levelInput} onValueChange={setLevelInput}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="native">Native</SelectItem>
                      <SelectItem value="fluent">Fluent</SelectItem>
                      <SelectItem value="conversational">
                        Conversational
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={() => {
                      if (!languageInput.trim() || !levelInput) return;
                      setFormData({
                        ...formData,
                        languages: [
                          ...formData.languages,
                          { language: languageInput.trim(), level: levelInput },
                        ],
                      });
                      setLanguageInput("");
                      setLevelInput("");
                    }}
                    disabled={!languageInput.trim() || !levelInput}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.languages.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {formData.languages.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-center"
                      >
                        <span className="font-medium">{item.language}</span>
                        <span className="ml-2 px-2 py-0.5 rounded bg-muted text-xs">
                          {item.level}
                        </span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="ml-2 px-1 h-5"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              languages: formData.languages.filter(
                                (_, i) => i !== idx
                              ),
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <Label>Equipment</Label>
              <Textarea
                value={formData.equipment.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    equipment: e.target.value.split(", "),
                  })
                }
                placeholder="List your musical equipment (e.g., Taylor 814ce Guitar, Yamaha P-125 Piano, Shure SM58 Microphone)"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="homeStudio"
                  checked={formData.homeStudio}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, homeStudio: checked })
                  }
                />
                <Label htmlFor="homeStudio">I have a home studio setup</Label>
              </div>

              <div>
                <Label htmlFor="recordingCapability">
                  Recording Capability
                </Label>
                <Select
                  value={formData.recordingCapability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, recordingCapability: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What's your recording capability?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      No recording capability
                    </SelectItem>
                    <SelectItem value="basic">Basic home recording</SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate home studio
                    </SelectItem>
                    <SelectItem value="professional">
                      Professional home studio
                    </SelectItem>
                    <SelectItem value="commercial">
                      Access to commercial studio
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Services & Business</h2>
              <p className="text-gray-600">
                What musical services do you offer?
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
                  <Label htmlFor="livePerformanceRate">Live Performance</Label>
                  <Input
                    id="livePerformanceRate"
                    value={formData.rates.livePerformance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          livePerformance: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $500-2,500"
                  />
                </div>
                <div>
                  <Label htmlFor="studioSessionRate">Studio Session</Label>
                  <Input
                    id="studioSessionRate"
                    value={formData.rates.studioSession}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          studioSession: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $100-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="songwritingRate">Songwriting Session</Label>
                  <Input
                    id="songwritingRate"
                    value={formData.rates.songwritingSession}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          songwritingSession: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $150-500"
                  />
                </div>
                <div>
                  <Label htmlFor="musicLessonRate">Music Lesson</Label>
                  <Input
                    id="musicLessonRate"
                    value={formData.rates.musicLesson}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          musicLesson: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $50-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="sessionMusicianRate">Session Musician</Label>
                  <Input
                    id="sessionMusicianRate"
                    value={formData.rates.sessionMusician}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          sessionMusician: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $75-250"
                  />
                </div>
                <div>
                  <Label htmlFor="productionRate">Music Production</Label>
                  <Input
                    id="productionRate"
                    value={formData.rates.production}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rates: {
                          ...formData.rates,
                          production: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., $300-1,500"
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
                  <SelectValue placeholder="How far will you travel for gigs?" />
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Streaming & Social Media
              </h2>
              <p className="text-gray-600">
                Connect your music platforms and set preferences
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Music Platforms</h3>
              <div>
                <Label htmlFor="spotify">Spotify Artist Profile</Label>
                <Input
                  id="spotify"
                  value={formData.socialLinks.spotify}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        spotify: e.target.value,
                      },
                    })
                  }
                  placeholder="open.spotify.com/artist/..."
                />
              </div>

              <div>
                <Label htmlFor="soundcloud">SoundCloud Profile</Label>
                <Input
                  id="soundcloud"
                  value={formData.socialLinks.soundcloud}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        soundcloud: e.target.value,
                      },
                    })
                  }
                  placeholder="soundcloud.com/yourmusic"
                />
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
                  placeholder="youtube.com/@yourmusic"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Social Media</h3>
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
                    placeholder="yourmusic"
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
                    placeholder="yourmusic"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="facebook">Facebook Page</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    @
                  </span>
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
                    placeholder="facebook"
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="twitter">Twitter/X Handle</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    @
                  </span>
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
                    placeholder="twitter link"
                    className="pl-8"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">
                Streaming Statistics (Optional)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spotifyListeners">
                    Spotify Monthly Listeners
                  </Label>
                  <Input
                    id="spotifyListeners"
                    value={formData.streamingStats.spotify}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        streamingStats: {
                          ...formData.streamingStats,
                          spotify: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 5000"
                  />
                </div>
                <div>
                  <Label htmlFor="youtubeSubscribers">
                    YouTube Subscribers
                  </Label>
                  <Input
                    id="youtubeSubscribers"
                    value={formData.streamingStats.youtube}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        streamingStats: {
                          ...formData.streamingStats,
                          youtube: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 2500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="appleMusicListeners">
                    Apple Music Listeners
                  </Label>
                  <Input
                    id="appleMusicListeners"
                    value={formData.streamingStats.appleMusic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        streamingStats: {
                          ...formData.streamingStats,
                          appleMusic: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 3000"
                  />
                </div>
                <div>
                  <Label htmlFor="soundcloudFollowers">
                    SoundCloud Followers
                  </Label>
                  <Input
                    id="soundcloudFollowers"
                    value={formData.streamingStats.soundcloud}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        streamingStats: {
                          ...formData.streamingStats,
                          soundcloud: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., 1500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <div className="space-y-4">
              <h3 className="font-semibold">Privacy & Preferences</h3>
              {[
                {
                  key: "publicStats",
                  label: "Show streaming statistics publicly",
                  description:
                    "Display your listener counts, follower numbers, and other metrics",
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

            <div className="bg-blue-50 p-4 rounded-lg mt-1.5">
              <h3 className="font-semibold text-blue-900 mb-2">
                🎵 Ready to make music!
              </h3>
              <p className="text-blue-800 text-sm">
                Your music profile will help you connect with other musicians,
                venues, producers, and fans to grow your musical career through
                the Peerpop community.
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

  // handleSubmit for creating musician profile
  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    try {
      // You may want to validate required fields here
      const result = await createMusicianProfile(formData);
      if (result) {
        router.push("/dashboard");
      }
    } catch (error) {
      // Optionally handle error
      console.error("Error creating musician profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
}
