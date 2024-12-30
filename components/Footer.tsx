import { socialMedia } from "@/data";
import { FaFileDownload, FaLocationArrow } from "react-icons/fa";
import MagicButton from "./ui/MagicButton";

const Footer = () => {
    const handleDownloadCV = () => {
        const cvLink =
            "https://raw.githubusercontent.com/TheGodFatherpte/portfolio/master/AndersonLopezCV.pdf"; // Reemplaza con tu URL directa
        window.open(cvLink, "_blank"); // Abre el CV en una nueva pestaña
    };

    return (
        <footer className="w-full pt-20 pb-10" id="contact">
            {/* background grid */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <img
                    src="/footer-grid.svg"
                    alt="grid"
                    className="w-full h-full opacity-50 "
                />
            </div>

            <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[45vw]">
                    Ready to take <span className="text-purple">your</span> digital presence
                    to the next level?
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center">
                    Reach out to me today and let's discuss how I can help you achieve your
                    goals.
                </p>

                {/* Buttons container */}
                <div className="flex flex-col md:flex-row items-center gap-4"> {/* Add flex container */}
                    <a href="mailto:anderson.dev17@gmail.com">
                        <MagicButton
                            title="Let's get in touch"
                            icon={<FaLocationArrow />}
                            position="right"
                        />
                    </a>

                    {/* CV download button */}
                    <MagicButton
                        title="Download CV"
                        icon={<FaFileDownload />}
                        position="right"
                        handleclick={handleDownloadCV}
                        otherclasses="!bg-[#161A31]"
                    />
                </div>
            </div>

            <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
                <p className="md:text-base text-sm md:font-normal font-light">
                    Copyright © 2024 Anderson Lopez
                </p>
                <br />
                <div className="flex items-center md:gap-3 gap-6">
                    {socialMedia.map((info) => (
                        <div
                            key={info.id}
                            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                        >
                            <a
                                key={info.id}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                            >
                                <img src={info.img} alt="icons" width={20} height={20} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;