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
  const [pendingEvents, setPendingEvents] = useState<any[]>([]);
  const [approvedEvents, setApprovedEvents] = useState<any[]>([]);
  const [previewEvent, setPreviewEvent] = useState<any>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

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

    // Load events from localStorage
    const savedEvents = localStorage.getItem("myEvents");
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        const pending = parsedEvents.filter(
          (e: any) => e.approvalStatus === "pending" || e.status === "pending"
        );
        const approved = parsedEvents.filter(
          (e: any) => e.approvalStatus === "approved" || e.status === "approved"
        );
        setPendingEvents(pending);
        setApprovedEvents(approved);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    }

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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const approveEvent = (eventId: number) => {
    console.log("🔍 Approving event ID:", eventId);

    // Find the event to approve
    const eventToApprove = pendingEvents.find((e) => e.id === eventId);
    if (!eventToApprove) {
      console.error("Event not found:", eventId);
      return;
    }

    // Update event status
    const updatedEvent = {
      ...eventToApprove,
      status: "approved",
      approvalStatus: "approved",
    };

    // Update state using functional updates
    setPendingEvents((prevEvents) => {
      const filtered = prevEvents.filter((e) => e.id !== eventId);
      console.log(
        "✅ Removed from pending:",
        filtered.length,
        "events remaining"
      );
      return filtered;
    });

    setApprovedEvents((prevApproved) => {
      const updated = [...prevApproved, updatedEvent];
      console.log("✅ Added to approved:", updated.length, "events total");
      return updated;
    });

    // Update localStorage
    const savedEvents = localStorage.getItem("myEvents");
    if (savedEvents) {
      try {
        const allEvents = JSON.parse(savedEvents);
        const updatedEvents = allEvents.map((e: any) =>
          e.id === eventId ? updatedEvent : e
        );
        localStorage.setItem("myEvents", JSON.stringify(updatedEvents));
        console.log("✅ Updated localStorage");
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    }

    setShowPreviewDialog(false);
    toast({
      title: "Event Approved",
      description: "The event is now publicly listed.",
    });
  };

  const rejectEvent = (eventId: number) => {
    console.log("🔍 Rejecting event ID:", eventId);

    // Update state using functional update
    setPendingEvents((prevEvents) => {
      const filtered = prevEvents.filter((e) => e.id !== eventId);
      console.log(
        "✅ Removed from pending:",
        filtered.length,
        "events remaining"
      );
      return filtered;
    });

    // Update localStorage
    const savedEvents = localStorage.getItem("myEvents");
    if (savedEvents) {
      try {
        const allEvents = JSON.parse(savedEvents);
        const updatedEvents = allEvents.map((e: any) =>
          e.id === eventId
            ? { ...e, status: "rejected", approvalStatus: "rejected" }
            : e
        );
        localStorage.setItem("myEvents", JSON.stringify(updatedEvents));
        console.log("✅ Updated localStorage");
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    }

    setShowPreviewDialog(false);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              GatherEase Admin
            </h1>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link to="/dashboard" className="hidden sm:block">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/events" className="hidden sm:block">
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

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
        >
          {stats.map((stat, index) => (
            <GlassCard key={stat.label} className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                <span className="text-xs sm:text-sm text-accent font-semibold">
                  {stat.change}
                </span>
              </div>
              <div className="text-xl sm:text-3xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Admin Tabs */}
        <GlassCard className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="events" className="text-xs sm:text-sm">
                Events
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="relative text-xs sm:text-sm"
              >
                Approvals
                {pendingEvents.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {pendingEvents.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="attendees" className="text-xs sm:text-sm">
                Attendees
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                  Platform Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <GlassCard className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                      Recent Events
                    </h3>
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {[
                        "Tech Summit 2025",
                        "Design Workshop",
                        "Music Festival",
                      ].map((event) => (
                        <div
                          key={event}
                          className="flex items-center justify-between p-2 sm:p-3 lg:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="text-sm sm:text-base lg:text-lg truncate flex-1 mr-2">
                            {event}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-shrink-0 lg:h-10 lg:px-4"
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-accent" />
                      Revenue Trend
                    </h3>
                    <div className="h-32 sm:h-48 lg:h-64 flex items-end justify-around gap-1 sm:gap-2 lg:gap-3">
                      {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            {/* Event Approvals Tab */}
            <TabsContent value="approvals">
              <div className="space-y-4 sm:space-y-6">
                {/* Pending Events Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Pending Event Approvals
                  </h2>
                  <GlassCard className="p-4 sm:p-6">
                    {pendingEvents.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8 text-sm sm:text-base">
                        No pending events to approve
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {pendingEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-white/5"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-base sm:text-lg truncate">
                                {event.name || event.title}
                              </div>
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                Organizer: {event.createdBy || event.organizer}{" "}
                                • Date: {event.startDate || event.date}
                              </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none"
                                onClick={() => {
                                  setPreviewEvent(event);
                                  setShowPreviewDialog(true);
                                }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Preview
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none bg-green-500/10 hover:bg-green-500/20 border-green-500/50"
                                onClick={() => approveEvent(event.id)}
                              >
                                <Check className="w-4 h-4 mr-1 text-green-500" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none bg-red-500/10 hover:bg-red-500/20 border-red-500/50"
                                onClick={() => rejectEvent(event.id)}
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

                {/* Approved Events Section */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Approved Events (Live)
                  </h2>
                  <GlassCard className="p-4 sm:p-6">
                    {approvedEvents.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8 text-sm sm:text-base">
                        No approved events yet
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {approvedEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-green-500/20"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-semibold text-base sm:text-lg truncate">
                                  {event.name || event.title}
                                </div>
                                <Badge className="bg-green-500 text-xs">
                                  ✓ Live
                                </Badge>
                              </div>
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                Organizer: {event.createdBy || event.organizer}{" "}
                                • Date: {event.startDate || event.date}
                              </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none"
                                onClick={() => {
                                  setPreviewEvent(event);
                                  setShowPreviewDialog(true);
                                }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Link
                                to={`/events/${event.id}`}
                                className="flex-1 sm:flex-none"
                              >
                                <Button
                                  variant="glass"
                                  size="sm"
                                  className="w-full"
                                >
                                  View Public
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            {/* Events Management Tab */}
            <TabsContent value="events">
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                    Event Moderation
                  </h2>
                  <Badge
                    variant="outline"
                    className="text-xs sm:text-sm lg:text-base w-fit lg:px-4 lg:py-2"
                  >
                    Platform Administration
                  </Badge>
                </div>

                <div className="grid gap-4 lg:gap-6">
                  <GlassCard className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                      Event Approval & Moderation
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6">
                      Review and approve events submitted by organizers. Ensure
                      content meets platform guidelines.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <Button
                        variant="glass"
                        className="h-20 sm:h-24 lg:h-32 flex flex-col gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => navigate("/events")}
                      >
                        <Eye className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                        View All Events
                      </Button>
                      <Button
                        variant="glass"
                        className="h-20 sm:h-24 lg:h-32 flex flex-col gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => {
                          toast({
                            title: "Event Approval",
                            description: "Reviewing pending event submissions.",
                          });
                        }}
                      >
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                        Approve Events
                      </Button>
                      <Button
                        variant="glass"
                        className="h-20 sm:h-24 lg:h-32 flex flex-col gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => {
                          toast({
                            title: "Content Moderation",
                            description: "Access content moderation tools.",
                          });
                        }}
                      >
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                        Moderate Content
                      </Button>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                      Platform Administration
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 lg:mb-6">
                      Admin tools for platform oversight and user management.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                      <Button
                        variant="glass"
                        className="h-16 sm:h-20 lg:h-28 flex flex-col gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => setActiveTab("attendees")}
                      >
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
                        <span className="text-center">User Management</span>
                      </Button>
                      <Button
                        variant="glass"
                        className="h-16 sm:h-20 lg:h-28 flex flex-col gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => {
                          toast({
                            title: "Organizer Requests",
                            description: "Review organizer applications.",
                          });
                          setActiveTab("approvals");
                        }}
                      >
                        <UserCog className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
                        <span className="text-center">Organizer Apps</span>
                      </Button>
                      <Button
                        variant="glass"
                        className="h-16 sm:h-20 lg:h-28 flex flex-col gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => {
                          toast({
                            title: "Platform Analytics",
                            description: "View system-wide metrics.",
                          });
                          setActiveTab("analytics");
                        }}
                      >
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
                        <span className="text-center">Analytics</span>
                      </Button>
                      <Button
                        variant="glass"
                        className="h-16 sm:h-20 lg:h-28 flex flex-col gap-1 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base"
                        onClick={() => {
                          setActiveTab("settings");
                          toast({
                            title: "Platform Settings",
                            description: "Opening platform configuration.",
                          });
                        }}
                      >
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7" />
                        <span className="text-center">Settings</span>
                      </Button>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            {/* Attendees Tab */}
            <TabsContent value="attendees">
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                  Attendee Management
                </h2>
                <GlassCard className="p-4 sm:p-6 lg:p-8">
                  <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-4 lg:p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm sm:text-base lg:text-lg">
                            John Doe
                          </div>
                          <div className="text-xs sm:text-sm lg:text-base text-muted-foreground truncate">
                            john@example.com
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full sm:w-auto lg:h-10 lg:px-6 lg:text-base"
                      >
                        View Profile
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-4 lg:p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm sm:text-base lg:text-lg">
                            Jane Smith
                          </div>
                          <div className="text-xs sm:text-sm lg:text-base text-muted-foreground truncate">
                            jane@example.com
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full sm:w-auto lg:h-10 lg:px-6 lg:text-base"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                  Analytics & Reports
                </h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <GlassCard className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                      Attendance Tracking
                    </h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                          Checked In
                        </span>
                        <span className="font-bold text-primary text-sm sm:text-base lg:text-lg">
                          85%
                        </span>
                      </div>
                      <div className="w-full h-2 sm:h-3 lg:h-4 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-primary to-accent" />
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                      Survey Responses
                    </h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                          Response Rate
                        </span>
                        <span className="font-bold text-accent text-sm sm:text-base lg:text-lg">
                          72%
                        </span>
                      </div>
                      <div className="w-full h-2 sm:h-3 lg:h-4 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-gradient-to-r from-accent to-secondary" />
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </TabsContent>

            {/* Team Management Tab */}
            {/* Settings Tab */}
            <TabsContent value="settings">
              <GlassCard className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
                  Platform Settings
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 lg:mb-8">
                  Configure platform-wide settings and preferences
                </p>

                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  <div className="glass-card p-4 sm:p-5 lg:p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
                      Event Management
                    </h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                        <div className="flex-1">
                          <p className="text-sm sm:text-base lg:text-lg font-medium">
                            Event Auto-Approval
                          </p>
                          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                            Automatically approve events from verified
                            organizers
                          </p>
                        </div>
                        <Button
                          variant={
                            platformSettings.eventAutoApproval
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="w-full sm:w-auto lg:h-10 lg:px-6 lg:text-base"
                          onClick={() => {
                            setPlatformSettings({
                              ...platformSettings,
                              eventAutoApproval:
                                !platformSettings.eventAutoApproval,
                            });
                            toast({
                              title: platformSettings.eventAutoApproval
                                ? "Auto-Approval Disabled"
                                : "Auto-Approval Enabled",
                              description: platformSettings.eventAutoApproval
                                ? "Events now require manual approval"
                                : "Verified organizer events will be auto-approved",
                            });
                          }}
                        >
                          {platformSettings.eventAutoApproval
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4 sm:p-5 lg:p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                        <div className="flex-1">
                          <p className="text-sm sm:text-base lg:text-lg font-medium">
                            Email Notifications
                          </p>
                          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                            Send email notifications to users for important
                            updates
                          </p>
                        </div>
                        <Button
                          variant={
                            platformSettings.emailNotifications
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="w-full sm:w-auto lg:h-10 lg:px-6 lg:text-base"
                          onClick={() => {
                            setPlatformSettings({
                              ...platformSettings,
                              emailNotifications:
                                !platformSettings.emailNotifications,
                            });
                            toast({
                              title: platformSettings.emailNotifications
                                ? "Emails Disabled"
                                : "Emails Enabled",
                              description: platformSettings.emailNotifications
                                ? "Email notifications have been turned off"
                                : "Email notifications are now enabled",
                            });
                          }}
                        >
                          {platformSettings.emailNotifications
                            ? "Enabled"
                            : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4 sm:p-5 lg:p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4">
                      Platform Status
                    </h3>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Maintenance Mode
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Put platform into maintenance mode for updates
                          </p>
                        </div>
                        <Button
                          variant={
                            platformSettings.maintenanceMode
                              ? "destructive"
                              : "outline"
                          }
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            setPlatformSettings({
                              ...platformSettings,
                              maintenanceMode:
                                !platformSettings.maintenanceMode,
                            });
                            toast({
                              title: platformSettings.maintenanceMode
                                ? "Maintenance Mode Off"
                                : "Maintenance Mode On",
                              description: platformSettings.maintenanceMode
                                ? "Platform is now accessible to all users"
                                : "Platform is now in maintenance mode",
                              variant: platformSettings.maintenanceMode
                                ? "default"
                                : "destructive",
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
                            description:
                              "Platform cache has been cleared successfully",
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

      {/* Event Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Event Preview & Approval
            </DialogTitle>
            <DialogDescription>
              Review event details before making a decision
            </DialogDescription>
          </DialogHeader>

          {previewEvent && (
            <div className="space-y-6">
              {/* Event Banner */}
              {previewEvent.banner && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={previewEvent.banner}
                    alt={previewEvent.name || previewEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Event Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {previewEvent.name || previewEvent.title}
                  </h3>
                  <Badge variant="outline">
                    {previewEvent.category || "General"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Start Date
                    </p>
                    <p className="font-medium">
                      {previewEvent.startDate || previewEvent.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Start Time
                    </p>
                    <p className="font-medium">
                      {previewEvent.startTime || "TBA"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      End Date
                    </p>
                    <p className="font-medium">
                      {previewEvent.endDate || "Same day"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      End Time
                    </p>
                    <p className="font-medium">
                      {previewEvent.endTime || "TBA"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Venue</p>
                  <p className="font-medium">{previewEvent.venue || "TBA"}</p>
                  {previewEvent.address && (
                    <p className="text-sm text-muted-foreground">
                      {previewEvent.address}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Description
                  </p>
                  <p className="text-sm">
                    {previewEvent.description || "No description provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Event Type
                  </p>
                  <p className="font-medium">
                    {previewEvent.isFreeEvent ? "Free Event" : "Paid Event"}
                  </p>
                </div>

                {previewEvent.ticketTiers &&
                  previewEvent.ticketTiers.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Ticket Tiers
                      </p>
                      <div className="space-y-2">
                        {previewEvent.ticketTiers.map(
                          (tier: any, index: number) => (
                            <div
                              key={index}
                              className="p-3 bg-white/5 rounded-lg"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{tier.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {tier.description}
                                  </p>
                                </div>
                                <p className="font-bold">
                                  {tier.price === 0 ? "Free" : `$${tier.price}`}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Quantity: {tier.quantity}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                  <p className="font-medium">
                    {previewEvent.capacity || "Unlimited"}
                  </p>
                </div>
              </div>

              {/* Organizer Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Organizer Information</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">
                      {previewEvent.createdBy ||
                        previewEvent.organizer ||
                        "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Submitted On
                    </p>
                    <p className="font-medium">
                      {new Date(previewEvent.id).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      variant={
                        previewEvent.approvalStatus === "pending"
                          ? "outline"
                          : "default"
                      }
                    >
                      {previewEvent.approvalStatus ||
                        previewEvent.status ||
                        "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1 bg-green-500/10 hover:bg-green-500/20 border-green-500/50"
                  onClick={() => approveEvent(previewEvent.id)}
                >
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Approve Event
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 border-red-500/50"
                  onClick={() => rejectEvent(previewEvent.id)}
                >
                  <X className="w-4 h-4 mr-2 text-red-500" />
                  Reject Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
