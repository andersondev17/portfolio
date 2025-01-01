"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";

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
        const frame = document.querySelector("#home-frame");
        if (!frame) return;

        // Configuración inicial del clipPath
        gsap.set(frame, {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });

        // Animación desde el estado inicial
        gsap.from(frame, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: frame,
                start: "top top",
                end: "bottom center",
                scrub: 1,

            },
        });
    }, []);
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
            className="relative min-h-screen w-full overflow-hidden"
            aria-label="Introduction Section"
        >
            {/* Background Effects */}
            <div  id="home-frame" className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-white/5" />
                {isLoaded && (
                    <>
                        <Spotlight
                            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen opacity-30"
                            fill="purple"
                        />
                        <Spotlight
                            className="-top-28 -left-80 h-[80vh] w-[50vw] opacity-30"
                            fill="blue"
                        />
                    </>
                )}
            </div>

            {/* Main Content */}
            <div
                id="home-frame"
                className="relative z-10 h-dvh overflow-hidden rounded-lg mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                <div className="hero-content flex flex-col items-center justify-center space-y-8 text-center">
                    {/* SEO Optimized Headings */}
                    <h1 className="sr-only">Anderson Lopez - Frontend Developer Portfolio</h1>

                    <div className="space-y-4">
                        <span className="inline-block text-sm font-medium tracking-wider text-purple-500 dark:text-purple-400">
                            FRONTEND DEVELOPER
                        </span>

                        <TextGenerateEffect
                            words="Crafting Scalable Solutions For Seamless User Experiences"
                            className="text-center text-4xl font-bold sm:text-5xl lg:text-6xl"
                        />

                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Transforming modern concepts into intuitive digital experiences with cutting-edge technology.
                        </p>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <MagicButton
                            title="View My Work"
                            icon={<FaLocationArrow />}
                            position="right"
                            handleclick={handleWorkClick}
                            otherclasses="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-900 hover:to-blue-700"
                        />
                        <Link href="#contact" >
                            <MagicButton
                                title="Let's Connect"
                                icon={<FaBriefcase />}
                                position="right"
                                otherclasses="bg-black dark:bg-white dark:text-black text-white"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;