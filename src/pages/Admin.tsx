import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Users,
  Calendar,
  Ticket,
  Settings,
  MessageSquare,
  FileText,
  TrendingUp,
  UserCog,
  Plus,
  Edit,
  Copy,
  RefreshCw,
  Check,
  X,
  LogOut,
  User,
  Eye,
  Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [userName, setUserName] = useState("Admin");
  const [isLoading, setIsLoading] = useState(true);
  
  // ALL useState hooks must be declared BEFORE any conditional returns
  const [pendingEvents, setPendingEvents] = useState([
    {
      id: 1,
      name: "Tech Summit 2025",
      organizer: "John Doe",
      date: "March 15, 2025",
      status: "pending",
    },
    {
      id: 2,
      name: "Music Festival",
      organizer: "Jane Smith",
      date: "April 10, 2025",
      status: "pending",
    },
  ]);
  
  const [pendingAdmins, setPendingAdmins] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "pending",
    },
    { id: 2, name: "Bob Wilson", email: "bob@example.com", status: "pending" },
  ]);

  // Platform settings state
  const [platformSettings, setPlatformSettings] = useState({
    eventAutoApproval: false,
    emailNotifications: true,
    maintenanceMode: false,
  });

  // Check authentication and role on mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    const userRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");
    
    if (!userSession) {
      // Redirect to login if not authenticated
      toast({
        title: "Access Denied",
        description: "Please login to access the admin panel",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    if (userRole !== "admin" && userRole !== "superadmin") {
      // Redirect to dashboard if not an admin
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/dashboard", { replace: true });
      return;
    }
    
    setUserName(storedUserName || "Admin");
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/", { replace: true });
  };

  const handleDashboardClick = () => {
    const userRole = localStorage.getItem("userRole");
    console.log("🔍 Admin - Current user role:", userRole);
    console.log("🔍 Admin - localStorage:", {
      userRole: localStorage.getItem("userRole"),
      userName: localStorage.getItem("userName"),
      userEmail: localStorage.getItem("userEmail"),
    });
    
    // Redirect based on user role
    if (userRole === "superadmin") {
      console.log("✅ Navigating to /superadmin");
      navigate("/superadmin");
    } else if (userRole === "admin") {
      console.log("✅ Staying on /admin");
      // Already on admin dashboard, could scroll to top or refresh
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast({
        title: "Already on Dashboard",
        description: "You're viewing the admin panel",
      });
    } else if (userRole === "organizer") {
      console.log("✅ Navigating to /organizer-dashboard");
      navigate("/organizer-dashboard");
    } else {
      console.log("✅ Navigating to /dashboard (default)");
      navigate("/dashboard"); // Default to attendee dashboard
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl glow-pulse" />
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto glow-primary"></div>
          <p className="mt-6 text-muted-foreground text-lg font-medium">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const approveEvent = (eventId: number) => {
    setPendingEvents(pendingEvents.filter((e) => e.id !== eventId));
    toast({
      title: "Event Approved",
      description: "The event is now publicly listed.",
    });
  };

  const rejectEvent = (eventId: number) => {
    setPendingEvents(pendingEvents.filter((e) => e.id !== eventId));
    toast({
      title: "Event Rejected",
      description: "The event has been rejected.",
      variant: "destructive",
    });
  };

  const approveAdmin = (adminId: number) => {
    setPendingAdmins(pendingAdmins.filter((a) => a.id !== adminId));
    toast({
      title: "Admin Approved",
      description: "New admin access has been granted.",
    });
  };

  const rejectAdmin = (adminId: number) => {
    setPendingAdmins(pendingAdmins.filter((a) => a.id !== adminId));
    toast({
      title: "Admin Rejected",
      description: "Admin request has been rejected.",
      variant: "destructive",
    });
  };

  const stats = [
    { label: "Total Events", value: "24", icon: Calendar, change: "+12%" },
    { label: "Total Attendees", value: "3,847", icon: Users, change: "+23%" },
    { label: "Revenue", value: "$48,290", icon: TrendingUp, change: "+18%" },
    { label: "Active Teams", value: "8", icon: UserCog, change: "+2" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/10 relative overflow-hidden">
      {/* Fintech AI Premium Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/30 rounded-full blur-[140px] glow-primary" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-accent/30 rounded-full blur-[140px] glow-accent" />
        <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-secondary/25 rounded-full blur-[120px] float-animation" />
      </div>

      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl elevation-3">
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
                      Admin Panel
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDashboardClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/events")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Browse Events</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
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
                <span className="text-sm text-accent font-semibold">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Admin Tabs */}
        <GlassCard className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 lg:grid-cols-7 gap-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="approvals" className="relative">
                Approvals
                {pendingEvents.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {pendingEvents.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
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
                        {[
                          "Tech Summit 2025",
                          "Design Workshop",
                          "Music Festival",
                        ].map((event) => (
                          <div
                            key={event}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                          >
                            <span>{event}</span>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
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

            {/* Event Approvals Tab */}
            <TabsContent value="approvals">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">
                  Pending Event Approvals
                </h2>
                <GlassCard className="p-6">
                  {pendingEvents.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No pending events to approve
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {pendingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-lg">
                              {event.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Organizer: {event.organizer} • Date: {event.date}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => approveEvent(event.id)}
                              className="bg-green-500/10 hover:bg-green-500/20 border-green-500/50"
                            >
                              <Check className="w-4 h-4 mr-1 text-green-500" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => rejectEvent(event.id)}
                              className="bg-red-500/10 hover:bg-red-500/20 border-red-500/50"
                            >
                              <X className="w-4 h-4 mr-1 text-red-500" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            </TabsContent>

            {/* Events Management Tab */}
            <TabsContent value="events">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Event Moderation</h2>
                  <Badge variant="outline" className="text-sm">
                    Platform Administration
                  </Badge>
                </div>

                <div className="grid gap-4">
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Event Approval & Moderation
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Review and approve events submitted by organizers. Ensure content meets platform guidelines.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button
                        variant="glass"
                        className="h-24 flex flex-col gap-2"
                        onClick={() => navigate("/events")}
                      >
                        <Eye className="w-6 h-6" />
                        View All Events
                      </Button>
                      <Button
                        variant="glass"
                        className="h-24 flex flex-col gap-2"
                        onClick={() => {
                          toast({
                            title: "Event Approval",
                            description: "Reviewing pending event submissions.",
                          });
                        }}
                      >
                        <Check className="w-6 h-6" />
                        Approve Events
                      </Button>
                      <Button
                        variant="glass"
                        className="h-24 flex flex-col gap-2"
                        onClick={() => {
                          toast({
                            title: "Content Moderation",
                            description: "Access content moderation tools.",
                          });
                        }}
                      >
                        <Shield className="w-6 h-6" />
                        Moderate Content
                      </Button>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Platform Administration
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Admin tools for platform oversight and user management.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <Button
                        variant="glass"
                        className="h-20 flex flex-col gap-2 text-sm"
                        onClick={() => setActiveTab("attendees")}
                      >
                        <Users className="w-5 h-5" />
                        User Management
                      </Button>
                      <Button
                        variant="glass"
                        className="h-20 flex flex-col gap-2 text-sm"
                        onClick={() => {
                          toast({
                            title: "Organizer Requests",
                            description: "Review organizer applications.",
                          });
                          setActiveTab("approvals");
                        }}
                      >
                        <UserCog className="w-5 h-5" />
                        Organizer Apps
                      </Button>
                      <Button
                        variant="glass"
                        className="h-20 flex flex-col gap-2 text-sm"
                        onClick={() => {
                          toast({
                            title: "Platform Analytics",
                            description: "View system-wide metrics.",
                          });
                          setActiveTab("analytics");
                        }}
                      >
                        <BarChart3 className="w-5 h-5" />
                        Analytics
                      </Button>
                      <Button
                        variant="glass"
                        className="h-20 flex flex-col gap-2 text-sm"
                        onClick={() => {
                          setActiveTab("settings");
                          toast({
                            title: "Platform Settings",
                            description: "Opening platform configuration.",
                          });
                        }}
                      >
                        <Settings className="w-5 h-5" />
                        Settings
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
                          <div className="text-sm text-muted-foreground">
                            john@example.com
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary" />
                        <div>
                          <div className="font-semibold">Jane Smith</div>
                          <div className="text-sm text-muted-foreground">
                            jane@example.com
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
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
                    <h3 className="text-lg font-semibold mb-4">
                      Attendance Tracking
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Checked In
                        </span>
                        <span className="font-bold text-primary">85%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-primary to-accent" />
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Survey Responses
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Response Rate
                        </span>
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
                      {
                        name: "Admin User",
                        role: "Administrator",
                        email: "admin@gatherease.com",
                      },
                      {
                        name: "Event Manager",
                        role: "Manager",
                        email: "manager@gatherease.com",
                      },
                      {
                        name: "Support Staff",
                        role: "Support",
                        email: "support@gatherease.com",
                      },
                    ].map((member) => (
                      <div
                        key={member.email}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.email}
                            </div>
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

            {/* Settings Tab */}
            <TabsContent value="settings">
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-4">Platform Settings</h2>
                <p className="text-muted-foreground mb-6">
                  Configure platform-wide settings and preferences
                </p>

                <div className="space-y-6">
                  <div className="glass-card p-4">
                    <h3 className="font-semibold mb-2">Event Management</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            Event Auto-Approval
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Automatically approve events from verified organizers
                          </p>
                        </div>
                        <Button 
                          variant={platformSettings.eventAutoApproval ? "default" : "outline"} 
                          size="sm"
                          onClick={() => {
                            setPlatformSettings({
                              ...platformSettings,
                              eventAutoApproval: !platformSettings.eventAutoApproval,
                            });
                            toast({
                              title: platformSettings.eventAutoApproval ? "Auto-Approval Disabled" : "Auto-Approval Enabled",
                              description: platformSettings.eventAutoApproval
                                ? "Events now require manual approval"
                                : "Verified organizer events will be auto-approved",
                            });
                          }}
                        >
                          {platformSettings.eventAutoApproval ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">
                            Send email notifications to users for important updates
                          </p>
                        </div>
                        <Button 
                          variant={platformSettings.emailNotifications ? "default" : "outline"} 
                          size="sm"
                          onClick={() => {
                            setPlatformSettings({
                              ...platformSettings,
                              emailNotifications: !platformSettings.emailNotifications,
                            });
                            toast({
                              title: platformSettings.emailNotifications ? "Emails Disabled" : "Emails Enabled",
                              description: platformSettings.emailNotifications
                                ? "Email notifications have been turned off"
                                : "Email notifications are now enabled",
                            });
                          }}
                        >
                          {platformSettings.emailNotifications ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="font-semibold mb-2">Platform Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Maintenance Mode</p>
                          <p className="text-xs text-muted-foreground">
                            Put platform into maintenance mode for updates
                          </p>
                        </div>
                        <Button 
                          variant={platformSettings.maintenanceMode ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => {
                            setPlatformSettings({
                              ...platformSettings,
                              maintenanceMode: !platformSettings.maintenanceMode,
                            });
                            toast({
                              title: platformSettings.maintenanceMode ? "Maintenance Mode Off" : "Maintenance Mode On",
                              description: platformSettings.maintenanceMode
                                ? "Platform is now accessible to all users"
                                : "Platform is now in maintenance mode",
                              variant: platformSettings.maintenanceMode ? "default" : "destructive",
                            });
                          }}
                        >
                          {platformSettings.maintenanceMode ? "ON" : "OFF"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4">
                    <h3 className="font-semibold mb-2">System Actions</h3>
                    <div className="flex gap-3 flex-wrap">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Cache Cleared",
                            description: "Platform cache has been cleared successfully",
                          });
                        }}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Backup Started",
                            description: "Database backup is being created...",
                          });
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Backup Database
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>
    </div>
  );
};

export default Admin;
