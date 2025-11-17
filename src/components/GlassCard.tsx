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
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={hover ? { y: -12, scale: 1.03 } : undefined}
        className={cn("relative group perspective-1000", className)}
      >
        {/* Deep shadow for 3D depth */}
        <div className="absolute inset-0 shadow-deep rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Glow layer */}
        {hover && (
          <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-25 rounded-2xl blur-xl transition-opacity duration-300 pointer-events-none" />
        )}
        
        {/* Top-left accent glow */}
        {hover && (
          <div className="absolute -top-2 -left-2 w-24 h-24 bg-primary/30 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
        )}
        
        {/* Glass card with 3D transform */}
        <div className="relative glass-card shadow-3d hover:shadow-glow card-3d elevation-2 transition-all duration-300 h-full">
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
