import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/GlassCard";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Settings as SettingsIcon,
  Bell,
  Shield,
  User,
  Calendar,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [userName] = useState(localStorage.getItem("userName") || "User");

  // Event Default Settings State
  const [requireApproval, setRequireApproval] = useState(false);
  const [enableWaitlist, setEnableWaitlist] = useState(false);
  const [sendReminders, setSendReminders] = useState(true);
  const [defaultCapacity, setDefaultCapacity] = useState("");

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
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
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
              />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account and event preferences
          </p>
        </motion.div>

        <Tabs defaultValue="event-defaults" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="event-defaults">
              <Calendar className="w-4 h-4 mr-2" />
              Event Defaults
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Event Defaults Tab */}
          <TabsContent value="event-defaults">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Event Default Settings
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  These settings will be applied by default when creating new
                  events
                </p>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        Require Registration Approval
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Manually approve each registration for new events
                      </p>
                    </div>
                    <Switch
                      checked={requireApproval}
                      onCheckedChange={setRequireApproval}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Enable Waitlist</p>
                      <p className="text-sm text-muted-foreground">
                        Allow attendees to join a waitlist when events are sold
                        out
                      </p>
                    </div>
                    <Switch
                      checked={enableWaitlist}
                      onCheckedChange={setEnableWaitlist}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        Send Reminder Notifications
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Automatically notify attendees before events start
                      </p>
                    </div>
                    <Switch
                      checked={sendReminders}
                      onCheckedChange={setSendReminders}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-white/5">
                    <Label
                      htmlFor="capacity"
                      className="text-base font-semibold"
                    >
                      Default Event Capacity
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Set a default maximum number of attendees for new events
                    </p>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="e.g., 100"
                      value={defaultCapacity}
                      onChange={(e) => setDefaultCapacity(e.target.value)}
                      className="glass-card border-white/20"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="gradient" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Notification Preferences
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose what notifications you want to receive
                </p>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        New Registration Alerts
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone registers for your events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Event Reminder</p>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders before your events start
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Marketing Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get updates about new features and tips
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="gradient" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Control your privacy and data preferences
                </p>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Public Profile</p>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Show Event History</p>
                      <p className="text-sm text-muted-foreground">
                        Display your past events on your profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Analytics Tracking</p>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect analytics to improve your experience
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="gradient" onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
