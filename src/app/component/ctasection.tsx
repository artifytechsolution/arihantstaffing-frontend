"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const AnimatedCTASection = () => {
  const backgroundRef = useRef();
  const contentRef = useRef();

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

  // Content animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-16 px-4 relative overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 800px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.12) 0%, 
            rgba(94, 58, 197, 0.08) 30%, 
            rgba(44, 102, 255, 0.05) 60%, 
            transparent 75%), 
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      <div className="max-w-4xl w-full relative z-10">
        <div
          ref={contentRef}
          className="bg-gradient-to-br from-violet-900/20 via-blue-900/30 to-violet-900/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-violet-700/40 px-6 sm:px-10 py-8 sm:py-12 shadow-2xl text-center"
          style={{
            background: "linear-gradient(125deg, rgba(20,10,40,0.5) 15%, rgba(25,38,66,0.3) 50%, rgba(45,28,82,0.4) 84%, rgba(139,69,193,0.2) 100%)"
          }}
        >
          {/* Header Badge */}
          <div className="mb-6">
            <span className="inline-block bg-violet-900/40 px-4 py-2 text-sm rounded-full text-violet-200 font-semibold tracking-wider backdrop-blur-sm border border-violet-700/40">
              🚀 Ready to Transform?
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Start Your <span className="text-violet-300 font-extrabold">AI Automation</span> Journey
          </h2>

          {/* Description */}
          <p className="text-blue-200/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
           Transform your business with cutting-edge AI solutions, custom software development, and intelligent automation. Join the many clients who have scaled their operations with our expertise
          </p>

          {/* Feature Highlights */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-violet-900/20 backdrop-blur-sm rounded-xl p-4 border border-violet-700/30">
              <div className="text-violet-300 font-bold text-lg mb-1">⚡ Fast Implementation</div>
              <p className="text-blue-200/80 text-sm">Get started within 2-4 weeks</p>
            </div>
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-700/30">
              <div className="text-blue-300 font-bold text-lg mb-1">🛡️ 24/7 Support</div>
              <p className="text-blue-200/80 text-sm">Dedicated technical assistance</p>
            </div>
          </div> */}

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href={'contact'} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold rounded-full hover:from-violet-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-xl text-base">
              Start Your Project →
            </Link>
            <Link href={'contact'} className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-violet-500/50 text-violet-200 font-semibold rounded-full hover:bg-violet-900/20 hover:border-violet-400 transition-all hover:scale-105 backdrop-blur-sm">
              Schedule Consultation
            </Link>
          </div>

          {/* Trust Indicators */}
          {/* <div className="border-t border-violet-700/30 pt-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-violet-300">500+</div>
                <div className="text-blue-200/80 text-sm">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300">98%</div>
                <div className="text-blue-200/80 text-sm">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-300">5★</div>
                <div className="text-blue-200/80 text-sm">Average Rating</div>
              </div>
            </div>
          </div> */}

          {/* Contact Information */}
          {/* <div className="mt-6 pt-4 border-t border-blue-700/20">
            <p className="text-blue-200/70 text-sm mb-2">
              Questions? Contact our experts
            </p>
            <div className="flex justify-center items-center gap-6 text-sm">
              <span className="text-violet-200">📧 artifytechsolutioncontact@gmail.com</span>
              <span className="text-blue-200">📞 +91 8154830172</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AnimatedCTASection;
