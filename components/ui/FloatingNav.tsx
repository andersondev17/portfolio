'use client';

import { cn } from "@/lib/utils";
import {
    motion
} from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

interface NavItem {
    name: string;
    link: string;
}

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: NavItem[];
    className?: string;
}) => {
    const [activeSection, setActiveSection] = useState<string>("home");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { theme, setTheme } = useTheme();
    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    }, [theme, setTheme]);

    // Controlador del scroll mejorado
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Solo ocultar navbar cuando se scrollea hacia abajo y estamos más allá de 100px
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        // Identificar sección activa (manteniendo la funcionalidad original)
        const sections = navItems.map(item => item.link.replace("#", ""));
        const scrollPosition = currentScrollY + 100;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop &&
                    scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(section);
                    break;
                }
            }
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY, navItems]);

    useEffect(() => {
        // Throttle para optimizar performance
        let throttleTimeout: NodeJS.Timeout | null = null;

        const onScroll = () => {
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(() => {
                    handleScroll();
                    throttleTimeout = null;
                }, 150); // Ajustado para una respuesta más suave
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (throttleTimeout) clearTimeout(throttleTimeout);
        };
    }, [handleScroll]);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[5000] flex justify-center"
            initial={{ y: -100 }}
            style={{
                position: 'fixed', // Asegurar posición fija
            }}
            animate={{
                y: isVisible ? 0 : -100,
                transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }
            }}
        >
            <motion.nav

                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "mt-5 px-6 py-3 rounded-full flex items-center gap-2",
                    "backdrop-blur-lg border border-white/10",
                    "bg-black/80 shadow-lg shadow-purple/20",
                    "transition-all duration-300 ease-in-out transform",
                    lastScrollY > 100 ? "translate-y-2" : "translate-y-0"
                )}
                role="nav"
            >
                {/* Resto del código del navbar se mantiene igual */}
                {navItems.map((item, idx) => (
                    <Link
                        key={`${item.link}-${idx}`}
                        href={item.link}
                        scroll={true}
                    >
                        <motion.div
                            className={cn(
                                "relative px-4 py-2 rounded-full",
                                "text-sm font-medium transition-colors",
                                "hover:text-white cursor-pointer",
                                activeSection === item.link.replace("#", "") ?
                                    "text-white" : "text-gray-500",
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {item.name}
                            {activeSection === item.link.replace("#", "") && (
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-white/10"
                                    layoutId="active-nav"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30
                                    }}
                                />
                            )}
                        </motion.div>
                    </Link>
                ))}

                {/* Se mantiene el theme toggle existente */}
                <button
                    onClick={toggleTheme}
                    className={cn(
                        "p-2 rounded-full",
                        "hover:bg-white/10 transition-colors",
                        "text-gray-400 hover:text-white"
                    )}
                    aria-label="Toggle theme"
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: theme === "dark" ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        {theme === "dark" ? (
                            <MdOutlineLightMode size={20} />
                        ) : (
                            <MdOutlineDarkMode size={20} />
                        )}
                    </motion.div>
                </button>
            </motion.nav>
        </motion.div>
    );
};