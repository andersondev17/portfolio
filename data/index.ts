
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
        title: "E-commerce Platform",
        role: "Lead Frontend Developer",
        des: "A modern e-commerce platform offering customizable product options. Designed for scalability and intuitive user interactions.",
        img: "/img/projects/p2.png",
        images: [
            "/img/projects/p2/p2.png",          // Homepage
            "/img/projects/p2/p2-product.webp", // Vista producto
            "/img/projects/p2/p2-cart.webp",    // Carrito
            "/img/projects/p2/p2-checkout.webp"   // Versión móvil
        ],
        features: [
            "Custom product configuration system",
            "Cart synchronization with React Context API",
            "Mobile-responsive design and lazy loading for products",
            "Scalable architecture for product management"
        ],
        iconLists: [
            "nodejs.svg",
            "/re.svg",
            "/tail.svg",
            "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg",
            "/laravel-2.svg"
        ],
        link: "https://sanguches.com.co/",
        github: "https://github.com/andersondev17/sanguches-master-final",
        highlights: [
            "40% improvement in user engagement",
            "99% uptime since launch",
            "5-star customer satisfaction rating"
        ],
        duration: "3 months"
    },
    {
        id: 2,
        title: "AMMAE",
        role: "Full Stack Developer",
        des: "AMMAE is a MERN Stack eCommerce platform designed for advanced product management and optimized user experience, integrating a custom CMS",
        img: "/img/projects/p3.png",
        images: [
            "/img/projects/p3/p3.png",          // Homepage
            "/img/projects/p3/p3-product.webp", // Vista producto
            "/img/projects/p3/p3-cart.webp",    // Carrito
            "/img/projects/p3/p3-dashboard.webp"   // Versión móvil
        ],
        features: [
            "Custom CMS for product management for Real-time inventory tracking and updates",
            "RESTful API integration",
            "User authentication with AuthJS",
            "Export data to CSV for Real-time inventory updates"
        ],
        iconLists: [
            "mongo-icon.svg",
            "/ex.svg",
            "/re.svg",
            "next.svg",
            "/ts.svg",
            "/tail.svg",

        ],
        link: "https://ammae-front.vercel.app/",
        github: "https://github.com/andersondev17/AMMAE",
        highlights: [
            "Reduced loading time by 60%",
            "Implemented responsive design",
            "Enhanced security features"
        ]
    },

    {
        id: 6,
        title: " Fitness App With APIs from RapidAPI",
        role: "Full Stack Developer",
        des: " Discover over 1300+ exercises tailored to your goals., browse more than one thousand exercises with practical videos from youtube",
        img: "/img/projects/p6/p6.png",
        images: [
            "/img/projects/p6/p6.webp",
            "/img/projects/p6/p6-product.png",
            "/img/projects/p6/p6-dashboard.webp"
        ],
        features: [
            "React Best Practices such as file structure and hooks",
            "Fast performance and smooth navigation",
            "Fetching data from unlimited sources using a local API REST and RapidAPI"
        ],
        iconLists: [
            "mongo-icon.svg",
            "/ex.svg",
            "next.svg",
            "/re.svg",
            "/ts.svg",
            "/tail.svg"
        ],
        link: "https://github.com/andersondev17/gymshock",
        github: "https://github.com/andersondev17/gymshock",
        highlights: [
            "Increased user engagement by 35%",
            "Reduced form completion time",
            "Enhanced data visualization"
        ]
    }
    ,
        ,
    {
        id: 8,
        title: "FULL STACK LIBRARY SYSTEM",
        role: "Full Stack Developer",
        des: "Developed a web application for a library system, integrating APIs for real-time data insights.",
        img: "/img/projects/p9/p9.webp",
        images: [
            "/img/projects/p9/p9.webp",
            "/img/projects/p9/p9-dashboard.webp"
        ],
        features: [
            "Rate limiting and caching using Arcjet",
            "AuthJS for secure user authentication",
            "Prisma ORM with graphQL for efficient data management",
        ],
        iconLists: [
            "mongo-icon.svg",
            "/ex.svg",
            "next.svg",
            "/re.svg",
            "/ts.svg",
            "/tail.svg"
        ],
        link: "https://sistema-biblioteca-omega.vercel.app/",
        github: "https://github.com/andersondev17/sistema-biblioteca",
        highlights: [
            "Increased user engagement by 35%",
            "Reduced form completion time",
            "Enhanced data visualization"
        ]
    },
    {
        id: 3,
        title: " Landing page",
        role: "Frontend Developer",
        des: "Project landing page built with Next.js, Tailwind CSS, and GSAP.",
        img: "/img/projects/p8.webp",
        images: [
            "/img/projects/p8/p8.webp",
            "/img/projects/p8/p8-product.webp",
        ],
        features: [
            "Intuitive brand registration workflow",
            "Real-time validation with Zod",
            "Performance optimization"
        ],
        iconLists: [
            "next.svg",
            "/ts.svg",
            "/re.svg",
            "/tail.svg"
        ],
        link: "https://starinsurance-gamma.vercel.app/",
        github: "https://github.com/andersondev17/StarLigth-Ins.-Group",
        highlights: [
            "95+ Lighthouse performance score",
            "Accessible design implementation",
            "Optimized database queries"
        ]
    },
    {
        id: 4,
        title: "🎯 Brand Registration System",
        role: "Frontend Developer",
        des: "A modern brand registration management system built with Next.js 15, providing a comprehensive CRUD interface with an emphasis on user experience and performance optimization.",
        img: "/img/projects/p4.png",
        features: [
            "Intuitive brand registration workflow",
            "Real-time validation with Zod",
            "Advanced search and filtering",
            "Performance optimization"
        ],
        iconLists: [
            "next.svg",
            "/ts.svg",
            "/re.svg",
            "/tail.svg"
        ],
        link: "https://brand-registry.vercel.app/",
        github: "https://github.com/andersondev17/brand-registry",
        highlights: [
            "95+ Lighthouse performance score",
            "Accessible design implementation",
            "Optimized database queries"
        ]
    }
    ,
    {
        id: 5,
        title: " Arelo – Modern & Minimalist Landing Page",
        role: "Frontend Developer",
        des: "Arelo is a modern landing page that provides an intuitive experience for potential buyers and investors.",
        img: "/img/projects/p5/p5.png",
        images: [
            "/img/projects/p5/p5.png",
            "/img/projects/p5/p5-product.webp"
        ],
        features: [
            "Elegant design with a focus on usability",
            "Fast performance and smooth navigation",
            "Built with Next.js, Tailwind CSS, and GSAP",
            "Responsive and fully optimized for all devices"
        ],
        iconLists: [
            "next.svg",
            "/re.svg",
            "/tail.svg",
            "/ts.svg",


        ],
        link: "https://arelo.vercel.app/",
        github: "https://github.com/andersondev17/arelo",
        highlights: [
            "Increased user engagement by 35%",
            "Reduced form completion time",
            "Enhanced data visualization"
        ]
    }
    ,
    {
        id: 7,
        title: "Interactive Solar Project Map",
        role: "Full Stack Developer",
        des: "Developed a web application to visualize solar energy projects on an interactive map, integrating APIs for real-time data insights.",
        img: "/img/projects/p7.png",
        features: [
            "Price and radiation heatmaps – Get insights on solar potential",
            "Search by coordinates and statistics – Locate and analyze projects easily",
            "Geospatial data visualization & project management – Intuitive and interactive UI"
        ],
        iconLists: [
            "nuxt.svg",
            "/vue.svg",
            "/tail.svg",
            "ts.svg"
        ],
        link: "https://github.com/andersondev17/interactive-map",
        github: "https://github.com/andersondev17/interactive-map",
        highlights: [
            "Increased user engagement by 35%",
            "Reduced form completion time",
            "Enhanced data visualization"
        ]
    }

];

export const testimonials = [
    {
        quote:
            "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    }
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

