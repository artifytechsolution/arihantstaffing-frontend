'use client';
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const faqs = [
  {
    q: "How can AI automation help my business?",
    a: "AI automation improves efficiency, reduces errors, and frees up your team for higher-value tasks."
  },
  {
    q: "Is AI automation difficult to integrate?",
    a: "Integration is seamless, with support every step of the way. Minimal IT resources required."
  },
  {
    q: "What industries can benefit from it?",
    a: "E-commerce, healthcare, finance, logistics, and more—wherever routine work can be automated."
  },
  {
    q: "Do I need technical knowledge?",
    a: "No! Our platform is user-friendly. Our team handles setup and ongoing support."
  },
  {
    q: "How long does it take to see results?",
    a: "Most businesses start seeing improvements in efficiency and accuracy within weeks of implementation."
  },
  {
    q: "Is my business data secure?",
    a: "Yes. We use enterprise-grade encryption and comply with industry security standards to protect your data."
  },
  {
    q: "Can the system scale with my business?",
    a: "Absolutely. Our AI solutions are designed to grow with your business, adapting to increased workloads and complexity."
  },
  {
    q: "Will automation replace my employees?",
    a: "No. It’s meant to assist your team by handling repetitive tasks, allowing them to focus on more strategic work."
  },
  {
    q: "How is customer support handled?",
    a: "Our dedicated support team is available 24/7 to help with any questions or technical issues."
  },
  {
    q: "Can I customize the automation workflows?",
    a: "Yes. We offer flexible automation solutions that can be tailored to fit your specific business processes."
  }
];

const QAAccordionClean = () => {
  const [open, setOpen] = useState(null);
  const panelsRef = useRef([]);
  const chevronsRef = useRef([]);
  const qRefs = useRef([]);

  useEffect(() => {
    qRefs.current.forEach((el, i) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            delay: 0.12 * i,
            duration: 0.45,
            ease: "power2.out"
          }
        );
    });
  }, []);

  useEffect(() => {
    faqs.forEach((faq, i) => {
      const panel = panelsRef.current[i];
      const chevron = chevronsRef.current[i];
      if (!panel) return;
      if (open === i) {
        gsap.to(panel, {
          height: panel.scrollHeight,
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.55,
          ease: "power2.out"
        });
        gsap.to(chevron, {
          rotate: 180,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          pointerEvents: "none",
          duration: 0.5,
          ease: "power2.in"
        });
        gsap.to(chevron, {
          rotate: 0,
          duration: 0.35,
          ease: "power2.in"
        });
      }
    });
  }, [open]);

  return (
    <section className="min-h-screen w-full bg-black flex flex-col items-center pt-16 px-2 pb-16 relative">
      {/* Black glass blur overlay */}
      <div className="absolute inset-0  backdrop-blur-2xl z-0 pointer-events-none"></div>
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Frequently Asked Questions1
        </h1>
        <p className="text-gray-300 text-base mb-6 text-center">
          Quick answers to your AI automation questions.
        </p>
        {/* Accordion */}
        <div className="w-full flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              ref={el => (qRefs.current[i] = el)}
              className="bg-[#19182b]/80 border border-[#241d3c] rounded-lg shadow-md transition overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left group outline-none focus:outline-none"
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                tabIndex={0}
                style={{ boxShadow: "none", outline: "none" }}
              >
                <span className="text-white text-[15px] font-medium leading-snug select-none">
                  {faq.q}
                </span>
                <svg
                  ref={el => (chevronsRef.current[i] = el)}
                  className="w-4 h-4 ml-2 text-violet-400 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ transform: "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                id={`faq-panel-${i}`}
                ref={el => (panelsRef.current[i] = el)}
                className="px-4 text-sm text-gray-200"
                style={{
                  height: 0,
                  overflow: "hidden",
                  opacity: 0,
                  pointerEvents: "none",
                  willChange: "height, opacity"
                }}
                aria-hidden={open !== i}
              >
                <div className="pb-2 pt-0.5">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-8 px-7 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-700 to-indigo-700 text-white shadow transition hover:scale-105"
          aria-label="Contact us for more"
        >
          FAQs
        </button>
      </div>
    </section>
  );
};

export default QAAccordionClean;
