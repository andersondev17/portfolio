// components/ui/loading/LoadingSpinner.tsx
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

const LoadingSpinner = ({
  size = "md",
  className,
  message = "Loading...",
}: LoadingSpinnerProps) => {
  // Usar los mismos colores del Globe para consistencia visual
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  
  const sizeConfig = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-32 h-32"
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      "min-h-[200px] gap-6",
      className
    )}>
      {/* Contenedor del spinner */}
      <div className={cn(
        "relative",
        sizeConfig[size]
      )}>
        {/* Anillos animados */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${colors[i]}`,
              opacity: 0.3 + (i * 0.2)
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
              delay: i * 0.2
            }}
          />
        ))}

        {/* Globo central */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#062056] to-[#38bdf8]"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Línea decorativa similar a los arcos del Globe */}
          <motion.div
            className="absolute inset-1 border-t-2 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>

      {/* Mensaje de carga con animación de fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
        className="text-sm font-medium text-muted-foreground"
      >
        {message}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;