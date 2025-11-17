import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  index?: number;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  index = 0,
  className,
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn("relative group", className)}
    >
      {/* Glow layer */}
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300" />
      
      {/* Card content */}
      <div className="relative glass-card p-6 shadow-3d hover:shadow-glow transition-all duration-300">
        <div className="flex items-start justify-between">
          {/* Content */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-xs text-secondary font-medium">{trend}</p>
            )}
          </div>

          {/* Icon */}
          <div className="gradient-primary p-3 rounded-xl shadow-glow-sm animate-glow-pulse">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
