import { Project } from "@/types/project";
import Image from "next/image";
import { memo, useCallback, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaGithub, FaLocationArrow } from "react-icons/fa";
import MagicButton from "../ui/MagicButton";
const TechIcon = memo(({ icon, name, index }: { icon: string; name?: string; index: number }) => (
    <div
        className="relative group border border-white/10 rounded-full bg-black/20 p-2  hover:-translate-y-1 transition-all duration-300
                   hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25"
        style={{ animationDelay: `${index * 50}ms` }}
    >
        <Image
            src={icon}
            alt={name || `Technology ${index + 1}`}
            width={24}
            height={24}
            className="w-6 h-6"
            loading="lazy"
        />
        {name && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded
                          pointer-events-none whitespace-nowrap">
                {name}
            </div>
        )}
    </div>
));
TechIcon.displayName = 'TechIcon';

const ImageCarousel = memo(({ images, title }: { images: string[]; title: string }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ SMART: Only show carousel if multiple UNIQUE images
    const uniqueImages = useMemo(() => Array.from(new Set(images)), [images]);
    const showCarousel = uniqueImages.length > 1;

    const changeImage = useCallback((direction: 'prev' | 'next') => {
        setIsLoading(true);
        setActiveIndex(prev => {
            const newIndex = direction === 'next'
                ? (prev + 1) % uniqueImages.length
                : prev === 0 ? uniqueImages.length - 1 : prev - 1;
            return newIndex;
        });
        // Quick loading state for better UX
        setTimeout(() => setIsLoading(false), 150);
    }, [uniqueImages.length]);

    // ✅ ACCESSIBILITY: Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') changeImage('prev');
        if (e.key === 'ArrowRight') changeImage('next');
    }, [changeImage]);

    return (
        <div className="relative group">
            <div
                className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200
                         dark:from-slate-800 dark:to-slate-900
                         border border-white/10 shadow-xl"
                tabIndex={showCarousel ? 0 : -1}
                onKeyDown={handleKeyDown}
                role={showCarousel ? "img" : undefined}
                aria-label={showCarousel ? "Project image carousel" : undefined}
            >
                <Image
                    src={uniqueImages[activeIndex]}
                    alt={`${title} - View ${activeIndex + 1}`}
                    fill
                    className={`object-cover transition-all duration-500 ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'
                        } group-hover:scale-105`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                    quality={85}
                    priority={activeIndex === 0}
                />

                {/* ✅ SUBTLE: Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {showCarousel && (
                <>
                    {/* Navigation buttons */}
                    <button
                        onClick={() => changeImage('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                                 bg-black/60 hover:bg-black/80 text-white rounded-full p-2
                                 opacity-0 group-hover:opacity-100 transition-all duration-300
                                 hover:scale-110 active:scale-95"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => changeImage('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                                 bg-black/60 hover:bg-black/80 text-white rounded-full p-2
                                 opacity-0 group-hover:opacity-100 transition-all duration-300
                                 hover:scale-110 active:scale-95"
                        aria-label="Next image"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {uniqueImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                                        ? 'bg-white scale-125 shadow-lg'
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});
ImageCarousel.displayName = 'ImageCarousel';
export const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
    const images = project.images || [project.img];

    const handleAction = useCallback((url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <article
            className="w-full"
            role="article"
            aria-labelledby={`project-title-${project.id}`}
        >
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* IMAGE SECTION */}
                <div className="lg:col-span-7">
                    <ImageCarousel images={images} title={project.title} />
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <header className="space-y-3">
                        <h3
                            id={`project-title-${project.id}`}
                            className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50                                     leading-tight tracking-tight"
                        >
                            {project.title}
                        </h3>
                        {project.role && (
                            <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                                {project.role}
                            </p>
                        )}
                    </header>

                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                        {project.des}
                    </p>

                    {/* FEATURES: Only if they add value */}
                    {project.features && (
                        <section className="space-y-4">
                            <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                Key Features
                            </h4>
                            <ul className="space-y-3">
                                {project.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                        <span className="text-indigo-500 mt-1.5 text-sm">▶</span>
                                        <span className="leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* TECH STACK: Enhanced with names */}
                    <section className="space-y-6">
                        <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                            Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {project.iconLists.map((icon, idx) => (
                                <TechIcon
                                    key={idx}
                                    icon={icon}
                                    index={idx}
                                
                                />
                            ))}
                        </div>
                    </section>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap gap-4 pt-6">
                        <MagicButton
                            id={`view-live-${project.id}`}
                            title="View Live"
                            rightIcon={<FaLocationArrow />}
                            containerClass="bg-indigo-600 hover:bg-indigo-700 text-white 
                                         hover:scale-105 transition-all duration-300
                                         shadow-lg hover:shadow-indigo-500/25"
                            handleclick={() => handleAction(project.link)}
                        />

                        {project.github && (
                            <MagicButton
                                id={`view-source-${project.id}`}
                                title="Source Code"
                                rightIcon={<FaGithub />}
                                containerClass="bg-slate-800 hover:bg-slate-900 
                                             dark:bg-slate-200 dark:hover:bg-slate-300
                                             dark:text-slate-900 text-white 
                                             hover:scale-105 transition-all duration-300
                                             shadow-lg"
                                handleclick={() => handleAction(project.github!)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;