"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (
  typeof window !== "undefined" &&
  gsap &&
  !gsap.core.globals().ScrollTrigger
) {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    label: "Web Development",
    title: "Modern Web Applications",
    desc: "Full-stack development with React, Next.js, and Node.js. We create scalable, performant web applications with cutting-edge technology.",
    tags: ["React/Next.js", "Full-Stack"],
    highlight: false,
  },
  {
    label: "Mobile Development", 
    title: "Cross-Platform Mobile Apps",
    desc: "Native and hybrid mobile applications using React Native and Flutter. Beautiful, responsive apps for iOS and Android platforms.",
    tags: ["React Native", "Flutter", "Cross-Platform"],
    highlight: false,
  },
  {
    label: "UI/UX Design",
    title: "Digital Experience Design", 
    desc: "User-centered design with modern aesthetics and seamless interactions. From wireframes to interactive prototypes and design systems.",
    tags: ["Figma Design", "Prototyping"],
    highlight: false,
  },
  {
    label: "DevOps & Cloud",
    title: "Deployment & Infrastructure",
    desc: "Cloud deployment, CI/CD pipelines, and scalable infrastructure management. AWS, Docker, and automated deployment solutions.",
    tags: ["AWS Cloud", "CI/CD Automation"],
    highlight: false,
  },
  {
    label: "Digital Marketing",
    title: "Growth-Driven Marketing Solutions",
    desc: "SEO optimization, PPC campaigns, content marketing, and social media management to boost your brand visibility and conversions.",
    tags: ["SEO/PPC", "Content Marketing", "Analytics"],
    highlight: true,
  },
  {
    label: "AI & ML Automation",
    title: "Intelligent Process Automation",
    desc: "Leverage cutting-edge AI and Machine Learning to automate workflows, gain predictive insights, and transform business efficiency.",
    tags: ["AI/ML", "Process Automation", "Smart Analytics"],
    highlight: true,
  },
];

const StaffingAgencyMixedGlass = () => {
  const animPanels = useRef([]);
  const animTags = useRef([]);
  const animHeader = useRef();
  const backgroundRef = useRef(); // For cursor background effect

  useEffect(() => {
    gsap.fromTo(
      animHeader.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
    );
    
    animPanels.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 38 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.13 * i,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
      
      const scaleUp = () => {
        gsap.to(el, {
          scale: 1.05,
          boxShadow: "0 20px 60px 0 rgba(46,80,170,0.3)",
          background:
            "linear-gradient(125deg, rgba(10,20,40,0.75) 15%, rgba(28,45,82,0.78) 60%, rgba(44,102,255,0.4) 100%)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      
      const scaleDown = () => {
        gsap.to(el, {
          scale: 1,
          boxShadow: "0 12px 40px 0 rgba(25,40,70,0.2)",
          background:
            "linear-gradient(125deg, rgba(10,20,36,0.65) 15%, rgba(25,38,66,0.45) 84%, rgba(44,102,255,0.25) 100%)",
          duration: 0.25,
          ease: "power2.in",
        });
      };
      
      el.addEventListener("mouseenter", scaleUp);
      el.addEventListener("mouseleave", scaleDown);
    });
    
    animTags.current.forEach((tag, i) => {
      if (!tag) return;
      gsap.fromTo(
        tag,
        { opacity: 0, x: 18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.59,
          delay: 0.07 * i,
          ease: "power2.out",
          scrollTrigger: { trigger: tag, start: "top 96%" },
        }
      );
    });
  }, []);

  // Background cursor shade effect - NEW
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 800px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.12) 0%, 
            rgba(94, 58, 197, 0.06) 30%, 
            rgba(44, 102, 255, 0.04) 60%, 
            transparent 80%), 
            radial-gradient(circle at 25% 25%, rgba(139, 69, 193, 0.1), transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(44, 102, 255, 0.08), transparent 70%),
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      {/* Header */}
      <div
        ref={animHeader}
        className="w-full max-w-6xl mx-auto text-center mb-12 sm:mb-16 relative z-10"
      >
        <span className="inline-block bg-blue-900/30 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full text-blue-200 font-semibold tracking-wider backdrop-blur-sm font-mono border border-blue-700/30">
          Our Services
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100 mt-4 sm:mt-6 mb-3 sm:mb-4 leading-tight font-extrabold tracking-tight">
          Artify Tech Solutions
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-200 mb-4 sm:mb-6">
          Software Development, <span className="text-violet-300">**AI Automation**</span> & Digital Marketing Excellence
        </h3>
        <p className="text-blue-200/90 text-base sm:text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
          End-to-end digital solutions—development, intelligent automation, and growth marketing—beautifully crafted and always cutting-edge.
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 z-10 relative">
        {services.map((s, idx) => (
          <div
            key={s.title}
            ref={el => (animPanels.current[idx] = el)}
            className={`
              rounded-2xl sm:rounded-3xl
              border backdrop-blur-[8px]
              px-6 sm:px-8 py-8 sm:py-10 lg:py-12 flex flex-col gap-4 sm:gap-5
              transition-all duration-300
              will-change-transform
              group cursor-pointer
              ${s.highlight ? 'border-violet-500/60 shadow-[0_15px_50px_rgba(139,69,193,0.25)]' : 'border-blue-700/40 shadow-[0_12px_40px_rgba(40,76,160,0.2)]'}
            `}
            style={{
              background: s.highlight 
                ? "linear-gradient(125deg, rgba(20,10,40,0.7) 15%, rgba(45,28,82,0.5) 84%, rgba(139,69,193,0.3) 100%)"
                : "linear-gradient(125deg, rgba(10,20,36,0.65) 15%, rgba(25,38,66,0.45) 84%, rgba(44,102,255,0.25) 100%)",
              boxShadow: s.highlight 
                ? "0 12px 40px 0 rgba(139,69,193,0.25)"
                : "0 12px 40px 0 rgba(40,76,160,0.2)",
              border: s.highlight 
                ? "1.5px solid rgba(139,69,193,0.4)"
                : "1.5px solid rgba(44,122,255,0.18)",
              minHeight: "320px",
            }}
          >
            <span className={`
              text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl 
              px-3 sm:px-4 py-1.5 sm:py-2 mb-2 w-max backdrop-blur font-mono 
              border shadow-sm
              ${s.highlight 
                ? 'bg-violet-900/30 text-violet-100 border-violet-700/40' 
                : 'bg-blue-900/25 text-blue-100 border-blue-700/30'
              }
            `}>
              {s.label}
            </span>
            
            <h3 className={`
              text-xl sm:text-2xl font-bold font-sans leading-tight drop-shadow
              ${s.highlight ? 'text-violet-50' : 'text-blue-50'}
            `}>
              {s.title}
            </h3>
            
            <p className={`
              font-normal text-sm sm:text-base leading-relaxed flex-grow
              ${s.highlight ? 'text-violet-100/90' : 'text-blue-100/90'}
            `}>
              {s.desc}
            </p>
            
            <div className="flex gap-2 sm:gap-3 flex-wrap mt-2 pb-2">
              {s.tags.map((tag, i) => (
                <span
                  key={tag}
                  ref={el => (animTags.current[idx * 4 + i] = el)}
                  className={`
                    px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold 
                    border backdrop-blur font-mono transition-colors
                    ${s.highlight 
                      ? 'bg-violet-900/25 text-violet-100 border-violet-700/25 hover:bg-violet-800/40' 
                      : 'bg-blue-900/20 text-blue-100 border-blue-700/20 hover:bg-blue-800/30'
                    }
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <button
              className={`
                mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold 
                text-xs sm:text-sm border shadow-lg transition-all focus:outline-none 
                font-mono transform hover:scale-105 self-start
                ${s.highlight 
                  ? 'bg-gradient-to-r from-violet-900 via-violet-700 to-purple-800 text-violet-100 border-violet-800/60 hover:from-violet-700 hover:to-purple-600 hover:text-white' 
                  : 'bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 text-blue-100 border-blue-800/50 hover:from-blue-700 hover:to-blue-500 hover:text-white'
                }
              `}
            >
              {s.highlight ? '🚀 Explore AI' : 'Learn More'} →
            </button>
          </div>
        ))}
      </div>

     

      {/* Static decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default StaffingAgencyMixedGlass;

//lasyt backup

// "use client";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (
//   typeof window !== "undefined" &&
//   gsap &&
//   !gsap.core.globals().ScrollTrigger
// ) {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const services = [
//   {
//     label: "Talent Sourcing",
//     title: "Find the Right Candidates",
//     desc: "AI-backed search delivers pre-vetted candidates tailored to your company. Let us handle talent discovery while you drive success.",
//     tags: ["Pre-screened", "All Industries"],
//   },
//   {
//     label: "Onboarding & Compliance",
//     title: "Smooth Hiring, Fully Compliant",
//     desc: "Automated documentation, background checks, and onboarding for 100% paperless and worry-free hiring.",
//     tags: ["e-Signatures", "Quick Setup", "100% Secure"],
//   },
//   {
//     label: "Workforce Management",
//     title: "Seamless Staff Scheduling",
//     desc: "Smart scheduling, timesheets, and payroll tools—manage your workforce with clarity and confidence.",
//     tags: ["Shift Planning", "Payroll Integration"],
//   },
//   {
//     label: "Client Portal",
//     title: "Your Real-time Dashboard",
//     desc: "Track onboarding, manage requests, and connect with our team—all in one secure dashboard.",
//     tags: ["24/7 Support", "Custom Reports"],
//   },
// ];

// const StaffingAgencyMixedGlass = () => {
//   const animPanels = useRef([]);
//   const animTags = useRef([]);
//   const animHeader = useRef();

//   useEffect(() => {
//     gsap.fromTo(
//       animHeader.current,
//       { opacity: 0, y: 45 },
//       { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
//     );
//     animPanels.current.forEach((el, i) => {
//       if (!el) return;
//       gsap.fromTo(
//         el,
//         { opacity: 0, y: 38 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           delay: 0.13 * i,
//           ease: "power2.out",
//           scrollTrigger: { trigger: el, start: "top 90%" },
//         }
//       );
//       const scaleUp = () => {
//         gsap.to(el, {
//           scale: 1.045,
//           boxShadow: "0 12px 48px 0 rgba(46,80,170,0.22)",
//           background:
//             // More intense blue-black gradient
//             "linear-gradient(125deg, rgba(10,20,40,0.68) 15%, rgba(28,45,82,0.72) 60%, rgba(44,102,255,0.32) 100%)",
//           duration: 0.27,
//           ease: "power2.out",
//         });
//       };
//       const scaleDown = () => {
//         gsap.to(el, {
//           scale: 1,
//           boxShadow: "0 8px 32px 0 rgba(25,40,70,0.13)",
//           background:
//             // Subtle mixed black/blue gradient
//             "linear-gradient(125deg, rgba(10,20,36,0.56) 15%, rgba(25,38,66,0.38) 84%, rgba(44,102,255,0.21) 100%)",
//           duration: 0.18,
//           ease: "power2.in",
//         });
//       };
//       el.addEventListener("mouseenter", scaleUp);
//       el.addEventListener("mouseleave", scaleDown);
//     });
//     animTags.current.forEach((tag, i) => {
//       if (!tag) return;
//       gsap.fromTo(
//         tag,
//         { opacity: 0, x: 18 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 0.59,
//           delay: 0.07 * i,
//           ease: "power2.out",
//           scrollTrigger: { trigger: tag, start: "top 96%" },
//         }
//       );
//     });
//   }, []);

//   return (
//     <div
//       className="min-h-screen w-full flex flex-col items-center py-16 px-2"
//       style={{ background: "#000" }} // Pure black page background
//     >
//       {/* Header */}
//       <div
//         ref={animHeader}
//         className="w-full max-w-3xl mx-auto text-center mb-10"
//       >
//         <span className="inline-block bg-blue-900/30 px-4 py-1 text-xs rounded-full text-blue-200 font-semibold tracking-wider backdrop-blur-sm font-mono">
//           Our Solutions
//         </span>
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-100 mt-4 mb-2 leading-tight font-extrabold tracking-tight">
//           Black & Blue Glass Staffing: Elite Candidates, Effortless Hiring
//         </h2>
//         <p className="text-blue-200/80 text-lg md:text-xl font-medium">
//           End-to-end workforce solutions—searching, onboarding, and management—beautifully easy and always transparent.
//         </p>
//       </div>
//       {/* Service Cards */}
//       <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-10 z-10 relative">
//         {services.map((s, idx) => (
//           <div
//             key={s.title}
//             ref={el => (animPanels.current[idx] = el)}
//             className={`
//               rounded-2xl
//               border border-blue-700/40
//               shadow-[0_8px_32px_rgba(40,76,160,0.14)]
//               px-7 md:px-8 py-10 flex flex-col gap-3
//               backdrop-blur-[6px]
//               transition-all duration-200
//               will-change-transform
//               group
//             `}
//             style={{
//               // Blended glass: black + blue
//               background:
//                 "linear-gradient(125deg, rgba(10,20,36,0.56) 15%, rgba(25,38,66,0.38) 84%, rgba(44,102,255,0.21) 100%)",
//               boxShadow: "0 8px 32px 0 rgba(40,76,160,0.14)",
//               border: "1.5px solid rgba(44,122,255,0.14)",
//             }}
//           >
//             <span className="bg-blue-900/25 text-blue-100 text-xs font-semibold rounded px-3 py-1 mb-2 w-max backdrop-blur font-mono border border-blue-700/30 shadow-sm">
//               {s.label}
//             </span>
//             <h3 className="text-blue-50 text-xl font-bold font-sans">{s.title}</h3>
//             <p className="text-blue-100/90 font-normal">{s.desc}</p>
//             <div className="flex gap-2 flex-wrap mt-1 pb-1">
//               {s.tags.map((tag, i) => (
//                 <span
//                   key={tag}
//                   ref={el => (animTags.current[idx * 4 + i] = el)}
//                   className="bg-blue-900/20 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold border border-blue-700/20 backdrop-blur font-mono"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//             <button
//               className="mt-4 px-8 py-2 rounded-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 text-blue-100 font-bold text-sm border border-blue-800/50 shadow-md transition-all hover:from-blue-700 hover:to-blue-500 hover:text-white focus:outline-none font-mono"
//             >
//               View
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StaffingAgencyMixedGlass;
