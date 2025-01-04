import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { memo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.log);
    }
  };

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
        <div className="mask-clip-path about-image">
        
          <video
            ref={videoRef}
            onLoadedData={handleVideoLoad}
            src="/video/showCase.mp4"
            className={`absolute left-0 top-0 size-full object-cover transition-opacity duration-500
              ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            playsInline
            muted
            loop
            aria-label=" Video showcase"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(VideoShowcase);