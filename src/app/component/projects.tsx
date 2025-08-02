"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleries = [
  {
    year: "2021",
    title: "NovaNet Solutions",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80",
    features: [
      "Bespoke API Design",
      "Adaptive Layouts",
      "Cloud Integrations",
      "Caching Layers",
      "SaaS Ready",
      "DevOps Tools",
      "Analytics Pipeline",
    ],
    tags: ["SaaS", "APIs", "Cloud", "CI/CD", "React"],
  },
  {
    year: "2022",
    title: "PixelQuest",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=700&q=80",
    features: [
      "WebGL Graphics",
      "Multiplayer Support",
      "In-game Marketplace",
      "Progressive Web App",
      "Gamification",
      "Audio Integration",
      "Accessibility",
    ],
    tags: ["Game", "WebGL", "PWA", "TypeScript", "Socket.io"],
  },
  {
    year: "2023",
    title: "Aether Finance",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80",
    features: [
      "Blockchain",
      "Wallet Support",
      "Real-Time Charts",
      "Audit Logs",
      "2FA Security",
      "KYC Integration",
      "Fiat On-ramp",
    ],
    tags: ["Finance", "Crypto", "Web3", "Security", "Next.js"],
  },
  {
    year: "2024",
    title: "Lemonide Tech",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80",
    features: [
      "AI Integration",
      "Responsive Design",
      "Custom Layouts",
      "Fast Loading",
      "SEO Optimization",
      "Accessibility Compliance",
      "Cross-Browser Compatibility",
    ],
    tags: ["E-Commerce", "Portfolio", "UI/UX", "Animation", "React"],
  },
 
];

export default function PortfolioDualGallerySection() {
  const sectionRefs = useRef([]);
  const infoRefs = useRef([]);

  useLayoutEffect(() => {
    galleries.forEach((_, idx) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRefs.current[idx],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
        .from(infoRefs.current[idx], {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          sectionRefs.current[idx].querySelectorAll(".feature-item"),
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.13,
            ease: "power2.out",
          },
          "<+0.25"
        );
    });
  }, []);

  return (
    <div
      className="text-white py-16 px-4 sm:px-8 lg:px-16 space-y-20"
      style={{
        background: "#000",
        minHeight: "100vh",
      }}
    >
      {galleries.map((gallery, idx) => (
        <section
          key={idx}
          ref={(el) => (sectionRefs.current[idx] = el)}
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg mb-10"
          style={{
            background: "#000",
            border: "1px solid #222",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Info Panel */}
            <div
              ref={(el) => (infoRefs.current[idx] = el)}
              className="md:col-span-1 p-6 flex flex-col justify-between"
              style={{
                background: "rgba(22, 31, 52, 0.68)",
                backdropFilter: "blur(10px)",
                borderTopLeftRadius: "1.5rem",
                borderBottomLeftRadius: "1.5rem",
              }}
            >
              <div>
                <span className="inline-block text-sm bg-gradient-to-r from-blue-800 to-blue-500 px-2 py-1 rounded-md font-semibold">
                  {gallery.year}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-3 tracking-tight">
                  {gallery.title}
                </h2>
                <ul className="mt-4 space-y-1.5">
                  {gallery.features.map((feat) => (
                    <li
                      key={feat}
                      className="feature-item flex items-center text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {gallery.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-blue-200 bg-gradient-to-r from-black/50 to-blue-900/40 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Right Project Image Panel */}
            <div className="md:col-span-3 p-6 flex items-center justify-center">
              <img
                src={gallery.image}
                alt={gallery.title + " visuals"}
                className="rounded-2xl shadow-xl object-fit h-64 w-full max-w-2xl mx-auto border border-[#141b2d]"
                style={{
                  background: "#181a22",
                }}
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
