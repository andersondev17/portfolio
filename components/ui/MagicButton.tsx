
import React from "react";

const MagicButton = ({ title, id, rightIcon, leftIcon, containerClass, handleclick }: {
    title: string;
    id: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
    containerClass: string;
    handleclick?: () => void;
}) => {
    return (
        <button id={id} className={`group  relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black  ${containerClass}`}
            onClick={handleclick}
        >

            {leftIcon}

            <span className=" relative inline-flex overflow-hidden font-bold text-xs uppercase px-2">
                <div>
                    {title}
                </div>
            </span>
            <div className="inline-block  transition-transform">
                {rightIcon}
            </div>
        </button>
    )
}

export default MagicButton