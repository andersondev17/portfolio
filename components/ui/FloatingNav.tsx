'use client';

import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
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
const NavItem = ({ item, isActive, onClick }: { 
    item: NavItem; 
    isActive: boolean; 
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; 
}) => (
    <a
        href={item.link}
        onClick={onClick}
        className={cn(
            // Base styles
            "relative px-2 sm:px-3 py-1.5 text-xs font-medium uppercase",
            "transition-all duration-200 ease-out",
            // Responsive margins
            "ms-2 sm:ms-4 first:ms-0",
            // Colors and hover states
            isActive ? "text-white" : "text-gray-400 hover:text-white",
            // Hover effect container
            "group hover:bg-transparent",
            // Base positioning
            "flex items-center justify-center",
            // Touch handling
            "touch-manipulation",
            // Custom underline effect
            "after:absolute after:-bottom-0.5 after:left-0",
            "after:h-[2px] after:w-full",
            "after:origin-bottom-right after:scale-x-0",
            "after:transition-transform after:duration-300",
            "after:ease-[cubic-bezier(0.65,0.05,0.36,1)]",

            // Dark mode handling
            "after:bg-white",
            // Hover animations
            "hover:after:origin-bottom-left hover:after:scale-x-100",
        )}
        aria-current={isActive ? 'page' : undefined}
    >
        {item.name}
    </a>
);

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
    const navRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const [activeSection, setActiveSection] = useState<string>("");
    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const isVisible = useRef(true);

    // Optimized scroll handler with IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px'
        });

        // Observe all sections
        navItems.forEach(item => {
            const targetId = item.link.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [navItems]);

    const handleScroll = useCallback(() => {
        if (!navRef.current || ticking.current) return;

        ticking.current = true;
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY.current + 50 && currentScrollY > 100) {
                if (isVisible.current) {
                    isVisible.current = false;
                    gsap.to(navRef.current, {
                        y: -100,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.inOut"
                    });
                }
            } else if (currentScrollY < lastScrollY.current - 20 || currentScrollY < 100) {
                if (!isVisible.current) {
                    isVisible.current = true;
                    gsap.to(navRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            }

            lastScrollY.current = currentScrollY;
            ticking.current = false;
        });
    }, []);

    useEffect(() => {
        if (navRef.current) {
            gsap.set(navRef.current, { 
                y: 0, 
                opacity: 1,
                force3D: true
            });
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setActiveSection(targetId);
        }
    };

    return (
        <div
            ref={navRef}
            className={cn(
                "fixed top-4 left-1/2 transform -translate-x-1/2 z-[5000]",
                "w-[calc(100%-1rem)] sm:w-auto min-w-[320px] max-w-md",
                "will-change-transform",
                className
            )}
        >
            <nav
                className={cn(
                    "w-full rounded-full",
                    "px-2 py-2 sm:px-4 sm:py-3",
                    "flex items-center justify-between",
                    "backdrop-blur-lg bg-black/80",
                    "border border-white/10 shadow-lg",
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="flex items-center">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.link}
                            item={item}
                            isActive={activeSection === item.link.replace('#', '')}
                            onClick={(e) => handleNavClick(e, item.link)}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={cn(
                        "p-2 rounded-full ml-2",
                        "hover:bg-white/10 active:bg-white/20",
                        "transition-colors",
                        "text-gray-400 hover:text-white"
                    )}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? (
                        <MdOutlineLightMode className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                        <MdOutlineDarkMode className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                </button>
            </nav>
        </div>
    );
};

export default FloatingNav;