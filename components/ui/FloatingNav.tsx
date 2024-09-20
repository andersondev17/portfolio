'use client';
import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useScroll,
    useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const ref = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [hoveringItem, setHoveringItem] = useState<number | null>(null);
    const expandedValue = useMotionValue(expanded ? 0 : 1);

    // Calcula el movimiento y transformación para el estado de scroll y expansión
    const translateY = useTransform(scrollYProgress, [0, 0.05, 1], [0, 0, -100]);
    const borderRadius = useTransform(expandedValue, [0, 1], ["50%", "20px"]);
    const width = useTransform(expandedValue, [0, 1], ["4rem", "25rem"]);
    useEffect(() => {
        expandedValue.set(!expanded ? 1 : 0);
    }, [expanded, expandedValue]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                ref={ref}
                initial={{ opacity: 1 }}
                style={{
                    y: translateY,
                    borderRadius: borderRadius,
                    width: width,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                }}
                className={cn(
                    "flex fixed top-10 inset-x-0 mx-auto overflow-hidden shadow-lg z-[5000] px-4 py-3 items-center justify-center space-x-4 border border-white/[0.2] bg-black/80 backdrop-blur-md",
                    className
                )}
                
            >
                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative text-neutral-50 items-center flex space-x-1 transition-opacity duration-300",
                            {
                                "opacity-1 ": expanded,
                            }
                        )}
                        onMouseEnter={() => setHoveringItem(idx)}
                        onMouseLeave={() => setHoveringItem(null)} 
                    >
                        {/* Fondo degradado sutil */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10 rounded-full blur-sm group-hover:opacity-20 transition-opacity"
                            style={{ borderRadius }}
                        />

                        {/* Borde animado */}
                        <motion.div
                            className="absolute inset-0 border-2 border-white rounded-full opacity-0 group-hover:opacity-80 transition-opacity"
                            style={{ borderRadius }}
                        />

                        {/* Texto del enlace con animación al pasar el ratón */}
                        <motion.span
                            className="z-10 relative text-sm font-semibold" 
                            animate={{ scale: hoveringItem === idx ? 1.2 : 1 }} 
                            whileHover={{ scale: 1.3 }}  
                            transition={{ duration: 0.3 }}
                        >
                            {navItem.name} 
                        </motion.span>
                    </Link>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};