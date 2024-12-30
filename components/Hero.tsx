
import { motion } from "framer-motion"
import { FaBriefcase, FaLocationArrow } from "react-icons/fa"
import ProfileAvatar from "./ProfileAvatar"
import MagicButton from "./ui/MagicButton"
import { Spotlight } from "./ui/Spotlight"
import { TextGenerateEffect } from "./ui/text-generate-effect"

const Hero = () => {
    return (
        <div className='relative min-h-screen pb-20 pt-40  bg-gradient-to-b from-blue-50 to-white dark:from-[#0A101F] dark:to-[#080B15]'>
            <div className="absolute inset-0 overflow-hidden">
                <Spotlight 
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen opacity-40" 
                    fill="purple" 
                />
                <Spotlight 
                    className="-top-10 -left-full h-[80vh] w-[50vw] opacity-40" 
                    fill="purple" 
                />
                <Spotlight 
                    className="-top-28 -left-80 h-[80vh] w-[50vw] opacity-40" 
                    fill="blue" 
                />
                
                {/* Grain effect overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-8rem)]">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 text-center"
                    >
                        <span className="inline-block text-sm font-medium tracking-wider text-muted-foreground">
                            SOFTWARE DEVELOPER
                        </span>
                        
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center tracking-wide mb-8 text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-300"
                    >
                        <div className="heading text-foreground">
                            <TextGenerateEffect
                                words="Transforming modern concepts into seamless user experiences"
                            />
                        </div>
                        <ProfileAvatar />
                        <div className="max-w-[42rem] mx-auto text-base sm:text-lg text-muted-foreground">
                            I'm Anderson, a software developer based in Colombia. 
                            Specializing in creating exceptional digital experiences 
                            with modern web technologies.
                        </div>
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-row sm:flex-row justify-center gap-4 "
                    >
                        <a href="#about">
                            <MagicButton
                                title="View My Work"
                                icon={<FaLocationArrow />}
                                position="right"
                                otherclasses="bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 dark:text-black text-white"
                            />
                        </a>

                        <a href="mailto:anderson.dev17@gmail.com">
                            <MagicButton
                                title="Let's Talk"
                                icon={<FaBriefcase />}
                                position="right"
                                otherclasses="bg-gradient purple-600 text-white hover:purple-700"
                            />
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Hero