import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/GlassCard";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Users, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [role, setRole] = useState<"attendee" | "organizer" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: name,
            role: role,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Store session, role, and name in localStorage
        if (data.session) {
          // User is auto-logged in after signup
          localStorage.setItem("userSession", data.session.access_token);
          localStorage.setItem("userRole", role || "attendee");
          localStorage.setItem(
            "userName",
            name || data.user.email?.split("@")[0] || "User"
          );

          toast({
            title: "Account created!",
            description: "Welcome to GatherEase!",
          });

          // Redirect based on role
          if (role === "organizer") {
            navigate("/organizer-dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          // Email verification required
          localStorage.setItem("userRole", role || "attendee");

          toast({
            title: "Account created!",
            description:
              "Please check your email to verify your account, then sign in.",
          });
          navigate("/login");
        }
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

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
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 glass-card border-white/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                variant="gradient"
                className="w-full"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : `Create Account as ${
                      role === "attendee" ? "Attendee" : "Organizer"
                    }`}
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
