import { projects } from "@/data";
import { useTheme } from "next-themes";
import { Spotlight } from "../ui/Spotlight";
import TextGenerateEffect from "../ui/text-generate-effect";
import { ProjectCard } from "./ProjectCard";


const RecentProjects = () => {
    const { theme } = useTheme();

    return (
        <section
            className="relative py-20 lg:py-40 overflow-hidden"
            id="projects"
            aria-label="Project Showcase"
        >
            {/* Optimized Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background/80 z-10" />
                <Spotlight
                    className="top-0 left-0 opacity-40"
                    fill={theme === 'dark' ? '#CBACF9' : '#8B5CF6'}
                />
                <Spotlight
                    className="top-1/4 right-0 opacity-30"
                    fill={theme === 'dark' ? '#4F46E5' : '#818CF8'}
                />
            </div>
            <div className="about-subtext h-dvh text-center pt-40">
                <p>Throughout my journey, I've collaborated in duties across areas from initial concept to deployment</p>
                <p className="text-gray-500">
                    I constantly explore new technologies and resources to build smooth and scalable web applications.
                </p>
            </div>


            {/* Main Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div  className="text-center space-y-8 mb-20">
                    <span className="inline-block text-sm font-medium tracking-wider text-purple-500 uppercase">
                        Portfolio Showcase
                    </span>
                    <TextGenerateEffect
                        words="Featured Projects"
                        className="text-4xl md:text-6xl lg:text-7xl font-bold"
                    />
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl text-gray-300">
                            showcasing  solutions and implementations
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="space-y-32">
                    {projects.map((project, index) => (
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

export default RecentProjects;