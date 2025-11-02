import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Bell,
  Heart,
  Ticket,
  Camera,
  Settings,
  LogOut,
} from "lucide-react";

const AttendeeProfile = () => {
  const [notifications, setNotifications] = useState({
    newEvents: true,
    reminders: true,
    updates: false,
    newsletter: true,
  });

  const interests = [
    "Technology",
    "Music",
    "Art & Culture",
    "Business",
    "Sports",
    "Food & Dining",
    "Networking",
    "Education",
  ];

  const [selectedInterests, setSelectedInterests] = useState([
    "Technology",
    "Business",
    "Networking",
  ]);

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "March 15, 2025",
      ticket: "VIP Pass",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Design Workshop",
      date: "March 22, 2025",
      ticket: "Standard",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop",
    },
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Music Festival 2024",
      date: "December 10, 2024",
      attended: true,
      rating: 5,
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "November 5, 2024",
      attended: true,
      rating: 4,
    },
    {
      id: 5,
      title: "Business Conference",
      date: "October 20, 2024",
      attended: false,
      rating: null,
    },
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              GatherEase
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/events">
              <Button variant="ghost">Events</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button variant="glass" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <GlassCard className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-gradient-to-br from-primary to-accent text-white">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">John Doe</h2>
                  <p className="text-muted-foreground mb-4">john.doe@example.com</p>
                  <Badge variant="secondary">Verified Attendee</Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Member since Jan 2024</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/5 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">24</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">18</p>
                    <p className="text-xs text-muted-foreground">Attended</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">12</p>
                    <p className="text-xs text-muted-foreground">Favorites</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mb-2">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </GlassCard>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="events">My Events</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            defaultValue="John"
                            className="mt-2 glass-card border-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            defaultValue="Doe"
                            className="mt-2 glass-card border-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="mt-2 glass-card border-white/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            defaultValue="+1 (555) 123-4567"
                            className="mt-2 glass-card border-white/20"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            defaultValue="San Francisco, CA"
                            className="mt-2 glass-card border-white/20"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            className="mt-2 glass-card border-white/20 min-h-24"
                            defaultValue="Tech enthusiast and event lover. Always looking for new experiences and networking opportunities."
                          />
                        </div>
                      </div>
                      <Button variant="gradient" className="mt-6">
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Events Tab */}
                  <TabsContent value="events" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                          >
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{event.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {event.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Ticket className="w-4 h-4" />
                                  {event.ticket}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  View Ticket
                                </Button>
                                <Button size="sm" variant="ghost">
                                  Event Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Past Events</h3>
                      <div className="space-y-3">
                        {pastEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                          >
                            <div>
                              <h4 className="font-semibold mb-1">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {event.attended ? (
                                <Badge variant="secondary">Attended</Badge>
                              ) : (
                                <Badge variant="outline">Missed</Badge>
                              )}
                              {event.rating && (
                                <div className="flex gap-1">
                                  {[...Array(event.rating)].map((_, i) => (
                                    <Heart key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Preferences Tab */}
                  <TabsContent value="preferences" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Event Interests</h3>
                      <p className="text-muted-foreground mb-4">
                        Select your interests to receive personalized event recommendations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant={selectedInterests.includes(interest) ? "default" : "outline"}
                            className="cursor-pointer px-4 py-2"
                            onClick={() => toggleInterest(interest)}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="gradient" className="mt-6">
                        Save Preferences
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <p className="font-semibold mb-1">New Events</p>
                            <p className="text-sm text-muted-foreground">
                              Get notified about new events matching your interests
                            </p>
                          </div>
                          <Switch
                            checked={notifications.newEvents}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, newEvents: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <p className="font-semibold mb-1">Event Reminders</p>
                            <p className="text-sm text-muted-foreground">
                              Receive reminders before events you're attending
                            </p>
                          </div>
                          <Switch
                            checked={notifications.reminders}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, reminders: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <p className="font-semibold mb-1">Event Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Get updates about events you're attending
                            </p>
                          </div>
                          <Switch
                            checked={notifications.updates}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, updates: checked })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <div>
                            <p className="font-semibold mb-1">Newsletter</p>
                            <p className="text-sm text-muted-foreground">
                              Receive our weekly newsletter with event highlights
                            </p>
                          </div>
                          <Switch
                            checked={notifications.newsletter}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, newsletter: checked })
                            }
                          />
                        </div>
                      </div>
                      <Button variant="gradient" className="mt-6">
                        Save Settings
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeProfile;
