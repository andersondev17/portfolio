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
    onClick,
}: { 
    item: NavItem; 
    isActive: boolean; 
    onClick: () => void; 
}) => (
    <Link href={item.link} onClick={onClick} scroll={false}>
        <div
            className={cn(
                "relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium",
                "transform transition-transform hover:scale-105",
                "hover:text-white cursor-pointer",
                isActive ? "text-white bg-white/10" : "text-gray-500",
                "nav-hover-btn",
            )}
        >
            {item.name}
        </div>
    </Link>
));


NavItemComponent.displayName = 'NavItemComponent';

export const FloatingNav = memo(({ navItems, className }: FloatingNavProps) => {
    const navRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const isVisible = useRef(true);

    // Optimizado para mejor UX y rendimiento
    const handleScroll = useCallback(() => {
        if (!navRef.current || ticking.current) return;

        ticking.current = true;
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            
            // Solo ocultar en scroll down significativo
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
            } 
            // Mostrar en scroll up o cuando está cerca del top
            else if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
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
        // Configuración inicial
        if (navRef.current) {
            gsap.set(navRef.current, { 
                y: 0, 
                opacity: 1,
                force3D: true // Mejora rendimiento
            });
        }

        // Event listener optimizado
        const optimizedScroll = () => {
            if (!ticking.current) {
                handleScroll();
            }
        };

        window.addEventListener('scroll', optimizedScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', optimizedScroll);
        };
    }, [handleScroll]);

    // Resto del código del navbar
    return (
        <div
            ref={navRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-[5000]",
                "flex justify-center items-center",
                "transform-gpu", // Optimización de rendimiento
                "will-change-transform"
            )}
            style={{ 
                perspective: 1000,
                backfaceVisibility: 'hidden'
            }}
        >
            <nav
                className={cn(
                    "mt-5 px-3 sm:px-6 py-2 sm:py-3 rounded-full",
                    "flex items-center gap-1.5 sm:gap-2",
                    "backdrop-blur-lg border border-white/10",
                    "bg-black/80 shadow-lg shadow-purple/20",
                    "transform-gpu",
                    "transition-transform duration-200",
                    "mx-4 sm:mx-0",
                    "touch-manipulation", // Mejora la respuesta táctil
                    className
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* NavItems con feedback táctil mejorado */}
                {navItems.map((item) => (
                    <NavItemComponent
                        key={item.link}
                        item={item}
                        isActive={false}
                        onClick={() => {}}
                        
                    />
                ))}

                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={cn(
                        "p-1.5 sm:p-2 rounded-full",
                        "hover:bg-white/10 active:bg-white/20",
                        "transition-colors duration-150",
                        "text-gray-400 hover:text-white",
                        "touch-manipulation"
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