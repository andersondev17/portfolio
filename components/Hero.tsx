'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { memo, useCallback, useRef } from "react";
import { FaChevronDown, FaLocationArrow } from "react-icons/fa";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import TextGenerateEffect from "./ui/text-generate-effect";

// ✅ SOLID ARCHITECTURE: Conditional GSAP registration
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ANIMATION_CONFIG = {
    ease: "power1.inOut",
    clipPath: {
        initial: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        final: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    }
} as const;

const Hero = memo(() => {
    const heroRef = useRef<HTMLElement>(null);

    // ✅ LEARNING FROM GAMING HERO: Conditional GSAP execution
    useGSAP(() => {
        if (!heroRef.current) return;

        // ✅ MINIMAL GSAP: Only clipPath that adds real value
        gsap.set("#hero-frame", {
            clipPath: ANIMATION_CONFIG.clipPath.initial,
            borderRadius: "0% 0% 40% 10%",
        });

        gsap.from("#hero-frame", {
            clipPath: ANIMATION_CONFIG.clipPath.final,
            borderRadius: "0% 0% 0% 0%",
            ease: ANIMATION_CONFIG.ease,
            scrollTrigger: {
                trigger: "#hero-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });

        // ✅ CLEANUP: Following gaming hero pattern
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // ✅ PERFORMANCE: Smooth scroll without GSAP overhead
    const handleScroll = useCallback((sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-dvh w-screen overflow-x-hidden"
            aria-label="Introduction Section"
        >
            {/* ✅ PERFORMANCE: Tailwind predefinido = mejor cacheable */}
            <div className="absolute inset-0 z-0">
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill="indigo-500/5"
                />
                <Spotlight
                    className="-top-10 -left-full h-[80vh] w-[50vw]"
                    fill="indigo-600/3"
                />
                <Spotlight
                    className="-top-28 -left-80 h-[80vh] w-[50vw]"
                    fill="indigo-700/2"
                />
            </div>

            <div
                id="hero-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden 
                         bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200
                         dark:from-slate-900 dark:via-slate-800 dark:to-slate-700
                         transition-colors duration-700"
            >
                <div className="hero-content flex flex-col items-center justify-center 
                              space-y-8 text-center px-4 mt-20">
                    <div className="absolute pointer-events-none inset-0 flex items-center 
                                 justify-center dark:bg-slate-950/5 bg-slate-50/5
                                 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                </div>

                <div className="flex justify-center relative my-20 z-10">
                    <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] 
                                 flex flex-col items-center justify-center">
                        <h2 className="uppercase tracking-widest text-sm text-center 
                                    text-slate-600 dark:text-slate-400 max-w-80">
                            Hey there.
                        </h2>

                        <TextGenerateEffect
                            className="text-center text-4xl md:text-6xl lg:text-7xl
                                     text-slate-900 dark:text-slate-50"
                            words="All-in-one website maker"
                        />

                        <p className="mx-auto max-w-2xl font-robert-regular text-base md:text-lg 
                                  text-indigo-600 dark:text-indigo-400 pb-4">
                            I&apos;m Anderson. I&apos;m a software Developer based in Colombia.
                        </p>

                        {/* ✅ PERFORMANCE: Tailwind predefinido */}
                        <MagicButton
                            id="projects-button"
                            title="Show my work"
                            rightIcon={<FaLocationArrow />}
                            containerClass="bg-indigo-600 hover:bg-indigo-700 text-white 
                                         dark:bg-indigo-500 dark:hover:bg-indigo-600
                                         hover:scale-105 transition-all duration-300"
                            handleclick={() => handleScroll('projects')}
                        />
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-robert-medium 
                                     text-slate-600 dark:text-slate-400 select-none">
                            Scroll to explore
                        </span>
                        <FaChevronDown
                            className="text-2xl text-indigo-500 dark:text-indigo-400 
                                     hover:text-indigo-600 dark:hover:text-indigo-300 
                                     transition-colors cursor-pointer animate-bounce"
                            onClick={() => handleScroll('projects')}
                            aria-label="Scroll to projects section"
                        />
                    </div>
                </div>
            </div>

            {/* ✅ COHESIVE: Marca usando paleta principal */}
            <h2 className="special-font uppercase font-zentry font-black text-3xl 
                        md:text-5xl lg:text-6xl absolute bottom-5 right-5 
                        text-slate-900 dark:text-slate-50 md:right-10">
                User <span className="text-indigo-600 dark:text-indigo-500">X</span>perience
            </h2>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;