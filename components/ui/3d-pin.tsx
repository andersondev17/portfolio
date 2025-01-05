"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useCallback, useState } from "react";

interface PinContainerProps {
    children: React.ReactNode;
    title?: string;
    href?: string;
    className?: string;
    containerClassName?: string;
}

export const PinContainer = memo(({
    children,
    title,
    href,
    className,
    containerClassName,
}: PinContainerProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleClick = useCallback(() => {
        if (href) {
            window.open(href, "_blank", "noopener noreferrer");
        }
    }, [href]);

    return (
        <div 
            className={cn(
                "relative group/pin cursor-pointer min-h-[400px]", 
                containerClassName
            )}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-label={title || "Interactive card"}
        >
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
                <motion.div
                    className="relative w-full h-full"
                    style={{
                        perspective: "1000px",
                    }}
                    animate={{
                        transform: isHovered 
                            ? "rotateX(40deg) scale(0.8)" 
                            : "rotateX(0deg) scale(1)"
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                >
                    <div className={cn(
                        "relative w-full h-full rounded-2xl overflow-hidden",
                        "border border-white/[0.1] transition-colors duration-500",
                        "group-hover/pin:border-white/[0.2]",
                        className
                    )}>
                        {children}
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isHovered && (
                    <PinPerspective title={title} href={href} />
                )}
            </AnimatePresence>
        </div>
    );
});

PinContainer.displayName = "PinContainer";

const PinPerspective = memo(({
    title,
    href,
}: {
    title?: string;
    href?: string;
}) => (
    <motion.div
        className="absolute inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        {title && (
            <div className="absolute top-8 inset-x-0 flex justify-center">
                <div className="relative px-4 py-2 bg-zinc-950 rounded-full ring-1 ring-white/10">
                    <span className="text-sm text-white font-medium">
                        {title}
                    </span>
                    <div className="absolute h-px bottom-0 left-4 right-4 bg-gradient-to-r from-transparent via-emerald-400/90 to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
                </div>
            </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
                {[0, 2, 4].map((delay) => (
                    <motion.div
                        key={delay}
                        className="absolute inset-0 rounded-full bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: [0, 1, 0.5, 0],
                            scale: 1,
                        }}
                        transition={{
                            duration: 6,
                            delay,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>
        </div>
        
        <div className="absolute bottom-1/2 right-1/2">
            <motion.div 
                className="w-px h-20 bg-gradient-to-b from-transparent to-cyan-500"
                animate={{ height: [80, 160] }}
                transition={{ duration: 0.4 }}
            />
            <div className="w-1 h-1 rounded-full bg-cyan-600 translate-x-[-50%] translate-y-2 blur-[2px]" />
            <div className="w-0.5 h-0.5 rounded-full bg-cyan-300 translate-x-[-50%] translate-y-2" />
        </div>
    </motion.div>
));

PinPerspective.displayName = "PinPerspective";