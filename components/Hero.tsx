"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaBriefcase, FaChevronDown, FaLocationArrow } from "react-icons/fa";

// Optimización de importaciones dinámicas
const MagicButton = dynamic(() => import('./ui/MagicButton'), {
    ssr: false,
    loading: () => (
        <div className="h-12 w-40 animate-pulse bg-gray-200 rounded-full"
            role="presentation"
            aria-label="Loading button"
        />
    )
});

const Spotlight = dynamic(() => import('./ui/Spotlight').then(mod => mod.Spotlight), {
    ssr: false
});

// Configuración de animaciones
const ANIMATION_CONFIG = {
    duration: 0.8,
    ease: "power2.out",
    clipPath: {
        initial: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        final: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    }
};

// Registro optimizado de plugins GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
    onLoadComplete?: () => void;
}

const Hero = memo(({ onLoadComplete }: HeroProps) => {
    const heroRef = useRef<HTMLElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Animaciones GSAP optimizadas
    useGSAP(() => {
        if (!heroRef.current) return;

        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1
            }
        });

        // Configuración del frame principal
        gsap.set('#home-frame', {
            clipPath: ANIMATION_CONFIG.clipPath.initial,
            borderRadius: "0% 0% 40% 10%",
        });

        // Animaciones secuenciales
        mainTimeline
            .fromTo(".hero-content",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: ANIMATION_CONFIG.duration,
                    ease: ANIMATION_CONFIG.ease
                }
            )
            .from('#home-frame', {
                clipPath: ANIMATION_CONFIG.clipPath.final,
                borderRadius: "0% 0% 0% 0%",
                ease: "power1.inOut",
            });

        // Animación del indicador de scroll
        gsap.to(".scroll-indicator", {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });

        return () => mainTimeline.kill();
    }, []);

    // Manejadores de eventos optimizados
    const handleScroll = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, []);

    useEffect(() => {
        setIsLoaded(true);
        onLoadComplete?.();
    }, [onLoadComplete]);

    return (
        <section
            ref={heroRef}
            className="relative h-dvh w-screen overflow-x-hidden"
            aria-label="Introduction Section"
        >
            {/* Efectos de fondo optimizados */}
            <div id="home-frame" className="absolute inset-0 z-0 h-dvh">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-white/5" />
                {isLoaded && (
                    <>
                        <Spotlight
                            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen 
                                     opacity-30 dark:opacity-20 [filter:hue-rotate(240deg)]"
                            fill="orange"
                        />
                        <Spotlight
                            className="-top-28 -left-80 h-[80vh] w-[50vw] opacity-30"
                            fill="orange"
                        />
                    </>
                )}
            </div>

            {/* Contenido principal */}
            <div
                id="home-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg 
           bg-gradient-to-br from-[#FFFFFF] via-[#F7F7F7] to-[#E8EAF6] 
           dark:from-[#2D1B69] dark:via-[#1F1347] dark:to-[#150D30]
           transition-colors duration-700"
            >
                <div className="hero-content flex flex-col items-center justify-center 
                              space-y-8 text-center px-4 mt-20">
                    <h1 className="sr-only">Anderson Lopez - Frontend Developer Portfolio</h1>

                    <div className="space-y-6">
                        <span className="inline-block text-sm font-robert-medium tracking-wider 
                                     text-purple-500 dark:text-purple-400">
                            FRONTEND DEVELOPER
                        </span>

                        <h1 className="special-font hero-heading text-black dark:text-blue-200  md:text-9xl 
                                    leading-tight">
                            All-in-one website <span className="text-[#FF8E53]"> ma<b>k</b>er</span>
                        </h1>

                        <p className="mx-auto max-w-2xl font-robert-regular text-lg 
                                  text-purple-500 dark:text-purple-400">
                            I am Anderson, a developer passionate about merging creativity with technology.

                        </p>
                    </div>

                    {/* Botones CTA optimizados */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
                        <MagicButton
                            id="work"
                            title="View My Work"
                            rightIcon={<FaLocationArrow />}
                            containerClass="bg-[#FF8E53] dark:bg-black text-black dark:text-white 
                                         hover:scale-105 transition-all duration-300"
                            handleclick={() => handleScroll('projects')}
                        />
                        <Link href="#contact" >
                            <MagicButton
                                id="Letscontact"
                                title="Let's Connect"
                                rightIcon={<FaBriefcase />}
                                containerClass="bg-black dark:bg-white dark:text-black text-white hover:scale-105"
                            />
                        </Link>
                    </div>
                </div>

                {/* Indicador de scroll mejorado */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-robert-medium text-purple-400 
                                     opacity-80 select-none">
                            Scroll to explore
                        </span>
                        <FaChevronDown
                            className="scroll-indicator text-2xl text-purple-400 opacity-80 
                                     hover:text-purple-300 transition-colors cursor-pointer"
                            onClick={() => handleScroll('projects')}
                            aria-label="Scroll to projects section"
                        />
                    </div>
                </div>
            </div>

            <h2 className="special-font uppercase font-zentry font-black text-5xl sm:text-6xl absolute bottom-5 right-5 
                        text-black dark:text-blue-100 sm:right-10">
                User <span className="bold text-[#FF8E53]">X</span>perience
            </h2>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;