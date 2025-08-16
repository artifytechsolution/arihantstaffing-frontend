"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack e-commerce solution with AI-powered recommendations and real-time analytics.",
    technologies: ["React", "Node.js", "MongoDB", "AI/ML"],
    image: "🛒",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    category: "Mobile Development",
    description: "Cross-platform health monitoring app with IoT integration and telemedicine features.",
    technologies: ["React Native", "Python", "IoT", "Cloud"],
    image: "🏥",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "AI Chatbot System",
    category: "AI/ML",
    description: "Intelligent customer service bot with natural language processing and automated workflows.",
    technologies: ["Python", "TensorFlow", "NLP", "AWS"],
    image: "🤖",
    color: "from-purple-500 to-violet-500"
  },
  {
    id: 4,
    title: "Financial Dashboard",
    category: "Web Development",
    description: "Real-time financial analytics platform with advanced data visualization and reporting.",
    technologies: ["React", "D3.js", "PostgreSQL", "Docker"],
    image: "📊",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Logistics Tracking App",
    category: "Mobile Development",
    description: "GPS-enabled logistics management system with route optimization and fleet tracking.",
    technologies: ["Flutter", "Firebase", "GPS", "Maps API"],
    image: "🚚",
    color: "from-teal-500 to-blue-500"
  },
  {
    id: 6,
    title: "Smart Home System",
    category: "IoT",
    description: "IoT-based home automation with voice control and energy management features.",
    technologies: ["IoT", "Raspberry Pi", "Node.js", "React"],
    image: "🏠",
    color: "from-indigo-500 to-purple-500"
  }
];

const categories = ["All", "Web Development", "Mobile Development", "AI/ML", "IoT"];

const PortfolioDualGallerySection = () => {
  const backgroundRef = useRef();
  const cardsRef = useRef([]);
  const headerRef = useRef();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  // Background cursor shade effect - CONSISTENT WITH OTHER COMPONENTS
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!backgroundRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      backgroundRef.current.style.setProperty("--bg-x", `${x}px`);
      backgroundRef.current.style.setProperty("--bg-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Header animation
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  // Cards animation
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, [filteredItems]);

  // Filter portfolio items
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  // Card hover effects - CONSISTENT WITH OTHER COMPONENTS
  useEffect(() => {
    const listeners = [];
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--card-x", `${x}px`);
        card.style.setProperty("--card-y", `${y}px`);
      };
      const onLeave = () => {
        card.style.setProperty("--card-x", "-200px");
        card.style.setProperty("--card-y", "-200px");
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      listeners.push({ card, onMove, onLeave });
    });
    return () => {
      listeners.forEach(({ card, onMove, onLeave }) => {
        if (card) {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        }
      });
    };
  }, [filteredItems]);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Background cursor shade effect - SAME AS OTHER COMPONENTS */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 900px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.12) 0%, 
            rgba(94, 58, 197, 0.08) 30%, 
            rgba(44, 102, 255, 0.05) 60%, 
            transparent 75%), 
            radial-gradient(circle at 25% 25%, rgba(139, 69, 193, 0.08), transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(44, 102, 255, 0.06), transparent 70%),
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      {/* Portfolio card styles - ENHANCED */}
      <style>{`
        .portfolio-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .portfolio-card::before {
          content: "";
          pointer-events: none;
          position: absolute;
          left: var(--card-x, -200px);
          top: var(--card-y, -200px);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(139,69,193,0.2) 0%, rgba(44,102,255,0.12) 50%, rgba(0,0,0,0) 80%);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
          z-index: 1;
          border-radius: 2rem;
        }
        .portfolio-card:hover::before {
          opacity: 1;
        }
        .portfolio-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 30px 80px rgba(139, 69, 193, 0.3);
          border-color: rgba(139, 69, 193, 0.5);
        }
        .tech-tag {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.2), rgba(44, 102, 255, 0.15));
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .tech-tag:hover {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.3), rgba(44, 102, 255, 0.25));
          transform: scale(1.05);
        }
        .filter-btn {
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.3), rgba(44, 102, 255, 0.2));
          border-color: rgba(139, 69, 193, 0.5);
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <div className="badge-row flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <span className="bg-violet-700 text-white rounded-lg px-4 py-2 text-sm sm:text-base font-bold shadow-lg">
              2025
            </span>
            <button className="bg-violet-950/70 backdrop-blur-md text-white rounded-lg px-6 py-2 text-sm sm:text-base font-medium hover:bg-violet-900/70 transition-all hover:scale-105 shadow-lg border border-violet-700/30">
              Featured Projects
            </button>
          </div>

          

          <p className="text-blue-200/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Discover our latest projects showcasing cutting-edge technology,<br />
            innovative solutions, and exceptional user experiences.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`filter-btn px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold border transition-all hover:scale-105 ${
                  activeCategory === category
                    ? 'active text-white border-violet-500/50'
                    : 'text-blue-200 border-blue-700/30 hover:bg-blue-900/20 hover:border-blue-600/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              ref={el => (cardsRef.current[idx] = el)}
              className="portfolio-card border rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-pointer shadow-xl min-h-[320px] sm:min-h-[380px]"
              style={{
                background: "linear-gradient(125deg, rgba(10,20,36,0.65) 15%, rgba(25,38,66,0.45) 50%, rgba(45,28,82,0.35) 84%, rgba(44,102,255,0.25) 100%)",
                border: "1.5px solid rgba(44,122,255,0.2)",
              }}
            >
              {/* Content with proper z-index */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Project Icon & Category */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl bg-gradient-to-r ${item.color} shadow-lg`}>
                    {item.image}
                  </div>
                  <span className="bg-violet-900/30 px-3 py-1 rounded-full text-xs sm:text-sm text-violet-200 font-semibold backdrop-blur-sm border border-violet-700/30">
                    {item.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                  {item.title}
                </h3>

                {/* Project Description */}
                <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {item.description}
                </p>

                {/* Technologies Used */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {item.technologies.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="tech-tag px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white border border-violet-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button className={`w-full py-3 sm:py-4 bg-gradient-to-r ${item.color} text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg text-sm sm:text-base`}>
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
      
      </div>

      {/* Decorative Background Elements - CONSISTENT WITH OTHER COMPONENTS */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PortfolioDualGallerySection;


//last backup

// "use client";

// import React, { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const galleries = [
//   {
//     year: "2021",
//     title: "NovaNet Solutions",
//     image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80",
//     features: [
//       "Bespoke API Design",
//       "Adaptive Layouts",
//       "Cloud Integrations",
//       "Caching Layers",
//       "SaaS Ready",
//       "DevOps Tools",
//       "Analytics Pipeline",
//     ],
//     tags: ["SaaS", "APIs", "Cloud", "CI/CD", "React"],
//   },
//   {
//     year: "2021",
//     title: "NovaNet Solutions",
//     image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80",
//     features: [
//       "Bespoke API Design",
//       "Adaptive Layouts",
//       "Cloud Integrations",
//       "Caching Layers",
//       "SaaS Ready",
//       "DevOps Tools",
//       "Analytics Pipeline",
//     ],
//     tags: ["SaaS", "APIs", "Cloud", "CI/CD", "React"],
//   },
//   // ... other gallery items ...
// ];

// export default function PortfolioDualGallerySection() {
//   const sectionRefs = useRef([]);
//   const infoRefs = useRef([]);
//   const imageRefs = useRef([]);
//   const featureListRefs = useRef([]);

//   useLayoutEffect(() => {
//     galleries.forEach((_, idx) => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRefs.current[idx],
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//       });
//       tl.from(sectionRefs.current[idx], {
//         scale: 0.96,
//         opacity: 0,
//         y: 60,
//         duration: 1.15,
//         ease: "power3.out",
//       })
//         .from(
//           imageRefs.current[idx],
//           {
//             scale: 1.13,
//             opacity: 0,
//             filter: "blur(12px)",
//             duration: 1,
//             ease: "expo.out",
//           },
//           "-=0.85"
//         )
//         .from(
//           infoRefs.current[idx],
//           {
//             x: -50,
//             opacity: 0,
//             duration: 1,
//             ease: "power3.out",
//           },
//           "-=0.95"
//         )
//         .from(
//           featureListRefs.current[idx].querySelectorAll(".feature-item"),
//           {
//             y: 26,
//             opacity: 0,
//             duration: 0.45,
//             stagger: 0.11,
//             ease: "power2.out",
//           },
//           "-=0.7"
//         );
//     });
//   }, []);

//   return (
//     <div
//       className="w-full min-h-screen py-16 px-4 sm:px-8 lg:px-16 space-y-24 flex flex-col items-center"
//       style={{
//         background:
//           "black",
//       }}
//     >
//       <h2 className="text-center mb-10 font-bold text-3xl sm:text-4xl text-indigo-200">
//         Highlighted Projects &amp; Solutions
//       </h2>
//       {galleries.map((gallery, idx) => (
//         <section
//           key={idx}
//           ref={el => (sectionRefs.current[idx] = el)}
//           className="max-w-6xl w-full mx-auto rounded-3xl shadow-[0_10px_38px_rgba(45,64,120,0.3)]
//             flex flex-col md:flex-row overflow-hidden group transition-transform bg-transparent"
//         >
//           {/* Info Panel */}
//           <div
//             ref={el => (infoRefs.current[idx] = el)}
//             className="md:w-1/2 w-full flex flex-col justify-between p-8
//               bg-blue-900/50 backdrop-blur-xl"
//             style={{
//               background:
//                 "linear-gradient(120deg, rgba(34, 52, 107, 0.48), rgba(25, 29, 48, 0.41))",
//               borderRight: "1px solid rgba(30,64,175,0.15)",
//             }}
//           >
//             <div>
//               <span className="inline-block text-xs uppercase tracking-wide bg-gradient-to-r from-blue-700 to-indigo-600 px-4 py-1 rounded font-bold mb-2 text-white shadow">
//                 {gallery.year}
//               </span>
//               <h2 className="text-3xl sm:text-4xl font-bold mt-3 tracking-tight text-blue-100 drop-shadow">
//                 {gallery.title}
//               </h2>
//               <ul
//                 className="mt-6 space-y-3"
//                 ref={el => (featureListRefs.current[idx] = el)}
//               >
//                 {gallery.features.map(feat => (
//                   <li
//                     key={feat}
//                     className="feature-item flex items-center text-base text-blue-200 font-semibold"
//                   >
//                     <svg
//                       className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     {feat}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-8 flex flex-wrap gap-3">
//               {gallery.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="px-4 py-1 text-xs font-semibold text-indigo-100 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full tracking-wide shadow-sm"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//           {/* Project Image fills the div, object-cover */}
//           <div className="md:w-1/2 w-full flex items-stretch justify-center p-0 bg-transparent">
//             <div className="w-full h-[340px] md:h-[440px]">
//               <img
//                 ref={el => (imageRefs.current[idx] = el)}
//                 src={gallery.image}
//                 alt={gallery.title + " visuals"}
//                 className="rounded-xl shadow-2xl object-cover w-full h-full border border-blue-900 transition-transform duration-300 group-hover:scale-105"
//                 style={{ background: "#181a22" }}
//               />
//             </div>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }

