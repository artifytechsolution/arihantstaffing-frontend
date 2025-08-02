'use client';
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin once
if (typeof window !== "undefined" && gsap && !gsap.core.globals().ScrollTrigger)
  gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
        <path d="M17 3V7.5A2.5 2.5 0 0 1 14.5 10H7" />
        <path d="M17 3l-12 4.5V11.5c0 4.28 2.2 8.21 6 10.5 3.8-2.29 6-6.22 6-10.5V3z" />
        <circle cx="9" cy="10" r="1" />
      </svg>
    ),
    title: "Creation",
    desc: "Tailored posts that resonate with your audience, boosting engagement and brand loyalty."
  },
  {
    icon: (
      <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      </svg>
    ),
    title: "Management",
    desc: "Seamless management of all your social media accounts, ensuring consistent and effective communication."
  },
  {
    icon: (
      <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h4l2-3" />
      </svg>
    ),
    title: "Advertising",
    desc: "Strategic ad placements that reach your ideal audience, driving traffic and conversions."
  },
  {
    icon: (
      <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
        <path d="M4 19v-7M4 12l8-8 8 8M12 14v7" />
      </svg>
    ),
    title: "Analytics",
    desc: "Detailed reports that offer insights into your social media performance, helping you refine your strategy."
  },
  {
    icon: (
      <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
        <path d="M6.5 6.5A7 7 0 0 1 19 19" />
        <path d="M6 13v3" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Engagement",
    desc: "Active engagement with your followers, building a strong and supportive community around your brand."
  },
  {
    icon: (
      <svg className="w-8 h-8 mb-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
    title: "Consulting",
    desc: "Expert advice on how to position your brand for success in the digital landscape."
  },
];

const WhyChooseUsSection = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef();
  const subRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    // Animate headline, subtitle, cards, button on mount/scroll
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 38 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 0.12, duration: 0.8, ease: "power2.out" }
    );
    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.14 * i,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 89%" },
        }
      );
    });
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, delay: 0.12 * features.length, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center py-24 px-3 bg-gradient-to-tr Black-Label Staffing ">
      {/* blurred overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl z-0 pointer-events-none"></div>
      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 text-center">
          <span
            ref={headerRef}
            className="inline-block text-sm font-medium py-1 px-4 rounded-full bg-violet-900/30 text-violet-200 uppercase tracking-wide mb-4 backdrop-blur"
          >
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us<br className="hidden md:block" />
            for Success?
          </h2>
          <p
            ref={subRef}
            className="text-base md:text-lg text-gray-300 tracking-wide max-w-2xl mx-auto"
          >
            Discover how SocialLift empowers your brand.
          </p>
        </div>
        {/* Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 mt-10 mb-12">
          {features.map((feature, i) => (
            <div
              ref={el => (cardsRef.current[i] = el)}
              key={feature.title}
              className="flex flex-col items-center text-center bg-[#151229]/45 border border-violet-950/50 shadow-xl rounded-2xl px-6 py-9
                group
                hover:scale-105 hover:shadow-[0_8px_32px_rgba(140,82,255,.17)]
                transition-all duration-300 ease-[cubic-bezier(.4,1,.7,1)] backdrop-blur-[2.5px]"
            >
              <div className="flex items-center justify-center mb-1">
                {feature.icon}
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </div>
              <p className="text-gray-400 text-[15px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        {/* Button */}
        <button
          ref={btnRef}
          className="px-7 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-violet-900/80 to-indigo-900/80 text-violet-100 shadow transition hover:scale-105 hover:text-white"
        >
          Schedule a Call
        </button>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
