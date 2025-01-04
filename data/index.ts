
export const navItems = [
    
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },

];
const PHASES = [
    {
        id: 1,
        title: "Consistent from concept to launch",
        order: "Phase 1",
        description: "We'll collaborate to map your website's goal, target audience and key functionalities. We'll discuss things like site structure, navigation, and content requirements.",
        canvasProps: {
            animationSpeed: 5.1,
            containerClassName: "bg-emerald-900"
        }
    },
    {
        id: 2,
        title: "Development & Progress Update",
        order: "Phase 2",
        description: "Once we agree on the plan, I cue my lofi playlist and dive into coding. From initial sketches to polished code, I keep you updated every step of the way.",
        canvasProps: {
            animationSpeed: 3,
            containerClassName: "bg-black",
            colors: [
                [236, 72, 153],
                [232, 121, 249]
            ],
            dotSize: 2
        }
    },
    {
        id: 3,
        title: "Development & Launch",
        order: "Phase 3",
        description: "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up.",
        canvasProps: {
            animationSpeed: 3,
            containerClassName: "bg-sky-600",
            colors: [[125, 211, 252]]
        }
    }
];
export const featureItems = [
    {
        id: 1,
        title: "Consistent from concept to launch",
        description: "I prioritize strong client relationships through open communication and collaborative problem-solving.",
        className: "border-hsla bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2",
        src: "/b1.svg",
        isComingSoon: true
    },
    {
        id: 3,
        title: "Technical Expertise ",
        description: "Modern tech stack. I love crafting and I'm not afraid of exploring creative solutions using React, Next.js, TypeScript, and Tailwind CSS.",
        className: "bento-tilt_2",
        src: "/b2.svg",
        category: "approach"
    },
    {
        id: 3,
        title: "Let's Build Something Amazing",
        description: "Ready to transform your ideas into reality? Let's collaborate!",
        className: "bento-tilt_2",
        src: "/b2.svg",
        category: "approach"
    },
];

export const projects = [
    {
        id: 1,
        title: "E commerce platform",
        des: "Enjoy a seamless user experience as you select ingredients, customize toppings, and explore various bread options..",
        img: "/p2.png",
        iconLists: ["nodejs.svg", "/re.svg", "/tail.svg", "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg", "/laravel-2.svg"],
        link: "https://sanguches.com.co/",
    },
    {
        id: 2,
        title: "AMMAE",
        des: "MERN Shopping store and product management with custom CMS with API Rest using Mongoose.",
        img: "/p3.png",
        iconLists: ["next.svg", "/ts.svg", "/tail.svg", "mongo-icon.svg"],
        link: "https://github.com/andersondev17/AMMAE",
    },
    {
        id: 3,
        title: "🎯 Brand Registration System",
        des: "Brand registration management system built with Next.js 15. This application provides a complete CRUD interface for managing brand registrations with a sleek, user-friendly design.",
        img: "/p4.png",
        iconLists: ["next.svg", "/ts.svg", "/tail.svg"],
        link: "https://brand-registry.vercel.app/",

    },
    {
        id: 3,
        title: "Survey Master",
        des: "is a single-page web application designed to get appointed with a survey.",
        img: "/p1.png",
        iconLists: ["nodejs.svg", "/re.svg", "/tail.svg"],
        link: "https://spin-website-graphics-iucy-nara3wyvv-thegodfatherptes-projects.vercel.app/",
    },
];

export const testimonials = [
    {
        quote:
            "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    },
    {
        quote:
            "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    },
    {
        quote:
            "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    },
    {
        quote:
            "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    },
    {
        quote:
            "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    },
];

export const workExperience = [
    {
        id: 1,
        title: " Data Analyst ",
        desc: " Managed data entry and document management ensuring data integrity.Developed web-based platform using React.js enchancing interface design. Analyzed large data sets, performed database queries to maintain inventory integrity",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
    },
    {
        id: 2,
        title: "Software Developer",
        desc: "As a Frontend Developer, I specialize in creating scalable React applications optimized for performance and user engagement. By leveraging design patterns, clean architecture, and modern tools like Next.js, l've delivered high-impact solutions that drive results, such as improving user engagement by 40% and achieving near-perfect performance scores in Lighthouse.",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp2.svg",
    },
    {
        id: 3,
        title: "Freelance Dev Project",
        desc: "Led the dev of a E-commerce for a client, from initial concept to deployment. Reduce page load time while supporting multiple products. Implemented a custom CMS for easy content management. Conducted exhaustive testing on each feature, ensuring an optimal user experience.",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp3.svg",
    },

];

export const socialMedia = [
    {
        id: 1,
        img: "/git.svg",
        link: "https://github.com/andersondev17"
    },
    {
        id: 3,
        img: "/link.svg",
        link: "https://www.linkedin.com/in/andersonlopezmartinez/"
    },
];

