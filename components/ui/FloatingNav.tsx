'use client';

import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

// Register GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface NavItem {
    name: string;
    link: string;
}

interface FloatingNavProps {
    navItems: NavItem[];
    className?: string;
}

// Optimized NavItem component
const NavItemComponent = memo(({ 
    item, 
    isActive,
    onClick 
}: { 
    item: NavItem; 
    isActive: boolean;
    onClick: () => void;
}) => {
    const itemRef = useRef<HTMLDivElement>(null);

    // Lightweight hover effect using CSS transforms for better performance
    return (
        <Link href={item.link} onClick={onClick} scroll={false}>
            <div
                ref={itemRef}
                className={cn(
                    "relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium",
                    "transform transition-transform hover:scale-105",
                    "hover:text-white cursor-pointer",
                    isActive ? "text-white" : "text-gray-500"
                )}
            >
                {item.name}
                {isActive && (
                    <div 
                        className="absolute inset-0 rounded-full bg-white/10"
                        data-active="true"
                    />
                )}
            </div>
        </Link>
    );
});

NavItemComponent.displayName = 'NavItemComponent';

export const FloatingNav = memo(({ navItems, className }: FloatingNavProps) => {
    const navRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<NodeJS.Timeout>();
    const isVisible = useRef(true);

    // Optimized scroll handler with immediate response
    const handleScroll = useCallback(() => {
        if (!navRef.current) return;

        const currentScrollY = window.scrollY;
        const shouldShow = currentScrollY < lastScrollY.current || currentScrollY < 100;

        // Inmediata visibilidad en scroll up
        if (shouldShow && !isVisible.current) {
            isVisible.current = true;
            gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        } 
        // Suave desaparición en scroll down
        else if (!shouldShow && isVisible.current) {
            isVisible.current = false;
            gsap.to(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }

        lastScrollY.current = currentScrollY;
    }, []);

    // Optimized scroll listener
    useEffect(() => {
        // Mostrar navbar inmediatamente al inicio
        if (navRef.current) {
            gsap.set(navRef.current, { y: 0, opacity: 1 });
        }

        const onScroll = () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            
            handleScroll();

            scrollTimeout.current = setTimeout(() => {
                handleScroll();
            }, 150);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [handleScroll]);

    // Optimized theme toggle
    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    return (
        <div
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[5000] flex justify-center items-center"
            style={{ willChange: 'transform' }} // Optimización de rendimiento
        >
            <nav
                className={cn(
                    "mt-5 px-3 sm:px-6 py-2 sm:py-3 rounded-full",
                    "flex items-center gap-1.5 sm:gap-2",
                    "backdrop-blur-lg border border-white/10",
                    "bg-black/80 shadow-lg shadow-purple/20",
                    "transform-gpu", // Usar GPU para animaciones
                    "mx-4 sm:mx-0",
                    className
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                {navItems.map((item) => (
                    <NavItemComponent
                        key={item.link}
                        item={item}
                        isActive={false}
                        onClick={() => {}}
                    />
                ))}

                <button
                    onClick={toggleTheme}
                    className={cn(
                        "p-1.5 sm:p-2 rounded-full",
                        "hover:bg-white/10 transition-colors",
                        "text-gray-400 hover:text-white"
                    )}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    <div className="transform-gpu transition-transform duration-200">
                        {theme === 'dark' ? (
                            <MdOutlineLightMode size={20} />
                        ) : (
                            <MdOutlineDarkMode size={20} />
                        )}
                    </div>
                </button>
            </nav>
        </div>
    );
});

FloatingNav.displayName = 'FloatingNav';

export default FloatingNav;