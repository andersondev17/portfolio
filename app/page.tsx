'use client';

import { FloatingNav } from "@/components/ui/FloatingNav";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";
import { navItems } from "@/data";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Pre-load el Hero 
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

// Componente de loading con skeleton
const LoadingSection = () => (
  <LoadingSpinner />
);

// Lazy load de componentes secundarios
const Grid = dynamic(() => import("@/components/ui/Grid"), {
  loading: LoadingSection,
});
const Experience = dynamic(() => import("@/components/Experience"));
const Approach = dynamic(() => import("@/components/Approach"));
const RecentProjects = dynamic(() => import("@/components/RecentProjects"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const { theme } = useTheme();

  return (
    <Suspense fallback={<LoadingSection />}>
      <main
        className={cn(
          "min-h-screen relative transition-colors duration-300",
          "bg-gradient-to-b from-background to-background/95",
          "selection:bg-purple-500/20 selection:text-purple-500",
        )}
      >
        {/* Navegación flotante */}
        <FloatingNav navItems={navItems} />

        {/* Contenido principal */}
        <div className="grid gap-32">
          {/* Sección Hero */}
          <div id="hero" className="relative z-10">
            <Hero />
          </div>

          <Suspense fallback={<LoadingSection />}>
            <div>
              {/* Sección About */}
              <div id="about">
                <Grid />
              </div>

              {/* Sección Projects */}
              <div id="projects">
                <RecentProjects />
              </div>

              {/* Sección Experience */}
              <div id="experience">
                <Experience />
              </div>

              {/* Sección Approach */}
              <div id="approach">
                <Approach />
              </div>

              {/* Sección Contact */}
              <div id="contact">
                <Footer />
              </div>
            </div>
          </Suspense>
        </div>

        {/* Gradiente de desvanecimiento inferior */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </main>
    </Suspense>
  );
}
