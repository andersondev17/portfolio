"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaBriefcase, FaChevronDown, FaLocationArrow } from "react-icons/fa";


// Importaciones dinámicas para optimizar el bundle inicial
const MagicButton = dynamic(() => import('./ui/MagicButton'), {
    ssr: false,
    loading: () => <div className="h-12 w-40 animate-pulse bg-gray-200" />
});

const TextGenerateEffect = dynamic(() => import('./ui/text-generate-effect'), {
    ssr: false
});

const Spotlight = dynamic(() => import('./ui/Spotlight').then(mod => mod.Spotlight), {
    ssr: false
});

// Registrar plugins GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Constantes y configuraciones
const ANIMATION_CONFIG = {
    duration: 0.8,
    ease: "power2.out"
};

// Componente principal optimizado con memo
const Hero = memo(() => {
    const heroRef = useRef<HTMLElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Manejar animaciones GSAP de manera optimizada
    useGSAP(() => {
        if (!heroRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1
            }
        });

        tl.fromTo(".hero-content",
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, ...ANIMATION_CONFIG }
        );

        return () => tl.kill();
    }, []);

    // En el useGSAP, modifica la animación así:
    useGSAP(() => {
        // Configuración inicial del clipPath
        gsap.set('#home-frame', {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });

        // Animación desde el estado inicial
        gsap.from('#home-frame', {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: '#home-frame',
                start: "center center",
                end: "bottom center",
                scrub: true,

            },
        });
        gsap.to(".scroll-indicator", {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });
    
    // Optimizar renders con useCallback
    const handleWorkClick = useCallback(() => {
        const element = document.getElementById('projects');
        element?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-dvh w-screen overflow-x-hidden "
            aria-label="Introduction Section"
        >
            {/* Background Effects */}
            <div id="home-frame" className="absolute inset-0 z-0 h-dvh ">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-white/5" />
                {isLoaded && (
                    <>
                        <Spotlight
                            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen opacity-30"
                            fill="orange"
                        />
                        <Spotlight
                            className="-top-28 -left-80 h-[80vh] w-[50vw] opacity-30"
                            fill="orange"
                        />
                    </>
                )}
            </div>

            {/* Main Content */}
            <div
                id="home-frame"
                className="relative z-10 h-dvh overflow-hidden rounded-lg mx-auto w-screen px-4 pt-20 sm:px-6 lg:px-8  bg-[#8A2BE2]">
                <div className="hero-content flex flex-col items-center justify-center space-y-8 text-center">
                    {/* SEO Optimized Headings */}
                    <h1 className="sr-only">Anderson Lopez - Frontend Developer Portfolio</h1>

                    <div className="space-y-4">
                        <span className="inline-block text-sm font-robert-medium tracking-wider text-purple-500 dark:text-purple-400">
                            FRONTEND DEVELOPER
                        </span>

                        <TextGenerateEffect
                            words="All-in-one
website
maker"
                            className="text-center display flex text-5xl font-bold sm:text-9xl lg:text-6xl items-center justify-center"
                        />

                        <p className="mx-auto max-w-2xl  font-robert-regular text-lg text-purple-500 dark:text-purple-400">
                            I am Anderson, a developer passionate about merging creativity with technology.
                        </p>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <Link href="#projects">
                            <MagicButton
                                id="work"
                                title="View My Work"
                                rightIcon={<FaLocationArrow />}
                                containerClass="bg-white dark:bg-black text-black dark:text-white hover:scale-105"
                            />
                        </Link>
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
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
    <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-robert-medium text-purple-400 opacity-80">
            Scroll to explore
        </span>
        <FaChevronDown 
            className="scroll-indicator text-2xl text-purple-400 opacity-80 hover:text-purple-300 transition-colors cursor-pointer" 
            onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
        />
    </div>
</div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;