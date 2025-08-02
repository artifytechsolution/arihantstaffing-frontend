"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const testimonials = [
  {
    text: "Radison transformed our workflow with incredible AI solutions. Their expertise truly exceeded all expectations!",
    name: "Dean Watson",
    title: "Managing director : Farmland",
    img: "/images/dean.jpg"
  },
  {
    text: "Radison provided game-changing insights that helped us optimize processes and scale operations fast.",
    name: "Emily Zhang",
    title: "CEO : Futuresync",
    img: "/images/emily.jpg"
  },
  {
    text: "Radison’s AI tools revolutionized how we work, saving time and driving our productivity forward.",
    name: "James Carter",
    title: "Marketing director : Innolystic",
    img: "/images/james.jpg"
  },
  {
    text: "Working with Radison has been seamless. Their solutions are both innovative and highly effective.",
    name: "Liam Walker",
    title: "Product manager : Brightpath",
    img: "/images/liam.jpg"
  },
  {
    text: "Thanks to Radison, we’ve achieved incredible growth by automating tasks and improving accuracy.",
    name: "Miguel Torres",
    title: "IT consultant : Alphaedge",
    img: "/images/miguel.jpg"
  },
  {
    text: "The team at Radison delivered outstanding results, improving our efficiency beyond what we imagined!",
    name: "Priya Sharma",
    title: "Founder : NexGen",
    img: "/images/priya.jpg"
  }
];

const ClientReview = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.3,
      ease: "power2.out"
    });
  }, []);

  return (
    <section className="bg-black min-h-screen py-16 px-4 flex flex-col items-center">
      <button className="bg-blue-900 text-blue-100 rounded-lg py-1.5 px-6 mb-5 shadow-md">Testimonials</button>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-center">Trusted by satisfied clients</h2>
      <p className="mb-10 text-blue-100 text-center max-w-xl">Discover how we’ve driven growth and innovation.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            ref={el => (cardsRef.current[idx] = el)}
            className="relative rounded-xl p-7 text-left flex flex-col justify-between min-h-[240px]"
            style={{
              background: "linear-gradient(135deg, #0a1a3a 0%, #000000 85%)",
              borderRadius: "1rem",
              border: "2px solid #1e40af",
              boxShadow: "0 8px 16px rgba(30,64,175,0.4)",
              overflow: "hidden"
            }}
          >
            <p className="text-blue-100 text-base mb-5 relative z-10 leading-relaxed">"{item.text}"</p>
            <div className="flex items-center gap-4 mt-auto relative z-10">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover border border-blue-600 bg-blue-950"
              />
              <div>
                <div className="font-semibold text-white">{item.name}</div>
                <div className="text-blue-200 text-sm">{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientReview;
