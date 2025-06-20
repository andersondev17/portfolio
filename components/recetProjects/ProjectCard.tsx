import { Project } from "@/types/project";
import Image from "next/image";
import { memo, useState } from "react";
import { FaGithub, FaLocationArrow } from "react-icons/fa";
import MagicButton from "../ui/MagicButton";

export const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Simple: Si hay imágenes adicionales, úsalas; si no, usa la principal
    const images = project.images || [project.img];
    const currentImage = images[currentImageIndex];
    
    const handleVisitProject = () => window.open(project.link, '_blank', 'noopener,noreferrer');
    const handleViewSource = () => project.github && window.open(project.github, '_blank', 'noopener,noreferrer');

    return (
        <article
            className="w-full mb-16"
            role="article"
            aria-labelledby={`project-title-${project.id}`}
        >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 mb-8 lg:mb-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl 
                                bg-gradient-to-br from-slate-100 to-slate-200
                                dark:from-slate-800 dark:to-slate-900
                                backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                        <Image
                            src={currentImage}
                            alt={`${project.title} preview`}
                            fill
                            priority={index === 0}
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={90}
                        />
                    </div>
                    
                    {/* Thumbnails simples - solo si hay múltiples imágenes DIFERENTES */}
                    {images.length > 1 && new Set(images).size > 1 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 w-16 h-10 rounded border-2 overflow-hidden transition-all ${
                                        idx === currentImageIndex 
                                            ? 'border-indigo-500 scale-105' 
                                            : 'border-slate-300 hover:border-indigo-400'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        width={64}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <header>
                        <h3 
                            id={`project-title-${project.id}`}
                            className="text-2xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50"
                        >
                            {project.title}
                        </h3>
                        {project.role && (
                            <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mt-2">
                                Role: {project.role}
                            </p>
                        )}
                    </header>

                    <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                        {project.des}
                    </p>

                    {project.features && (
                        <div className="space-y-4">
                            <h4 className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
                                Key Features
                            </h4>
                            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                                {project.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                            Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {project.iconLists.map((icon, idx) => (
                                <div
                                    key={idx}
                                    className="border border-slate-300 dark:border-slate-600 
                                             rounded-full bg-slate-300 dark:bg-slate-800 p-2 
                                             hover:-translate-y-1 transition-all duration-300
                                             hover:border-indigo-400 hover:shadow-lg"
                                >
                                    <Image
                                        src={icon}
                                        alt={`Technology ${idx + 1}`}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <MagicButton
                            id={`view-live-${project.id}`}
                            title="View Live"
                            rightIcon={<FaLocationArrow className="ml-2" />}
                            containerClass="bg-indigo-600 hover:bg-indigo-700 text-white 
                                         hover:scale-105 transition-all duration-300"
                            handleclick={handleVisitProject}
                        />

                        {project.github && (
                            <MagicButton
                                id={`view-source-${project.id}`}
                                title="Source Code"
                                rightIcon={<FaGithub className="ml-2" />}
                                containerClass="bg-slate-800 hover:bg-slate-900 
                                             dark:bg-slate-200 dark:hover:bg-slate-300
                                             dark:text-slate-900 text-white 
                                             hover:scale-105 transition-all duration-300"
                                handleclick={handleViewSource}
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