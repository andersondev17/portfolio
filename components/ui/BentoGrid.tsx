'use client';

import { Card } from "@/components/ui/card";
import animationData from "@/data/confetti.json";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { memo, useRef, useState } from "react";
import { FaCode, FaGlobe } from 'react-icons/fa';
import { IoCopyOutline } from "react-icons/io5";

import dynamic from "next/dynamic";
import { GlobeDemo } from "./GridGlobe";
import MagicButton from "./MagicButton";
import LoadingSpinner from "./loading/LoadingSpinner";


// Actualizar el import en tu GlobeDemo:
// Importación dinámica de Lottie
const Lottie = dynamic(() => import('react-lottie'), {
    ssr: false,
    loading: () => <LoadingSpinner />
});

// Animaciones refinadas
const GRID_ITEM_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4, // Reduce la duración
            ease: "easeOut", // Animación menos costosa
        }
    }),
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.25,
            ease: "easeInOut"
        }
    }
};

interface BentoGridProps {
    className?: string;
    children?: React.ReactNode;
}

// BentoGrid.tsx
export const BentoGrid =memo<BentoGridProps>( ({ className, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]); // Escala menor

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={cn(
                //estructura de grid
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                "gap-4 lg:gap-6",
                "container mx-auto px-4 py-8",  // Ajustado para dispositivos pequeños
                // Efectos de fondo y profundidad mejorados
                "relative z-10",
                "after:absolute after:inset-0 after:-z-10",
                "after:bg-[radial-gradient(ellipse_at_center,theme(colors.indigo.500/10)_0%,transparent_70%)]",
                "dark:after:bg-[radial-gradient(ellipse_at_center,theme(colors.purple)_0%,transparent_70%)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
})

interface BentoGridItemProps {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    id?: number;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
}

export const BentoGridItem = memo<BentoGridItemProps>( ({
    className,
    title,
    description,
    img,
    imgClassName,
    titleClassName,
    spareImg,
    id = 0,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("anderson.dev17@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            variants={GRID_ITEM_VARIANTS}
            custom={id}
            whileHover="hover"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Card
                className={cn(
                    "relative overflow-hidden rounded-3xl border group/bento",
                    "h-full min-h-[320px]",
                    "hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-blue-500/20",
                    "hover:border-purple-500/20 dark:hover:border-blue-500/20",
                    "transition-all duration-500 ease-out",
                    "bg-white/5 dark:bg-black/5",
                    "backdrop-blur-sm",
                    className
                )}
            >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                    <div className="absolute inset-0 bg-noise opacity-20" />
                </div>

                {/* Contenido */}
                <div className="relative h-full p-6 flex flex-col">
                    {img && (
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={img}
                                alt={typeof title === 'string' ? title : 'Grid item'}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={id <= 3} // Prioriza la carga de las primeras imágenes
                                className={cn(
                                    "object-cover",
                                    "opacity-50 dark:opacity-40",
                                    "transition-all duration-500",
                                    "group-hover/bento:scale-105 group-hover/bento:opacity-60",
                                    imgClassName
                                )}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                        </div>
                    )}

                    <motion.div
                        className={cn(
                            "relative z-10 flex flex-col h-full",
                            "space-y-4",
                            titleClassName
                        )}
                        initial={false}
                        animate={isHovered ? { y: -5 } : { y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Título con iconos */}
                        <div className="flex items-center gap-2">
                            {id === 2 && <FaGlobe className="text-purple-500" />}
                            {id === 3 && <FaCode className="text-blue-500" />}
                            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/80">
                                {title}
                            </h3>
                        </div>

                        {description && (
                            <p className="text-sm text-muted-foreground/90">
                                {description}
                            </p>
                        )}

                        {/* Componentes específicos */}
                        {id === 2 && <GlobeDemo />}
                        {id === 3 && <TechStack />}
                        {id === 6 && (
                            <div className="mt-auto">
                                <EmailCopy
                                    copied={copied}
                                    onCopy={handleCopy}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
});

// Componentes auxiliares mejorados...
const TechStack = () => {
    const technologies = [
        ['Node.js', 'TypeScript', 'TailwindCSS'],
        ['React.js', 'Next.js', 'JavaScript']
    ];

    return (
        <div className="grid grid-cols-2 gap-3 mt-auto">
            {technologies.map((column, colIndex) => (
                <div key={colIndex} className="space-y-2">
                    {column.map((tech) => (
                        <motion.span
                            key={tech}
                            className="block px-3 py-1.5 text-xs font-medium rounded-lg
                                     bg-muted/50 hover:bg-muted/70
                                     text-foreground/70 hover:text-foreground
                                     transition-colors duration-200
                                     cursor-pointer"
                            whileHover={{ scale: 1.02, x: 3 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            ))}
        </div>
    );
};

const EmailCopy = ({ copied, onCopy }: { copied: boolean; onCopy: () => void }) => (
    <div className="mt-5 relative flex items-center justify-center">
        {copied && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={` absolute -buttom-5 -top-12 left-1/2 -translate-x-1/2 ${copied ? "block" : "hidden"
                    }`}
            >
                <Lottie options={{
                    loop: copied,
                    autoplay: copied,
                    animationData,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                    }
                }} />
            </motion.div>
        )}
        <MagicButton
            id="copy-email"
            title={copied ? "¡Email copiado!" : "Copiar email"}
            rightIcon={<IoCopyOutline />}
            handleclick={onCopy}
            containerClass={cn(
                "w-full",
                "bg-muted/80 hover:bg-muted",
                "text-foreground/90 hover:text-foreground",
                "transition-colors duration-200"
            )}
        />
    </div>
);

export default BentoGrid;