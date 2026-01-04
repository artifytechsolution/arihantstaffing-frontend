"use client";
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

// Your business sections/components
import StaffingAgencyBlack from '../component/mainservice'; 
import WhyChooseUsSection from '../component/feature';
import QAAccordionCleanExample from '../component/QA';
import Footer from '../component/Fotter'; 
import Header from '../component/Header'; 
import StaffingAgencyMixedGlass from '../sample1/page';
import AnimatedCTASection from '../component/ctasection';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const waveRef = useRef();
  const textRef = useRef();
  const ctaRef = useRef();
  const headerRef = useRef();
  const backgroundRef = useRef(); // For cursor background effect

  // 1. Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.1 });
    let isMounted = true;
    
    function raf(time) {
      if (!isMounted) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      isMounted = false;
      lenis.destroy();
    };
  }, []);

  // 2. Hero animations
  useLayoutEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: "power3.out", duration: 1 }
    );
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, delay: 0.3, ease: "power3.out", duration: 0.8 }
    );
  }, []);

  // 3. Section animations
  useLayoutEffect(() => {
    gsap.utils.toArray('.animated-section').forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 89%",
            once: true,
          },
        }
      );
    });

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // 4. Background cursor effect
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
    <div>
     <main className="relative min-h-screen w-screen overflow-x-hidden bg-black/95">
      {/* SVG Blue/Black Flexible Animated Wave Background */}
      <svg
        ref={waveRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        style={{ minHeight: "100vh" }}
      >
        <defs>
          <linearGradient id="bgwave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1124" />
            <stop offset="70%" stopColor="#1a1543" />
            <stop offset="100%" stopColor="#27186c" />
          </linearGradient>
        </defs>
        <path
          fill="url(#bgwave)"
          fillOpacity="0.89"
          d="M0,240 Q360,400 720,240 T1440,240 L1440,800 L0,800Z"
        />
      </svg>

      {/* GLASSY Overlay: blends black and blue */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, rgba(11,10,23,0.92) 0%, rgba(40,22,80,0.84) 80%, rgba(16,29,70,0.90) 100%)",
          backdropFilter: "blur(1.5px)"
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col min-h-screen w-full">
        {/* HEADER */}
        <div ref={headerRef}>
          <Header />
        </div>

        {/* HERO SECTION */}
        <div className="flex flex-1 flex-col-reverse lg:flex-row w-full relative overflow-hidden">
          {/* Background cursor shade effect */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle 900px at var(--bg-x, 50%) var(--bg-y, 50%), 
                rgba(139, 69, 193, 0.18) 0%, 
                rgba(94, 58, 197, 0.12) 25%, 
                rgba(44, 102, 255, 0.08) 50%, 
                transparent 70%), 
                radial-gradient(circle at 20% 30%, rgba(139, 69, 193, 0.1), transparent 60%),
                radial-gradient(circle at 80% 70%, rgba(44, 102, 255, 0.08), transparent 60%),
                linear-gradient(90deg, #000000 0%, #0a1e4d 100%)
              `,
              transition: "background 0.25s ease-out",
              zIndex: 1,
            }}
          />

          {/* Text Section - Full width on mobile, half on desktop */}
          <section className="w-full lg:flex-1 flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 lg:py-8 relative z-10 min-h-[50vh] lg:min-h-auto">
            <h1
              ref={textRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl"
            >
              Empower 123 <span className="text-violet-300 font-extrabold drop-shadow-lg">Innovation</span>.<br />
              Build <span className="text-blue-200 font-extrabold drop-shadow-lg">Scalable Software</span>.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100/90 mb-6 sm:mb-8 max-w-full lg:max-w-xl leading-relaxed">
              We craft reliable, high-performance applications that accelerate business growth.
            </p>
            
            {/* CTA Buttons - Show on mobile when Spline is hidden */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto lg:hidden">
              <Link href={"/contact"} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-lg hover:from-violet-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Get Started →
              </Link>
              <Link href={"/contact"} className="px-6 sm:px-8 py-3 sm:py-4 border border-violet-400/50 text-violet-200 font-semibold rounded-lg hover:bg-violet-900/20 transition-all duration-300 text-sm sm:text-base">
                View Portfolio
              </Link>
            </div>
          </section>

          {/* 3D Spline Section - Hidden on mobile and tablets, shown only on large screens */}
          <section className="hidden lg:flex lg:flex-1 relative items-center justify-center p-0 min-h-[60vh] z-10">
            <div className="w-[180%] xl:w-[220%] h-[90vh] flex items-center justify-center z-30 -ml-[30%] xl:-ml-[50%]">
              <Spline scene="https://prod.spline.design/CqY9wMF33yBpdxZ8/scene.splinecode" />
            </div>
          </section>

          {/* Alternative Content for Mobile/Tablet - Decorative illustration */}
         
          {/* Static decorative elements - Responsive sizing */}
          <div className="hidden xl:block absolute top-1/4 left-4 lg:left-10 w-64 lg:w-96 h-64 lg:h-96 bg-violet-500/5 rounded-full blur-3xl z-0"></div>
          <div className="hidden xl:block absolute bottom-1/4 right-4 lg:right-10 w-56 lg:w-80 h-56 lg:h-80 bg-blue-500/8 rounded-full blur-3xl z-0"></div>
          
          {/* Mobile decorative elements */}
          <div className="block xl:hidden absolute top-1/4 left-4 w-32 sm:w-48 h-32 sm:h-48 bg-violet-500/5 rounded-full blur-3xl z-0"></div>
          <div className="block xl:hidden absolute bottom-1/4 right-4 w-36 sm:w-56 h-36 sm:h-56 bg-blue-500/8 rounded-full blur-3xl z-0"></div>
        </div>
      </div>
    </main>

      {/* Other Sections */}
      <div className="animated-section">
        <StaffingAgencyMixedGlass />
      </div>
      
      <div className="animated-section">
        <WhyChooseUsSection />
      </div>
      
      <div className="animated-section">
        <QAAccordionCleanExample />
      </div>
       {/* CTA Section */}
   <AnimatedCTASection/>
      
      <div className="animated-section">
        <Footer />
      </div>

      {/* Mobile footer */}
      <footer className="md:hidden flex justify-center gap-4 pb-4 text-[#b3b3b3] text-sm">
        <span>|</span>
        <span>+91 89000 12345</span>
      </footer>
    </div>
  );
};

export default HomePage;

//lastbackup

// 'use client';
// import React, { useRef, useEffect, useLayoutEffect } from 'react';
// import Lenis from '@studio-freight/lenis';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Spline from '@splinetool/react-spline';

// // Your business sections/components
// import StaffingAgencyBlack from '../component/mainservice'; 
// import WhyChooseUsSection from '../component/feature';
// import QAAccordionCleanExample from '../component/QA';
// import Footer from '../component/Fotter'; 
// import Header from '../component/Header'; 
// import StaffingAgencyMixedGlass from '../sample1/page';

// gsap.registerPlugin(ScrollTrigger);

// const HomePage = () => {
//   const waveRef = useRef();
//   const textRef = useRef();
//   const ctaRef = useRef();
//   const headerRef = useRef();

//   // 1. Lenis Smooth Scroll (no animationFrame loop duplicates)
//   useEffect(() => {
//     const lenis = new Lenis({ smooth: true, lerp: 0.1 });
//     let isMounted = true;
//     function raf(time) {
//       if (!isMounted) return;
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//     lenis.on('scroll', ScrollTrigger.update);

//     return () => {
//       isMounted = false;
//       lenis.destroy();
//     };
//   }, []);

//   // 2. Only minimal hero animation (fade-in for headline, button)
//   useLayoutEffect(() => {
//     gsap.fromTo(
//       textRef.current,
//       { y: 40, opacity: 0 },
//       { y: 0, opacity: 1, ease: "power3.out", duration: 1 }
//     );
//     gsap.fromTo(
//       ctaRef.current,
//       { opacity: 0, scale: 0.96 },
//       { opacity: 1, scale: 1, delay: 0.3, ease: "power3.out", duration: 0.8 }
//     );
//   }, []);

//   // 3. Very lightweight section fade-ins (no blur or y movement)
//   useLayoutEffect(() => {
//     gsap.utils.toArray('.animated-section').forEach(el => {
//       gsap.fromTo(
//         el,
//         { opacity: 0 },
//         {
//           opacity: 1,
//           duration: 0.7,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: el,
//             start: "top 89%",
//             once: true,
//           },
//         }
//       );
//     });

//     // Optional: minimal header drop-in (no shadowing)
//     gsap.fromTo(
//       headerRef.current,
//       { opacity: 0, y: -20 },
//       { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
//     );
//   }, []);

//   // No box-shadow/blur/extra transforms for performance!

//   return (
//     <div>
//       <main className="relative min-h-screen w-screen overflow-x-hidden bg-black/95">
//   {/* SVG Blue/Black Flexible Animated Wave Background */}
//   <svg
//     ref={waveRef}
//     className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
//     viewBox="0 0 1440 800"
//     preserveAspectRatio="none"
//     style={{ minHeight: "100vh" }}
//   >
//     <defs>
//       <linearGradient id="bgwave" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stopColor="#0a1124" /> {/* near black/blue */}
//         <stop offset="70%" stopColor="#1a1543" />
//         <stop offset="100%" stopColor="#27186c" />
//       </linearGradient>
//     </defs>
//     <path
//       fill="url(#bgwave)"
//       fillOpacity="0.89"
//       d="M0,240 Q360,400 720,240 T1440,240 L1440,800 L0,800Z"
//     />
//   </svg>
//   {/* GLASSY Overlay: blends black and blue */}
//   <div
//     className="absolute inset-0 z-10 pointer-events-none"
//     style={{
//       background: "linear-gradient(120deg, rgba(11,10,23,0.92) 0%, rgba(40,22,80,0.84) 80%, rgba(16,29,70,0.90) 100%)",
//       backdropFilter: "blur(1.5px)"
//     }}
//     aria-hidden="true"
//   />
//   {/* Main Content */}
//   <div className="relative z-20 flex flex-col min-h-screen w-full">
//     {/* HEADER */}
//    <Header/>
//     {/* HERO */}
//     <div className="flex flex-1 flex-col-reverse md:flex-row w-full animated-section">
//       <section className="flex-1 flex flex-col justify-center items-start px-6 md:px-24 py-8">
//         <h1
//           ref={textRef}
//           className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow"
//         >
//           Unlock <span className="text-violet-300 font-extrabold">Creativity</span>.<br />
//           Build <span className="text-blue-200 font-extrabold">Futures</span>.
//         </h1>
//         <p className="text-base md:text-xl text-blue-100/80 mb-8 max-w-xl">
//           We are a digital agency shaping immersive 3D brand stories.<br />
//           <span className="text-blue-200 font-semibold">Design</span>. <span className="text-violet-100 font-semibold">Experience</span>. <span className="text-blue-100 font-semibold">Motion</span>.
//         </p>
//         <button
//           ref={ctaRef}
//           className="px-8 py-3 rounded-full text-lg font-semibold
//             bg-gradient-to-r from-[#461985] via-[#4f46e5] to-[#1e40af]
//             text-white shadow-md transition hover:from-[#6d28d9] hover:to-[#272390]"
//         >
//           Start Your Project
//         </button>
//       </section>
//       {/* 3D Spline Example (or replace with hero img) */}
//       <section className="flex-1 relative flex items-center justify-center p-2 md:p-0 min-h-[60vh]">
//         <div className="w-[180%] md:w-[220%] h-[90vh] flex items-center justify-center z-30 -ml-[30%] md:-ml-[50%]">
//           <Spline scene="https://prod.spline.design/CqY9wMF33yBpdxZ8/scene.splinecode" />
//         </div>
//       </section>
//     </div>
//     {/* ...other sections */}
//   </div>
// </main>

//         <div className="animated-section"><StaffingAgencyMixedGlass /></div>
//           <div className="animated-section"><WhyChooseUsSection /></div>
//           <div className="animated-section"><QAAccordionCleanExample /></div>
//           <div className="animated-section"><Footer /></div>
//                {/* Mobile footer */}
//           <footer className="md:hidden flex justify-center gap-4 pb-4 text-[#b3b3b3] text-sm">
            
//             <span>|</span>
//             <span>+91 89000 12345</span>
//           </footer>

//     </div>
//   );
// };

// export default HomePage;

