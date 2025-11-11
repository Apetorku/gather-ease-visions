import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  XCircle,
  Search,
  Users,
  Clock,
  TrendingUp,
  Download,
  Filter,
  BarChart3,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface ScanResult {
  ticketNumber: string;
  attendeeName: string;
  ticketType: string;
  status: "valid" | "invalid" | "already-used";
  timestamp: string;
}

export const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualEntry, setManualEntry] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [liveStats, setLiveStats] = useState({
    totalRegistered: 500,
    checkedIn: 245,
    checkInRate: 49,
  });

  const [scanHistory, setScanHistory] = useState<ScanResult[]>([
    {
      ticketNumber: "TIS2025-VIP-1234",
      attendeeName: "John Doe",
      ticketType: "VIP Pass",
      status: "valid",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      ticketNumber: "TIS2025-STD-5678",
      attendeeName: "Jane Smith",
      ticketType: "Standard",
      status: "valid",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      ticketNumber: "TIS2025-STD-9999",
      attendeeName: "Invalid User",
      ticketType: "Standard",
      status: "invalid",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      ticketNumber: "TIS2025-VIP-1234",
      attendeeName: "John Doe",
      ticketType: "VIP Pass",
      status: "already-used",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        checkedIn: Math.min(
          prev.totalRegistered,
          prev.checkedIn + Math.floor(Math.random() * 3)
        ),
        checkInRate: Math.round((prev.checkedIn / prev.totalRegistered) * 100),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleManualCheck = () => {
    if (manualEntry) {
      // Simulate ticket validation logic
      const isValidTicket = !manualEntry.includes("9999");
      const isDuplicate = scanHistory.some(
        (scan) => scan.ticketNumber === manualEntry && scan.status === "valid"
      );

      const newScan: ScanResult = {
        ticketNumber: manualEntry,
        attendeeName: isValidTicket
          ? `User ${Math.floor(Math.random() * 1000)}`
          : "Invalid User",
        ticketType: manualEntry.includes("VIP") ? "VIP Pass" : "Standard",
        status: isDuplicate
          ? "already-used"
          : isValidTicket
          ? "valid"
          : "invalid",
        timestamp: new Date().toLocaleTimeString(),
      };

      setScanHistory([newScan, ...scanHistory]);

      if (newScan.status === "valid") {
        setLiveStats((prev) => ({
          ...prev,
          checkedIn: prev.checkedIn + 1,
          checkInRate: Math.round(
            ((prev.checkedIn + 1) / prev.totalRegistered) * 100
          ),
        }));
      }

      setManualEntry("");
    }
  };

  const exportData = () => {
    const csvContent = [
      ["Ticket Number", "Attendee Name", "Ticket Type", "Status", "Timestamp"],
      ...scanHistory.map((scan) => [
        scan.ticketNumber,
        scan.attendeeName,
        scan.ticketType,
        scan.status,
        scan.timestamp,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "check-in-report.csv";
    a.click();
  };

  const getStatusColor = (status: ScanResult["status"]) => {
    switch (status) {
      case "valid":
        return "text-green-500";
      case "invalid":
        return "text-red-500";
      case "already-used":
        return "text-yellow-500";
    }
  };

  const getStatusIcon = (status: ScanResult["status"]) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "invalid":
      case "already-used":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const filteredHistory =
    filterStatus === "all"
      ? scanHistory
      : scanHistory.filter((scan) => scan.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Live Statistics Dashboard */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {liveStats.totalRegistered}
              </p>
              <p className="text-sm text-muted-foreground">Total Registered</p>
            </div>
            <Users className="w-8 h-8 text-primary/50" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-500">
                {liveStats.checkedIn}
              </p>
              <p className="text-sm text-muted-foreground">Checked In</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500/50" />
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-500">
                {liveStats.checkInRate}%
              </p>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500/50" />
          </div>
          <Progress value={liveStats.checkInRate} className="mt-2 h-2" />
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-500">
                {new Date().toLocaleTimeString()}
              </p>
              <p className="text-sm text-muted-foreground">Current Time</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500/50" />
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="scanner" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
          <TabsTrigger value="history">Check-In History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Scanner Tab */}
        <TabsContent value="scanner" className="space-y-6 mt-6">
          <GlassCard className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">QR Code Check-In</h3>
              <p className="text-muted-foreground">
                Scan attendee tickets or enter ticket numbers manually
              </p>
            </div>

            {/* Camera View */}
            <div className="relative mb-6">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center overflow-hidden">
                {isScanning ? (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 border-4 border-primary rounded-2xl animate-pulse"></div>
                    </div>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm bg-black/50 px-4 py-2 rounded-full">
                      Position QR code within the frame
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Camera inactive</p>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant={isScanning ? "outline" : "gradient"}
              size="lg"
              className="w-full mb-4"
              onClick={() => setIsScanning(!isScanning)}
            >
              <Camera className="w-5 h-5 mr-2" />
              {isScanning ? "Stop Scanner" : "Start Scanner"}
            </Button>

            {/* Manual Entry */}
            <div className="p-4 rounded-xl border border-white/20">
              <p className="text-sm font-semibold mb-3">Manual Ticket Entry</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter ticket number (e.g., TIS2025-VIP-1234)..."
                  value={manualEntry}
                  onChange={(e) => setManualEntry(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleManualCheck()}
                  className="glass-card border-white/20"
                />
                <Button variant="outline" onClick={handleManualCheck}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6 mt-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Check-In History</h3>
              <div className="flex items-center gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="invalid">Invalid</SelectItem>
                    <SelectItem value="already-used">Duplicate</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={exportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredHistory.map((scan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(scan.status)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{scan.attendeeName}</p>
                          <Badge variant="outline" className="text-xs">
                            {scan.ticketType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {scan.ticketNumber}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {scan.timestamp}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        scan.status === "valid" ? "default" : "destructive"
                      }
                      className={scan.status === "valid" ? "bg-green-500" : ""}
                    >
                      {scan.status === "valid" && "Checked In"}
                      {scan.status === "invalid" && "Invalid"}
                      {scan.status === "already-used" && "Duplicate"}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Check-in Statistics */}
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Check-In Statistics
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Valid Check-ins</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (scanHistory.filter((s) => s.status === "valid")
                              .length /
                              scanHistory.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {scanHistory.filter((s) => s.status === "valid").length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Invalid Tickets</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (scanHistory.filter((s) => s.status === "invalid")
                              .length /
                              scanHistory.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {scanHistory.filter((s) => s.status === "invalid").length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Duplicate Scans</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${
                            (scanHistory.filter(
                              (s) => s.status === "already-used"
                            ).length /
                              scanHistory.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {
                        scanHistory.filter((s) => s.status === "already-used")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Ticket Type Breakdown */}
            <GlassCard className="p-6">
              <h4 className="text-lg font-semibold mb-4">Ticket Types</h4>
              <div className="space-y-4">
                {["VIP Pass", "Standard"].map((type) => {
                  const count = scanHistory.filter(
                    (s) => s.ticketType === type && s.status === "valid"
                  ).length;
                  const percentage = Math.round(
                    (count /
                      scanHistory.filter((s) => s.status === "valid").length) *
                      100
                  );

                  return (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              type === "VIP Pass"
                                ? "bg-purple-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                View All Attendees
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Analytics
              </Button>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
