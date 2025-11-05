import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, BarChart3, Plus, Settings, Ticket, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const OrganizerDashboard = () => {
  const [myEvents, setMyEvents] = useState([
    { id: 1, name: "Tech Summit 2025", date: "March 15, 2025", attendees: 245, revenue: "$12,250", description: "Annual technology conference" },
    { id: 2, name: "Design Workshop", date: "March 20, 2025", attendees: 89, revenue: "$4,450", description: "Interactive design workshop" },
  ]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<number | null>(null);

  const handleEditClick = (event: any) => {
    setEditingEvent({ ...event });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setMyEvents(myEvents.map(e => e.id === editingEvent.id ? editingEvent : e));
    setIsEditDialogOpen(false);
    toast({
      title: "Event Updated",
      description: "Your event has been successfully updated.",
    });
  };

  const handleDeleteClick = (eventId: number) => {
    setDeletingEventId(eventId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setMyEvents(myEvents.filter(e => e.id !== deletingEventId));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Event Deleted",
      description: "Your event has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              GatherEase
            </h1>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link to="/admin/create-event">
              <Button variant="gradient" size="sm" className="sm:h-10">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Create Event</span>
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="sm:h-10">Browse Events</Button>
            </Link>
            <Link to="/profile">
              <Button variant="glass" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Organizer Dashboard</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Manage your events and track performance</p>
            </div>
            <Link to="/admin/create-event">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                Create New Event
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12"
          >
            <GlassCard className="p-4 sm:p-6 text-center">
              <div className="inline-flex p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 sm:mb-4">
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-xl sm:text-3xl font-bold mb-1">{myEvents.length}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Active Events</p>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 text-center">
              <div className="inline-flex p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 sm:mb-4">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-xl sm:text-3xl font-bold mb-1">334</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Attendees</p>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 text-center">
              <div className="inline-flex p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 mb-2 sm:mb-4">
                <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-xl sm:text-3xl font-bold mb-1">$16,700</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 text-center">
              <div className="inline-flex p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 sm:mb-4">
                <Ticket className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-xl sm:text-3xl font-bold mb-1">89%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg. Attendance</p>
            </GlassCard>
          </motion.div>

          {/* My Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">My Events</h3>
              <Link to="/admin">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              {myEvents.map((event) => (
                <GlassCard key={event.id} className="p-4 sm:p-6 hover:scale-102 transition-transform">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base sm:text-lg mb-2">{event.name}</h4>
                      <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          {event.attendees} attendees
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <div className="text-base sm:text-lg font-bold text-primary">{event.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Link to={`/events/${event.id}`} className="col-span-1">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                        View
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => handleEditClick(event)}
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => handleDeleteClick(event.id)}
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to your event details here.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerDashboard;
