'use client';
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    label: "Talent Sourcing",
    title: "Find the Right Candidates",
    desc: "AI-backed search delivers pre-vetted candidates tailored to your company. Let us handle talent discovery while you drive success.",
    tags: ["Pre-screened", "All Industries"]
  },
  {
    label: "Onboarding & Compliance",
    title: "Smooth Hiring, Fully Compliant",
    desc: "Automated documentation, background checks, and onboarding for 100% paperless and worry-free hiring.",
    tags: ["e-Signatures", "Quick Setup", "100% Secure"]
  },
  {
    label: "Workforce Management",
    title: "Seamless Staff Scheduling",
    desc: "Smart scheduling, timesheets, and payroll tools—manage your workforce with clarity and confidence.",
    tags: ["Shift Planning", "Payroll Integration"]
  },
  {
    label: "Client Portal",
    title: "Your Real-time Dashboard1111",
    desc: "Track onboarding, manage requests, and connect with our team—all in one secure dashboard.",
    tags: ["24/7 Support", "Custom Reports"]
  },
];

const StaffingAgencyBlack = () => {
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
      gsap.fromTo(
        el,
        { opacity: 0, y: 38 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.13 * i,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" }
        }
      );
      // Remove any colored shadow, keep simple scaling effect
      el.addEventListener("mouseenter", () =>
        gsap.to(el, { scale: 1.03, duration: 0.25, ease: "power2.out" })
      );
      el.addEventListener("mouseleave", () =>
        gsap.to(el, { scale: 1, duration: 0.18, ease: "power2.in" })
      );
    });
    animTags.current.forEach((tag, i) =>
      gsap.fromTo(
        tag,
        { opacity: 0, x: 18 },
        {
          opacity: 1, x: 0, duration: 0.59,
          delay: 0.07 * i, ease: "power2.out",
          scrollTrigger: { trigger: tag, start: "top 96%" }
        }
      )
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center py-16 px-2">
      {/* Header */}
      <div
        ref={animHeader}
        className="w-full max-w-3xl mx-auto text-center mb-10"
      >
        <span className="inline-block bg-[#18181a] px-4 py-1 text-xs rounded-full text-neutral-300 font-semibold tracking-wider">
          Our Solutions
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-2 leading-tight">
          Black-Label Staffing1: Elite Candidates, Effortless Hiring
        </h2>
        <p className="text-neutral-400 text-lg md:text-xl">
          End-to-end workforce solutions—searching, onboarding, and management—beautifully easy and always transparent.
        </p>
      </div>
      {/* Service Cards */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, idx) => (
          <div
            key={s.title}
            ref={el => (animPanels.current[idx] = el)}
            className="rounded-xl bg-[#18181a] border border-[#232325] px-8 py-9 flex flex-col gap-3 transition"
          >
            <span className="bg-[#232325] text-gray-300 text-xs font-semibold rounded px-3 py-1 mb-1 w-max">
              {s.label}
            </span>
            <h3 className="text-white text-xl font-bold">{s.title}</h3>
            <p className="text-neutral-300">{s.desc}</p>
            <div className="flex gap-2 flex-wrap mt-1 pb-1">
              {s.tags.map((tag, i) => (
                <span
                  key={tag}
                  ref={el => (animTags.current[idx * 4 + i] = el)}
                  className="bg-[#232325] text-gray-100 px-2 py-1 rounded-full text-xs font-semibold border border-[#232325]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="mt-3 px-8 py-2 rounded-full bg-[#232325] text-white font-bold text-sm border border-[#232325] transition-all focus:outline-none"
            >
              View
            </button>
          </div>
        ))}
      </div>
      {/* (Optional) CTA/footer can go here... */}
    </div>
  );
};

export default StaffingAgencyBlack;
