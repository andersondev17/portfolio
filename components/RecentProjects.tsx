import { projects } from "@/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { PinContainer } from "./ui/3d-pin";
import { Spotlight } from "./ui/Spotlight";
import TextGenerateEffect from "./ui/text-generate-effect";

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const RecentProjects = () => {
    const { theme } = useTheme();
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const projectsRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "center center",
                scrub: 1
            }
        });

        // Animación del encabezado
        tl.fromTo(headingRef.current,
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }
        );

        // Animación de los proyectos
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: projectsRef.current,
                start: "top center+=100",
                end: "bottom center",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-20 overflow-hidden"
            id="projects"
        >
            {/* Efectos de fondo con mejor performance */}
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
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Encabezado */}
                <div ref={headingRef} className="text-center space-y-8 pb-20">
                    <span className="block text-sm font-medium tracking-wider text-purple-500">
                        PORTFOLIO SHOWCASE
                    </span>
                    <TextGenerateEffect
                        words="Featured Projects"
                        className="text-5xl md:text-7xl font-bold"
                    />
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl">Explore a selection of my recent work</p>
                        <p className="text-gray-500 mt-2">
                            showcasing innovative solutions and creative implementations
                        </p>
                    </div>
                </div>

                {/* Grid de proyectos */}
                <div
                    ref={projectsRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-20"
                >
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card transform-gpu gap-4 p-20    "
                        >
                            <PinContainer
                                title="View Project"
                                href={project.link}
                            >
                                {/* Contenedor de imagen principal */}
                                <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                                    <div
                                        className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                                        style={{ backgroundColor: "#13162D" }}
                                    >
                                        <img
                                            src="/bg.png"
                                            alt="background"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="z-10 absolute bottom-0 object-contain transition-transform duration-300 hover:scale-105"
                                    />
                                </div>

                                {/* Contenido */}
                                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                                    {project.title}
                                </h1>

                                <p
                                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                                    style={{
                                        color: "#BEC1DD",
                                        margin: "1vh 0",
                                    }}
                                >
                                    {project.des}
                                </p>

                                {/* Footer con tecnologías y enlace */}
                                <div className="flex items-center justify-between mt-7 mb-3">
                                    <div className="flex items-center">
                                        {project.iconLists.map((icon, index) => (
                                            <div
                                                key={index}
                                                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center hover:-translate-y-1 transition-transform"
                                                style={{
                                                    transform: `translateX(-${5 * index + 2}px)`,
                                                }}
                                            >
                                                <img src={icon} alt="technology icon" className="p-2" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-center items-center group">
                                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                                            Check Live Site
                                        </p>
                                        <FaLocationArrow
                                            className="ms-3 transition-transform group-hover:translate-x-1"
                                            color="#CBACF9"
                                        />
                                    </div>
                                </div>
                            </PinContainer>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentProjects;