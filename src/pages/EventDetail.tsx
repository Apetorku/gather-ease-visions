import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Heart,
  Ticket,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  Download,
  Bell,
  CalendarPlus,
  Star,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const EventDetail = () => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

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

  const event = {
    id: 1,
    title: "Tech Innovation Summit 2025",
    category: "Technology",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Silicon Valley Convention Center",
    address: "123 Tech Drive, San Jose, CA 95110",
    attendees: 1250,
    capacity: 1500,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    organizer: {
      name: "Tech Events Inc.",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TechEvents",
      verified: true,
    },
    description: `Join us for the most anticipated technology conference of the year! The Tech Innovation Summit brings together industry leaders, innovators, and entrepreneurs to explore the latest trends and breakthrough technologies shaping our future.

This full-day event features keynote speeches from renowned tech leaders, interactive workshops, networking sessions, and an exhibition showcasing cutting-edge products and services.`,
    highlights: [
      "Keynote speeches from industry leaders",
      "20+ interactive workshops and sessions",
      "Networking opportunities with 1500+ attendees",
      "Exhibition hall with 50+ exhibitors",
      "Lunch and refreshments included",
      "Certificate of participation",
    ],
    agenda: [
      { time: "9:00 AM", title: "Registration & Welcome Coffee" },
      { time: "10:00 AM", title: "Opening Keynote: The Future of AI" },
      { time: "11:30 AM", title: "Workshop Sessions (Track A, B, C)" },
      { time: "1:00 PM", title: "Networking Lunch" },
      { time: "2:30 PM", title: "Panel Discussion: Sustainable Tech" },
      { time: "4:00 PM", title: "Closing Remarks & Awards" },
    ],
    tickets: [
      {
        id: "early-bird",
        type: "Early Bird",
        price: 99,
        description: "Limited time offer - Save 50%",
        available: 25,
        features: [
          "Full access",
          "Workshop materials",
          "Lunch included",
          "Networking session",
        ],
      },
      {
        id: "standard",
        type: "Standard Pass",
        price: 149,
        description: "Regular admission ticket",
        available: 180,
        features: ["Full access", "Workshop materials", "Lunch included"],
      },
      {
        id: "vip",
        type: "VIP Pass",
        price: 299,
        description: "Premium experience with exclusive perks",
        available: 45,
        features: [
          "Priority seating",
          "VIP lounge access",
          "Meet & greet with speakers",
          "Premium lunch",
          "Exclusive swag bag",
        ],
      },
    ],
  };

  const handlePurchase = () => {
    if (selectedTicket) {
      navigate("/checkout");
    }
  };

  const addToCalendar = () => {
    const startDate =
      new Date("2025-03-15T09:00:00")
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";
    const endDate =
      new Date("2025-03-15T17:00:00")
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    // Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.address)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
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
              <Button variant="ghost">Browse Events</Button>
            </Link>
            <Button variant="glass" onClick={handleDashboardClick}>
              Dashboard
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="overflow-hidden p-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="mb-3">{event.category}</Badge>
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {event.title}
                      </h1>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="glass"
                        size="icon"
                        onClick={() => setIsFavorited(!isFavorited)}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isFavorited ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                      </Button>
                      <Button variant="glass" size="icon" onClick={shareEvent}>
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Organizer Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar>
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback>TE</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{event.organizer.name}</p>
                        {event.organizer.verified && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Event Organizer
                      </p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold">{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-semibold">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Location
                        </p>
                        <p className="font-semibold">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Attendees
                        </p>
                        <p className="font-semibold">
                          {event.attendees} / {event.capacity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Tabs Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        About This Event
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {event.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        Event Highlights
                      </h3>
                      <ul className="space-y-2">
                        {event.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="agenda">
                    <h3 className="text-xl font-semibold mb-4">
                      Event Schedule
                    </h3>
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 pb-4 border-b border-white/10 last:border-0"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 h-fit">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold mb-1">{item.time}</p>
                            <p className="text-muted-foreground">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="location">
                    <h3 className="text-xl font-semibold mb-4">
                      Venue Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold mb-1">{event.location}</p>
                          <p className="text-muted-foreground">
                            {event.address}
                          </p>
                        </div>
                      </div>
                      <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">Map View</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Get Directions
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar - Ticket Selection */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold mb-6">Select Your Ticket</h3>

                <div className="space-y-4 mb-6">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedTicket === ticket.id
                          ? "border-primary bg-primary/10"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{ticket.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {ticket.description}
                          </p>
                        </div>
                        <p className="text-2xl font-bold">${ticket.price}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {ticket.available} tickets left
                      </p>
                      <ul className="space-y-1">
                        {ticket.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full mb-3"
                  disabled={!selectedTicket}
                  onClick={handlePurchase}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {selectedTicket ? "Purchase Ticket" : "Select a Ticket"}
                </Button>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button variant="outline" size="lg" onClick={addToCalendar}>
                    <CalendarPlus className="w-4 h-4 mr-1" />
                    Add to Calendar
                  </Button>
                  <Button variant="glass" size="lg">
                    <Bell className="w-4 h-4 mr-1" />
                    Reminders
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Event Info
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Event Website
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/10 mb-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Registered Attendees</span>
                    <span>{event.attendees}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>Available Spots</span>
                    <span>{event.capacity - event.attendees}</span>
                  </div>

                  {/* Event Rating */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      4.9 (127 reviews)
                    </span>
                  </div>
                </div>
              </GlassCard>

              {/* Reviews Section */}
              <GlassCard className="p-6 mt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Recent Reviews
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      rating: 5,
                      comment:
                        "Amazing event! Well organized and great speakers.",
                      date: "2 weeks ago",
                    },
                    {
                      name: "Mike Chen",
                      rating: 4,
                      comment:
                        "Great networking opportunities and valuable content.",
                      date: "1 month ago",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-white/10 pb-3 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {review.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Reviews
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
