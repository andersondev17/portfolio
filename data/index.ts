
export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
];

export const gridItems = [
    {
        id: 1,
        title: "Client-Focused Development",
        description: "I prioritize strong client relationships through open communication and collaborative problem-solving.",
        className: "lg:col-span-2 row-span-1",
        imgClassName: "w-full h-full object-cover opacity-40",
        titleClassName: "justify-end",
        img: "/b1.svg",
        spareImg: "",
        category: "approach"
    },
    {
        id: 2,
        title: "Global Collaboration",
        description: "Working seamlessly across time zones with a commitment to clear communication and flexible scheduling.",
        className: "lg:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "",
        spareImg: "",
        category: "workflow",
        component: "globe" // Componente especial para el globo
    },
    {
        id: 3,
        title: "Technical Expertise",
        description: "Modern tech stack focused on delivering robust and scalable solutions",
        className: "lg:col-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        component: "tech-stack",
        technologies: {
            frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            backend: ["Node.js", "Express", "PostgreSQL"],
            tools: ["Git", "Docker", "AWS"]
        }
    },
    {
        id: 4,
        title: "Innovation Focus",
        description: "Passion for creating cutting-edge solutions with attention to detail and modern best practices.",
        className: "lg:col-span-1 row-span-1",
        img: "/grid.svg",
        category: "approach"
    },
    {
        id: 5,
        title: "Featured Project: Barber Management App",
        description: "Revolutionizing business management for barbers with smart scheduling and client management.",
        className: "lg:col-span-3",
        imgClassName: "right-0 bottom-0 w-full h-64 object-cover",
        img: "/b5.svg",
        category: "project",
        stats: {
            users: "500+",
            appointments: "10k+",
            satisfaction: "98%"
        }
    },
    {
        id: 6,
        title: "Let's Build Something Amazing",
        description: "Ready to transform your ideas into reality? Let's collaborate!",
        className: "lg:col-span-2",
        component: "contact",
        category: "cta"
    }
];

export const projects = [
    {
        id: 1,
        title: "Survey Master",
        des: "is a single-page web application designed to get appointed with a survey.",
        img: "/p1.png",
        iconLists: ["nodejs.svg","/re.svg", "/tail.svg"],
        link: "https://spin-website-graphics-iucy-nara3wyvv-thegodfatherptes-projects.vercel.app/",
    },
    {
        id: 2,
        title: "E commerce platform",
        des: "Enjoy a seamless user experience as you select ingredients, customize toppings, and explore various bread options..",
        img: "/p2.png",
        iconLists: ["nodejs.svg","/re.svg", "/tail.svg", "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg","/laravel-2.svg"],
        link: "https://github.com/andersondev17",
    },
    {
        id: 3,
        title: "AMMAE",
        des: "Discover our exclusive collection of women's fashion. Shop now and elevate your style.",
        img: "/p3.jpg",
        iconLists: ["nodejs.svg","/re.svg", "/tail.svg", "mongo-icon.svg"],
        link: "https://github.com/andersondev17",
    }
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
        desc: "As a freelance developer, I prioritize strong client relationships by working closely to understand their needs and align solutions with their business goals.",
        className: "md:col-span-2", // change to md:col-span-2
        thumbnail: "/exp2.svg",
    },
    {
        id: 3,
        title: "Freelance Dev Project",
        desc: "Led the dev of a E-commerce for a client, from initial concept to deployment.",
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