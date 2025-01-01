'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Types
interface NavItem {
    name: string;
    link: string;
}

interface FloatingNavProps {
    navItems: NavItem[];
    className?: string;
}

// Animations config
const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.3
        }
    },
    exit: { y: -100, opacity: 0 }
};

// Memoized NavItem component for better performance
const NavItemComponent = memo(({ 
    item, 
    isActive, 
    onClick,
}: { 
    item: NavItem; 
    isActive: boolean; 
    onClick: () => void;
}) => (
    <Link href={item.link} onClick={onClick} scroll={true}>
        <motion.div
            className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium",
                "transition-colors hover:text-white cursor-pointer","nav-hover-btn",
                isActive ? "text-white" : "text-gray-500"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {item.name}
            {isActive && (
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
));

NavItemComponent.displayName = 'NavItemComponent';

export const FloatingNav = memo(({ navItems, className }: FloatingNavProps) => {
    const navRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const lastScrollY = useRef(0);
    const isVisible = useRef(true);

    // Optimized scroll handler using RAF
    const handleScroll = useCallback(() => {
        if (!navRef.current) return;

        const currentScrollY = window.scrollY;
        const shouldBeVisible = currentScrollY < lastScrollY.current || currentScrollY < 100;

        if (shouldBeVisible !== isVisible.current) {
            isVisible.current = shouldBeVisible;
            gsap.to(navRef.current, {
                y: shouldBeVisible ? 0 : -100,
                opacity: shouldBeVisible ? 1 : 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }

        lastScrollY.current = currentScrollY;
    }, []);

    // Optimized scroll listener with debounce
    useEffect(() => {
        let rafId: number;
        let lastRun = 0;
        const minInterval = 16; // ~60fps

        const onScroll = () => {
            const now = Date.now();
            if (now - lastRun > minInterval) {
                lastRun = now;
                rafId = requestAnimationFrame(handleScroll);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [handleScroll]);

    // Theme toggle with animation
    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    return (
        <motion.div
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[5000] flex justify-center items-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={navVariants}
        >
            <nav
                className={cn(
                    "mt-5 px-6 py-3 rounded-full flex items-center gap-2",
                    "backdrop-blur-lg border border-white/10",
                    "bg-black/80 shadow-lg shadow-purple/20",
                    "transition-all duration-300 ease-in-out",
                    className
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                <AnimatePresence >
                    {navItems.map((item) => (
                        <NavItemComponent
                            key={item.link}
                            item={item}
                            isActive={false}
                            onClick={() => {}}
                            
                        />
                    ))}
                </AnimatePresence>

                <button
                    onClick={toggleTheme}
                    className={cn(
                        "p-2 rounded-full",
                        "hover:bg-white/10 transition-colors",
                        "text-gray-400 hover:text-white"
                    )}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        {theme === 'dark' ? (
                            <MdOutlineLightMode size={20} />
                        ) : (
                            <MdOutlineDarkMode size={20} />
                        )}
                    </motion.div>
                </button>
            </nav>
        </motion.div>
    );
});

FloatingNav.displayName = 'FloatingNav';

export default FloatingNav;