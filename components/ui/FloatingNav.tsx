'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

interface NavItem {
    name: string;
    link: string;
}

interface FloatingNavProps {
    navItems: NavItem[];
    className?: string;
}

export const FloatingNav = ({ navItems, className }: FloatingNavProps) => {
    const navRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const [activeSection, setActiveSection] = useState<string>("");
    const [isCompact, setIsCompact] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const lastScrollY = useRef(0);

    // Intersection Observer (kept - performant)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        navItems.forEach(item => {
            const targetId = item.link.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [navItems]);

    // Simplified scroll logic - YOUR REQUEST: compact only on scroll down
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
        
        if (scrollDelta < 8) return; // Performance debounce

        const scrollingDown = currentScrollY > lastScrollY.current;
        const isNearTop = currentScrollY < 120;

        // EXACTLY what you asked: compact only when scrolling down and not near top
        setIsCompact(scrollingDown && !isNearTop && currentScrollY > 200);
        
        lastScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        const throttledScroll = () => requestAnimationFrame(handleScroll);
        window.addEventListener('scroll', throttledScroll, { passive: true });
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [handleScroll]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        const targetId = link.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(targetId);
        }
    };

    const shouldExpand = !isCompact || isHovered;

    return (
        <div
            ref={navRef}
            className={cn(
                "fixed top-4 left-1/2 -translate-x-1/2 z-[5000]",
                "transition-all duration-500 ease-out will-change-transform",
                shouldExpand ? "w-fit max-w-lg" : "w-20", // THIS IS THE iOS MAGIC!
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <nav
                className={cn(
                    "relative overflow-hidden",
                    "px-2 py-2 backdrop-blur-xl",
                    "bg-black border border-white/10",
                    "shadow-2xl shadow-black/25",
                    shouldExpand ? "rounded-full" : "rounded-full", 
                    "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                {isCompact && !isHovered && (
                    <div className="flex items-center justify-center">
                        <div className="flex space-x-1">
                            {navItems.map((item, idx) => (
                                <div
                                    key={item.link}
                                    className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                        activeSection === item.link.replace('#', '')
                                            ? "bg-white scale-125" // Active dot
                                            : "bg-red-30"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {shouldExpand && (
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.link}
                                    href={item.link}
                                    onClick={(e) => handleNavClick(e, item.link)}
                                    className={cn(
                                        "relative px-3 py-1.5 text-xs font-medium uppercase",
                                        "rounded-full transition-all duration-300",
                                        " active:scale-95 hover:scale-105",
                                        activeSection === item.link.replace('#', '')
                                            ? "text-white bg-white/15"
                                            : "text-gray-400 hover:text-white",
                                        //  hover effect
                                        "group",
                                        // Underline animation
                                        "after:absolute after:-bottom-0.5 after:left-0",
                                        "after:h-[2px] after:w-full after:bg-white",
                                        "after:origin-bottom-right after:scale-x-0",
                                        "after:transition-transform after:duration-300",
                                        "after:ease-[cubic-bezier(0.65,0.05,0.36,1)]",
                                        "hover:after:origin-bottom-left hover:after:scale-x-100"
                                    )}
                                    aria-current={activeSection === item.link.replace('#', '') ? 'page' : undefined}
                                >
                                    {item.name}
                                    
                                    {/* Active indicator dot */}
                                    {activeSection === item.link.replace('#', '') && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Theme toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={cn(
                                "p-2 rounded-full ml-2",
                                "hover:bg-white/10 active:bg-white/20 active:scale-95",
                                "transition-all duration-200",
                                "text-gray-400 hover:text-white"
                            )}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                        >
                            {theme === 'dark' ? (
                                <MdOutlineLightMode className="w-4 h-4" />
                            ) : (
                                <MdOutlineDarkMode className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default FloatingNav;