import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, BarChart3, Ticket, Plus, Settings } from "lucide-react";
import dashboardImage from "@/assets/dashboard-3d.png";

const Dashboard = () => {
  const stats = [
    { label: "Total Events", value: "12", icon: Calendar, gradient: "from-blue-500 to-cyan-500" },
    { label: "Total Attendees", value: "2,845", icon: Users, gradient: "from-purple-500 to-pink-500" },
    { label: "Revenue", value: "$45,230", icon: BarChart3, gradient: "from-orange-500 to-yellow-500" },
    { label: "Tickets Sold", value: "3,421", icon: Ticket, gradient: "from-green-500 to-teal-500" },
  ];

  const upcomingEvents = [
    { id: 1, name: "Tech Summit 2025", date: "March 15, 2025", attendees: 250 },
    { id: 2, name: "Design Workshop", date: "March 20, 2025", attendees: 120 },
    { id: 3, name: "Music Festival", date: "April 5, 2025", attendees: 5000 },
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
              <Button variant="ghost">Events</Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
            <Button variant="glass" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
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
              <h2 className="text-4xl font-bold mb-2">Welcome back!</h2>
              <p className="text-muted-foreground">Here's what's happening with your events</p>
            </div>
            <Button variant="gradient" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 hover:scale-105 transition-transform">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <GlassCard className="p-4">
              <img
                src={dashboardImage}
                alt="Analytics Dashboard"
                className="rounded-2xl w-full"
              />
            </GlassCard>
          </motion.div>

          {/* Upcoming Events */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <GlassCard key={event.id} className="p-6 hover:scale-102 transition-transform">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendees}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <GlassCard className="p-6 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Create New Event</h4>
                      <p className="text-sm text-muted-foreground">Set up your next event</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">View Analytics</h4>
                      <p className="text-sm text-muted-foreground">Track your performance</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Manage Team</h4>
                      <p className="text-sm text-muted-foreground">Invite collaborators</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
