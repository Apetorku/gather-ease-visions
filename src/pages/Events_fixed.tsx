import { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDate, setSelectedDate] = useState("all");
  const [favoriteEvents, setFavoriteEvents] = useState<number[]>([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [sortBy, setSortBy] = useState("date");

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

  const events = [
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
    {
      id: 4,
      title: "Business Conference",
      date: "April 12, 2025",
      location: "Chicago, IL",
      attendees: 800,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop",
      category: "Business",
      price: "$199",
    },
    {
      id: 5,
      title: "Art & Design Expo",
      date: "April 18, 2025",
      location: "Austin, TX",
      attendees: 320,
      image:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop",
      category: "Design",
      price: "$75",
    },
    {
      id: 6,
      title: "Health & Wellness Summit",
      date: "May 2, 2025",
      location: "San Francisco, CA",
      attendees: 450,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      category: "Health",
      price: "Free",
    },
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
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/login">
              <Button variant="glass">Login</Button>
            </Link>
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
