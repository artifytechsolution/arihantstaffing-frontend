"use client";
import React, { useRef, useEffect } from "react";

const SimpleBannerSection = ({ title, description }) => {
  const backgroundRef = useRef();

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
      <div className="badge-row flex flex-col sm:flex-row items-center gap-3 mb-8">
        <span className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-bold">
          2025
        </span>
        <button className="bg-blue-950/70 backdrop-blur-md text-neutral-100 rounded-md px-4 py-1 text-sm font-medium hover:bg-blue-900/70 transition-colors">
          Explore Portfolio
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-5 leading-tight text-white drop-shadow-lg">
        {title || "We are working on this page"} <br />
       
      </h1>

      {/* Description */}
      <p className="desc text-blue-200 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
        {description || "We are working on this page. This page is coming soon..."}
      </p>
     

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default SimpleBannerSection;
