import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, BarChart3, Plus, Settings, Ticket } from "lucide-react";

const OrganizerDashboard = () => {
  const myEvents = [
    { id: 1, name: "Tech Summit 2025", date: "March 15, 2025", attendees: 245, revenue: "$12,250" },
    { id: 2, name: "Design Workshop", date: "March 20, 2025", attendees: 89, revenue: "$4,450" },
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
            <Link to="/admin/create-event">
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="ghost">Browse Events</Button>
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
              <h2 className="text-4xl font-bold mb-2">Organizer Dashboard</h2>
              <p className="text-muted-foreground">Manage your events and track performance</p>
            </div>
            <Link to="/admin/create-event">
              <Button variant="gradient" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create New Event
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            <GlassCard className="p-6 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">{myEvents.length}</p>
              <p className="text-sm text-muted-foreground">Active Events</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">334</p>
              <p className="text-sm text-muted-foreground">Total Attendees</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">$16,700</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-4">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1">89%</p>
              <p className="text-sm text-muted-foreground">Avg. Attendance</p>
            </GlassCard>
          </motion.div>

          {/* My Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">My Events</h3>
              <Link to="/admin">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {myEvents.map((event) => (
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
                          {event.attendees} attendees
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{event.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/events/${event.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link to="/admin" className="flex-1">
                      <Button variant="gradient" size="sm" className="w-full">
                        Manage Event
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
