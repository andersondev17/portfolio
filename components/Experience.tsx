import { workExperience } from "@/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "./ui/Moving-border";

const Experience = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <section className="py-20 relative min-h-screen flex items-center" id="experience">
            {/* Refined gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent dark:via-purple/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,172,249,0.15),transparent)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.h1
                        className="heading relative z-10"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        My
                        <span className="text-purple"> Work Experience</span>
                    </motion.h1>
                    <div className="mt-4 text-gray-600 dark:text-white-100/80 max-w-2xl mx-auto">
                        Transforming ideas into seamless digital experiences through innovative solutions
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 relative">
                    {workExperience.map((card, index) => (
                        <motion.div
                            key={card.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            onHoverStart={() => setHoveredId(card.id)}
                            onHoverEnd={() => setHoveredId(null)}
                        >
                            <Button
                                duration={Math.floor(Math.random() * 10000) + 10000}
                                borderRadius="1.75rem"
                                className="group h-full bg-white/80 dark:bg-black-200/40 backdrop-blur-sm border border-purple/10 hover:border-purple/30 transition-all shadow-lg hover:shadow-purple/20"
                            >
                                <div className="flex flex-col p-8 h-full">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                                            <img
                                                src={card.thumbnail}
                                                alt={`${card.title} illustration`}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {card.title}
                                        </h2>
                                    </div>

                                    <p className="text-gray-600 dark:text-white-100/80 font-medium leading-relaxed mb-6 grow">
                                        {card.desc}
                                    </p>

                                    <motion.div
                                        className="flex items-center gap-2 text-purple font-semibold group-hover:text-purple/80 transition-colors"
                                        animate={{
                                            x: hoveredId === card.id ? 5 : 0
                                        }}
                                    > 
                                    <Link href= "/#contact">
                                        View Details
                                        <FaArrowRight className="text-sm" />
                                    </Link>
                                    </motion.div>
                                </div>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;