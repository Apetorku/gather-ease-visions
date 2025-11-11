import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { QRScanner } from "@/components/QRScanner";
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
  QrCode,
  CheckCircle,
  XCircle,
  Users,
  Clock,
  TrendingUp,
  ArrowLeft,
  User,
  LogOut,
  Settings,
  Calendar,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CheckInStation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("Organizer");
  const [isLoading, setIsLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [checkInStats, setCheckInStats] = useState({
    totalCheckedIn: 0,
    totalRegistered: 250,
    successRate: 0,
    averageTime: "2.3s",
  });

  const [recentCheckIns, setRecentCheckIns] = useState<any[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      ticketType: "VIP",
      time: "2 mins ago",
      status: "success",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      ticketType: "General",
      time: "5 mins ago",
      status: "success",
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      ticketType: "VIP",
      time: "8 mins ago",
      status: "duplicate",
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
        description: "Please login to access check-in station",
        variant: "destructive",
      });
      navigate("/login", { replace: true });
      return;
    }

    if (userRole !== "organizer" && userRole !== "admin" && userRole !== "superadmin") {
      toast({
        title: "Access Denied",
        description: "Only organizers can access check-in station",
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

  const handleScanSuccess = (data: string) => {
    try {
      const ticketData = JSON.parse(data);
      
      // Check for duplicate
      const isDuplicate = recentCheckIns.some(
        (checkIn) => checkIn.email === ticketData.email && checkIn.status === "success"
      );

      if (isDuplicate) {
        toast({
          title: "Duplicate Check-In",
          description: `${ticketData.name} has already checked in!`,
          variant: "destructive",
        });
        
        setRecentCheckIns([
          {
            id: Date.now(),
            name: ticketData.name,
            email: ticketData.email,
            ticketType: ticketData.ticketType || "General",
            time: "Just now",
            status: "duplicate",
          },
          ...recentCheckIns,
        ]);
        return;
      }

      // Successful check-in
      toast({
        title: "Check-In Successful",
        description: `Welcome ${ticketData.name}! Enjoy the event.`,
      });

      setRecentCheckIns([
        {
          id: Date.now(),
          name: ticketData.name,
          email: ticketData.email,
          ticketType: ticketData.ticketType || "General",
          time: "Just now",
          status: "success",
        },
        ...recentCheckIns,
      ]);

      setCheckInStats((prev) => ({
        ...prev,
        totalCheckedIn: prev.totalCheckedIn + 1,
        successRate: Math.round(((prev.totalCheckedIn + 1) / prev.totalRegistered) * 100),
      }));
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "This QR code is not valid for this event",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading check-in station...</p>
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
                GatherEase Check-In
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
              <CheckCircle className="w-8 h-8 text-green-500" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{checkInStats.totalCheckedIn}</div>
            <div className="text-sm text-muted-foreground">Checked In</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">{checkInStats.totalRegistered}</div>
            <div className="text-sm text-muted-foreground">Total Registered</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
            <div className="text-3xl font-bold mb-1">{checkInStats.successRate}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{checkInStats.averageTime}</div>
            <div className="text-sm text-muted-foreground">Avg Check-In Time</div>
          </GlassCard>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Scanner Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <QrCode className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-2">Scan QR Code</h2>
                <p className="text-muted-foreground">
                  Scan attendee tickets to check them in
                </p>
              </div>

              {!showScanner ? (
                <Button
                  onClick={() => setShowScanner(true)}
                  variant="gradient"
                  size="lg"
                  className="w-full"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <div className="space-y-4">
                  <QRScanner onScanSuccess={handleScanSuccess} />
                  <Button
                    onClick={() => setShowScanner(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Stop Scanning
                  </Button>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Recent Check-Ins */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-6">Recent Check-Ins</h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {recentCheckIns.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No check-ins yet. Start scanning to check in attendees.
                  </div>
                ) : (
                  recentCheckIns.map((checkIn) => (
                    <div
                      key={checkIn.id}
                      className="flex items-start justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start gap-3">
                        {checkIn.status === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold">{checkIn.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {checkIn.email}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {checkIn.ticketType}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {checkIn.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          checkIn.status === "success" ? "default" : "destructive"
                        }
                      >
                        {checkIn.status === "success" ? "Checked In" : "Duplicate"}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckInStation;
