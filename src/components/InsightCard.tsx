import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  image: string;
  category: string;
  title: string;
  summary: string;
  confidence: number;
  verified?: boolean;
  index?: number;
  onRead?: () => void;
  className?: string;
}

export const InsightCard = ({
  image,
  category,
  title,
  summary,
  confidence,
  verified = true,
  index = 0,
  onRead,
  className,
}: InsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={cn("relative group", className)}
    >
      {/* Glow layer */}
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative glass-card overflow-hidden shadow-3d group-hover:shadow-glow group-hover:border-primary/30 transition-all duration-300">
        {/* Image header */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Verified badge */}
          {verified && (
            <div className="absolute top-4 right-4 bg-secondary/20 backdrop-blur-glass border border-secondary/30 rounded-full px-3 py-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-medium text-secondary">Verified</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Category and confidence */}
          <div className="flex items-center justify-between">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {confidence}% confidence
            </span>
          </div>

          {/* Title and summary */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {summary}
            </p>
          </div>

          {/* Action button */}
          <Button
            variant="outline"
            className="w-full bg-white/5 hover:bg-primary/20 border-white/10 hover:border-primary/30 group/btn"
            onClick={onRead}
          >
            <span>Read Full Analysis</span>
            <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
