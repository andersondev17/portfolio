
import React from "react";

const MagicButton = ({
    title,
    icon,
    position,
    handleclick,
    otherclasses
}: {
    title: string,
    icon: React.ReactNode,
    position: string,
    handleclick?: () => void,
    otherclasses?: string
}) => {
    return (
        <button className="relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt0"
            onClick={handleclick}>
            <span
                className="absolute inset-[-1000%] animate-[optimized-spin_2s_linear_infinite]"
                style={{ willChange: 'transform' }}
            />

            <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherclasses} `}>
                {position === "left" && icon}
                {title}
                {position === "right" && icon}
            </span>
        </button>
    )
}

export default MagicButton