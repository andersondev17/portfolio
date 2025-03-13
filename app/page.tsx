'use client';

import About from "@/components/About";
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
  <div className="w-full h-96 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl" />
);

// Lazy load de componentes secundarios
const RecentProjects = dynamic(
  () => import("@/components/recetProjects/RecentProjects").then(mod => mod.default),
  { 
    loading: () => <LoadingSpinner/>,
    ssr: false 
  }
);
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const { theme } = useTheme();

  return (
    <Suspense fallback={<LoadingSection />}>
      <main className={cn(
        "min-h-screen relative transition-colors duration-300",
        "bg-gradient-to-b from-background to-background/95",
        "selection:bg-purple-500/20 selection:text-purple-500",
      )}>
        <FloatingNav navItems={navItems} />

        <div className="grid gap-32">
          <div id="home" className="relative z-10">
            <Hero />
          </div>

          <Suspense fallback={<LoadingSection />}>

            <div id="projects" className="">
              <RecentProjects />
            </div>

            <div id="about" className="relative overflow-hidden min-h-[90dvh] h-auto">
              <About />
            </div>


            <div id="contact">
              <Footer />
            </div>
          </Suspense>
        </div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </main>
    </Suspense>
  );
}
