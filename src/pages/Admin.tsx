import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Users, Calendar, Ticket, Settings, 
  MessageSquare, QrCode, FileText, TrendingUp, 
  UserCog, Plus, Edit, Copy, RefreshCw 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Events", value: "24", icon: Calendar, change: "+12%" },
    { label: "Total Attendees", value: "3,847", icon: Users, change: "+23%" },
    { label: "Revenue", value: "$48,290", icon: TrendingUp, change: "+18%" },
    { label: "Active Teams", value: "8", icon: UserCog, change: "+2" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              GatherEase Admin
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/events">
              <Button variant="ghost">Events</Button>
            </Link>
            <Button variant="glass">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <GlassCard key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
                <span className="text-sm text-accent font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Admin Tabs */}
        <GlassCard className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Recent Events
                      </h3>
                      <div className="space-y-3">
                        {["Tech Summit 2025", "Design Workshop", "Music Festival"].map((event) => (
                          <div key={event} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                            <span>{event}</span>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        Revenue Trend
                      </h3>
                      <div className="h-48 flex items-end justify-around gap-2">
                        {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Events Management Tab */}
            <TabsContent value="events">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Event Management</h2>
                  <div className="flex gap-2">
                    <Button variant="gradient">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Event Operations</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button variant="glass" className="h-24 flex flex-col gap-2">
                        <Edit className="w-6 h-6" />
                        Edit Events
                      </Button>
                      <Button variant="glass" className="h-24 flex flex-col gap-2">
                        <Copy className="w-6 h-6" />
                        Duplicate Event
                      </Button>
                      <Button variant="glass" className="h-24 flex flex-col gap-2">
                        <Ticket className="w-6 h-6" />
                        Ticket Tiers
                      </Button>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      <Button variant="glass" className="h-20 flex flex-col gap-2 text-sm">
                        <QrCode className="w-5 h-5" />
                        QR Check-in
                      </Button>
                      <Button variant="glass" className="h-20 flex flex-col gap-2 text-sm">
                        <MessageSquare className="w-5 h-5" />
                        Notifications
                      </Button>
                      <Button variant="glass" className="h-20 flex flex-col gap-2 text-sm">
                        <RefreshCw className="w-5 h-5" />
                        Refunds
                      </Button>
                      <Button variant="glass" className="h-20 flex flex-col gap-2 text-sm">
                        <FileText className="w-5 h-5" />
                        Surveys
                      </Button>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            {/* Attendees Tab */}
            <TabsContent value="attendees">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Attendee Management</h2>
                <GlassCard className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                        <div>
                          <div className="font-semibold">John Doe</div>
                          <div className="text-sm text-muted-foreground">john@example.com</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary" />
                        <div>
                          <div className="font-semibold">Jane Smith</div>
                          <div className="text-sm text-muted-foreground">jane@example.com</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Analytics & Reports</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Attendance Tracking</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Checked In</span>
                        <span className="font-bold text-primary">85%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-primary to-accent" />
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Survey Responses</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Response Rate</span>
                        <span className="font-bold text-accent">72%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-gradient-to-r from-accent to-secondary" />
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            {/* Team Management Tab */}
            <TabsContent value="team">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Team & Permissions</h2>
                  <Button variant="gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>

                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Admin User", role: "Administrator", email: "admin@gatherease.com" },
                      { name: "Event Manager", role: "Manager", email: "manager@gatherease.com" },
                      { name: "Support Staff", role: "Support", email: "support@gatherease.com" }
                    ].map((member) => (
                      <div key={member.email} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                            {member.role}
                          </span>
                          <Button variant="ghost" size="sm">
                            <UserCog className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>
    </div>
  );
};

export default Admin;
