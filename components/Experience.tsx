"use client";
import { workExperience } from "@/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

// Importaciones dinámicas optimizadas
const Button = dynamic(() => import("./ui/Moving-border").then(mod => mod.Button), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full animate-pulse bg-gray-200 rounded-xl"
            role="presentation"
            aria-label="Loading card" />
    )
});

const TextGenerateEffect = dynamic(() => import("./ui/text-generate-effect"), {
    ssr: false
});

// Registro de plugins GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Experience = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    // Configuración mejorada de animaciones GSAP
    useGSAP(() => {
        if (!sectionRef.current) return;

        // Timeline principal para la sección
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            }
        });

        // Animación del título y subtítulo
        mainTimeline
            .from(".experience-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .from(".experience-subtext", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.5");

        // Animación de las tarjetas con clip-path
        cardsRef.current.forEach((card, index) => {
            const cardTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom-=100",
                    end: "center center",
                    toggleActions: "play none none reverse"
                }
            });

            // Animación inicial de clip-path
            cardTimeline
                .fromTo(card,
                    {
                        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.inOut",
                        delay: index * 0.2
                    }
                )
                .from(card.querySelectorAll('.card-content'), {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }, "-=0.5");
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Optimización de carga de imágenes
    const handleImageLoad = useCallback((element: HTMLImageElement) => {
        gsap.to(element, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 relative min-h-screen flex items-center bg-gradient-to-b from-white to-purple-50 
                       dark:from-gray-900 dark:to-gray-800 transition-colors duration-700"
            id="experience"
            aria-label="Work Experience Section"
        >
            {/* Fondo con efecto parallax */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,172,249,0.15),transparent)] 
                          dark:bg-[radial-gradient(ellipse_at_center,rgba(203,172,249,0.05),transparent)]" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header con animación */}
                <div className="text-center mb-16 space-y-4">
                    <div className="experience-header">
                        <TextGenerateEffect
                            words="Professional Experience"
                            className="special-font text-4xl font-bold sm:text-5xl lg:text-6xl 
                                     text-gray-900 dark:text-white"
                        />
                    </div>
                    <p className="experience-subtext text-gray-600 dark:text-gray-300 font-robert-regular max-w-xl mx-auto">
                        Transforming modern concepts into seamless user experiences through
                        innovative solutions and cutting-edge technologies.
                    </p>
                </div>

                {/* Grid de tarjetas */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {workExperience.map((card, index) => (
                        <div
                            key={card.id}
                            ref={el => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            onMouseEnter={() => setActiveCardId(card.id)}
                            onMouseLeave={() => setActiveCardId(null)}
                            className="h-full transform-gpu"
                        >
                            <Button
                                duration={Math.random() * 5000 + 5000}
                                borderRadius="1.75rem"
                                className="group h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                                         border border-purple-200 dark:border-purple-900
                                         hover:border-purple-400 dark:hover:border-purple-600
                                         transition-all shadow-lg hover:shadow-purple-200/20
                                         dark:hover:shadow-purple-900/20"
                            >
                                <div className="card-content flex flex-col p-8 h-full">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                                            <img
                                                src={card.thumbnail}
                                                alt=""
                                                className="w-full h-full object-cover opacity-0 transition-transform
                                                         duration-300 group-hover:scale-110"
                                                onLoad={e => handleImageLoad(e.target as HTMLImageElement)}
                                                loading="lazy"
                                            />
                                        </div>
                                        <h3 className="font-robert-bold text-xl text-gray-900 
                                                   dark:text-white transition-colors">
                                            {card.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 font-robert-regular 
                                              leading-relaxed mb-6 grow">
                                        {card.desc}
                                    </p>

                                    <Link
                                        href="/#contact"
                                        className="flex items-center gap-2 text-purple-600 dark:text-purple-400 
                                                 font-robert-medium group-hover:gap-3 transition-all"
                                    >
                                        View Details
                                        <FaArrowRight className={`transition-transform duration-300
                                            ${activeCardId === card.id ? 'translate-x-1' : ''}`}
                                        />
                                    </Link>
                                </div>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;