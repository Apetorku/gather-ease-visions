import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  Users,
  Calendar,
  Ticket,
  Settings,
  Shield,
  MessageSquare,
  QrCode,
  FileText,
  TrendingUp,
  Crown,
  UserCog,
  Plus,
  Edit,
  Copy,
  RefreshCw,
  Check,
  X,
  Search,
  AlertCircle,
  Lock,
  Unlock,
  Ban,
  UserPlus,
  UserMinus,
  Database,
  Activity,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: "admin" | "moderator";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  lastActive: string;
  permissions: string[];
  eventsManaged: number;
  avatar?: string;
}

interface SystemLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
}

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("admins");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "admin" as "admin" | "moderator",
    permissions: [] as string[],
  });

  // Check Super Admin authentication
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");

    // Only allow super admin role AND the designated email
    if (userRole !== "superadmin" || userEmail !== "bamenorhu8@gmail.com") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [navigate]);

  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@gatherease.com",
      role: "admin",
      status: "active",
      joinDate: "Jan 15, 2025",
      lastActive: "2 hours ago",
      permissions: ["events", "users", "reports", "settings"],
      eventsManaged: 24,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alice",
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@gatherease.com",
      role: "moderator",
      status: "active",
      joinDate: "Feb 1, 2025",
      lastActive: "5 hours ago",
      permissions: ["events", "reports"],
      eventsManaged: 15,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Bob",
    },
    {
      id: 3,
      name: "Carol Martinez",
      email: "carol@gatherease.com",
      role: "admin",
      status: "suspended",
      joinDate: "Dec 10, 2024",
      lastActive: "3 days ago",
      permissions: ["events", "users"],
      eventsManaged: 8,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Carol",
    },
    {
      id: 4,
      name: "David Chen",
      email: "david@gatherease.com",
      role: "moderator",
      status: "pending",
      joinDate: "March 1, 2025",
      lastActive: "Never",
      permissions: ["events"],
      eventsManaged: 0,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=David",
    },
  ]);

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: 1,
      action: "Admin 'Alice Johnson' approved event 'Tech Summit 2025'",
      user: "Alice Johnson",
      timestamp: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "Failed login attempt detected",
      user: "Unknown",
      timestamp: "3 hours ago",
      type: "warning",
    },
    {
      id: 3,
      action: "System backup completed",
      user: "System",
      timestamp: "5 hours ago",
      type: "info",
    },
    {
      id: 4,
      action: "Admin 'Carol Martinez' account suspended",
      user: "Super Admin",
      timestamp: "1 day ago",
      type: "error",
    },
    {
      id: 5,
      action: "New admin request from 'David Chen'",
      user: "David Chen",
      timestamp: "2 days ago",
      type: "info",
    },
  ]);

  const stats = [
    {
      label: "Total Admins",
      value: "4",
      icon: Shield,
      change: "+1",
      color: "text-blue-500",
    },
    {
      label: "Active Admins",
      value: "2",
      icon: Users,
      change: "0",
      color: "text-green-500",
    },
    {
      label: "Pending Requests",
      value: "1",
      icon: AlertCircle,
      change: "+1",
      color: "text-yellow-500",
    },
    {
      label: "System Health",
      value: "98%",
      icon: Activity,
      change: "+2%",
      color: "text-emerald-500",
    },
    {
      label: "Total Events",
      value: "47",
      icon: Calendar,
      change: "+12",
      color: "text-purple-500",
    },
    {
      label: "Total Revenue",
      value: "$98,450",
      icon: DollarSign,
      change: "+18%",
      color: "text-pink-500",
    },
    {
      label: "Total Users",
      value: "12,847",
      icon: UserCog,
      change: "+234",
      color: "text-orange-500",
    },
    {
      label: "Database Size",
      value: "24.8 GB",
      icon: Database,
      change: "+1.2 GB",
      color: "text-cyan-500",
    },
  ];

  const permissions = [
    {
      id: "events",
      label: "Manage Events",
      description: "Create, edit, approve, and delete events",
    },
    {
      id: "users",
      label: "Manage Users",
      description: "View, suspend, and manage user accounts",
    },
    {
      id: "reports",
      label: "View Reports",
      description: "Access analytics and generate reports",
    },
    {
      id: "settings",
      label: "System Settings",
      description: "Configure platform settings",
    },
    {
      id: "payments",
      label: "Manage Payments",
      description: "Handle refunds and payment disputes",
    },
    {
      id: "content",
      label: "Content Moderation",
      description: "Moderate user-generated content",
    },
  ];

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const admin: Admin = {
      id: admins.length + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: "pending",
      joinDate: new Date().toLocaleDateString(),
      lastActive: "Never",
      permissions: newAdmin.permissions,
      eventsManaged: 0,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${newAdmin.name}`,
    };

    setAdmins([...admins, admin]);
    setIsAddAdminOpen(false);
    setNewAdmin({ name: "", email: "", role: "admin", permissions: [] });

    toast({
      title: "Admin Invitation Sent",
      description: `An invitation has been sent to ${newAdmin.email}`,
    });
  };

  const handleApproveAdmin = (adminId: number) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, status: "active" as const } : admin
      )
    );
    toast({
      title: "Admin Approved",
      description: "Admin access has been granted.",
    });
  };

  const handleSuspendAdmin = (adminId: number) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId
          ? { ...admin, status: "suspended" as const }
          : admin
      )
    );
    toast({
      title: "Admin Suspended",
      description: "Admin access has been suspended.",
      variant: "destructive",
    });
  };

  const handleReactivateAdmin = (adminId: number) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId ? { ...admin, status: "active" as const } : admin
      )
    );
    toast({
      title: "Admin Reactivated",
      description: "Admin access has been restored.",
    });
  };

  const handleRemoveAdmin = (adminId: number) => {
    setAdmins(admins.filter((admin) => admin.id !== adminId));
    toast({
      title: "Admin Removed",
      description: "Admin has been permanently removed.",
    });
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Admin["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "suspended":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    }
  };

  const getLogTypeColor = (type: SystemLog["type"]) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Super Admin
              </h1>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <GlassCard
              key={stat.label}
              className="p-4 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Management</span>
              <span className="sm:hidden">Admins</span>
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Permissions</span>
              <span className="sm:hidden">Access</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">System Logs</span>
              <span className="sm:hidden">Logs</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Platform Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Admin Management Tab */}
          <TabsContent value="admins">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Admin Management</h2>
                  <p className="text-muted-foreground">
                    Manage admin accounts and their access levels
                  </p>
                </div>
                <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
                  <DialogTrigger asChild>
                    <Button variant="gradient">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card">
                    <DialogHeader>
                      <DialogTitle>Add New Admin</DialogTitle>
                      <DialogDescription>
                        Send an invitation to a new admin or moderator
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newAdmin.name}
                          onChange={(e) =>
                            setNewAdmin({ ...newAdmin, name: e.target.value })
                          }
                          placeholder="John Doe"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newAdmin.email}
                          onChange={(e) =>
                            setNewAdmin({ ...newAdmin, email: e.target.value })
                          }
                          placeholder="john@example.com"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={newAdmin.role}
                          onValueChange={(value: "admin" | "moderator") =>
                            setNewAdmin({ ...newAdmin, role: value })
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">
                              Admin - Full Access
                            </SelectItem>
                            <SelectItem value="moderator">
                              Moderator - Limited Access
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {permissions.map((perm) => (
                            <div
                              key={perm.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={perm.id}
                                checked={newAdmin.permissions.includes(perm.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewAdmin({
                                      ...newAdmin,
                                      permissions: [
                                        ...newAdmin.permissions,
                                        perm.id,
                                      ],
                                    });
                                  } else {
                                    setNewAdmin({
                                      ...newAdmin,
                                      permissions: newAdmin.permissions.filter(
                                        (p) => p !== perm.id
                                      ),
                                    });
                                  }
                                }}
                                className="rounded border-white/20"
                              />
                              <Label htmlFor={perm.id} className="text-sm">
                                {perm.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => setIsAddAdminOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="gradient" onClick={handleAddAdmin}>
                        Send Invitation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search admins by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Admin List */}
              <div className="space-y-4">
                {filteredAdmins.map((admin) => (
                  <motion.div
                    key={admin.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-4 hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={admin.avatar} />
                          <AvatarFallback>
                            {admin.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{admin.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {admin.role}
                            </Badge>
                            <Badge className={getStatusColor(admin.status)}>
                              {admin.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {admin.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Joined {admin.joinDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Active {admin.lastActive}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {admin.permissions.map((perm) => (
                              <Badge
                                key={perm}
                                variant="secondary"
                                className="text-xs"
                              >
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-right mr-4">
                          <p className="text-2xl font-bold">
                            {admin.eventsManaged}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Events Managed
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Permissions
                          </DropdownMenuItem>

                          {admin.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleApproveAdmin(admin.id)}
                            >
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              Approve Admin
                            </DropdownMenuItem>
                          )}

                          {admin.status === "active" && (
                            <DropdownMenuItem
                              onClick={() => handleSuspendAdmin(admin.id)}
                            >
                              <Ban className="mr-2 h-4 w-4 text-yellow-500" />
                              Suspend Access
                            </DropdownMenuItem>
                          )}

                          {admin.status === "suspended" && (
                            <DropdownMenuItem
                              onClick={() => handleReactivateAdmin(admin.id)}
                            >
                              <Unlock className="mr-2 h-4 w-4 text-green-500" />
                              Reactivate
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Admin
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="glass-card">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove {admin.name} from
                                  the admin team. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveAdmin(admin.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-4">Permission Management</h2>
              <p className="text-muted-foreground mb-6">
                Configure and manage permissions for different admin roles
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {permissions.map((perm) => (
                  <div key={perm.id} className="glass-card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">{perm.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {perm.description}
                        </p>
                      </div>
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {
                          admins.filter(
                            (a) =>
                              a.permissions.includes(perm.id) &&
                              a.status === "active"
                          ).length
                        }{" "}
                        admins
                      </span>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="system">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-4">System Activity Logs</h2>
              <p className="text-muted-foreground mb-6">
                Monitor all system activities and admin actions
              </p>

              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-4 flex items-start gap-3"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getLogTypeColor(
                        log.type
                      )} animate-pulse`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{log.action}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{log.user}</span>
                        <span>•</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={getLogTypeColor(log.type)}
                    >
                      {log.type}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="ghost">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Load More Logs
                </Button>
              </div>
            </GlassCard>
          </TabsContent>

          {/* Platform Settings Tab */}
          <TabsContent value="settings">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-4">Platform Settings</h2>
              <p className="text-muted-foreground mb-6">
                Configure global platform settings and preferences
              </p>

              <div className="space-y-6">
                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-2">Security Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Require 2FA for all admins
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Session Timeout</p>
                        <p className="text-xs text-muted-foreground">
                          Auto logout after inactivity
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-2">Platform Features</h3>
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
                      <Button variant="outline" size="sm">
                        Disabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Maintenance Mode</p>
                        <p className="text-xs text-muted-foreground">
                          Put platform into maintenance mode
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Off
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4">
                  <h3 className="font-semibold mb-2">Database Management</h3>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Export Logs
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdmin;
