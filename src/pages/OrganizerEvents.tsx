import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Send,
  Bell,
  Edit,
  Eye,
  Trash2,
  Copy,
  QrCode,
  Download,
  ArrowLeft,
  User,
  LogOut,
  Filter,
  Search,
} from "lucide-react";

const OrganizerEvents = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Organizer");
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog states
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] =
    useState(false);
  const [isSurveyDialogOpen, setIsSurveyDialogOpen] = useState(false);
  const [isViewAttendeesDialogOpen, setIsViewAttendeesDialogOpen] =
    useState(false);

  // Announcement form
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementType, setAnnouncementType] = useState("email");

  // Survey form
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [surveyQuestions, setSurveyQuestions] = useState([
    { id: 1, question: "", type: "text" },
  ]);

  // Load events from localStorage
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    const storedUserName = localStorage.getItem("userName");

    if (!userSession) {
      toast({
        title: "Access Denied",
        description: "Please login to access this page",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    setUserName(storedUserName || "Organizer");

    const savedEvents = localStorage.getItem("myEvents");
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        // Filter events created by current user
        const userEvents = parsedEvents.filter(
          (event: any) => event.createdBy === storedUserName
        );
        setMyEvents(userEvents);
        setFilteredEvents(userEvents);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    }
  }, [navigate]);

  // Filter events based on search and status
  useEffect(() => {
    let filtered = myEvents;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, statusFilter, myEvents]);

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

  const openAnnouncementDialog = (event: any) => {
    setSelectedEvent(event);
    setAnnouncementTitle("");
    setAnnouncementMessage("");
    setAnnouncementType("email");
    setIsAnnouncementDialogOpen(true);
  };

  const openSurveyDialog = (event: any) => {
    setSelectedEvent(event);
    setSurveyTitle("");
    setSurveyDescription("");
    setSurveyQuestions([{ id: 1, question: "", type: "text" }]);
    setIsSurveyDialogOpen(true);
  };

  const openViewAttendeesDialog = (event: any) => {
    setSelectedEvent(event);
    setIsViewAttendeesDialogOpen(true);
  };

  const handleSendAnnouncement = () => {
    if (!announcementTitle || !announcementMessage) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Save announcement to localStorage
    const announcements = JSON.parse(
      localStorage.getItem("announcements") || "[]"
    );
    const newAnnouncement = {
      id: Date.now(),
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      title: announcementTitle,
      message: announcementMessage,
      type: announcementType,
      sentBy: userName,
      sentAt: new Date().toISOString(),
      recipients: selectedEvent.attendees || 0,
    };
    announcements.push(newAnnouncement);
    localStorage.setItem("announcements", JSON.stringify(announcements));

    toast({
      title: "Announcement Sent",
      description: `Your announcement has been sent to ${
        selectedEvent.attendees || 0
      } attendees via ${announcementType}`,
    });

    setIsAnnouncementDialogOpen(false);
  };

  const handleSendSurvey = () => {
    if (!surveyTitle || !surveyDescription) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate questions
    const validQuestions = surveyQuestions.filter((q) => q.question.trim());
    if (validQuestions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one question",
        variant: "destructive",
      });
      return;
    }

    // Save survey to localStorage
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const newSurvey = {
      id: Date.now(),
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      title: surveyTitle,
      description: surveyDescription,
      questions: validQuestions,
      createdBy: userName,
      createdAt: new Date().toISOString(),
      responses: [],
    };
    surveys.push(newSurvey);
    localStorage.setItem("surveys", JSON.stringify(surveys));

    toast({
      title: "Survey Created & Sent",
      description: `Survey has been sent to ${
        selectedEvent.attendees || 0
      } registered attendees`,
    });

    setIsSurveyDialogOpen(false);
  };

  const addSurveyQuestion = () => {
    setSurveyQuestions([
      ...surveyQuestions,
      { id: Date.now(), question: "", type: "text" },
    ]);
  };

  const removeSurveyQuestion = (id: number) => {
    if (surveyQuestions.length > 1) {
      setSurveyQuestions(surveyQuestions.filter((q) => q.id !== id));
    }
  };

  const updateSurveyQuestion = (id: number, field: string, value: string) => {
    setSurveyQuestions(
      surveyQuestions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleDeleteEvent = (eventId: number) => {
    const updatedEvents = myEvents.filter((e) => e.id !== eventId);
    setMyEvents(updatedEvents);
    localStorage.setItem("myEvents", JSON.stringify(updatedEvents));
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully",
      variant: "destructive",
    });
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
                      Organizer
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/organizer-dashboard")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <User className="mr-2 h-4 w-4" />
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
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">My Events</h1>
          <p className="text-muted-foreground">
            Manage all your created events, make announcements, and send surveys
          </p>
        </motion.div>

        {/* Filters and Search */}
        <GlassCard className="p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search Events</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, category, or venue..."
                  className="pl-10 glass-card border-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-2 glass-card border-white/20">
                  <SelectValue placeholder="All Events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="active">Active/Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredEvents.length} of {myEvents.length} events
            </p>
            <Link to="/organizer/create-event">
              <Button variant="gradient" size="sm">
                Create New Event
              </Button>
            </Link>
          </div>
        </GlassCard>

        {/* Events Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <GlassCard
                  key={event.id}
                  className="p-6 hover:scale-105 transition-transform"
                >
                  {/* Event Image/Banner */}
                  {event.banner && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={event.banner}
                        alt={event.name}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}

                  {/* Event Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <div className="flex flex-col gap-1">
                        {event.approvalStatus && (
                          <Badge
                            variant={
                              event.approvalStatus === "approved"
                                ? "default"
                                : event.approvalStatus === "pending"
                                ? "outline"
                                : "destructive"
                            }
                            className={
                              event.approvalStatus === "approved"
                                ? "bg-green-500 text-xs"
                                : event.approvalStatus === "pending"
                                ? "border-yellow-500 text-yellow-500 text-xs"
                                : "text-xs"
                            }
                          >
                            {event.approvalStatus === "approved"
                              ? "✓ Approved"
                              : event.approvalStatus === "pending"
                              ? "⏱ Pending Approval"
                              : "✗ Rejected"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{event.attendees || 0} Registered</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">📍</span>
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-lg bg-white/5">
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-semibold">{event.revenue || "$0"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Check-in</p>
                      <p className="font-semibold">{event.checkInRate || 0}%</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAnnouncementDialog(event)}
                      className="w-full"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Announce
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openSurveyDialog(event)}
                      className="w-full"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Survey
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewAttendeesDialog(event)}
                      className="w-full"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Attendees
                    </Button>
                    <Link to={`/events/${event.id}`} className="w-full">
                      <Button variant="ghost" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <GlassCard className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first event to get started"}
                </p>
                <Link to="/organizer/create-event">
                  <Button variant="gradient">Create Event</Button>
                </Link>
              </GlassCard>
            )}
          </TabsContent>

          <TabsContent value="active">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter((e) => e.status === "active")
                .map((event) => (
                  <GlassCard
                    key={event.id}
                    className="p-6 hover:scale-105 transition-transform"
                  >
                    {/* Same card content as above */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg">{event.name}</h3>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{event.attendees || 0} Registered</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAnnouncementDialog(event)}
                        className="w-full"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Announce
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openSurveyDialog(event)}
                        className="w-full"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Survey
                      </Button>
                    </div>
                  </GlassCard>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter((e) => e.status === "draft")
                .map((event) => (
                  <GlassCard
                    key={event.id}
                    className="p-6 hover:scale-105 transition-transform"
                  >
                    {/* Same card content */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-lg">{event.name}</h3>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/organizer/create-event?edit=${event.id}`)
                        }
                        className="w-full"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </GlassCard>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Announcement Dialog */}
      <Dialog
        open={isAnnouncementDialogOpen}
        onOpenChange={setIsAnnouncementDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Announcement</DialogTitle>
            <DialogDescription>
              Send an announcement to all registered attendees of{" "}
              <strong>{selectedEvent?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="announcement-title">Title *</Label>
              <Input
                id="announcement-title"
                placeholder="Important Update"
                className="mt-2"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="announcement-message">Message *</Label>
              <Textarea
                id="announcement-message"
                placeholder="Write your announcement message here..."
                className="mt-2 min-h-32"
                value={announcementMessage}
                onChange={(e) => setAnnouncementMessage(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="announcement-type">Send Via</Label>
              <Select
                value={announcementType}
                onValueChange={setAnnouncementType}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="both">
                    Email & Push Notification
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm">
                <Bell className="w-4 h-4 inline mr-2" />
                This will be sent to{" "}
                <strong>{selectedEvent?.attendees || 0}</strong> registered
                attendees
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAnnouncementDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="gradient" onClick={handleSendAnnouncement}>
              <Send className="w-4 h-4 mr-2" />
              Send Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Survey Dialog */}
      <Dialog open={isSurveyDialogOpen} onOpenChange={setIsSurveyDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create & Send Survey</DialogTitle>
            <DialogDescription>
              Create a post-event survey for{" "}
              <strong>{selectedEvent?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="survey-title">Survey Title *</Label>
              <Input
                id="survey-title"
                placeholder="Post-Event Feedback Survey"
                className="mt-2"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="survey-description">Description *</Label>
              <Textarea
                id="survey-description"
                placeholder="Help us improve by sharing your feedback..."
                className="mt-2"
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Questions</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSurveyQuestion}
                >
                  Add Question
                </Button>
              </div>
              <div className="space-y-3">
                {surveyQuestions.map((q, index) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-lg border border-white/20"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <Badge variant="secondary">Q{index + 1}</Badge>
                      {surveyQuestions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSurveyQuestion(q.id)}
                          className="ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Enter your question"
                      value={q.question}
                      onChange={(e) =>
                        updateSurveyQuestion(q.id, "question", e.target.value)
                      }
                      className="mb-2"
                    />
                    <Select
                      value={q.type}
                      onValueChange={(value) =>
                        updateSurveyQuestion(q.id, "type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Short Text</SelectItem>
                        <SelectItem value="textarea">Long Text</SelectItem>
                        <SelectItem value="rating">Rating (1-5)</SelectItem>
                        <SelectItem value="yesno">Yes/No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm">
                <FileText className="w-4 h-4 inline mr-2" />
                Survey will be sent to{" "}
                <strong>{selectedEvent?.attendees || 0}</strong> registered
                attendees
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSurveyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="gradient" onClick={handleSendSurvey}>
              <Send className="w-4 h-4 mr-2" />
              Create & Send Survey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Attendees Dialog */}
      <Dialog
        open={isViewAttendeesDialogOpen}
        onOpenChange={setIsViewAttendeesDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Attendees</DialogTitle>
            <DialogDescription>
              Registered attendees for <strong>{selectedEvent?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center p-8">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-semibold mb-2">
                {selectedEvent?.attendees || 0} Registered Attendees
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Attendee list will be available after event registration opens
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/organizer/attendees")}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Attendee List
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerEvents;
