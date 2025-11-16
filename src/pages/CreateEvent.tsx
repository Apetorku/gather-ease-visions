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
import { toast } from "@/hooks/use-toast";
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFreeEvent, setIsFreeEvent] = useState(false);
  const [ticketTiers, setTicketTiers] = useState([
    { id: 1, name: "General Admission", price: "", quantity: "" },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    venue: "",
    address: "",
    city: "",
    stateRegion: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PNG, JPG, or WEBP image");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const addTicketTier = () => {
    setTicketTiers([
      ...ticketTiers,
      { id: Date.now(), name: "", price: "", quantity: "" },
    ]);
  };

  const removeTicketTier = (id: number) => {
    setTicketTiers(ticketTiers.filter((tier) => tier.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketTierChange = (id: number, field: string, value: string) => {
    setTicketTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const saveEventToLocalStorage = (status: "draft" | "published") => {
    // Validation
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Validation Error",
        description:
          "Please fill in all required fields (Title, Category, Description)",
        variant: "destructive",
      });
      return false;
    }

    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem("myEvents") || "[]");

    // Calculate total revenue from ticket tiers
    const totalRevenue = isFreeEvent
      ? 0
      : ticketTiers.reduce((sum, tier) => {
          const price = parseFloat(tier.price) || 0;
          const quantity = parseInt(tier.quantity) || 0;
          return sum + price * quantity;
        }, 0);

    // Create new event object
    const newEvent = {
      id: Date.now(),
      name: formData.title,
      category: formData.category,
      description: formData.description,
      date: formData.startDate
        ? new Date(formData.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "TBD",
      startDate: formData.startDate,
      startTime: formData.startTime,
      endDate: formData.endDate,
      endTime: formData.endTime,
      venue: formData.venue || "TBD",
      address: formData.address || "",
      city: formData.city || "",
      stateRegion: formData.stateRegion || "",
      attendees: 0,
      revenue: `$${totalRevenue.toLocaleString()}`,
      status: status === "published" ? "pending" : "draft", // Changed from "active" to "pending" - requires admin approval
      approvalStatus: status === "published" ? "pending" : null, // Track approval separately
      checkInRate: 0,
      isFreeEvent,
      ticketTiers: ticketTiers,
      banner: imagePreview || "",
      createdAt: new Date().toISOString(),
      createdBy: localStorage.getItem("userName") || "Organizer",
    };

    // Add new event to the array
    const updatedEvents = [...existingEvents, newEvent];

    // Save to localStorage
    localStorage.setItem("myEvents", JSON.stringify(updatedEvents));

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (saveEventToLocalStorage("published")) {
      toast({
        title: "Event Submitted for Approval",
        description:
          "Your event has been submitted and is pending admin approval before it will be visible to attendees.",
      });
      navigate("/organizer-dashboard");
    }
  };

  const handleSaveAsDraft = () => {
    if (saveEventToLocalStorage("draft")) {
      toast({
        title: "Draft Saved",
        description: "Your event has been saved as a draft.",
      });
      navigate("/organizer-dashboard");
    }
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

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                      required
                    >
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
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event..."
                    className="mt-2 glass-card border-white/20 min-h-32"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="banner">Event Banner</Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative border-2 border-white/20 rounded-xl overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Event banner preview"
                          className="w-full h-64 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="banner-upload"
                        className="block border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer"
                      >
                        <ImageIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG or WEBP (max. 5MB)
                        </p>
                        <input
                          id="banner-upload"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
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
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date & Time *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      className="mt-2 glass-card border-white/20"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="venue">Venue Name *</Label>
                  <Input
                    id="venue"
                    placeholder="Enter venue name"
                    className="mt-2 glass-card border-white/20"
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter full address"
                    className="mt-2 glass-card border-white/20"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      className="mt-2 glass-card border-white/20"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="stateRegion">State/Region *</Label>
                    <Input
                      id="stateRegion"
                      placeholder="State/Region"
                      className="mt-2 glass-card border-white/20"
                      value={formData.stateRegion}
                      onChange={handleInputChange}
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
                  <Switch
                    checked={isFreeEvent}
                    onCheckedChange={setIsFreeEvent}
                  />
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
                          value={tier.name}
                          onChange={(e) =>
                            handleTicketTierChange(
                              tier.id,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {!isFreeEvent && (
                        <div>
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="mt-2 glass-card border-white/20"
                            value={tier.price}
                            onChange={(e) =>
                              handleTicketTierChange(
                                tier.id,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}

                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          placeholder="100"
                          className="mt-2 glass-card border-white/20"
                          value={tier.quantity}
                          onChange={(e) =>
                            handleTicketTierChange(
                              tier.id,
                              "quantity",
                              e.target.value
                            )
                          }
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

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >
            <Button
              variant="outline"
              size="lg"
              type="button"
              onClick={handleSaveAsDraft}
            >
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
