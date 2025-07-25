'use client';
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    title: string;
    containerClass?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, containerClass }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                },
            });

            titleAnimation.to(
                ".animated-word",
                {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
                    ease: "power1.inOut",
                    stagger: 0.01,
                },
                0
            );
        }, containerRef);

        return () => ctx.revert(); // Clean up on unmount
    }, []);

    return (
        <div ref={containerRef} className={clsx("animated-title", containerClass)}>
            {title.split("<br />").map((line: string, index: number) => (
                <div
                    key={index}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split(" ").map((word: string, idx: number) => (
                        <span
                            key={idx}
                            className="animated-word   text-indigo-600 dark:text-white-400"
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;