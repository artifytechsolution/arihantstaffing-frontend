'use client';
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

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const waveRef = useRef();
  const textRef = useRef();
  const ctaRef = useRef();
  const headerRef = useRef();

  // 1. Lenis Smooth Scroll (no animationFrame loop duplicates)
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

  // 2. Only minimal hero animation (fade-in for headline, button)
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

  // 3. Very lightweight section fade-ins (no blur or y movement)
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

    // Optional: minimal header drop-in (no shadowing)
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // No box-shadow/blur/extra transforms for performance!

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
        <stop offset="0%" stopColor="#0a1124" /> {/* near black/blue */}
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
   <Header/>
    {/* HERO */}
    <div className="flex flex-1 flex-col-reverse md:flex-row w-full animated-section">
      <section className="flex-1 flex flex-col justify-center items-start px-6 md:px-24 py-8">
        <h1
          ref={textRef}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow"
        >
          Unlock <span className="text-violet-300 font-extrabold">Creativity</span>.<br />
          Build <span className="text-blue-200 font-extrabold">Futures</span>.
        </h1>
        <p className="text-base md:text-xl text-blue-100/80 mb-8 max-w-xl">
          We are a digital agency shaping immersive 3D brand stories.<br />
          <span className="text-blue-200 font-semibold">Design</span>. <span className="text-violet-100 font-semibold">Experience</span>. <span className="text-blue-100 font-semibold">Motion</span>.
        </p>
        <button
          ref={ctaRef}
          className="px-8 py-3 rounded-full text-lg font-semibold
            bg-gradient-to-r from-[#461985] via-[#4f46e5] to-[#1e40af]
            text-white shadow-md transition hover:from-[#6d28d9] hover:to-[#272390]"
        >
          Start Your Project
        </button>
      </section>
      {/* 3D Spline Example (or replace with hero img) */}
      <section className="flex-1 relative flex items-center justify-center p-2 md:p-0 min-h-[60vh]">
        <div className="w-[180%] md:w-[220%] h-[90vh] flex items-center justify-center z-30 -ml-[30%] md:-ml-[50%]">
          <Spline scene="https://prod.spline.design/CqY9wMF33yBpdxZ8/scene.splinecode" />
        </div>
      </section>
    </div>
    {/* ...other sections */}
  </div>
</main>

        <div className="animated-section"><StaffingAgencyBlack /></div>
          <div className="animated-section"><WhyChooseUsSection /></div>
          <div className="animated-section"><QAAccordionCleanExample /></div>
          <div className="animated-section"><Footer /></div>
               {/* Mobile footer */}
          <footer className="md:hidden flex justify-center gap-4 pb-4 text-[#b3b3b3] text-sm">
            
            <span>|</span>
            <span>+91 89000 12345</span>
          </footer>

    </div>
  );
};

export default HomePage;
