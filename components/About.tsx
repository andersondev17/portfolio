// About.tsx
import AnimatedTitle from "./ui/AnimatedTitle";


const About = () => {
    return (
        <div className="min-h-dvh w-screen overflow-hidden">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="special-font font-robert-medium text-sm uppercase">
                    Hi there!
                </p>

                <AnimatedTitle
                    title="I'm n<b>o</b>t 
                    <br/>afraid of <br/>e<b>X</b>ploring 
                    <br/>cre<b>a</b>tive soluti<b>o</b>ns "
                    containerClass="mt-5 text-black dark:text-white text-center"
                />
            </div>
        </div>
    );
};

export default About;