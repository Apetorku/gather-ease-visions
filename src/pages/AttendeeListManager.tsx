import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  Download,
  Mail,
  MessageSquare,
  ArrowLeft,
  User,
  LogOut,
  Settings,
  Calendar,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AttendeeListManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("Organizer");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTicketType, setFilterTicketType] = useState("all");
  const [selectedAttendees, setSelectedAttendees] = useState<number[]>([]);

  const [attendees, setAttendees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      ticketType: "VIP",
      status: "checked-in",
      registrationDate: "2025-01-15",
      checkInTime: "2025-02-01 10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      ticketType: "General",
      status: "registered",
      registrationDate: "2025-01-18",
      checkInTime: null,
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "+1 234-567-8902",
      ticketType: "VIP",
      status: "checked-in",
      registrationDate: "2025-01-20",
      checkInTime: "2025-02-01 11:15 AM",
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234-567-8903",
      ticketType: "General",
      status: "registered",
      registrationDate: "2025-01-22",
      checkInTime: null,
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "+1 234-567-8904",
      ticketType: "Early Bird",
      status: "cancelled",
      registrationDate: "2025-01-10",
      checkInTime: null,
    },
  ]);

  // Check authentication on mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    const userRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");

    if (!userSession) {
      toast({
        title: "Access Denied",
        description: "Please login to access attendee list",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    if (userRole !== "organizer" && userRole !== "admin" && userRole !== "superadmin") {
      toast({
        title: "Access Denied",
        description: "Only organizers can access attendee list",
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

  const handleExportCSV = () => {
    const csv = [
      ["Name", "Email", "Phone", "Ticket Type", "Status", "Registration Date", "Check-In Time"],
      ...filteredAttendees.map((a) => [
        a.name,
        a.email,
        a.phone,
        a.ticketType,
        a.status,
        a.registrationDate,
        a.checkInTime || "Not checked in",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendees.csv";
    a.click();

    toast({
      title: "Export Successful",
      description: "Attendee list exported to CSV",
    });
  };

  const handleSendEmail = (attendee: any) => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${attendee.name}`,
    });
  };

  const handleSendBulkEmail = () => {
    if (selectedAttendees.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select attendees to send emails",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk Email Sent",
      description: `Email sent to ${selectedAttendees.length} attendees`,
    });
    setSelectedAttendees([]);
  };

  const toggleSelectAttendee = (id: number) => {
    setSelectedAttendees((prev) =>
      prev.includes(id) ? prev.filter((attendeeId) => attendeeId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedAttendees.length === filteredAttendees.length) {
      setSelectedAttendees([]);
    } else {
      setSelectedAttendees(filteredAttendees.map((a) => a.id));
    }
  };

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || attendee.status === filterStatus;
    const matchesTicketType =
      filterTicketType === "all" || attendee.ticketType === filterTicketType;

    return matchesSearch && matchesStatus && matchesTicketType;
  });

  const stats = {
    total: attendees.length,
    checkedIn: attendees.filter((a) => a.status === "checked-in").length,
    registered: attendees.filter((a) => a.status === "registered").length,
    cancelled: attendees.filter((a) => a.status === "cancelled").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading attendees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Attendee Manager
              </h1>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
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
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Organizer
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/organizer-dashboard")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
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
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Attendees</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.checkedIn}</div>
            <div className="text-sm text-muted-foreground">Checked In</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.registered}</div>
            <div className="text-sm text-muted-foreground">Registered</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.cancelled}</div>
            <div className="text-sm text-muted-foreground">Cancelled</div>
          </GlassCard>
        </motion.div>

        {/* Actions and Filters */}
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTicketType} onValueChange={setFilterTicketType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Early Bird">Early Bird</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportCSV} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={handleSendBulkEmail}
                variant="gradient"
                disabled={selectedAttendees.length === 0}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email ({selectedAttendees.length})
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Attendee Table */}
        <GlassCard className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={
                        selectedAttendees.length === filteredAttendees.length &&
                        filteredAttendees.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Check-In Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No attendees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedAttendees.includes(attendee.id)}
                          onChange={() => toggleSelectAttendee(attendee.id)}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>{attendee.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{attendee.ticketType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            attendee.status === "checked-in"
                              ? "default"
                              : attendee.status === "registered"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {attendee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{attendee.registrationDate}</TableCell>
                      <TableCell>{attendee.checkInTime || "-"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSendEmail(attendee)}>
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send SMS
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Cancel Registration
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AttendeeListManager;
