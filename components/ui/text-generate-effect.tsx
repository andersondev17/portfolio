"use client";

import { cn } from "@/lib/utils";
import { motion, usePresence } from "framer-motion";
import { memo, useEffect, useState } from 'react';

interface TextGenerateEffectProps {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
    priority?: boolean;
}

const TextGenerateEffect = memo(({
    words,
    className,
    filter = true,
    duration = 0.5,
    priority = false,
}: TextGenerateEffectProps) => {
    const [mounted, setMounted] = useState(false);
    const [isPresent, safeToRemove] = usePresence();
    const wordsArray = words.split(" ");

    // Optimización: Renderizar inmediatamente el contenido inicial
    useEffect(() => {
        setMounted(true);
        // Precargar fuentes críticas
        if (priority) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = '/fonts/your-font.woff2';
            document.head.appendChild(link);
        }
    }, [priority]);

    // Optimización: Reducir la complejidad de las animaciones
    const wordVariants = {
        initial: { 
            opacity: priority ? 1 : 0,
            filter: priority ? "blur(0px)" : "blur(5px)",
        },
        animate: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: priority ? 0 : duration,
                ease: "easeOut"
            }
        }
    };

    return (
        <div 
            className={cn(
                "font-bold select-none", // Prevenir selección durante animación
                className,
                // Optimización: Clases condicionales para prioridad
                priority && "text-optimization",
                mounted && "text-visible"
            )}
            aria-label={words}
        >
            <div className="my-4 relative">
                {/* Optimización: Renderizado inicial inmediato para SEO */}
                {!mounted && priority && (
                    <div className="absolute inset-0" aria-hidden="true">
                        {words}
                    </div>
                )}

                {/* Contenido animado */}
                <div className="dark:text-white text-black leading-snug tracking-wide">
                    {wordsArray.map((word, idx) => (
                        <motion.span
                            key={`${word}-${idx}`}
                            className={cn(
                                "inline-block px-[0.1em]", // Espaciado optimizado
                                idx > 3 ? 'text-purple' : 'dark:text-white text-black',
                                // Optimizaciones de rendimiento
                                "will-change-transform",
                                "transform-gpu",
                                priority && "preload-text"
                            )}
                            style={{
                                // Optimización: Prevenir reflow
                                containIntrinsicSize: "auto",
                                contentVisibility: "auto",
                            }}
                            variants={wordVariants}
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            // Optimización: Reducir re-renders
                            layoutId={priority ? `word-${idx}` : undefined}
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
});

TextGenerateEffect.displayName = 'TextGenerateEffect';

// Optimización: Añadir estilos críticos
const criticalStyles = `
    .text-optimization {
        content-visibility: auto;
        contain-intrinsic-size: 0 500px;
    }
    .text-visible {
        opacity: 1 !important;
    }
    .preload-text {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
`;

// Inyectar estilos críticos
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = criticalStyles;
    document.head.appendChild(style);
}

export default TextGenerateEffect;