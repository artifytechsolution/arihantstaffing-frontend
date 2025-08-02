//solution of home page
'use client';
import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const HomePage = () => {
  // Hero references
  const waveRef = useRef();
  const textRef = useRef();
  const ctaRef = useRef();
  const servicesRef = useRef();
  const whyusRef = useRef();
  const headerRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, ease: "power3.out", duration: 1.4 }
    );
    gsap.fromTo(
      ctaRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, delay: 0.4, ease: "power3.out", duration: 1 }
    );
    ctaRef.current.addEventListener("mouseenter", () => {
      gsap.to(ctaRef.current, { scale: 1.05, duration: 0.3, ease: "elastic.out(1,0.6)" });
    });
    ctaRef.current.addEventListener("mouseleave", () => {
      gsap.to(ctaRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    });

    gsap.to(waveRef.current, {
      y: 40,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "power1.inOut",
    });
    gsap.to(waveRef.current, {
      y: "20%",
      scrollTrigger: {
        trigger: waveRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.to(headerRef.current, {
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      duration: 0.5,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        toggleActions: "play none none reverse",
      },
    });

    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (whyusRef.current) {
      gsap.fromTo(
        whyusRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whyusRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-[#0a0326]">
      {/* SVG Wave Background */}
      <svg
        ref={waveRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        style={{ minHeight: "100vh" }}
      >
        <defs>
          <linearGradient id="bgwave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28016e" />
            <stop offset="100%" stopColor="#0f024a" />
          </linearGradient>
        </defs>
        <path
          fill="url(#bgwave)"
          fillOpacity="0.85"
          d="M0,240 Q360,400 720,240 T1440,240 L1440,800 L0,800Z"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,240 Q360,400 720,240 T1440,240 L1440,800 L0,800Z;
              M0,220 Q360,420 720,260 T1440,230 L1440,800 L0,800Z;
              M0,240 Q360,400 720,240 T1440,240 L1440,800 L0,800Z"
          />
        </path>
      </svg>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#10023a]/85 to-[#0a0326]/90 z-10" aria-hidden="true"></div>

      <div className="relative z-20 flex flex-col min-h-screen w-full">
        {/* HEADER */}
        <header
          ref={headerRef}
          className="flex justify-between items-center px-6 md:px-14 py-6 text-white bg-transparent sticky top-0 z-40 backdrop-blur"
        >
          <div className="text-3xl font-extrabold tracking-wide text-[#8b5cf6]">
            YourAgency
          </div>
          <nav className="hidden md:flex gap-8 text-base font-medium text-[#d1d1d1]">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#portfolio" className="hover:text-white transition">Portfolio</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#whyus" className="hover:text-white transition">Why Us</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </nav>
          <div className="text-sm md:text-base text-[#b3b3b3] hidden md:block">
            contact@youragency.com
          </div>
        </header>

        {/* HERO SECTION */}
        <div className="flex flex-1 flex-col-reverse md:flex-row w-full">
          {/* LEFT: Text Content */}
          <section className="flex-1 flex flex-col justify-center items-start px-6 md:px-24 py-8">
            <h1
              ref={textRef}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
              style={{ textShadow: "0 10px 40px rgba(0,0,0,0.6)" }}
            >
              Unlock <span className="text-[#8b5cf6]">Creativity</span>.
              <br />
              Build <span className="text-[#c4b5fd]">Futures</span>.
            </h1>
            <p className="text-base md:text-xl text-[#d1d1d1] mb-8 max-w-xl">
              We are a digital agency shaping immersive 3D brand stories.
              <br />
              Design. Experience. Motion.
            </p>
            <button
              ref={ctaRef}
              className="px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-[#581c87] to-[#312e81] text-white shadow-lg hover:scale-105 transition"
            >
              Start Your Project
            </button>
          </section>

          {/* RIGHT: Wide, Low 3D Spline Model */}
          <section className="flex-1 relative flex items-center justify-center p-2 md:p-0 min-h-[60vh] overflow-visible">
            <div className="w-[180%] md:w-[220%] h-[90vh] flex items-center justify-center z-30 -ml-[30%] md:-ml-[50%]">
              <Spline scene="https://prod.spline.design/CqY9wMF33yBpdxZ8/scene.splinecode" />
            </div>
          </section>
        </div>

        {/* ... (Rest of your sections and footer here) ... */}
        {/* Footer for Mobile */}
        <footer className="md:hidden flex justify-center gap-4 pb-4 text-[#b3b3b3] text-sm">
          <span>contact@youragency.com</span>
          <span>|</span>
          <span>+91 89000 12345</span>
        </footer>
      </div>
    </main>
  );
};

export default HomePage;
