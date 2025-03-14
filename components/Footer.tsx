import { socialMedia } from "@/data";
import { motion } from 'framer-motion';
import { FaFileDownload, FaLocationArrow } from "react-icons/fa";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import TextGenerateEffect from "./ui/text-generate-effect";

const Footer = () => {
    const handleDownloadCV = () => {
        const cvLink = "https://raw.githubusercontent.com/TheGodFatherpte/portfolio/master/AndersonLopezCV.pdf";
        window.open(cvLink, "_blank");
    };

    return (
        <footer className="relative z-10 h-dvh overflow-hidden rounded-lg mx-auto w-screen px-4 pt-20 sm:px-6 lg:px-8  absolute inset-0  bg-gradient-to-br from-[#FFFFFF] via-[#F7F7F7] to-[#E8EAF6] 
           dark:from-[#2D1B69] dark:via-[#1F1347] dark:to-[#150D30]
           transition-colors duration-700" id="contact">


            {/* Animated background elements */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent dark:via-purple/10" />
                <Spotlight
                    className="-top-40 left-0 translate-x-[40%]"
                    fill="orange"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(203,172,249,0.15),transparent)]" />
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            </div>

            {/* Main content container */}
            <div className="relative items-center justify-center z-10 container mx-auto px-6 max-w-6xl  ">
                <div
                    className="text-center"
                    
                >
                    <TextGenerateEffect
                        words="Ready to take your digital presence
                            to the next level?"
                        className="text-center text-4xl font-bold sm:text-5xl lg:text-6xl"
                    />

                    <p className="text-black font-robert-regular dark:text-white-200 md:mt-8 mt-6 max-w-xl mx-auto font-medium">
                        Let's discuss
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
                        <a href="mailto:anderson.dev17@gmail.com">
                            <MagicButton
                                id="contact-me"
                                title="Let's get in touch"
                                rightIcon={<FaLocationArrow />}
                                containerClass="bg-[#FF8E53] dark:bg-black text-black dark:text-white 
                                hover:scale-105 transition-all duration-300"                            />
                        </a>

                        <MagicButton
                            id="download-cv"
                            title="Download CV"
                            rightIcon={<FaFileDownload />}

                            handleclick={handleDownloadCV}
                            containerClass="bg-black dark:bg-white text-white dark:text-black   hover:scale-105 transition-transform"
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        {socialMedia.map((info) => (
                            <motion.a
                                key={info.id}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                whileHover={{ y: -3 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg
                bg-gradient-to-b from-white/90 to-white/70 
                dark:from-gray-800 dark:to-gray-900
                hover:from-purple-50 hover:to-purple-100 
                dark:hover:from-purple-900/50 dark:hover:to-purple-800/50
                shadow-sm hover:shadow-purple-500/20
                border border-gray-200 dark:border-gray-700
                dark:hover:border-purple-700 hover:border-purple-200
                transition-all duration-300 ease-out">

                                    {info.id === 1 ? (
                                        // GitHub Icon
                                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 
                                 group-hover:text-purple-600 dark:group-hover:text-purple-400
                                 transition-colors duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    ) : (
                                        // LinkedIn Icon
                                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 
                                 group-hover:text-purple-600 dark:group-hover:text-purple-400
                                 transition-colors duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    )}
                                </div>

                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                px-2 py-1 rounded-md text-xs font-medium
                bg-gray-900 text-white dark:bg-white dark:text-gray-900
                opacity-0 group-hover:opacity-100
                scale-0 group-hover:scale-100
                pointer-events-none
                transition-all duration-300 ease-out">
                                    {info.id === 1 ? 'GitHub' : 'LinkedIn'}
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                <p className="text-center text-gray-400">
                    © {new Date().getFullYear()} Anderson Lopez. All rights reserved.
                    </p>

                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;