"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const NotFoundPage = () => {
  const backgroundRef = useRef();
  const numberRef = useRef();
  const textRef = useRef();
  const buttonsRef = useRef();
  const robotRef = useRef();
  const starsRef = useRef([]);

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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.3 });
      
      // 404 number animation with bounce
      tl.fromTo(numberRef.current, 
        { opacity: 0, scale: 0, rotation: -180 }, 
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0, 
          duration: 1.2, 
          ease: "elastic.out(1, 0.5)" 
        }
      );
      
      // Text entrance with stagger
      tl.fromTo(textRef.current.children, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out" 
        }, 
        "-=0.5"
      );
      
      // Robot animation
      tl.fromTo(robotRef.current, 
        { opacity: 0, scale: 0.5, y: 100 }, 
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1, 
          ease: "back.out(1.7)" 
        }, 
        "-=0.3"
      );
      
      // Buttons entrance
      tl.fromTo(buttonsRef.current.children, 
        { opacity: 0, y: 30, scale: 0.8 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.15, 
          ease: "back.out(1.4)" 
        }, 
        "-=0.2"
      );

      // Continuous animations
      // Robot floating
      gsap.to(robotRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 404 text glow pulse
      gsap.to(numberRef.current, {
        textShadow: "0 0 30px rgba(139, 69, 193, 0.8), 0 0 60px rgba(44, 102, 255, 0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Stars twinkling
      starsRef.current.forEach((star, index) => {
        if (star) {
          gsap.to(star, {
            opacity: 0.3,
            scale: 0.5,
            duration: 1 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
          });
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle 800px at var(--bg-x, 50%) var(--bg-y, 50%), 
          rgba(139, 69, 193, 0.15) 0%, 
          rgba(94, 58, 197, 0.10) 30%, 
          rgba(44, 102, 255, 0.08) 60%, 
          transparent 75%), 
          radial-gradient(circle at 25% 25%, #0a1e4d 10%, #000000 90%)
        `,
        transition: "background 0.2s ease-out"
      }}
    >
      {/* Animated Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={el => (starsRef.current[i] = el)}
            className="absolute text-violet-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 10}px`
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Robot Character */}
        <div 
          ref={robotRef}
          className="mb-8 sm:mb-12"
        >
          <div className="relative mx-auto w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-violet-600/20 to-blue-600/20 rounded-3xl backdrop-blur-lg border border-violet-400/30 flex items-center justify-center shadow-2xl">
            <span className="text-6xl sm:text-8xl filter drop-shadow-lg">🤖</span>
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 404 Number */}
        <h1 
          ref={numberRef}
          className="text-8xl sm:text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text mb-4 sm:mb-8 leading-none drop-shadow-2xl"
        >
          404
        </h1>

        {/* Text Content */}
        <div ref={textRef} className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-blue-200/90 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, our robot friend is on the case! 
          </p>
          <p className="text-sm sm:text-base text-blue-300/80 max-w-xl mx-auto">
            Let's get you back on track with these helpful options:
          </p>
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold rounded-xl hover:from-violet-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl text-base sm:text-lg min-w-[180px]">
              🏠 Go Home
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-violet-400/50 text-violet-200 font-bold rounded-xl hover:bg-violet-900/20 hover:border-violet-300 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-base sm:text-lg min-w-[180px]"
          >
            ⬅️ Go Back
          </button>
          
          <Link href="/contact">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-xl text-base sm:text-lg min-w-[180px]">
              📞 Contact Us
            </button>
          </Link>
        </div>

        {/* Search Box */}
        <div className="mt-8 sm:mt-12 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-violet-400/30 p-1">
            <div className="flex">
              <input
                type="text"
                placeholder="Search our site..."
                className="flex-1 px-4 py-3 bg-transparent text-white placeholder-blue-300/70 rounded-l-lg focus:outline-none text-sm sm:text-base"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-r-lg hover:from-violet-500 hover:to-blue-500 transition-all duration-300">
                🔍
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 sm:mt-12">
          <p className="text-blue-300 text-sm sm:text-base mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { name: "Services", href: "/services" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "About", href: "/about" },
              { name: "Blog", href: "/blog" }
            ].map((link) => (
              <Link key={link.name} href={link.href}>
                <button className="px-4 py-2 bg-violet-900/30 text-violet-200 rounded-lg hover:bg-violet-800/40 transition-all duration-300 text-sm backdrop-blur-sm border border-violet-700/30">
                  {link.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-32 sm:w-64 lg:w-96 h-32 sm:h-64 lg:h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-40 sm:w-72 lg:w-80 h-40 sm:h-72 lg:h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-purple-500/5 rounded-full blur-2xl animate-ping"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
