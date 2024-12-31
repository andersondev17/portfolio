"use client";
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import MagicButton from './ui/MagicButton';
import TextGenerateEffect from './ui/text-generate-effect';


const Spotlight = dynamic(() => {
    return import('./ui/Spotlight').then((module) => module.Spotlight);  }, { ssr: false });

// Priorizar texto principal con preload
const MainContent = memo(() => (
    <div className="space-y-4">
        <TextGenerateEffect
            words="Transforming Modern Concepts Into Seamless User Experiences"
            className="text-center text-3xl md:text-4xl lg:text-5xl font-bold"
            priority={true} // Mantener como prioridad
            duration={0.2} // Reducir la duración
            filter={false} // Deshabilitar efectos complejos
        />
        <p className="text-lg text-center max-w-2xl mx-auto">
            Software Developer specializing in creating scalable web applications
            with modern technologies and best practices.
        </p>

    </div>
));

MainContent.displayName = 'MainContent';

const Hero = () => {
    // Reducir el trabajo en el render initial

    return (
        <section className="relative min-h-screen pb-20 pt-40">
            {/* Optimizar Spotlights */}
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
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Metadata y SEO */}
                    <h1 className="sr-only">Anderson Lopez - Software Developer Portfolio</h1>

                    {/* Contenido crítico priorizado */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-sm font-medium tracking-wider text-muted-foreground">
                            SOFTWARE DEVELOPER
                        </span>
                    </div>

                    {/* Contenido principal */}
                    <MainContent />

                    {/* Botones de acción */}
                    <div
                        className="flex flex-row sm:flex-row justify-center gap-4 "
                    >
                        <a href="#projects">
                            <MagicButton
                                title="View My Work"
                                icon={<FaLocationArrow />}
                                position="right"
                                otherclasses="bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 dark:text-black text-white"
                            />
                        </a>

                        <a href="#contact">
                            <MagicButton
                                title="Let's Talk"
                                icon={<FaBriefcase />}
                                position="right"
                                otherclasses="bg-gradient purple-600 text-white hover:purple-700"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(Hero);