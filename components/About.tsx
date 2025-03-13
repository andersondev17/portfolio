import { useRef } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Animaciones para los párrafos
    const paragraphVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    return (
        <section id="about" className="w-full py-20 px-4 md:px-0">
            <div ref={containerRef} className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                    <p
                        className="text-purple uppercase tracking-wider font-medium text-sm mb-2"
                    >
                        Algo
                    </p>

                    <AnimatedTitle title="S<b>o</b>bre <b>mi</b>"
                        containerClass="mt-4 mb-8 text-black dark:text-white text-center"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div
                        className="md:col-span-1 flex justify-center"
                    >
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-purple/20 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-black-300 to-purple/30 z-10"></div>
                            <img
                                src="/avatar.jpg"
                                alt="Anderson López"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Bio - Segunda y tercera columna en desktop */}
                    <div

                        className="md:col-span-2 flex flex-col gap-6 text-white-100"
                    >
                        <p
                            className="text-lg leading-relaxed"
                        >
                            Hola, soy Anderson López, desarrollador frontend bilingüe que comenzó su viaje en la programación con pequeños proyectos de JavaScript y terminó enamorándose del ecosistema React.
                        </p>

                        <p

                            className="text-lg leading-relaxed"
                        >
                            En el último año y medio, me he dedicado a transformar diseños en experiencias conscientes que no solo funcionan bien, sino que también conectan con los usuarios.
                        </p>

                        <p

                            className="text-lg leading-relaxed"
                        >
                            Soy muy inquieto con mi mente, cuando no estoy depurando código o experimentando con nuevas animaciones, probablemente me encontrarás explorando documentación de tecnologías emergentes o resolviendo desafíos de algoritmos para mantener mi mente afilada.
                        </p>
                    </div>
                </div>

                {/* Skills tags */}
                <div

                    className="mt-12 flex flex-wrap justify-center gap-3 hover:gap-4"
                >
                    {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'API Integration', 'Performance Optimization'].map((skill) => (
                        <span
                            key={skill}
                            className="px-4 py-2 bg-black-100 dark:bg-white/10 text-white-100 dark:text-white rounded-full text-sm border border-purple/20 shadow-sm hover:border-[#FF8E53]  dark:hover:border-[#FF8E53] transition-colors duration-300"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;