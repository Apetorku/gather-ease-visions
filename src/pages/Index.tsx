import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Users, BarChart3, Ticket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Welcome to the Future of Events</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            GatherEase
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Create, manage, and experience events like never before.
            <br />
            Beautiful analytics. Seamless ticketing. Effortless organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/events">
              <Button variant="gradient" size="lg" className="group">
                Explore Events
                <Calendar className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="glass" size="lg">
                Start Organizing
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* 3D Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="relative max-w-5xl mx-auto perspective-1000">
            <div className="glass-card p-2 transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src={heroImage}
                alt="GatherEase Dashboard Preview"
                className="rounded-2xl w-full shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features wrapped in a beautiful interface
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Calendar,
              title: "Event Discovery",
              description: "Find and RSVP to events tailored to your interests",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: Ticket,
              title: "Smart Ticketing",
              description: "QR codes, tiers, and seamless check-ins",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: BarChart3,
              title: "Live Analytics",
              description: "Real-time insights and performance metrics",
              gradient: "from-orange-500 to-yellow-500"
            },
            {
              icon: Users,
              title: "Team Management",
              description: "Collaborate with role-based permissions",
              gradient: "from-green-500 to-teal-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card p-8 h-full hover:scale-105 transition-transform duration-300 group">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Events?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of organizers and attendees using GatherEase
          </p>
          <Link to="/signup">
            <Button variant="gradient" size="lg">
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
