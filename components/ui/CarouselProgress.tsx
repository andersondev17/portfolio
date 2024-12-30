import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CarouselProgress = ({
    currentIndex,
    totalItems,
    duration = 5000
}: {
    currentIndex: number;
    totalItems: number;
    duration?: number;
}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0;
                }
                return prev + (100 / (duration / 100));
            });
        }, 100);

        return () => clearInterval(interval);
    }, [currentIndex, duration]);

    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    return (
        <div className="w-full max-w-md mx-auto">
            <Progress
                value={progress}
                className="h-1 bg-gray-200 dark:bg-gray-800"
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </Progress>
            <div className="mt-2 text-sm text-muted-foreground text-center">
                {currentIndex + 1} / {totalItems}
            </div>
        </div>
    );
};

export default CarouselProgress;