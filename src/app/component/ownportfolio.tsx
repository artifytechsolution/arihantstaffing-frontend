"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  PersonOutline,
  PhoneOutlined,
  EmailOutlined,
  SportsBasketballOutlined,
  DataObjectOutlined,
  DiamondOutlined,
  DesignServicesOutlined,
  BrushOutlined,
} from "@mui/icons-material";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Figma", Icon: DesignServicesOutlined },
  { name: "Framer", Icon: DataObjectOutlined },
  { name: "Behance", Icon: BrushOutlined },
  { name: "Dribbble", Icon: SportsBasketballOutlined },
  { name: "Sketch", Icon: DiamondOutlined },
  { name: "Adobe XD", Icon: DesignServicesOutlined },
];

export default function CombinedBanner({ name = "Cris Rayaan" }) {
  const [activeTag, setActiveTag] = useState("Art Directions");
  const cardRef = useRef(null);
  const skillRefs = useRef([]);
  const profileRef = useRef(null);
  const buttonRefs = useRef([]);
  const headerRef = useRef(null);
  const subHeaderRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP animations
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Subheader animation
      gsap.fromTo(
        subHeaderRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Card entrance on scroll
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Profile image animation on scroll
      gsap.from(profileRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: profileRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Skills animation on scroll
      gsap.from(skillRefs.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: skillRefs.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Buttons animation on scroll
      gsap.from(buttonRefs.current, {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRefs.current[0],
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, cardRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <>
     
      <div className="bg-gradient-to-b from-black to-blue-950/50 min-h-screen  items-center justify-center p-4">
       <div className="mb-8 text-center">
        <span
          ref={headerRef}
          className="inline-block text-sm font-medium py-1 px-4 rounded-full bg-violet-900/30 text-violet-200 uppercase tracking-wide mb-4 backdrop-blur"
        >
          Features
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Why Choose Us<br className="hidden md:block" /> for Success?
        </h2>
        <p
          ref={subHeaderRef}
          className="text-base md:text-lg text-gray-300 tracking-wide max-w-2xl mx-auto"
        >
          Discover how SocialLift empowers your brand.
        </p>
      </div>
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="bg-black/15 backdrop-blur-2xl border items-center border-blue-600/30 rounded-2xl p-8 flex flex-col lg:flex-row items-center max-w-5xl w-full gap-8"
        >
          {/* Profile and Buttons */}
          <div className="flex flex-col items-center text-center lg:w-[320px] flex-shrink-0">
            <div
              ref={profileRef}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-black to-blue-950/30 mb-5 flex items-center justify-center border-2 border-blue-700/40 shadow-lg"
            >
              <PersonOutline className="text-blue-400 text-5xl" />
            </div>
            <h2 className="text-3xl font-bold text-white">{name}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm max-w-xs">
              A Passionate Full Stack Developer & Product Designer with global experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xs">
              <button
                ref={(el) => (buttonRefs.current[0] = el)}
                className="flex-1 bg-blue-600 text-white rounded-lg px-3 py-2 text-sm font-semibold flex items-center justify-center gap-1"
              >
                <PhoneOutlined fontSize="inherit" /> BOOK A CALL
              </button>
              <button
                ref={(el) => (buttonRefs.current[1] = el)}
                className="flex-1 bg-slate-700 text-slate-200 border border-slate-600 rounded-lg px-3 py-2 text-sm font-semibold flex items-center justify-center gap-1"
              >
                <EmailOutlined fontSize="inherit" /> GET IN TOUCH
              </button>
            </div>
          </div>

          {/* Divider on large screens */}
          <div className="hidden lg:block w-px bg-blue-500/20 mx-6" />

          {/* Skills and Details */}
          <div className="flex-1 flex flex-col justify-between h-full w-full">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                My Expert Area
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {skills.map(({ name: skill, Icon }, idx) => (
                  <div
                    key={skill}
                    ref={(el) => (skillRefs.current[idx] = el)}
                    className="bg-black/20 backdrop-blur-md border border-blue-600/30 rounded-lg p-3 flex flex-col items-center justify-center gap-2 aspect-square"
                  >
                    <Icon className="text-slate-400 h-6 w-6" />
                    <span className="text-slate-300 text-xs font-medium text-center">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                As a product designer, I specialize in creating magical visual identities for digital products. I believe a stunning design starts with common values and respect for your audience.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-4 border-t border-slate-700/80 pt-4">
              {["Brand Positioning", "Art Directions"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="flex items-center gap-2 text-xs font-medium"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activeTag === tag ? "bg-blue-500" : "bg-slate-600"
                    }`}
                  />
                  <span
                    className={`${
                      activeTag === tag ? "text-blue-400" : "text-slate-400"
                    }`}
                  >
                    {tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}