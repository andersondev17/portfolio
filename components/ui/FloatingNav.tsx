'use client';

import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform
} from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const { scrollYProgress } = useScroll();
    
    const translateY = useTransform(scrollYProgress, 
        [0, 0.05, 1], 
        [0, 0, -100]
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            
            // Identificar sección activa
            const sections = navItems.map(item => item.link.replace("#", ""));
            const scrollPosition = window.scrollY + 100;

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
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navItems]);

    return (
        <motion.div 
            className="fixed top-0 left-0 right-0 z-[5000] flex justify-center"
            style={{ y: translateY }}
        >
            <AnimatePresence>
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={cn(
                        "mt-5 px-6 py-3 rounded-full flex items-center gap-2",
                        "backdrop-blur-md border border-white/10",
                        isScrolled ? 
                        "bg-[#1C1C1E]/80" : 
                            "bg-black/80 shadow-lg shadow-purple/20" ,
                        "transition-all duration-300 ease-in-out",
                    )}
                >
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
                                        "text-white" : "text-gray-500 ",
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

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
            </AnimatePresence>
        </motion.div>
    );
};