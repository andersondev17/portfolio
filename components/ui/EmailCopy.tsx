// components/ui/EmailCopy.tsx
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DynamicLottie = dynamic(() => import('react-lottie'), { ssr: false });

const EmailCopy = () => {
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopy = async () => {
        if (!mounted) return;
        
        try {
            await navigator.clipboard.writeText("anderson.dev17@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!mounted) return null;

    return (
        <div className="mt-5 relative flex items-center justify-center">
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2"
                    >
                        <DynamicLottie 
                            options={{
                                loop: copied,
                                autoplay: copied,
                                animationData: require('@/data/confetti.json'),
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice"
                                }
                            }} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={handleCopy}
                className="w-full px-4 py-2 rounded-lg bg-muted/80 hover:bg-muted 
                         text-foreground/90 hover:text-foreground
                         transition-colors duration-200"
            >
                {copied ? "¡Email copiado!" : "Copiar email"}
            </button>
        </div>
    );
};

export default EmailCopy;