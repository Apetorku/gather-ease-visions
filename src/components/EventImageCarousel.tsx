import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
}

export const EventImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Load events from localStorage
    const savedEvents = localStorage.getItem("myEvents");
    
    const staticEvents: Event[] = [
      {
        id: 1,
        title: "Tech Summit 2025",
        date: "March 15, 2025",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      },
      {
        id: 2,
        title: "Design Workshop",
        date: "March 20, 2025",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
      },
      {
        id: 3,
        title: "Music Festival",
        date: "April 5, 2025",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop",
      },
      {
        id: 4,
        title: "Startup Pitch Night",
        date: "March 25, 2025",
        location: "Boston, MA",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
      },
    ];

    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      // Filter for approved events with images
      const approvedEvents = parsed
        .filter((e: any) => e.status === "approved" && e.image)
        .map((e: any) => ({
          id: e.id,
          title: e.title,
          image: e.image,
          date: e.date,
          location: e.location,
        }));
      
      setEvents(approvedEvents.length > 0 ? approvedEvents : staticEvents);
    } else {
      setEvents(staticEvents);
    }
  }, []);

  useEffect(() => {
    if (events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img
            src={events[currentIndex].image}
            alt={events[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
            <h3 className="text-lg font-bold text-foreground mb-1">
              {events[currentIndex].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {events[currentIndex].date} • {events[currentIndex].location}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/50 hover:bg-muted-foreground/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
