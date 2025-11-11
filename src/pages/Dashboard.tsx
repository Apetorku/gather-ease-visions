import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BarChart3,
  Ticket,
  Plus,
  Settings,
  Bell,
  Star,
  TrendingUp,
  Clock,
  MapPin,
  Heart,
  Share2,
  LogOut,
  User,
} from "lucide-react";
import dashboardImage from "@/assets/dashboard-3d.png";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    const storedUserName = localStorage.getItem("userName");
    
    if (!userSession) {
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
      return;
    }
    
    setUserName(storedUserName || "User");
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const myTickets = [
    {
      id: 1,
      name: "Tech Summit 2025",
      date: "March 15, 2025",
      location: "San Francisco",
      type: "VIP",
      status: "confirmed",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Design Workshop",
      date: "March 20, 2025",
      location: "New York",
      type: "General",
      status: "confirmed",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop",
    },
  ];

  const recommendedEvents = [
    {
      id: 3,
      name: "Music Festival",
      date: "April 5, 2025",
      location: "Los Angeles",
      price: "$49",
      category: "Entertainment",
      attendees: 2500,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Food & Wine Expo",
      date: "April 12, 2025",
      location: "Chicago",
      price: "$35",
      category: "Food & Drink",
      attendees: 800,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop",
    },
    {
      id: 5,
      name: "Art Gallery Night",
      date: "April 18, 2025",
      location: "Miami",
      price: "Free",
      category: "Art & Culture",
      attendees: 300,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    },
  ];

  const interests = ["Technology", "Design", "Music", "Food & Drink"];
  const notifications = [
    {
      id: 1,
      title: "New Event Match",
      message: "New tech event matching your interests",
      time: "2h ago",
      read: false,
    },
    {
      id: 2,
      title: "Event Reminder",
      message: "Tech Summit 2025 starts in 2 days",
      time: "1d ago",
      read: false,
    },
    {
      id: 3,
      title: "Feedback Request",
      message: "Event feedback requested for Design Workshop",
      time: "3d ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

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
              <Button variant="ghost">Browse Events</Button>
            </Link>
            <Link to="/my-tickets">
              <Button variant="ghost">My Tickets</Button>
            </Link>
            <DropdownMenu
              open={showNotifications}
              onOpenChange={setShowNotifications}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`flex flex-col items-start p-4 ${
                          !notification.read ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-1" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center justify-center">
                  <span className="text-sm text-primary">
                    View all notifications
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass" size="icon" className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Dashboard
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-tickets")}>
                  <Ticket className="mr-2 h-4 w-4" />
                  <span>My Tickets</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/events")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Browse Events</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Welcome back, {userName}!</h2>
              <p className="text-muted-foreground">
                Here's what's happening with your events
              </p>

              {/* Interest Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="relative w-32 h-32 md:w-48 md:h-48">
              <img
                src={dashboardImage}
                alt="Dashboard 3D"
                className="w-full h-full object-contain opacity-80"
              />
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {myTickets.length}
              </div>
              <div className="text-sm text-muted-foreground">My Tickets</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">3</div>
              <div className="text-sm text-muted-foreground">Attended</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">2</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="recommendations">For You</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8 mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>
                <div className="space-y-4">
                  {myTickets.slice(0, 2).map((ticket) => (
                    <GlassCard
                      key={ticket.id}
                      className="p-6 hover:scale-102 transition-transform"
                    >
                      <div className="flex gap-4">
                        <img
                          src={ticket.image}
                          alt={ticket.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg">
                              {ticket.name}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {ticket.type}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {ticket.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {ticket.location}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Ticket className="w-4 h-4 mr-2" />
                              View Ticket
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6">Activity Summary</h3>
                <GlassCard className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Events Attended
                        </span>
                        <span className="text-sm font-medium">3/5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Profile Completion
                        </span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span>Favorite Categories</span>
                        <div className="flex gap-1">
                          <Badge variant="secondary" className="text-xs">
                            Tech
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Design
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </TabsContent>

          {/* My Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6 mt-8">
            <div className="grid gap-6">
              {myTickets.map((ticket) => (
                <GlassCard key={ticket.id} className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={ticket.image}
                      alt={ticket.name}
                      className="w-32 h-32 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold mb-2">
                            {ticket.name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {ticket.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {ticket.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              9:00 AM
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">{ticket.status}</Badge>
                          <div className="text-sm text-muted-foreground">
                            #{ticket.id}234
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="gradient" size="sm">
                          <Ticket className="w-4 h-4 mr-2" />
                          View QR Code
                        </Button>
                        <Button variant="outline" size="sm">
                          Add to Calendar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6 mt-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Recommended for You
              </h3>
              <p className="text-muted-foreground">
                Based on your interests and past events
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedEvents.map((event) => (
                <GlassCard
                  key={event.id}
                  className="overflow-hidden hover:scale-105 transition-transform group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-white/20 backdrop-blur-md"
                      >
                        <Heart className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white/20 backdrop-blur-md text-white">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {event.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({event.attendees})
                        </span>
                      </div>
                      <span className="font-semibold text-primary">
                        {event.price}
                      </span>
                    </div>
                    <Link to={`/events/${event.id}`}>
                      <Button className="w-full">View Event</Button>
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Your Notifications</h3>
              <p className="text-muted-foreground">
                Stay updated with your events and recommendations
              </p>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <GlassCard key={notification.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-1" />
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
