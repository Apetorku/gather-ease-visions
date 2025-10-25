import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Users, Building } from "lucide-react";

const Signup = () => {
  const [role, setRole] = useState<"attendee" | "organizer" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="block text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            GatherEase
          </h1>
        </Link>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          {!role ? (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground mb-6">
                Choose your role to get started
              </p>
              
              <button
                onClick={() => setRole("attendee")}
                className="w-full glass-card p-6 hover:bg-white/20 transition-all group"
              >
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Attendee</h3>
                <p className="text-sm text-muted-foreground">
                  Discover and attend amazing events
                </p>
              </button>

              <button
                onClick={() => setRole("organizer")}
                className="w-full glass-card p-6 hover:bg-white/20 transition-all group"
              >
                <Building className="w-8 h-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold text-lg mb-2">Organizer</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage events effortlessly
                </p>
              </button>
            </div>
          ) : (
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 glass-card border-white/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 glass-card border-white/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 glass-card border-white/20"
                  />
                </div>
              </div>

              <Button variant="gradient" className="w-full" size="lg">
                Create Account as {role === "attendee" ? "Attendee" : "Organizer"}
              </Button>

              <button
                type="button"
                onClick={() => setRole(null)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Change role
              </button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;
