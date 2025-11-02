import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, XCircle, Search } from "lucide-react";
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
  ]);

  const handleManualCheck = () => {
    if (manualEntry) {
      const newScan: ScanResult = {
        ticketNumber: manualEntry,
        attendeeName: "Unknown User",
        ticketType: "Standard",
        status: "valid",
        timestamp: new Date().toLocaleTimeString(),
      };
      setScanHistory([newScan, ...scanHistory]);
      setManualEntry("");
    }
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

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
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
              placeholder="Enter ticket number..."
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

      {/* Scan History */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Check-Ins</h3>
          <Badge variant="secondary">{scanHistory.length} scanned</Badge>
        </div>

        <div className="space-y-3">
          {scanHistory.map((scan, index) => (
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
                  variant={scan.status === "valid" ? "default" : "destructive"}
                  className={scan.status === "valid" ? "bg-green-500" : ""}
                >
                  {scan.status === "valid" && "Checked In"}
                  {scan.status === "invalid" && "Invalid"}
                  {scan.status === "already-used" && "Already Used"}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-green-500 mb-1">
            {scanHistory.filter((s) => s.status === "valid").length}
          </p>
          <p className="text-sm text-muted-foreground">Valid</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-red-500 mb-1">
            {scanHistory.filter((s) => s.status === "invalid").length}
          </p>
          <p className="text-sm text-muted-foreground">Invalid</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-3xl font-bold text-yellow-500 mb-1">
            {scanHistory.filter((s) => s.status === "already-used").length}
          </p>
          <p className="text-sm text-muted-foreground">Duplicate</p>
        </GlassCard>
      </div>
    </div>
  );
};
