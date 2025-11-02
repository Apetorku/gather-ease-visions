import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Plus,
  X,
  Save,
  Eye,
  ArrowLeft,
} from "lucide-react";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [ticketTiers, setTicketTiers] = useState([
    { id: 1, name: "General Admission", price: "", quantity: "" },
  ]);

  const addTicketTier = () => {
    setTicketTiers([
      ...ticketTiers,
      { id: Date.now(), name: "", price: "", quantity: "" },
    ]);
  };

  const removeTicketTier = (id: number) => {
    setTicketTiers(ticketTiers.filter((tier) => tier.id !== id));
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
            <Link to="/admin">
              <Button variant="ghost">Admin Panel</Button>
            </Link>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
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
          <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">
            Fill in the details to create your event
          </p>
        </motion.div>

        <form className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    className="mt-2 glass-card border-white/20"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger className="mt-2 glass-card border-white/20">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="art">Art & Culture</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="food">Food & Dining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger className="mt-2 glass-card border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    className="mt-2 glass-card border-white/20 min-h-32"
                  />
                </div>

                <div>
                  <Label htmlFor="banner">Event Banner</Label>
                  <div className="mt-2 border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP (max. 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Date & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Date & Location</h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date & Time *</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      className="mt-2 glass-card border-white/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date & Time *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      className="mt-2 glass-card border-white/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="venue">Venue Name *</Label>
                  <Input
                    id="venue"
                    placeholder="Enter venue name"
                    className="mt-2 glass-card border-white/20"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter full address"
                    className="mt-2 glass-card border-white/20"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      className="mt-2 glass-card border-white/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      className="mt-2 glass-card border-white/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP/Postal Code *</Label>
                    <Input
                      id="zip"
                      placeholder="ZIP"
                      className="mt-2 glass-card border-white/20"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Ticketing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Ticketing</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTicketTier}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tier
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-semibold mb-1">Free Event</p>
                    <p className="text-sm text-muted-foreground">
                      Make this a free RSVP event
                    </p>
                  </div>
                  <Switch />
                </div>

                {ticketTiers.map((tier, index) => (
                  <div
                    key={tier.id}
                    className="p-4 rounded-xl border border-white/20 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Tier {index + 1}</Badge>
                      {ticketTiers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTicketTier(tier.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Ticket Name</Label>
                        <Input
                          placeholder="e.g., VIP Pass"
                          className="mt-2 glass-card border-white/20"
                        />
                      </div>

                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="mt-2 glass-card border-white/20"
                        />
                      </div>

                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          placeholder="100"
                          className="mt-2 glass-card border-white/20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Description (Optional)</Label>
                      <Input
                        placeholder="What's included in this tier?"
                        className="mt-2 glass-card border-white/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Additional Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">Additional Settings</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-semibold mb-1">Require Registration Approval</p>
                    <p className="text-sm text-muted-foreground">
                      Manually approve each registration
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-semibold mb-1">Enable Waitlist</p>
                    <p className="text-sm text-muted-foreground">
                      Allow attendees to join a waitlist when sold out
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-semibold mb-1">Send Reminder Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically notify attendees before the event
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label htmlFor="capacity">Event Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Maximum number of attendees"
                    className="mt-2 glass-card border-white/20"
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >
            <Button variant="outline" size="lg" type="button">
              Save as Draft
            </Button>
            <Button variant="gradient" size="lg" type="submit">
              <Save className="w-5 h-5 mr-2" />
              Publish Event
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
