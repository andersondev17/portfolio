"use client";
import { featureItems } from '@/data/index';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { memo, useEffect, useRef, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { GlobeDemo } from './ui/GridGlobe';
import MagicButton from './ui/MagicButton';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

// Interfaces existentes...
interface Technology {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
    [key: string]: string[] | undefined;
}

interface Stats {
    users?: string;
    downloads?: string;
    rating?: string;
    [key: string]: string | undefined;
}

interface FeatureItem {
    id: number;
    title: string;
    description: string;
    className: string;
    videoSrc?: string;
    component?: string;
    img?: string;
    imgClassName?: string; // Para estilos específicos de imagen
    spareImg?: string; // Para imágenes secundarias/adicionales
    thumbnail?: string; // Para miniaturas
    category?: string;
    technologies?: Technology;
    stats?: Stats;
    isComingSoon?: boolean;
}

// BentoTilt Component optimizado
const BentoTilt = memo(({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>();

    useEffect(() => {
        const element = itemRef.current;
        if (!element) return;

        const handleMouseMove = (event: MouseEvent) => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            frameRef.current = requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const relativeX = (event.clientX - rect.left) / rect.width;
                const relativeY = (event.clientY - rect.top) / rect.height;

                const tiltX = (relativeY - 0.5) * 5;
                const tiltY = (relativeX - 0.5) * -5;

                setTransformStyle(
                    `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
                );
            });
        };

        const handleMouseLeave = () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            setTransformStyle("");
        };

        element.addEventListener('mousemove', handleMouseMove, { passive: true });
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={itemRef}
            className={cn(
                'transform-gpu will-change-transform relative overflow-hidden rounded-xl border-white/20 border transition duration-300',
                className
            )}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
});

BentoTilt.displayName = 'BentoTilt';

// BentoCard Component optimizado
const BentoCard = memo(({ item }: { item: FeatureItem }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };
    const renderMedia = () => {
        if (item.videoSrc) {
            return (
                <video
                    src={item.videoSrc}
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="absolute left-0 top-0 size-full object-cover object-center"
                />
            );
        }

        if (item.component === 'globe') {
            return <GlobeDemo />;
        }

        if (item.img) {
            return (
                <div
                    className={cn(
                        "absolute inset-0 bg-cover bg-center transition-opacity duration-300",
                        item.imgClassName
                    )}
                    style={{
                        backgroundImage: `url(${item.img})`,
                        opacity: 0.2
                    }}
                    aria-hidden="true"
                />
            );
        }

        return null;
    };

    return (
        <div
            ref={cardRef}
            className="relative size-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoverOpacity(1)}
            onMouseLeave={() => setHoverOpacity(0)}
        >
            {renderMedia()}

            <div className="relative z-10 flex size-full flex-col justify-between p-5 
                          text-[#2D1B69] dark:text-blue-50
                          transition-colors duration-300">
                <div>
                    <h3 className="bento-title special-font 
                                text-[#8A2BE2] dark:text-white
                                transition-colors duration-300">
                        {item.title}
                    </h3>
                    <p className="mt-3 max-w-64 text-xs md:text-base
                              text-[#2D1B69]/80 dark:text-white/90
                              transition-colors duration-300">
                        {item.description}
                    </p>

                    {item.technologies && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {Object.entries(item.technologies).map(([category, techs]) => (
                                techs && (
                                    <div key={category}>
                                        <h4 className="text-[#FF8E53] font-medium mb-2 capitalize
                                                   transition-colors duration-300">
                                            {category}
                                        </h4>
                                        <ul className="space-y-1">
                                            {techs.map((tech) => (
                                                <li key={tech} 
                                                    className="text-[#2D1B69]/70 dark:text-white/70 
                                                             text-sm transition-colors duration-300">
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>

                {item.isComingSoon && (
                    <Link href="#contact">
                        <MagicButton
                            id="Letscontact"
                            title="Let's Connect"
                            rightIcon={<FaBriefcase />}
                            containerClass="bg-[#8A2BE2] hover:bg-[#9945FF] text-white
                                         dark:bg-white dark:text-black
                                         transition-all duration-300"
                        />
                    </Link>
                )}
            </div>

            {/* Radial gradient hover effect */}
            <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 
                          group-hover:opacity-100 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, 
                                rgba(138, 43, 226, 0.1), transparent 40%)`,
                }}
            />
        </div>
    );
});

BentoCard.displayName = 'BentoCard';

// Features Component
const Features = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.features-header', {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.features-header',
                    start: 'top bottom-=100',
                }
            });

            gsap.from('.feature-card', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.features-grid',
                    start: 'top bottom-=100',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white dark:bg-black  
                      transition-colors duration-700"
            id="about"
        >
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="features-header font-circular-web text-lg text-[#8A2BE2] dark:text-blue-50
                               transition-colors duration-300">
                        Into the Metagame Layer
                    </p>
                    <p className="features-header max-w-md font-circular-web text-lg  text-gray-400 dark:text-blue-50/50
                               transition-colors duration-300">
                        Immerse yourself in a rich and ever-expanding universe where a vibrant
                        array of products converge into an interconnected overlay experience
                        on your world.
                    </p>
                </div>

                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]  bg-white/40 dark:bg-transparent
                                    border border-[#9945FF]/20 dark:border-white/20
                                    backdrop-blur-sm
                                    shadow-lg shadow-purple-500/10
                                    transition-all duration-300 ">
                    <BentoCard
                        item={{
                            id: 2,
                            title: "Global Collaboration",
                            description: "Working seamlessly across time zones with clear communication.",
                            className: "col-span-2 row-span-1",
                            component: 'globe',
                            category: "approach"
                        }}
                    />
                </BentoTilt>

                <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                    {featureItems.map((item) => (
                        <BentoTilt
                            key={item.id}
                            className={cn(
                                "feature-card",
                                "bg-white/40 dark:bg-transparent",
                                "border border-[#9945FF]/20 dark:border-white/20",
                                "backdrop-blur-sm",
                                "shadow-lg shadow-purple-500/10",
                                "transition-all duration-300",
                                item.className
                            )}
                        >
                            <BentoCard item={item} />
                        </BentoTilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(Features);