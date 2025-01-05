import { Project } from "@/types/project";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";
import { FaGithub, FaLocationArrow } from "react-icons/fa";
import { PinContainer } from "../ui/3d-pin";
import MagicButton from "../ui/MagicButton";

export const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
    // Optimizaciones de animación
    const cardAnimationProps = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { 
            duration: 0.8, 
            delay: index * 0.2,
            ease: "easeOut" 
        },
        viewport: { once: true }
    };

    // Manejadores de eventos optimizados
    const handleVisitProject = () => {
        window.open(project.link, '_blank', 'noopener,noreferrer');
    };

    const handleViewSource = () => {
        if (project.github) {
            window.open(project.github, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.article
            className="project-card transform-gpu w-full mb-32"
            {...cardAnimationProps}
            role="article"
            aria-labelledby={`project-title-${project.id}`}
        >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Sección Visual del Proyecto */}
                <div className="lg:col-span-7 mb-8 lg:mb-0">
                    <PinContainer title="View Project" href={project.link}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl 
                                    bg-gradient-to-br from-purple-900/20 to-black/30 
                                    backdrop-blur-sm">
                            <Image
                                src={project.img}
                                alt={`${project.title} preview`}
                                fill
                                priority={index === 0}
                                className="object-contain transition-transform duration-300 
                                         group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={90}
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                        </div>
                    </PinContainer>
                </div>

                {/* Sección de Información del Proyecto */}
                <div className="lg:col-span-5 space-y-6">
                    <header>
                        <h3 
                            id={`project-title-${project.id}`}
                            className="text-2xl lg:text-4xl font-bold bg-clip-text text-transparent 
                                     bg-gradient-to-r from-purple-500 to-pink-500"
                        >
                            {project.title}
                        </h3>
                        {project.role && (
                            <p className="text-2xl text-purple-400 font-zentry mt-2 font-medium">
                                Role: {project.role}
                            </p>
                        )}
                    </header>

                    <p className="text-black-200 dark:text-white font-robert-medium text-lg leading-relaxed prose prose-invert">
                        {project.des}
                    </p>

                    {/* Sección de Características Clave */}
                    {project.features && project.features.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="text-lg text-purple-500 font-robert-medium">
                                Key Features
                            </h4>
                            <ul className="space-y-2 list-none font-robert-regular text-lg 
                                  text-black dark:text-white-100" role="list">
                                {project.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-[#FF8E53] mt-1" aria-hidden="true">•</span>
                                        <span className="text-black-200 font-robert-regular dark:text-white">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Sección Stack Tecnológico */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-purple-500">
                            Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {project.iconLists.map((icon, idx) => (
                                <div
                                    key={`tech-${idx}`}
                                    className="border border-[#FF8E53] rounded-full bg-black/50 p-2 
                                             hover:-translate-y-1 transition-all duration-300 
                                             hover:border-purple-500/50 hover:shadow-lg 
                                             hover:shadow-purple-500/20 transition-colors"
                                >
                                    <img
                                        src={icon}
                                        alt={`Technology ${idx + 1}`}
                                        className="w-6 h-6"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <MagicButton
                            id={`view-live-${project.id}`}
                            title="View Live"
                            rightIcon={<FaLocationArrow className="ml-2" />}
                            containerClass="bg-[#FF8E53] dark:bg-black text-black dark:text-white 
                                         hover:scale-105 transition-all duration-300"
                            handleclick={handleVisitProject}
                        />

                        {project.github && (
                            <MagicButton
                                id={`view-source-${project.id}`}
                                title="Source Code"
                                rightIcon={<FaGithub className="ml-2" />}
                                containerClass="bg-black dark:bg-white dark:text-black text-white hover:scale-105"

                                handleclick={handleViewSource}
                            />
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;