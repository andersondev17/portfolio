'use client';

import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Pre-load el Hero para mejor LCP
import Hero from "@/components/Hero";

// Componente de loading con skeleton
const LoadingSection = () => (
  <div className="w-full h-96 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl" />
);

// Lazy load de componentes secundarios con suspense
const Grid = dynamic(() => import("@/components/ui/Grid"), {
  loading: LoadingSection
});

const Experience = dynamic(() => import("@/components/Experience"));
const Approach = dynamic(() => import("@/components/Approach"));
const RecentProjects = dynamic(() => import("@/components/RecentProjects"));
const Footer = dynamic(() => import("@/components/Footer"));

// Wrapper para las secciones con animación
const AnimatedSection = ({ 
  children, 
  id, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  id: string;
  delay?: number;
}) => {
  return (
    <motion.section
      id={id}
      className="scroll-mt-20 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          delay,
          ease: [0.25, 0.25, 0, 1]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Efectos de parallax y transformación
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <Suspense fallback={<LoadingSection />}>
      <main className={cn(
        "min-h-screen relative transition-colors duration-300",
        "bg-gradient-to-b from-background to-background/95",
        "selection:bg-purple-500/20 selection:text-purple-500",
      )}>
        {/* Grid de fondo animado */}
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.03]" />
        
        {/* Gradiente de desvanecimiento superior */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />

        <FloatingNav navItems={navItems} />
        
        <div className=" mx-auto  relative">
          {/* Hero Section con parallax */}
          <motion.div
            style={{ scale, rotateX, opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
            className="relative z-10"
          >
            <Hero />
          </motion.div>

          {/* Contenido Principal */}
          <Suspense fallback={<LoadingSection />}>
            <div className="space-y-32">
              <AnimatedSection id="about">
                <Grid />
              </AnimatedSection>

              <AnimatedSection id="projects" delay={0.1}>
                <RecentProjects />
              </AnimatedSection>

              <AnimatedSection id="experience" delay={0.2}>
                <Experience />
              </AnimatedSection>

              <AnimatedSection id="approach" delay={0.25}>
                <Approach />
              </AnimatedSection>
              <AnimatedSection id="contact" delay={0.25}>
                <Footer />  
              </AnimatedSection>
            
            </div>
          </Suspense>
        </div>

        {/* Gradiente de desvanecimiento inferior */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </main>
    </Suspense>
  );
}