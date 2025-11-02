import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Target,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AnalyticsDashboard = () => {
  const metrics = [
    {
      label: "Total Revenue",
      value: "$45,230",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Total Registrations",
      value: "3,421",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Attendance Rate",
      value: "87.5%",
      change: "+3.1%",
      trend: "up",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Total Events",
      value: "24",
      change: "+4",
      trend: "up",
      icon: Calendar,
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const recentEvents = [
    {
      name: "Tech Innovation Summit",
      date: "Mar 15, 2025",
      registrations: 1250,
      attendance: 1098,
      revenue: "$18,450",
      rating: 4.8,
    },
    {
      name: "Design Workshop",
      date: "Mar 10, 2025",
      registrations: 450,
      attendance: 398,
      revenue: "$8,950",
      rating: 4.6,
    },
    {
      name: "Music Festival",
      date: "Mar 5, 2025",
      registrations: 2100,
      attendance: 1850,
      revenue: "$15,680",
      rating: 4.9,
    },
  ];

  const surveyInsights = [
    { question: "Overall Satisfaction", avgRating: 4.7, responses: 892 },
    { question: "Venue Quality", avgRating: 4.5, responses: 892 },
    { question: "Content Quality", avgRating: 4.8, responses: 892 },
    { question: "Organization", avgRating: 4.6, responses: 892 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Track performance and insights across all events
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px] glass-card border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${metric.gradient}`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{metric.change}</span>
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-6">Revenue Trend</h3>
            <div className="h-64 flex items-end justify-around gap-2">
              {[65, 45, 80, 55, 70, 85, 75, 90].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Registration vs Attendance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-6">Registration vs Attendance</h3>
            <div className="space-y-4">
              {["Tech Summit", "Workshop", "Music Fest", "Conference"].map(
                (event, index) => {
                  const registration = [85, 72, 90, 68][index];
                  const attendance = [75, 65, 88, 62][index];
                  return (
                    <div key={event}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{event}</span>
                        <span className="text-muted-foreground">
                          {attendance}% / {registration}%
                        </span>
                      </div>
                      <div className="relative h-8 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="absolute h-full bg-primary/30 rounded-full"
                          style={{ width: `${registration}%` }}
                        ></div>
                        <div
                          className="absolute h-full bg-primary rounded-full"
                          style={{ width: `${attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                <span>Registrations</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Event Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold mb-6">Event Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold">Event Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Registrations</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Attendance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Revenue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{event.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{event.date}</td>
                    <td className="py-4 px-4">{event.registrations.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span>{event.attendance.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.round((event.attendance / event.registrations) * 100)}%
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-green-500">{event.revenue}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{event.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>

      {/* Survey Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold mb-6">Post-Event Survey Insights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {surveyInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold mb-1">{insight.question}</p>
                    <p className="text-sm text-muted-foreground">
                      {insight.responses} responses
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold">{insight.avgRating}</span>
                    <span className="text-yellow-500 text-xl">★</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                    style={{ width: `${(insight.avgRating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
