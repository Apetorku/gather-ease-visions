import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { motion } from "framer-motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  index?: number;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = true, index = 0, ...props }, ref) => {
    const MotionDiv = motion.div;
    
    return (
      <MotionDiv
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
        className={cn("relative group", className)}
      >
        {/* Glow layer */}
        {hover && (
          <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300 pointer-events-none" />
        )}
        
        {/* Glass card */}
        <div className="relative glass-card shadow-3d hover:shadow-glow transition-all duration-300 h-full">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </MotionDiv>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
