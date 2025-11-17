import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Filter,
  Heart,
  Share2,
  Bell,
  SlidersHorizontal,
  User,
  LogOut,
  Settings,
  Ticket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDate, setSelectedDate] = useState("all");
  const [favoriteEvents, setFavoriteEvents] = useState<number[]>([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [showNotifications, setShowNotifications] = useState(false);

  // Check if user is logged in (using localStorage for demo)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New event in your area",
      message: "Tech Summit 2025 is happening near you!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Ticket confirmation",
      message: "Your ticket for Design Workshop has been confirmed",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Event reminder",
      message: "Music Festival starts in 3 days",
      time: "2 days ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    // Check localStorage for user session
    const userSession = localStorage.getItem("userSession");
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");

    if (userSession) {
      setIsLoggedIn(true);
      setUserName(storedUserName || "User");
    }

    setUserRole(storedUserRole);

    // Load events from localStorage (approved events only)
    const savedEvents = localStorage.getItem("myEvents");
    const staticEvents = [
      {
        id: 1,
        title: "Tech Summit 2025",
        date: "March 15, 2025",
        location: "San Francisco, CA",
        attendees: 250,
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        category: "Technology",
        price: "$99",
      },
      {
        id: 2,
        title: "Design Workshop",
        date: "March 20, 2025",
        location: "New York, NY",
        attendees: 120,
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
        category: "Design",
        price: "$49",
      },
      {
        id: 3,
        title: "Music Festival",
        date: "April 5, 2025",
        location: "Los Angeles, CA",
        attendees: 5000,
        image:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
        category: "Entertainment",
        price: "$150",
      },
    ];

    let allEvents = [...staticEvents];

    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        // Only show approved events to public
        const approvedEvents = parsedEvents
          .filter(
            (e: any) =>
              e.approvalStatus === "approved" || e.status === "approved"
          )
          .map((e: any) => ({
            id: e.id,
            title: e.name || e.title,
            date: e.startDate || e.date,
            location: e.venue || e.location || "TBA",
            attendees: e.attendees || 0,
            image:
              e.banner ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
            category: e.category || "General",
            price: e.isFreeEvent
              ? "Free"
              : e.ticketTiers?.[0]?.price
              ? `$${e.ticketTiers[0].price}`
              : "TBA",
          }));
        allEvents = [...approvedEvents, ...staticEvents];
      } catch (error) {
        console.error("Error loading events:", error);
      }
    }

    setEvents(allEvents);
  }, []);

  const handleDashboardClick = () => {
    const userRole = localStorage.getItem("userRole");

    // Redirect based on user role
    if (userRole === "superadmin") {
      navigate("/superadmin");
    } else if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "organizer") {
      navigate("/organizer-dashboard");
    } else {
      navigate("/dashboard"); // Default to attendee dashboard
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserName("Guest");
    navigate("/");
  };

  const categories = [
    "All",
    "Technology",
    "Design",
    "Business",
    "Entertainment",
    "Education",
    "Health",
    "Sports",
  ];
  const locations = [
    "All",
    "San Francisco, CA",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Austin, TX",
  ];

  const toggleFavorite = (eventId: number) => {
    setFavoriteEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleShare = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: `${window.location.origin}/events/${event.id}`,
      });
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLocation =
      selectedLocation === "all" || event.location === selectedLocation;
    const price =
      event.price === "Free" ? 0 : parseInt(event.price.replace("$", ""));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "price":
        const priceA =
          a.price === "Free" ? 0 : parseInt(a.price.replace("$", ""));
        const priceB =
          b.price === "Free" ? 0 : parseInt(b.price.replace("$", ""));
        return priceA - priceB;
      case "popularity":
        return b.attendees - a.attendees;
      case "date":
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

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
            {isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={handleDashboardClick}>
                  Dashboard
                </Button>
                {/* Only show My Tickets for attendees, not for organizers/admins */}
                {userRole !== "organizer" &&
                  userRole !== "admin" &&
                  userRole !== "superadmin" && (
                    <Link to="/my-tickets">
                      <Button variant="ghost" className="hidden sm:flex">
                        <Ticket className="w-4 h-4 mr-2" />
                        My Tickets
                      </Button>
                    </Link>
                  )}

                {/* Notification Bell */}
                <DropdownMenu
                  open={showNotifications}
                  onOpenChange={setShowNotifications}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="glass" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
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
                      {notifications.length > 0 ? (
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
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          No notifications
                        </div>
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

                {/* User Menu Dropdown */}
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
                          Signed in
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    {/* Only show My Tickets for attendees, not for organizers/admins */}
                    {userRole !== "organizer" &&
                      userRole !== "admin" &&
                      userRole !== "superadmin" && (
                        <DropdownMenuItem
                          onClick={() => navigate("/my-tickets")}
                        >
                          <Ticket className="mr-2 h-4 w-4" />
                          <span>My Tickets</span>
                        </DropdownMenuItem>
                      )}
                    <DropdownMenuItem onClick={handleDashboardClick}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
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
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="gradient">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Discover Amazing Events
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 glass-card border-white/20"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-32 h-14 glass-card border-white/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 h-14 glass-card border-white/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="popularity">Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Advanced Filters Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="glass" size="lg" className="h-14">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Events</SheetTitle>
                    <SheetDescription>
                      Customize your search to find the perfect events
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Location Filter */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Location
                      </Label>
                      <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem
                              key={location}
                              value={location.toLowerCase()}
                            >
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                      </Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        step={25}
                        className="w-full"
                      />
                    </div>

                    {/* Date Filter */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">
                        Date
                      </Label>
                      <Select
                        value={selectedDate}
                        onValueChange={setSelectedDate}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Dates</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="weekend">This Weekend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notifications Toggle */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifications"
                        checked={notificationEnabled}
                        onCheckedChange={(checked) =>
                          setNotificationEnabled(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Get notified about new events matching these filters
                      </Label>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Filter Summary */}
          {(selectedCategory !== "all" ||
            selectedLocation !== "all" ||
            searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  Category: {selectedCategory}
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  Location: {selectedLocation}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                  setPriceRange([0, 500]);
                }}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </motion.div>
      </section>

      {/* Results Summary */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {sortedEvents.length} of {events.length} events
          </p>
          {notificationEnabled && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Bell className="w-3 h-3" />
              Notifications enabled
            </Badge>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/events/${event.id}`}>
                <GlassCard className="overflow-hidden hover:scale-105 transition-transform duration-300 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-white/20 backdrop-blur-md hover:bg-white/30"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(event.id);
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favoriteEvents.includes(event.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-white/20 backdrop-blur-md hover:bg-white/30"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShare(event);
                        }}
                      >
                        <Share2 className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {event.attendees} attending
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {event.price}
                      </span>
                      <Button variant="gradient" size="sm">
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
