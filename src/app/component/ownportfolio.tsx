"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React JS", icon: "⚛️", level: 95 },
  { name: "Node JS", icon: "⏭️", level: 92 },
  { name: "Management", icon: "📊", level: 88 },
  { name: "CRM Development", icon: "🛠️", level: 90 },
  { name: "Cloud Services", icon: "☁️", level: 89 },
  { name: "AI Integration", icon: "🤖", level: 85 },
];

const achievements = [
  { number: "150+", label: "Projects Completed" },
  { number: "50+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "99%", label: "Success Rate" },
];

export default function OwnerPortfolioSection({ name = "Keval Khetani" }) {
  const [activeSkill, setActiveSkill] = useState(0);
  const backgroundRef = useRef();
  const cardRef = useRef();
  const skillRefs = useRef([]);
  const profileRef = useRef();
  const headerRef = useRef();
  const achievementRefs = useRef([]);

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

  // Card hover effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const onMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--card-x", `${x}px`);
      cardRef.current.style.setProperty("--card-y", `${y}px`);
    };
    
    const onLeave = () => {
      cardRef.current.style.setProperty("--card-x", "-200px");
      cardRef.current.style.setProperty("--card-y", "-200px");
    };
    
    cardRef.current.addEventListener("mousemove", onMove);
    cardRef.current.addEventListener("mouseleave", onLeave);
    
    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", onMove);
        cardRef.current.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Profile animation
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, scale: 0.8, rotation: -10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          delay: 0.6,
        }
      );

      // Skills staggered animation
      gsap.fromTo(
        skillRefs.current,
        { opacity: 0, x: -30, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.8,
        }
      );

      // Achievements animation
      gsap.fromTo(
        achievementRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.2,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Auto-rotate skills
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 1000px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.15) 0%, 
            rgba(94, 58, 197, 0.10) 25%, 
            rgba(44, 102, 255, 0.08) 50%, 
            transparent 70%), 
            radial-gradient(circle at 25% 25%, rgba(139, 69, 193, 0.08), transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(44, 102, 255, 0.06), transparent 70%),
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      {/* Portfolio card styles */}
      <style>{`
        .portfolio-spotlight-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .portfolio-spotlight-card::before {
          content: "";
          pointer-events: none;
          position: absolute;
          left: var(--card-x, -200px);
          top: var(--card-y, -200px);
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139,69,193,0.25) 0%, rgba(44,102,255,0.15) 50%, rgba(0,0,0,0) 80%);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
          z-index: 1;
          border-radius: 3rem;
        }
        .portfolio-spotlight-card:hover::before {
          opacity: 1;
        }
        .portfolio-spotlight-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 40px 100px rgba(139, 69, 193, 0.3);
          border-color: rgba(139, 69, 193, 0.6);
        }
        .skill-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .skill-card:hover {
          transform: translateY(-5px) scale(1.05);
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.3), rgba(44, 102, 255, 0.2));
        }
        .skill-card.active {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.4), rgba(44, 102, 255, 0.3));
          border-color: rgba(139, 69, 193, 0.6);
          transform: scale(1.05);
        }
        .achievement-card {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.2), rgba(44, 102, 255, 0.15));
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .achievement-card:hover {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.3), rgba(44, 102, 255, 0.25));
          transform: translateY(-5px);
        }
        .animated-avatar {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .glow-effect {
          box-shadow: 0 0 30px rgba(139, 69, 193, 0.5), 0 0 60px rgba(44, 102, 255, 0.3);
        }
      `}</style>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-violet-900/30 px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-full text-violet-200 font-semibold tracking-wider mb-4 sm:mb-6 backdrop-blur-sm border border-violet-700/30 glow-effect">
            ✨ Meet The Founder
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Driving Innovation in <span className="text-violet-300 font-extrabold">Technology</span>
          </h2>
          <p className="text-blue-200/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Leading Artify Tech with passion for cutting-edge solutions and exceptional client experiences.
          </p>
        </div>

        {/* Main Portfolio Card */}
        <div
          ref={cardRef}
          className="portfolio-spotlight-card border rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 shadow-2xl"
          style={{
            background: "linear-gradient(125deg, rgba(10,20,36,0.8) 15%, rgba(25,38,66,0.6) 50%, rgba(45,28,82,0.5) 84%, rgba(139,69,193,0.3) 100%)",
            border: "2px solid rgba(44,122,255,0.3)",
          }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Profile Section */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div
                ref={profileRef}
                className="animated-avatar w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 mb-6 flex items-center justify-center border-4 border-violet-500/30 shadow-2xl relative overflow-hidden glow-effect"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-blue-400/20 animate-pulse"></div>
                {/* Professional animated emoji */}
                <span className="text-5xl sm:text-6xl relative z-10" role="img" aria-label="Developer">👨‍💻</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{name}</h3>
              <p className="text-violet-200 font-semibold mb-2">CEO & Founder</p>
              <p className="text-blue-300 text-sm font-medium mb-4">Artify Tech Solutions</p>
              <p className="text-blue-200/80 text-sm sm:text-base leading-relaxed max-w-sm">
                Passionate full-stack developer and tech entrepreneur with 5+ years of experience building innovative digital solutions and leading successful IT projects.
              </p>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
                <button className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 hover:from-violet-500 hover:to-blue-500 transition-all hover:scale-105 shadow-lg">
                  📞 Book a Call
                </button>
                <button className="flex-1 bg-transparent border-2 border-violet-500/50 text-violet-200 rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-violet-900/20 hover:border-violet-400 transition-all hover:scale-105 backdrop-blur-sm">
                  ✉️ Get in Touch
                </button>
              </div>
            </div>

            {/* Skills & Experience Section */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">Expert Skills & Technologies</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill, idx) => (
                    <div
                      key={skill.name}
                      ref={el => (skillRefs.current[idx] = el)}
                      onClick={() => setActiveSkill(idx)}
                      className={`skill-card bg-violet-900/20 backdrop-blur-md border border-violet-700/30 rounded-xl p-4 flex flex-col items-center gap-3 ${
                        activeSkill === idx ? 'active' : ''
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl">{skill.icon}</div>
                      <span className="text-white font-semibold text-sm sm:text-base text-center">{skill.name}</span>
                      <div className="w-full bg-blue-900/30 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className="text-violet-300 text-xs font-medium">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
            

              {/* Vision Statement */}
              <div className="p-6 bg-gradient-to-r from-violet-900/20 to-blue-900/20 rounded-xl border border-violet-700/30 backdrop-blur-sm">
                <h5 className="text-lg font-bold text-white mb-3">Our Vision</h5>
                <p className="text-blue-200/80 text-sm sm:text-base leading-relaxed">
                  "To democratize technology and empower businesses of all sizes with innovative digital solutions that drive growth, efficiency, and success in the modern world."
                </p>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}

//last backup

// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import {
//   PersonOutline,
//   PhoneOutlined,
//   EmailOutlined,
//   SportsBasketballOutlined,
//   DataObjectOutlined,
//   DiamondOutlined,
//   DesignServicesOutlined,
//   BrushOutlined,
// } from "@mui/icons-material";

// gsap.registerPlugin(ScrollTrigger);

// const skills = [
//   { name: "Figma", Icon: DesignServicesOutlined },
//   { name: "Framer", Icon: DataObjectOutlined },
//   { name: "Behance", Icon: BrushOutlined },
//   { name: "Dribbble", Icon: SportsBasketballOutlined },
//   { name: "Sketch", Icon: DiamondOutlined },
//   { name: "Adobe XD", Icon: DesignServicesOutlined },
// ];

// export default function CombinedBanner({ name = "Cris Rayaan" }) {
//   const [activeTag, setActiveTag] = useState("Art Directions");
//   const cardRef = useRef(null);
//   const skillRefs = useRef([]);
//   const profileRef = useRef(null);
//   const buttonRefs = useRef([]);
//   const headerRef = useRef(null);
//   const subHeaderRef = useRef(null);

//   useEffect(() => {
//     // Initialize Lenis for smooth scrolling
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smooth: true,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     // GSAP animations
//     const ctx = gsap.context(() => {
//       // Header animation
//       gsap.fromTo(
//         headerRef.current,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out",
//         }
//       );

//       // Subheader animation
//       gsap.fromTo(
//         subHeaderRef.current,
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out",
//           delay: 0.2,
//         }
//       );

//       // Card entrance on scroll
//       gsap.from(cardRef.current, {
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: cardRef.current,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       // Profile image animation on scroll
//       gsap.from(profileRef.current, {
//         opacity: 0,
//         scale: 0.8,
//         duration: 0.8,
//         ease: "back.out(1.4)",
//         scrollTrigger: {
//           trigger: profileRef.current,
//           start: "top 85%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       // Skills animation on scroll
//       gsap.from(skillRefs.current, {
//         opacity: 0,
//         y: 20,
//         scale: 0.8,
//         stagger: 0.1,
//         duration: 0.5,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: skillRefs.current[0],
//           start: "top 85%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       // Buttons animation on scroll
//       gsap.from(buttonRefs.current, {
//         opacity: 0,
//         x: -20,
//         stagger: 0.15,
//         duration: 0.5,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: buttonRefs.current[0],
//           start: "top 90%",
//           toggleActions: "play none none reverse",
//         },
//       });
//     }, cardRef);

//     return () => {
//       ctx.revert();
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <>
     
//       <div className="bg-gradient-to-b from-black to-blue-950/50 min-h-screen  items-center justify-center p-4">
//        <div className="mb-8 text-center">
//         <span
//           ref={headerRef}
//           className="inline-block text-sm font-medium py-1 px-4 rounded-full bg-violet-900/30 text-violet-200 uppercase tracking-wide mb-4 backdrop-blur"
//         >
//           Features
//         </span>
//         <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//           Why Choose Us<br className="hidden md:block" /> for Success?
//         </h2>
//         <p
//           ref={subHeaderRef}
//           className="text-base md:text-lg text-gray-300 tracking-wide max-w-2xl mx-auto"
//         >
//           Discover how SocialLift empowers your brand.
//         </p>
//       </div>
//       <div className="flex justify-center">
//         <div
//           ref={cardRef}
//           className="bg-black/15 backdrop-blur-2xl border items-center border-blue-600/30 rounded-2xl p-8 flex flex-col lg:flex-row items-center max-w-5xl w-full gap-8"
//         >
//           {/* Profile and Buttons */}
//           <div className="flex flex-col items-center text-center lg:w-[320px] flex-shrink-0">
//             <div
//               ref={profileRef}
//               className="w-28 h-28 rounded-full bg-gradient-to-br from-black to-blue-950/30 mb-5 flex items-center justify-center border-2 border-blue-700/40 shadow-lg"
//             >
//               <PersonOutline className="text-blue-400 text-5xl" />
//             </div>
//             <h2 className="text-3xl font-bold text-white">{name}</h2>
//             <p className="text-slate-300 mt-2 leading-relaxed text-sm max-w-xs">
//               A Passionate Full Stack Developer & Product Designer with global experience.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xs">
//               <button
//                 ref={(el) => (buttonRefs.current[0] = el)}
//                 className="flex-1 bg-blue-600 text-white rounded-lg px-3 py-2 text-sm font-semibold flex items-center justify-center gap-1"
//               >
//                 <PhoneOutlined fontSize="inherit" /> BOOK A CALL
//               </button>
//               <button
//                 ref={(el) => (buttonRefs.current[1] = el)}
//                 className="flex-1 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg px-3 py-2 text-sm font-semibold flex items-center justify-center gap-1"
//               >
//                 <EmailOutlined fontSize="inherit" /> GET IN TOUCH
//               </button>
//             </div>
//           </div>

//           {/* Divider on large screens */}
//           <div className="hidden lg:block w-px bg-blue-500/20 mx-6" />

//           {/* Skills and Details */}
//           <div className="flex-1 flex flex-col justify-between h-full w-full">
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-4">
//                 My Expert Area
//               </h3>
//               <div className="grid grid-cols-3 gap-3 mb-4">
//                 {skills.map(({ name: skill, Icon }, idx) => (
//                   <div
//                     key={skill}
//                     ref={(el) => (skillRefs.current[idx] = el)}
//                     className="bg-black/20 backdrop-blur-md border border-blue-600/30 rounded-lg p-3 flex flex-col items-center justify-center gap-2 aspect-square"
//                   >
//                     <Icon className="text-slate-400 h-6 w-6" />
//                     <span className="text-slate-300 text-xs font-medium text-center">
//                       {skill}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <p className="text-slate-400 leading-relaxed text-sm">
//                 As a product designer, I specialize in creating magical visual identities for digital products. I believe a stunning design starts with common values and respect for your audience.
//               </p>
//             </div>
//             <div className="flex items-center gap-6 mt-4 border-t border-slate-700/80 pt-4">
//               {["Brand Positioning", "Art Directions"].map((tag) => (
//                 <button
//                   key={tag}
//                   onClick={() => setActiveTag(tag)}
//                   className="flex items-center gap-2 text-xs font-medium"
//                 >
//                   <span
//                     className={`h-2 w-2 rounded-full ${
//                       activeTag === tag ? "bg-blue-500" : "bg-slate-600"
//                     }`}
//                   />
//                   <span
//                     className={`${
//                       activeTag === tag ? "text-blue-400" : "text-slate-400"
//                     }`}
//                   >
//                     {tag}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>
//     </>
//   );
// }
