// components/ui/loading/LoadingPlaceholder.tsx
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingPlaceholderProps {
  height?: string;
  className?: string;
  text?: string;
  showSpinner?: boolean;
}

const LoadingPlaceholder = ({
  height = "h-[500px]",
  className,
  text = "Loading visualization...",
  showSpinner = true
}: LoadingPlaceholderProps) => {
  return (
    <div className={cn(
      "w-full relative",
      "bg-gradient-to-b from-transparent to-background/5",
      "rounded-xl overflow-hidden",
      "backdrop-blur-sm",
      height,
      className
    )}>
      {/* Fondo con gradiente similar al Globe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#062056_0%,transparent_70%)] opacity-20" />
      
      {/* Grid de fondo */}
      <div className="absolute inset-0 bg-grid-small-white/[0.05]" />

      {/* Contenedor del Spinner */}
      <div className="relative h-full flex items-center justify-center">
        {showSpinner && (
          <LoadingSpinner 
            message={text}
            size="md"
          />
        )}
      </div>
    </div>
  );
};

export default LoadingPlaceholder;