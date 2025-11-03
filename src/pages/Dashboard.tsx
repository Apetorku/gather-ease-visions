import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, BarChart3, Ticket, Plus, Settings } from "lucide-react";
import dashboardImage from "@/assets/dashboard-3d.png";

const Dashboard = () => {
  const myTickets = [
    { id: 1, name: "Tech Summit 2025", date: "March 15, 2025", location: "San Francisco", type: "VIP" },
    { id: 2, name: "Design Workshop", date: "March 20, 2025", location: "New York", type: "General" },
  ];

  const recommendedEvents = [
    { id: 3, name: "Music Festival", date: "April 5, 2025", location: "Los Angeles", price: "$49" },
    { id: 4, name: "Food & Wine Expo", date: "April 12, 2025", location: "Chicago", price: "$35" },
    { id: 5, name: "Art Gallery Night", date: "April 18, 2025", location: "Miami", price: "Free" },
  ];

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
            <Link to="/profile">
              <Button variant="glass" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
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
              <h2 className="text-4xl font-bold mb-2">My Events</h2>
              <p className="text-muted-foreground">Your registered events and tickets</p>
            </div>
            <Link to="/events">
              <Button variant="gradient" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Browse Events
              </Button>
            </Link>
          </div>

          {/* My Tickets Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">My Tickets</h3>
                <Link to="/my-tickets">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {myTickets.map((ticket) => (
                  <GlassCard key={ticket.id} className="p-6 hover:scale-102 transition-transform">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{ticket.name}</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {ticket.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {ticket.location}
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-xs font-medium">
                        {ticket.type}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Ticket className="w-4 h-4 mr-2" />
                        View Ticket
                      </Button>
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
              <h3 className="text-2xl font-bold mb-6">Recommended Events</h3>
              <div className="space-y-4">
                {recommendedEvents.map((event) => (
                  <GlassCard key={event.id} className="p-6 hover:scale-102 transition-transform">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {event.price}
                      </div>
                    </div>
                    <Link to={`/events/${event.id}`}>
                      <Button variant="gradient" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <GlassCard className="p-6 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">{myTickets.length}</p>
              <p className="text-sm text-muted-foreground">Active Tickets</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">{myTickets.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </GlassCard>

            <Link to="/events" className="block">
              <GlassCard className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 mb-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-semibold mb-1">Discover More</p>
                <p className="text-sm text-muted-foreground">Browse Events</p>
              </GlassCard>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
