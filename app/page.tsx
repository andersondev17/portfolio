'use client';

import About from "@/components/About";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/recetProjects/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componente de loading con skeleton
const LoadingSection = () => (
  <div className="w-full h-96 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl"
    role="status"
    aria-label="Loading content"
  />

);

const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {

  return (
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
  );
}
