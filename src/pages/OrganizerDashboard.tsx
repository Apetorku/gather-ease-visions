import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  BarChart3,
  Ticket,
  Plus,
  Settings,
  Edit,
  Trash2,
  UserPlus,
  Shield,
  Clock,
  TrendingUp,
  Download,
  Copy,
  Eye,
  QrCode,
  MessageSquare,
  FileText,
  RefreshCw,
  LogOut,
  User,
} from "lucide-react";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Organizer");
  const [isLoading, setIsLoading] = useState(true);

  // All state declarations
  const [myEvents, setMyEvents] = useState([
    {
      id: 1,
      name: "Tech Summit 2025",
      date: "March 15, 2025",
      attendees: 245,
      revenue: "$12,250",
      description: "Annual technology conference",
      status: "active",
      checkInRate: 85,
    },
    {
      id: 2,
      name: "Design Workshop",
      date: "March 20, 2025",
      attendees: 89,
      revenue: "$4,450",
      description: "Interactive design workshop",
      status: "draft",
      checkInRate: 0,
    },
  ]);

  const [teamMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Admin",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SJ",
      joinedDate: "Jan 15, 2024",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "Editor",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MC",
      joinedDate: "Feb 20, 2024",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Viewer",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ED",
      joinedDate: "Mar 10, 2024",
      lastActive: "3 days ago",
    },
  ]);

  const [organizationStats] = useState({
    totalEvents: 12,
    totalRevenue: 48750,
    totalAttendees: 1840,
    avgRating: 4.7,
    growthRate: 15.2,
  });

  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<number | null>(null);

  // Check authentication and role on mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    const userRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");
    
    if (!userSession) {
      toast({
        title: "Access Denied",
        description: "Please login to access the organizer dashboard",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    if (userRole !== "organizer" && userRole !== "admin" && userRole !== "superadmin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/dashboard", { replace: true });
      return;
    }
    
    setUserName(storedUserName || "Organizer");
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

  const openEventCheckIn = (event: any) => {
    toast({
      title: "Opening Check-In",
      description: `Opening QR check-in interface for ${event.name}`,
    });
    // In a real app, this would navigate to a dedicated check-in page
    // navigate(`/organizer/check-in/${event.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading organizer dashboard...</p>
        </div>
      </div>
    );
  }

  const handleEditClick = (event: any) => {
    setEditingEvent({ ...event });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setMyEvents(
      myEvents.map((e) => (e.id === editingEvent.id ? editingEvent : e))
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Event Updated",
      description: "Your event has been successfully updated.",
    });
  };

  const handleDeleteClick = (eventId: number) => {
    setDeletingEventId(eventId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setMyEvents(myEvents.filter((e) => e.id !== deletingEventId));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Event Deleted",
      description: "Your event has been successfully deleted.",
      variant: "destructive",
    });
  };

  const duplicateEvent = (event: any) => {
    const newEvent = {
      ...event,
      id: Date.now(),
      name: `${event.name} (Copy)`,
      status: "draft",
      attendees: 0,
      revenue: "$0",
    };
    setMyEvents([...myEvents, newEvent]);
    toast({
      title: "Event Duplicated",
      description: "A copy of your event has been created as draft.",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-500/20 text-red-400";
      case "Editor":
        return "bg-blue-500/20 text-blue-400";
      case "Viewer":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              GatherEase
            </h1>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link to="/organizer/create-event">
              <Button variant="gradient" size="sm" className="sm:h-10">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Create Event</span>
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="sm:h-10">
                Browse Events
              </Button>
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
                      Organizer Dashboard
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/events")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Browse Events</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Organizer Dashboard
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your events, team, and organization
              </p>
            </div>
            <Link to="/organizer/create-event">
              <Button variant="gradient" size="lg" className="hidden sm:flex">
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>

          {/* Organization Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {organizationStats.totalEvents}
              </div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">
                ${organizationStats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">
                {organizationStats.totalAttendees}
              </div>
              <div className="text-sm text-muted-foreground">Attendees</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {organizationStats.avgRating}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div className="text-xl font-bold text-green-500">
                  +{organizationStats.growthRate}%
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Growth</div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6 mt-8">
            {/* Event Management Tools Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Event Management Tools
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <Link to="/organizer/create-event" className="w-full">
                    <Button variant="gradient" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Bulk Operations",
                        description: "Opening bulk event management tools",
                      });
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Bulk Actions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Templates",
                        description: "Opening event templates library",
                      });
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Templates
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Analytics",
                        description: "Opening comprehensive analytics dashboard",
                      });
                    }}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Export Data",
                        description: "Preparing event data export",
                      });
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Advanced Tools Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <GlassCard className="p-6 mb-6 bg-gradient-to-r from-primary/10 to-accent/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Advanced Organizer Tools
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="gradient"
                    className="w-full justify-start h-auto py-4"
                    onClick={() => {
                      toast({
                        title: "QR Check-in System",
                        description: "Opening QR code scanner for event check-in",
                      });
                      // Navigate to check-in page or open scanner
                      navigate("/organizer/check-in");
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <QrCode className="w-5 h-5" />
                        <span className="font-bold">QR Check-in</span>
                      </div>
                      <span className="text-xs opacity-80">
                        Scan attendee QR codes
                      </span>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4"
                    onClick={() => {
                      toast({
                        title: "Attendee Communication",
                        description: "Opening messaging center",
                      });
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-bold">Announcements</span>
                      </div>
                      <span className="text-xs opacity-80">
                        Send updates to attendees
                      </span>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4"
                    onClick={() => {
                      toast({
                        title: "Survey Builder",
                        description: "Opening post-event survey creator",
                      });
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-5 h-5" />
                        <span className="font-bold">PES Builder</span>
                      </div>
                      <span className="text-xs opacity-80">
                        Create post-event surveys
                      </span>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-4"
                    onClick={() => {
                      toast({
                        title: "Analytics Dashboard",
                        description: "Opening detailed event analytics",
                      });
                    }}
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-bold">Live Analytics</span>
                      </div>
                      <span className="text-xs opacity-80">
                        Real-time event insights
                      </span>
                    </div>
                  </Button>
                </div>

                {/* Secondary Advanced Tools */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Ticket Management",
                          description: "Opening ticket types and pricing settings",
                        });
                      }}
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      Tickets
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Team Management",
                          description: "Opening team roles and permissions",
                        });
                      }}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Team
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Reports",
                          description: "Generating comprehensive event reports",
                        });
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Reports
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: "Settings",
                          description: "Opening event settings",
                        });
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">My Events</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                {myEvents.map((event) => (
                  <GlassCard
                    key={event.id}
                    className="p-4 sm:p-6 hover:scale-102 transition-transform"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-base sm:text-lg">
                            {event.name}
                          </h4>
                          <Badge
                            variant={
                              event.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              event.status === "active" ? "bg-green-500" : ""
                            }
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                            {event.attendees} attendees
                          </div>
                          {event.status === "active" && (
                            <div className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                              {event.checkInRate}% checked in
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <div className="text-base sm:text-lg font-bold text-primary">
                          {event.revenue}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Revenue
                        </div>
                      </div>
                    </div>

                    {event.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Check-in Progress</span>
                          <span>{event.checkInRate}%</span>
                        </div>
                        <Progress value={event.checkInRate} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Link to={`/events/${event.id}`} className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs sm:text-sm"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs sm:text-sm"
                        onClick={() => handleEditClick(event)}
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs sm:text-sm"
                        onClick={() => duplicateEvent(event)}
                      >
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Copy</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full text-xs sm:text-sm"
                        onClick={() => handleDeleteClick(event.id)}
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                    
                    {/* Advanced Event Tools */}
                    {event.status === "active" && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                        <Button
                          variant="glass"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => openEventCheckIn(event)}
                        >
                          <QrCode className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                          <span className="hidden sm:inline">QR Check-in</span>
                        </Button>
                        <Button
                          variant="glass"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => {
                            toast({
                              title: "Announcement Sent",
                              description: `Notification sent to all attendees of ${event.name}`,
                            });
                          }}
                        >
                          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Announce</span>
                        </Button>
                        <Button
                          variant="glass"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => {
                            toast({
                              title: "Downloading Report",
                              description: `Generating analytics report for ${event.name}`,
                            });
                          }}
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Export</span>
                        </Button>
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Team Management</h3>
                <p className="text-muted-foreground">
                  Manage team members and their permissions
                </p>
              </div>
              <Button variant="gradient">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Team Member
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {teamMembers.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Team Members
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Shield className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-sm text-muted-foreground">Admins</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">
                      Active Today
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{member.name}</p>
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Joined {member.joinedDate} • Last active{" "}
                          {member.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold mb-4">Role Permissions</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    Admin
                  </h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Full access to all features</li>
                    <li>• Manage team members</li>
                    <li>• Delete events and data</li>
                    <li>• Billing and subscription</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Editor
                  </h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Create and edit events</li>
                    <li>• Manage registrations</li>
                    <li>• View analytics</li>
                    <li>• Send notifications</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Viewer
                  </h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• View events and analytics</li>
                    <li>• Check-in attendees</li>
                    <li>• Export reports</li>
                    <li>• Read-only access</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Analytics Overview</h3>
                <p className="text-muted-foreground">
                  Track performance across all your events
                </p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h4 className="text-lg font-semibold mb-4">Revenue Trends</h4>
                <div className="space-y-4">
                  {["January", "February", "March"].map((month, index) => {
                    const revenue = [8500, 12200, 15800][index];
                    const growth = [0, 43, 29][index];
                    return (
                      <div
                        key={month}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(revenue / 20000) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-16">
                            ${revenue.toLocaleString()}
                          </span>
                          {growth > 0 && (
                            <span className="text-xs text-green-500">
                              +{growth}%
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Event Performance
                </h4>
                <div className="space-y-4">
                  {myEvents.map((event) => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="truncate flex-1 mr-2">
                          {event.name}
                        </span>
                        <span className="text-muted-foreground">
                          {event.attendees} attendees
                        </span>
                      </div>
                      <Progress
                        value={(event.attendees / 300) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">Event Templates</h3>
                <p className="text-muted-foreground">
                  Save time with pre-configured event templates
                </p>
              </div>
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Tech Conference", events: 5, category: "Technology" },
                { name: "Workshop Series", events: 12, category: "Education" },
                { name: "Networking Event", events: 8, category: "Business" },
              ].map((template, index) => (
                <GlassCard
                  key={index}
                  className="p-6 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {template.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Used in {template.events} events</span>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Event Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
              <DialogDescription>
                Make changes to your event details below.
              </DialogDescription>
            </DialogHeader>
            {editingEvent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editingEvent.name}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editingEvent.description}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this event? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
