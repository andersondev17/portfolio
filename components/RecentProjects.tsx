import { projects } from "@/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { PinContainer } from "./ui/3d-pin";
import { Spotlight } from "./ui/Spotlight";

const RecentProjects = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Enhanced animations for spotlights
    const leftSpotlightOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const rightSpotlightOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const centerSpotlightOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const projectVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };
    return (
        <section
            ref={containerRef}
            className="py-20 relative overflow-hidden"
            id="projects"
        >
            {/* Background effects layer */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background/80 z-10" />
                
                {/* Interactive spotlights */}
                <Spotlight 
                    className="top-0 left-0 opacity-40" 
                    fill={theme === 'dark' ? '#CBACF9' : '#8B5CF6'}
                    
                />
                <Spotlight 
                    className="top-1/4 right-0 opacity-30" 
                    fill={theme === 'dark' ? '#4F46E5' : '#818CF8'}
                
                />
                
                {/* Ambient spotlights */}
                <motion.div style={{ opacity: leftSpotlightOpacity }}>
                    <Spotlight 
                        className="-left-1/4 top-24 !opacity-20" 
                        fill={theme === 'dark' ? '#CBACF9' : '#8B5CF6'}
                    
                    />
                </motion.div>
                
                <motion.div style={{ opacity: centerSpotlightOpacity }}>
                    <Spotlight 
                        className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 !opacity-30" 
                        fill={theme === 'dark' ? '#818CF8' : '#4F46E5'}
                        
                    />
                </motion.div>

                {/* Grain effect overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
            </div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="container mx-auto px-4 relative z-10"
            >
                <motion.h1
                    className="heading text-center mb-16"
                    variants={projectVariants}
                >
                    <span className="block text-sm font-medium tracking-wider text-purple mb-2">
                        PORTFOLIO SHOWCASE
                    </span>
                    Featured{" "}
                    <span className="text-purple relative">
                        Projects
                        <motion.span
                            className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        />
                    </span>
                    <span className="block text-base font-normal mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore a selection of my recent work, showcasing innovative solutions and creative implementations
                    </span>
                </motion.h1>

                <motion.div variants={containerVariants}>
                    <div className="flex flex-wrap items-center justify-center p-4 gap-x-20 gap-y-8 mt-10">
                        {projects.map((item) => (
                            <motion.div
                                className="sm:h-[41rem] lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
                                key={item.id}
                                variants={projectVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PinContainer
                                    title="View Projects"
                                    href={item.link}
                                >
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
                                            src={item.img}
                                            alt={item.title}
                                            className="z-10 absolute bottom-0 object-contain transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>

                                    <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                                        {item.title}
                                    </h1>

                                    <p
                                        className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                                        style={{
                                            color: "#BEC1DD",
                                            margin: "1vh 0",
                                        }}
                                    >
                                        {item.des}
                                    </p>

                                    <div className="flex items-center justify-between mt-7 mb-3">
                                        <div className="flex items-center">
                                            {item.iconLists.map((icon, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                                                    style={{
                                                        transform: `translateX(-${5 * index + 2}px)`,
                                                    }}
                                                    whileHover={{ y: -5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <img src={icon} alt="technology icon" className="p-2" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div 
                                            className="flex justify-center items-center"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                                                Check Live Site
                                            </p>
                                            <FaLocationArrow className="ms-3" color="#CBACF9" />
                                        </motion.div>
                                    </div>
                                </PinContainer>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default RecentProjects;