// About.tsx
import AnimatedTitle from "./ui/AnimatedTitle";
import { Spotlight } from "./ui/Spotlight";


const About = () => {
    return (

        
        <div className="min-h-dvh w-screen overflow-hidden">
             <div className="absolute inset-0 w-full h-full">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent " />
                            <Spotlight
                                className="-top-40 left-0 translate-x-[40%]"
                                fill="orange"
                            />
                        </div>
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="special-font font-robert-medium text-sm uppercase">
                    Hi there!
                </p>

                <AnimatedTitle
                    title="I'm n<b>o</b>t 
                    <br/>afraid of <br/>e<b>X</b>ploring 
                    <br/>cre<b>a</b>tive 
                    <br/>soluti<b>o</b>ns "
                    containerClass="mt-5 text-black dark:text-white text-center"
                />
            </div>
        </div>
    );
};

export default About;