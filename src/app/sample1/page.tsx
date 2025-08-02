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
    label: "Talent Sourcing",
    title: "Find the Right Candidates",
    desc: "AI-backed search delivers pre-vetted candidates tailored to your company. Let us handle talent discovery while you drive success.",
    tags: ["Pre-screened", "All Industries"],
  },
  {
    label: "Onboarding & Compliance",
    title: "Smooth Hiring, Fully Compliant",
    desc: "Automated documentation, background checks, and onboarding for 100% paperless and worry-free hiring.",
    tags: ["e-Signatures", "Quick Setup", "100% Secure"],
  },
  {
    label: "Workforce Management",
    title: "Seamless Staff Scheduling",
    desc: "Smart scheduling, timesheets, and payroll tools—manage your workforce with clarity and confidence.",
    tags: ["Shift Planning", "Payroll Integration"],
  },
  {
    label: "Client Portal",
    title: "Your Real-time Dashboard",
    desc: "Track onboarding, manage requests, and connect with our team—all in one secure dashboard.",
    tags: ["24/7 Support", "Custom Reports"],
  },
];

const StaffingAgencyMixedGlass = () => {
  const animPanels = useRef([]);
  const animTags = useRef([]);
  const animHeader = useRef();

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
          scale: 1.045,
          boxShadow: "0 12px 48px 0 rgba(46,80,170,0.22)",
          background:
            // More intense blue-black gradient
            "linear-gradient(125deg, rgba(10,20,40,0.68) 15%, rgba(28,45,82,0.72) 60%, rgba(44,102,255,0.32) 100%)",
          duration: 0.27,
          ease: "power2.out",
        });
      };
      const scaleDown = () => {
        gsap.to(el, {
          scale: 1,
          boxShadow: "0 8px 32px 0 rgba(25,40,70,0.13)",
          background:
            // Subtle mixed black/blue gradient
            "linear-gradient(125deg, rgba(10,20,36,0.56) 15%, rgba(25,38,66,0.38) 84%, rgba(44,102,255,0.21) 100%)",
          duration: 0.18,
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

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-16 px-2"
      style={{ background: "#000" }} // Pure black page background
    >
      {/* Header */}
      <div
        ref={animHeader}
        className="w-full max-w-3xl mx-auto text-center mb-10"
      >
        <span className="inline-block bg-blue-900/30 px-4 py-1 text-xs rounded-full text-blue-200 font-semibold tracking-wider backdrop-blur-sm font-mono">
          Our Solutions
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-100 mt-4 mb-2 leading-tight font-extrabold tracking-tight">
          Black & Blue Glass Staffing: Elite Candidates, Effortless Hiring
        </h2>
        <p className="text-blue-200/80 text-lg md:text-xl font-medium">
          End-to-end workforce solutions—searching, onboarding, and management—beautifully easy and always transparent.
        </p>
      </div>
      {/* Service Cards */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-10 z-10 relative">
        {services.map((s, idx) => (
          <div
            key={s.title}
            ref={el => (animPanels.current[idx] = el)}
            className={`
              rounded-2xl
              border border-blue-700/40
              shadow-[0_8px_32px_rgba(40,76,160,0.14)]
              px-7 md:px-8 py-10 flex flex-col gap-3
              backdrop-blur-[6px]
              transition-all duration-200
              will-change-transform
              group
            `}
            style={{
              // Blended glass: black + blue
              background:
                "linear-gradient(125deg, rgba(10,20,36,0.56) 15%, rgba(25,38,66,0.38) 84%, rgba(44,102,255,0.21) 100%)",
              boxShadow: "0 8px 32px 0 rgba(40,76,160,0.14)",
              border: "1.5px solid rgba(44,122,255,0.14)",
            }}
          >
            <span className="bg-blue-900/25 text-blue-100 text-xs font-semibold rounded px-3 py-1 mb-2 w-max backdrop-blur font-mono border border-blue-700/30 shadow-sm">
              {s.label}
            </span>
            <h3 className="text-blue-50 text-xl font-bold font-sans">{s.title}</h3>
            <p className="text-blue-100/90 font-normal">{s.desc}</p>
            <div className="flex gap-2 flex-wrap mt-1 pb-1">
              {s.tags.map((tag, i) => (
                <span
                  key={tag}
                  ref={el => (animTags.current[idx * 4 + i] = el)}
                  className="bg-blue-900/20 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold border border-blue-700/20 backdrop-blur font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="mt-4 px-8 py-2 rounded-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 text-blue-100 font-bold text-sm border border-blue-800/50 shadow-md transition-all hover:from-blue-700 hover:to-blue-500 hover:text-white focus:outline-none font-mono"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffingAgencyMixedGlass;
