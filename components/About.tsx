import { useRef } from "react";
import AnimatedTitle from "./ui/AnimatedTitle";

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const skills = [
        'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 
        'GSAP', 'API Integration', 'Performance Optimization'
    ];

    return (
        <section id="about" className="w-full py-20 px-4 md:px-0">
            <div ref={containerRef} className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                    <p className="text-indigo-600 dark:text-indigo-400 uppercase
                               tracking-wider font-medium text-sm mb-2">
                        Algo
                    </p>

                    <AnimatedTitle 
                        title="S<b>o</b>bre <b>mi</b>"
                        containerClass="mt-4 mb-8 text-slate-900 dark:text-slate-50 text-center"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* ✅ COHESIVE: Avatar section */}
                    <div className="md:col-span-1 flex justify-center">
                        <div className="relative w-64 h-64 rounded-full overflow-hidden 
                                      border-4 border-indigo-200 dark:border-indigo-800 
                                      shadow-lg shadow-indigo-500/20">
                            <div className="absolute inset-0 bg-gradient-to-br 
                                          from-slate-900/10 to-indigo-900/20 z-10"></div>
                            <img
                                src="/avatar.jpg"
                                alt="Anderson López"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* ✅ COHESIVE: Bio section */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            I'm Anderson, a bilingual developer from Medellín who started coding because I wanted to understand why some websites felt "magical" while others looked like they were built in 1999.                        </p>

                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            Currently, I build web applications that solve real problems. My latest e-commerce project improved engagement by 40%—not because I used React (which I obviously did), but because I understood that behind every click is someone trying to buy anything at 2am.                        </p>
                    </div>
                </div>

                {/* ✅ COHESIVE: Skills section */}
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 
                                     text-slate-700 dark:text-slate-300 rounded-full text-sm 
                                     border border-slate-200 dark:border-slate-700 
                                     shadow-sm hover:border-indigo-400 
                                     dark:hover:border-indigo-500 
                                     hover:shadow-indigo-500/20
                                     transition-all duration-300"
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