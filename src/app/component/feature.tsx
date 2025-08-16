"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger)
  gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg className="w-10 h-10 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Custom Development",
    desc: "Bespoke software solutions tailored to your unique business requirements, built with modern technologies and best practices.",
  },
  {
    icon: (
      <svg className="w-10 h-10 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Scalable Architecture",
    desc: "Future-proof applications designed to grow with your business, ensuring optimal performance at any scale.",
  },
  {
    icon: (
      <svg className="w-10 h-10 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Quality Assurance",
    desc: "Rigorous testing and code reviews ensure bug-free, secure, and high-performance applications every time.",
  },
  {
    icon: (
      <svg className="w-10 h-10 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "AI Integration",
    desc: "Leverage cutting-edge AI and machine learning capabilities to automate processes and gain intelligent insights.",
  },
  {
    icon: (
      <svg className="w-10 h-10 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M4.93 4.93l1.41 1.41m8.48 8.48l1.41 1.41M17 12h1M7 12H6m5-5V6m0 12v-1"/>
      </svg>
    ),
    title: "DevOps Excellence",
    desc: "Seamless deployment pipelines, automated testing, and cloud infrastructure management for maximum efficiency.",
  },
  {
    icon: (
      <svg className="w-10 h-10 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 2"/>
      </svg>
    ),
    title: "24/7 Support",
    desc: "Dedicated technical support and maintenance to ensure your applications run smoothly around the clock.",
  },
];

const WhyChooseUsSection = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();
  const backgroundRef = useRef(); // For cursor background effect

  useEffect(() => {
    gsap.fromTo(
      headerRef.current, 
      { opacity: 0, y: 38 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      subRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, delay: 0.12, duration: 0.8, ease: "power2.out" }
    );
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.14 * i,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 89%" },
        }
      );
    });
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, delay: 0.12 * features.length, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // Card spotlight effect - PRESERVED
  useEffect(() => {
    const listeners = [];
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mc-x", `${x}px`);
        card.style.setProperty("--mc-y", `${y}px`);
      };
      const onLeave = () => {
        card.style.setProperty("--mc-x", `-200px`);
        card.style.setProperty("--mc-y", `-200px`);
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
    <section className="relative w-full min-h-screen flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 700px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.15) 0%, 
            rgba(94, 58, 197, 0.08) 30%, 
            rgba(44, 102, 255, 0.05) 60%, 
            transparent 80%), 
            linear-gradient(to bottom, black, #111827, black)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      {/* Inline style for card radial cursor effect - PRESERVED */}
      <style>{`
        .why-spotlight-card {
          position: relative;
          overflow: hidden;
        }
        .why-spotlight-card::before {
          content: "";
          pointer-events: none;
          position: absolute;
          left: var(--mc-x, -200px);
          top: var(--mc-y, -200px);
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(139,69,193,0.18) 0%, rgba(44,102,255,0.12) 50%, rgba(0,0,0,0) 80%);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.25s ease;
          z-index: 2;
        }
        .why-spotlight-card:hover::before {
          opacity: 1;
        }
      `}</style>
     
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-center">
        <div className="mb-12 sm:mb-16 text-center">
          <span
            ref={headerRef}
            className="inline-block text-xs sm:text-sm font-medium py-2 px-5 rounded-full bg-violet-900/30 text-violet-200 uppercase tracking-wider mb-6 backdrop-blur-sm border border-violet-700/30"
          >
            Why Choose Artify Tech
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Excellence in Every
            <br className="hidden sm:block" />
            <span className="text-violet-300">Line of Code</span>
          </h2>
          <p
            ref={subRef}
            className="text-base sm:text-lg md:text-xl text-gray-300 tracking-wide max-w-3xl mx-auto leading-relaxed"
          >
            Discover why leading businesses trust us with their digital transformation and software development needs.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-12 mb-12 sm:mb-16">
          {features.map((feature, i) => (
            <div
              ref={el => (cardsRef.current[i] = el)}
              key={feature.title}
              className={
                "why-spotlight-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 py-8 sm:py-10 flex flex-col items-center text-center " +
                "border border-blue-700/40 bg-gradient-to-br from-gray-900/60 via-blue-950/30 to-violet-950/20 " +
                "backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-violet-500/50 " +
                "shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 min-h-[280px] sm:min-h-[320px]"
              }
            >
              <div className="relative z-10 flex items-center justify-center mb-4 p-4 rounded-full bg-violet-900/20 backdrop-blur-sm border border-violet-700/30">
                {feature.icon}
              </div>
              <div className="relative z-10 text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                {feature.title}
              </div>
              <p className="relative z-10 text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* <button
            ref={btnRef}
            className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:from-violet-500 hover:to-blue-500 focus:outline-none transform"
          >
            Start Your Project
          </button> */}
          <Link href={'/contact'} className="px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold bg-transparent border-2 border-violet-500/50 text-violet-200 hover:bg-violet-900/20 hover:border-violet-400 transition-all hover:scale-105 backdrop-blur-sm">
          contact us
          </Link>
        </div>
      </div>

      {/* Static decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default WhyChooseUsSection;

//last backup

// "use client";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger)
//   gsap.registerPlugin(ScrollTrigger);

// const features = [
//   {
//     icon: (
//       <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
//         <path d="M17 3V7.5A2.5 2.5 0 0 1 14.5 10H7" />
//         <path d="M17 3l-12 4.5V11.5c0 4.28 2.2 8.21 6 10.5 3.8-2.29 6-6.22 6-10.5V3z" />
//         <circle cx="9" cy="10" r="1" />
//       </svg>
//     ),
//     title: "Creation",
//     desc: "Tailored posts that resonate with your audience, boosting engagement and brand loyalty.",
//   },
//   {
//     icon: (
//       <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
//         <rect x="3" y="7" width="18" height="13" rx="2" />
//         <path d="M8 7V5a4 4 0 0 1 8 0v2" />
//       </svg>
//     ),
//     title: "Management",
//     desc: "Seamless management of all your social media accounts, ensuring consistent and effective communication.",
//   },
//   {
//     icon: (
//       <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="10" />
//         <path d="M8 12h4l2-3" />
//       </svg>
//     ),
//     title: "Advertising",
//     desc: "Strategic ad placements that reach your ideal audience, driving traffic and conversions.",
//   },
//   {
//     icon: (
//       <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
//         <path d="M4 19v-7M4 12l8-8 8 8M12 14v7" />
//       </svg>
//     ),
//     title: "Analytics",
//     desc: "Detailed reports that offer insights into your social media performance, helping you refine your strategy.",
//   },
//   {
//     icon: (
//       <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
//         <path d="M6.5 6.5A7 7 0 0 1 19 19" />
//         <path d="M6 13v3" />
//         <circle cx="12" cy="12" r="4" />
//       </svg>
//     ),
//     title: "Engagement",
//     desc: "Active engagement with your followers, building a strong and supportive community around your brand.",
//   },
//   {
//     icon: (
//       <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="9" />
//         <path d="M12 8v4l3 2" />
//       </svg>
//     ),
//     title: "Consulting",
//     desc: "Expert advice on how to position your brand for success in the digital landscape.",
//   },
// ];

// const WhyChooseUsSection = () => {
//   const cardsRef = useRef([]);
//   const headerRef = useRef();
//   const subRef = useRef();
//   const btnRef = useRef();

//   useEffect(() => {
//     gsap.fromTo(
//       headerRef.current, { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
//     );
//     gsap.fromTo(
//       subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.12, duration: 0.8, ease: "power2.out" }
//     );
//     cardsRef.current.forEach((el, i) => {
//       gsap.fromTo(
//         el,
//         { opacity: 0, y: 36 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.85,
//           delay: 0.14 * i,
//           ease: "power2.out",
//           scrollTrigger: { trigger: el, start: "top 89%" },
//         }
//       );
//     });
//     gsap.fromTo(
//       btnRef.current,
//       { opacity: 0, y: 18, scale: 0.96 },
//       { opacity: 1, y: 0, scale: 1, delay: 0.12 * features.length, duration: 0.6, ease: "power2.out" }
//     );
//   }, []);

//   // Spotlight radial glow (persists while hovered)
//   useEffect(() => {
//     const listeners = [];
//     cardsRef.current.forEach((card, idx) => {
//       if (!card) return;
//       const onMove = (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         card.style.setProperty("--mc-x", `${x}px`);
//         card.style.setProperty("--mc-y", `${y}px`);
//       };
//       const onLeave = () => {
//         card.style.setProperty("--mc-x", `-200px`);
//         card.style.setProperty("--mc-y", `-200px`);
//       };
//       card.addEventListener("mousemove", onMove);
//       card.addEventListener("mouseleave", onLeave);
//       listeners.push({ card, onMove, onLeave });
//     });
//     return () => {
//       listeners.forEach(({ card, onMove, onLeave }) => {
//         if (card) {
//           card.removeEventListener("mousemove", onMove);
//           card.removeEventListener("mouseleave", onLeave);
//         }
//       });
//     };
//   }, []);

//   return (
//     <section className="relative w-full min-h-[680px] flex flex-col items-center py-24 px-3 bg-black">
//       {/* Inline style for radial effect on cards */}
//       <style>{`
//         .why-spotlight-card {
//           position: relative;
//           overflow: hidden;
//         }
//         .why-spotlight-card::before {
//           content: "";
//           pointer-events: none;
//           position: absolute;
//           left: var(--mc-x, -200px);
//           top: var(--mc-y, -200px);
//           width: 220px;
//           height: 220px;
//           background: radial-gradient(circle, rgba(113,100,255,0.13) 0%, rgba(0,0,0,0) 80%);
//           opacity: 0;
//           transform: translate(-50%, -50%);
//           transition: opacity 0.20s;
//           z-index: 2;
//         }
//         .why-spotlight-card:hover::before {
//           opacity: 1;
//         }
//       `}</style>
     
//       <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center">
//         <div className="mb-8 text-center">
//           <span
//             ref={headerRef}
//             className="inline-block text-sm font-medium py-1 px-4 rounded-full bg-violet-900/30 text-violet-200 uppercase tracking-wide mb-4 backdrop-blur"
//           >
//             Features
//           </span>
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//             Why Choose Us<br className="hidden md:block" />
//             for Success?
//           </h2>
//           <p
//             ref={subRef}
//             className="text-base md:text-lg text-gray-300 tracking-wide max-w-2xl mx-auto"
//           >
//             Discover how SocialLift empowers your brand.
//           </p>
//         </div>
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mt-10 mb-12">
//           {features.map((feature, i) => (
//             <div
//               ref={el => (cardsRef.current[i] = el)}
//               key={feature.title}
//               className={
//                 "why-spotlight-card rounded-2xl p-8 py-9 flex flex-col items-center text-center " +
//                 "border border-[#233c6c] bg-gradient-to-br from-[#080924] via-[#10121a] to-[#181c2e] " +
//                 "transition-all duration-300 cursor-pointer min-h-[220px]"
//               }
//             >
//               <div className="flex items-center justify-center mb-1">
//                 {feature.icon}
//               </div>
//               <div className="text-lg font-semibold text-white mb-2">
//                 {feature.title}
//               </div>
//               <p className="text-gray-400 text-[15px]">
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//         <button
//           ref={btnRef}
//           className="px-7 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-violet-900/80 to-indigo-900/80 text-violet-100 shadow transition hover:scale-105 hover:text-white"
//         >
//           Schedule a Call
//         </button>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUsSection;

