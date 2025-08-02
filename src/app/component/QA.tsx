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
      <section className="w-full min-h-screen flex flex-col items-center pt-16 px-2 pb-16 bg-black">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-blue-200 text-base mb-6 text-center">
          Quick answers to your AI automation questions.
        </p>
        {/* Accordion */}
        <div className="w-full flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`
                rounded-2xl border border-blue-800/40
                backdrop-blur-xl
                shadow-[0_8px_32px_rgba(16,44,235,0.12)]
                transition-all duration-300
                overflow-hidden group
                hover:border-blue-600/60 hover:shadow-blue-700/40
                bg-transparent
              `}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`
                  w-full flex justify-between items-center px-6 py-4
                  text-left focus:outline-none
                  transition-all duration-200
                  bg-transparent
                `}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                tabIndex={0}
              >
                <span
                  className="text-white text-base font-semibold select-none transition-colors flex-1 pr-6"
                  style={{ width: "200%" }}
                >
                  {faq.q}
                </span>
                <svg
                  className={`
                    w-5 h-5 ml-2 text-blue-300 transform transition-transform duration-400
                    ${open === i ? "rotate-180" : ""}
                  `}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`
                  transition-all duration-400
                  px-6 text-[15px] text-blue-100/90
                  ${open === i ? "max-h-40 opacity-100 py-2 pointer-events-auto" : "max-h-0 opacity-0 py-0 pointer-events-none"}
                  overflow-hidden
                  will-change-[max-height,opacity]
                `}
                aria-hidden={open !== i}
              >
                <div>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-10 px-7 py-2.5 rounded-full text-sm font-semibold
            bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 text-white
            shadow-md border border-blue-700/40 transition-transform duration-150
            focus:outline-none hover:scale-105 hover:shadow-lg"
          aria-label="Contact us for more"
        >
          More FAQs
        </button>
      </div>
    </section>

  );
};

export default QAAccordionClean;
