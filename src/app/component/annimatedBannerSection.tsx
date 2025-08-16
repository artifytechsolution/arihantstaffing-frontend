"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SimpleBannerSection = ({ title, description }) => {
  const backgroundRef = useRef();
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const badgeRef = useRef();

  // Background cursor shade effect
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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.2 });
      
      // Badge entrance
      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: -30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "bounce.out" }
      );
      
      // Title entrance
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, 
        "-=0.5"
      );
      
      // Description entrance
      tl.fromTo(descRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
        "-=0.3"
      );
      
      // Buttons entrance with stagger
      tl.fromTo([buttonRef1.current, buttonRef2.current], 
        { opacity: 0, y: 40, scale: 0.8 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "elastic.out(1, 0.5)" 
        }, 
        "-=0.2"
      );

      // Continuous floating animation for buttons
      gsap.to(buttonRef1.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(buttonRef2.current, {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      // Glowing animation
      gsap.to(buttonRef1.current, {
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(buttonRef2.current, {
        boxShadow: "0 0 30px rgba(168, 85, 247, 0.8)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });

    });

    return () => ctx.revert();
  }, []);

  // Button hover animations
  useEffect(() => {
    const button1 = buttonRef1.current;
    const button2 = buttonRef2.current;

    const handleMouseEnter1 = () => {
      gsap.to(button1, {
        scale: 1.1,
        rotate: 5,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave1 = () => {
      gsap.to(button1, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter2 = () => {
      gsap.to(button2, {
        scale: 1.1,
        rotate: -5,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave2 = () => {
      gsap.to(button2, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    if (button1) {
      button1.addEventListener('mouseenter', handleMouseEnter1);
      button1.addEventListener('mouseleave', handleMouseLeave1);
    }

    if (button2) {
      button2.addEventListener('mouseenter', handleMouseEnter2);
      button2.addEventListener('mouseleave', handleMouseLeave2);
    }

    return () => {
      if (button1) {
        button1.removeEventListener('mouseenter', handleMouseEnter1);
        button1.removeEventListener('mouseleave', handleMouseLeave1);
      }
      if (button2) {
        button2.removeEventListener('mouseenter', handleMouseEnter2);
        button2.removeEventListener('mouseleave', handleMouseLeave2);
      }
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      style={{
        background: `
          radial-gradient(circle 800px at var(--bg-x, 25%) var(--bg-y, 25%), 
          rgba(139, 69, 193, 0.12) 0%, 
          rgba(94, 58, 197, 0.08) 30%, 
          rgba(44, 102, 255, 0.05) 60%, 
          transparent 75%), 
          radial-gradient(circle at 25% 25%, #0a1e4d 10%, #000000 90%)
        `,
        transition: "background 0.25s ease-out",
      }}
    >
      {/* Badge Row */}
      <div ref={badgeRef} className="badge-row flex flex-col sm:flex-row items-center gap-3 mb-8">
        <span className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-bold shadow-lg">
          2025
        </span>
        <button className="bg-blue-950/70 backdrop-blur-md text-neutral-100 rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-900/70 transition-all duration-300 hover:scale-105 shadow-md border border-blue-700/30">
          Explore Portfolio
        </button>
      </div>

      {/* Title */}
      <h1 
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-5 leading-tight text-white drop-shadow-2xl"
      >
        {title || "We are working on this page"}
      </h1>

      {/* Description */}
      <p 
        ref={descRef}
        className="desc text-blue-200 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed whitespace-pre-line"
      >
        {description || "We are working on this page.\nThis page is coming soon..."}
      </p>

      {/* Animated CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          ref={buttonRef1}
          className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 text-white text-base sm:text-lg font-bold rounded-xl py-3 px-6 sm:px-8 shadow-xl transition-all transform-gpu"
        >
          <span className="relative z-10">Build Your Product</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <button 
          ref={buttonRef2}
          className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-700 text-white text-base sm:text-lg font-bold rounded-xl py-3 px-6 sm:px-8 shadow-xl transition-all transform-gpu"
        >
          <span className="relative z-10">Contact Us</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Additional animated elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-ping" style={{ animationDelay: '1s' }}></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SimpleBannerSection;


//last backup

// "use client";
// import React, { useRef, useEffect } from "react";

// const SimpleBannerSection = () => {
//   const backgroundRef = useRef();

//   // Background cursor shade effect
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!backgroundRef.current) return;
//       const x = e.clientX;
//       const y = e.clientY;
//       backgroundRef.current.style.setProperty("--bg-x", `${x}px`);
//       backgroundRef.current.style.setProperty("--bg-y", `${y}px`);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       ref={backgroundRef}
//       className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
//       style={{
//         background: `
//           radial-gradient(circle 800px at var(--bg-x, 25%) var(--bg-y, 25%), 
//           rgba(139, 69, 193, 0.12) 0%, 
//           rgba(94, 58, 197, 0.08) 30%, 
//           rgba(44, 102, 255, 0.05) 60%, 
//           transparent 75%), 
//           radial-gradient(circle at 25% 25%, #0a1e4d 10%, #000000 90%)
//         `,
//         transition: "background 0.25s ease-out"
//       }}
//     >
//       <div className="badge-row flex flex-col sm:flex-row items-center gap-3 mb-8">
//         <span className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-bold">
//           2025
//         </span>
//         <button className="bg-blue-950/70 backdrop-blur-md text-neutral-100 rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-900/70 transition-colors">
//           Explore Portfolio
//         </button>
//       </div>

//       <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-5 leading-tight text-white drop-shadow-lg">
//         We are working on this page <br />
//         <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-400 tracking-tight">
//           Coming Soon
//         </span>
//       </h1>

//       <p className="desc text-blue-200 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
//         We are working on this page<br />
//         This page is coming soon.....
//       </p>

//       <button className="cta-btn bg-gradient-to-r from-blue-500 to-blue-700 text-white text-base sm:text-lg font-semibold rounded-md py-3 px-6 sm:px-8 shadow-lg hover:scale-105 transition-all transform">
//         Build Your Product
//       </button>

//       {/* Decorative elements */}
//       <div className="absolute top-10 left-10 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
//     </div>
//   );
// };

// export default SimpleBannerSection;