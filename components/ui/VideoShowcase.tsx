import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { memo, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Efecto para manejar el autoplay
  useEffect(() => {
    if (videoRef.current) {
      // Configurar opciones de reproducción
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      
      // Iniciar reproducción
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (err) {
          console.warn("Autoplay failed:", err);
        }
      };

      playVideo();
    }
  }, []);

  // Animación GSAP
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#video-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="video-showcase" className="min-h-screen w-screen">
      <div className="h-dvh w-screen" id="video-clip">
        <div className="mask-clip-path about-image w-[60vw] h-[60vh] rounded-3xl overflow-hidden">
          <video
            ref={videoRef}
            src="/video/showCase.mp4"
            className="absolute left-0 top-0 size-full object-cover"
            autoPlay
            playsInline
            muted
            loop
            preload="auto"
            aria-label="Video showcase"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(VideoShowcase);

