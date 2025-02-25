"use client";

import { workExperience } from "@/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

// Register GSAP plugins only on client side
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Dynamic imports with proper loading states
const Button = dynamic(
    () => import("./ui/Moving-border").then(mod => mod.Button),
    {
        ssr: false,
        loading: () => (
            <div 
                className="animate-pulse bg-gray-200 rounded-xl h-full" 
                role="presentation" 
                aria-hidden="true"
            />
        )
    }
);

const TextGenerateEffect = dynamic(
    () => import("./ui/text-generate-effect"),
    { ssr: false }
);

// Memoized card component for better performance
const ExperienceCard = memo(({ card, onRef }: { 
    card: typeof workExperience[0], 
    onRef: (el: HTMLElement | null) => void 
}) => (
    <div ref={onRef} className="transform-gpu">
        <Button
            duration={6000}
            borderRadius="1.75rem"
            className="experience-card group h-full bg-white/90 dark:bg-gray-800/90 
                     border border-purple-200 dark:border-purple-900
                     hover:border-purple-400 dark:hover:border-purple-600
                     transition-all duration-300"
        >
            <div className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden">
                        <img
                            src={card.thumbnail}
                            alt={`${card.title} thumbnail`}
                            className="w-full h-full object-cover transition-transform
                                     duration-300 group-hover:scale-110"
                            loading="lazy"
                            width="80"
                            height="80"
                        />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                        {card.title}
                    </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 grow">
                    {card.desc}
                </p>

                <Link
                    href={`#${card.id}`}
                    className="inline-flex items-center gap-2 text-purple-600 
                             dark:text-purple-400 group-hover:gap-3 transition-all"
                    aria-label={`View details for ${card.title}`}
                >
                    <span>View Details</span>
                    <FaArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </Button>
    </div>
));

ExperienceCard.displayName = 'ExperienceCard';

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef(new Set<HTMLElement>());

    const setupAnimations = useCallback(() => {
        if (!sectionRef.current) return;

        return gsap.context(() => {
            // Header animation
            gsap.from(".experience-header", {
                scrollTrigger: {
                    trigger: ".experience-header",
                    start: "top 80%",
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                clearProps: "all"
            });

            // Card animations with performance optimizations
            cardsRef.current.forEach((card) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom-=100",
                    once: true,
                    onEnter: () => {
                        gsap.from(card, {
                            y: 30,
                            opacity: 0,
                            duration: 0.8,
                            clearProps: "all"
                        });
                    }
                });
            });
        }).revert;
    }, []);

    // Cleanup animations on unmount
    useEffect(() => {
        return () => {
            cardsRef.current.clear();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useGSAP(() => {
        setupAnimations();
    }, [setupAnimations]);

    const saveCardRef = useCallback((el: HTMLElement | null) => {
        if (el) cardsRef.current.add(el);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 min-h-screen bg-gradient-to-b from-white to-purple-50 
                     dark:from-gray-900 dark:to-gray-800"
            id="experience"
            aria-label="Professional Experience"
        >
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="experience-header text-4xl font-bold sm:text-5xl mb-4">
                        <TextGenerateEffect words="Professional Experience" />
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Transforming concepts into seamless experiences
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {workExperience.map((card) => (
                        <ExperienceCard 
                            key={card.id} 
                            card={card} 
                            onRef={saveCardRef}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;