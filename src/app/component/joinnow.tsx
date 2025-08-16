"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export default function JoinNow() {
  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const joinButtonRef = useRef(null);
  const bookButtonRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    // Background looping gradient animation
    gsap.to(bgRef.current, {
      backgroundPosition: "200% 200%",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Cursor-based gradient hover effect
    const bg = bgRef.current;
    const handleMouseMove = (e) => {
      const rect = bg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      gsap.to(bg, {
        background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, #1e40af 10%, #0a1346 40%, #000000 80%)`,
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(bg, {
        background: "linear-gradient(135deg, #000000 10%, #0a1346 40%, #1e40af 100%)",
        opacity: 0.6,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    bg.addEventListener("mousemove", handleMouseMove);
    bg.addEventListener("mouseleave", handleMouseLeave);

    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.4 }
    );

    // Button hover animations
    const buttons = [joinButtonRef.current, bookButtonRef.current];
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.08,
          boxShadow: "0 10px 20px rgba(0, 102, 255, 0.4)",
          backgroundColor: "rgba(29, 78, 216, 0.9)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          backgroundColor: button === joinButtonRef.current ? "rgba(29, 78, 216, 0.8)" : "rgb(37, 99, 235)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Card hover tilt effect
    const card = cardRef.current;
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: x * 0.015,
        rotationX: -y * 0.015,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    // Cleanup event listeners
    return () => {
      bg.removeEventListener("mousemove", handleMouseMove);
      bg.removeEventListener("mouseleave", handleMouseLeave);
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", () => {});
        button.removeEventListener("mouseleave", () => {});
      });
      card.removeEventListener("mousemove", () => {});
      card.removeEventListener("mouseleave", () => {});
    };
  }, []);

  const bookAppoiment = ()=>{
router.push("contact")
  }

  return (
    <div className="relative w-[70vw] max-w-[95vw] h-[400px] mx-auto flex items-center justify-center my-16">
      {/* Animated Background */}
      <div
        ref={bgRef}
        className="
          absolute inset-0
          bg-gradient-to-br
          rounded-3xl
          blur-3xl
          opacity-60
          z-0
        "
        style={{
          background:
            "linear-gradient(135deg, #000000 10%, #0a1346 40%, #1e40af 100%)",
          backgroundSize: "200% 200%",
        }}
      />
      {/* Glass Card */}
      <div
        ref={cardRef}
        className="
          relative z-10
          flex flex-col items-center justify-center
          w-full h-full rounded-3xl
          bg-white/5
          backdrop-blur-[20px]
          border border-white/10
          shadow-2xl
          px-10 py-12
          transition-transform duration-300
        "
      >
        <button
          ref={joinButtonRef}
          className="
            mb-6 px-6 py-2.5 rounded-full
            bg-blue-700/80 text-white
            font-medium text-base
            shadow-lg
            transition-all duration-300
          "
        >
          • Join Us Now
        </button>
        <h1 className="text-4xl font-normal text-white text-center leading-tight">
          <span className="font-semibold">Each Project we Undertake</span>
          <br />
          <span className="text-gray-200 font-normal">
            is a <span className="text-white font-semibold">Unique Opportunity.</span>
          </span>
        </h1>
        <p className="mt-6 text-gray-200 text-base text-center max-w-lg">
          Ready to take the next step? Join us now and start transforming your
          vision into reality with expert support.
        </p>
        <button
          ref={bookButtonRef}
          onClick={bookAppoiment}
          className="
            mt-8 px-8 py-3.5 rounded-lg
            bg-blue-600 text-white
            font-semibold text-lg
            shadow-md
            transition-all duration-300
          "
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
}