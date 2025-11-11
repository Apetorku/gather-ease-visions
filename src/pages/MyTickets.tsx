import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Download,
  Share2,
  Settings,
  QrCode,
  Clock,
  Ticket,
  LogOut,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
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
import { useToast } from "@/hooks/use-toast";

const MyTickets = () => {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check authentication on mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    const storedUserName = localStorage.getItem("userName");
    
    if (!userSession) {
      toast({
        title: "Access Denied",
        description: "Please login to view your tickets",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }
    
    setUserName(storedUserName || "User");
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
    console.log("🔍 MyTickets - Current user role:", userRole);
    console.log("🔍 MyTickets - localStorage:", {
      userRole: localStorage.getItem("userRole"),
      userName: localStorage.getItem("userName"),
      userEmail: localStorage.getItem("userEmail"),
    });
    
    // Redirect based on user role
    if (userRole === "superadmin") {
      console.log("✅ Navigating to /superadmin");
      navigate("/superadmin");
    } else if (userRole === "admin") {
      console.log("✅ Navigating to /admin");
      navigate("/admin");
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
          <p className="mt-4 text-muted-foreground">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  const handleDownloadTicket = async (ticket: any) => {
    try {
      // Create a canvas to draw the ticket
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Background
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient header
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 100);
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(1, "#a855f7");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 150);

      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial";
      ctx.fillText("GatherEase", 50, 90);

      // Event details
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 36px Arial";
      ctx.fillText(ticket.eventTitle, 50, 230);

      ctx.fillStyle = "#a0a0a0";
      ctx.font = "24px Arial";
      ctx.fillText(`📅 ${ticket.eventDate}`, 50, 280);
      ctx.fillText(`🕐 ${ticket.eventTime}`, 50, 320);
      ctx.fillText(`📍 ${ticket.location}`, 50, 360);
      ctx.fillText(`🎫 ${ticket.ticketType}`, 50, 400);

      // Ticket number
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px monospace";
      ctx.fillText(ticket.ticketNumber, 50, 460);

      // Load and draw QR code
      const qrImg = new Image();
      qrImg.crossOrigin = "anonymous";
      qrImg.onload = () => {
        ctx.drawImage(qrImg, 250, 520, 300, 300);

        // Instructions
        ctx.fillStyle = "#a0a0a0";
        ctx.font = "18px Arial";
        ctx.fillText("Show this QR code at the event entrance", 150, 880);

        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `ticket-${ticket.ticketNumber}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast({
              title: "Ticket Downloaded",
              description: "Your ticket has been saved to your device.",
            });
          }
        });
      };
      qrImg.src = ticket.qrCode;
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "Unable to download ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareTicket = async (ticket: any) => {
    const shareData = {
      title: `${ticket.eventTitle} - Ticket`,
      text: `Check out my ticket for ${ticket.eventTitle} on ${ticket.eventDate}!`,
      url: `${window.location.origin}/events/${ticket.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Ticket shared!",
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        toast({
          title: "Link Copied",
          description: "Ticket details copied to clipboard!",
        });
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Share error:", error);
        toast({
          title: "Share Failed",
          description: "Unable to share ticket. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const tickets = [
    {
      id: 1,
      eventTitle: "Tech Innovation Summit 2025",
      eventDate: "March 15, 2025",
      eventTime: "9:00 AM - 5:00 PM",
      location: "Silicon Valley Convention Center",
      ticketType: "VIP Pass",
      ticketNumber: "TIS2025-VIP-1234",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TIS2025-VIP-1234",
      status: "active",
      purchaseDate: "Feb 10, 2025",
      price: 299,
    },
    {
      id: 2,
      eventTitle: "Design Workshop",
      eventDate: "March 22, 2025",
      eventTime: "2:00 PM - 6:00 PM",
      location: "Creative Hub Downtown",
      ticketType: "Standard Pass",
      ticketNumber: "DW2025-STD-5678",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DW2025-STD-5678",
      status: "active",
      purchaseDate: "Feb 15, 2025",
      price: 149,
    },
    {
      id: 3,
      eventTitle: "Music Festival 2024",
      eventDate: "December 10, 2024",
      eventTime: "12:00 PM - 11:00 PM",
      location: "City Park Grounds",
      ticketType: "General Admission",
      ticketNumber: "MF2024-GA-9012",
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MF2024-GA-9012",
      status: "used",
      purchaseDate: "Nov 5, 2024",
      price: 99,
    },
  ];

  const activeTickets = tickets.filter((t) => t.status === "active");
  const pastTickets = tickets.filter((t) => t.status === "used");

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
            <Button variant="ghost" onClick={handleDashboardClick}>
              Dashboard
            </Button>
            
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
                      My Tickets
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDashboardClick}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/events")}>
                  <Ticket className="mr-2 h-4 w-4" />
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

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            View and manage all your event tickets
          </p>
        </motion.div>

        {/* Active Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activeTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 hover:scale-102 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Badge className="mb-2">{ticket.ticketType}</Badge>
                      <h3 className="text-xl font-bold mb-2">
                        {ticket.eventTitle}
                      </h3>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                      <Ticket className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{ticket.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{ticket.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{ticket.location}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 mb-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Ticket Number
                    </p>
                    <p className="font-mono text-sm font-semibold">
                      {ticket.ticketNumber}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadTicket(ticket)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShareTicket(ticket)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Past Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 opacity-75 hover:opacity-100 transition-opacity">
                  <Badge variant="outline" className="mb-2">
                    Used
                  </Badge>
                  <h4 className="font-semibold mb-2">{ticket.eventTitle}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {ticket.eventDate}
                  </p>
                  <Button variant="ghost" size="sm" className="w-full">
                    View Details
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* QR Code Modal */}
      <Dialog
        open={selectedTicket !== null}
        onOpenChange={() => setSelectedTicket(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Your Event Ticket</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="text-center space-y-4">
              {(() => {
                const ticket = tickets.find((t) => t.id === selectedTicket);
                if (!ticket) return null;
                return (
                  <>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <img
                        src={ticket.qrCode}
                        alt="QR Code"
                        className="w-full max-w-[300px] mx-auto"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {ticket.eventTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {ticket.ticketType}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {ticket.ticketNumber}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-1">
                        Show this QR code at the event entrance
                      </p>
                      <p>Valid for: {ticket.eventDate}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => ticket && handleDownloadTicket(ticket)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => ticket && handleShareTicket(ticket)}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyTickets;
