import { projects } from "@/data";
import dynamic from "next/dynamic";
import { memo } from "react";
import AnimatedTitle from "../ui/AnimatedTitle";

// Carga diferida de componentes pesados
const ProjectCard = dynamic(() => import("./ProjectCard"), {
    loading: () => <div className="h-96 w-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />,
    ssr: false
});

const RecentProjects = () => {
    return (
        <section
            className="relative py-20 lg:py-40"
            id="projects"
            aria-label="Project Showcase"
        >
            {/* Efectos de fondo simplificados */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background/80 z-10" />
                <div
                    className="absolute top-0 left-0 w-96 h-96 opacity-20 bg-purple-500 blur-3xl"
                    aria-hidden="true"
                />
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 relative z-10">
                <header className="text-center space-y-8 mb-20">
                    <span className="inline-block text-sm font-medium tracking-wider text-purple-500 uppercase">
                        Portfolio Showcase
                    </span>
                    <AnimatedTitle
                        title="Feature<b>d</b> <br/> Pr<b>o</b>jects"
                        containerClass="mt-4 mb-8 text-black dark:text-white text-center"
                    />

                    <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                        Innovative solutions and implementations
                    </p>
                </header>

                {/* Grid de proyectos optimizado */}
                <div className="space-y-32">
                    {projects.map((project, index) => project && (
                        <ProjectCard
                            key={`project-${project.id}`}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(RecentProjects);