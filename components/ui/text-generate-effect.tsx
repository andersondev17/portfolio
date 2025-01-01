"use client";

import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";


    gsap.registerPlugin(ScrollTrigger);

interface TextGenerateEffectProps {
    words: string;
    className?: string;
}

const TextGenerateEffect = ({ words, className }: TextGenerateEffectProps) => {
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
                    ease: "power2.inOut",
                    stagger: 0.02,
                },
                0
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);
    const wordsArray = words.split(" ");

    return (
        <div
            ref={containerRef}
            className={cn("font-bold", className)}
            aria-label={words}
        >
            <div className="my-4">
                <div className="dark:text-white text-black leading-snug tracking-wide">
                    {words.split(" ").map((word, idx) => (
                        <span
                            key={idx}
                            className={cn(
                                "animated-word",
                                idx > 1 && idx < 4 ? 'text-[#FF8E53]' : 'dark:text-white text-black',
                               
                            )}

                        >
                            {word}{" "}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TextGenerateEffect;