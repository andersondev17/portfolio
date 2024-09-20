'use client';
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Home() {

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  // Rotación sutil basada en el scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);


  return (

    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 perspective-lg">
    <div className="max-w-7xl w-full">
      <FloatingNav navItems={navItems} />

      <motion.div
        style={{ scale, rotateX }}
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut", delay: 0.3 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        style={{ scale }}
        initial={{ opacity: 0, x: -30, scale: 0.8 }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        transition={{
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2,
        }}
      >
        <Grid /> {/* Grid dinámico */}
      </motion.div>

      <motion.div
        style={{ scale }}
        initial={{ opacity: 0, x: 50, rotateY: 20 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <RecentProjects />
      </motion.div>

      <motion.div
        style={{ scale }}
        initial={{ opacity: 0, scale: 0.8, z: -10 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Experience />
      </motion.div>
      <motion.div
        style={{ scale }}
        initial={{ opacity: 0, scale: 0.8, z: -10 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Approach />
      </motion.div>
      <Footer />
    </div>
  </main>
  );
}