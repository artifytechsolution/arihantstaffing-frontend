"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const faqs = [
  {
    q: "What software development services do you offer?",
    a: "We specialize in web applications (React/Next.js), mobile apps (React Native), AI automation, and digital marketing solutions."
  },
  {
    q: "How long does a typical project take?",
    a: "Most web applications take 4-8 weeks, mobile apps 6-10 weeks. Timeline depends on project complexity and features required."
  },
  {
    q: "Do you provide AI integration services?",
    a: "Yes! We integrate AI/ML automation, chatbots, and intelligent workflows to streamline your business processes."
  },
  {
    q: "What is included in your support package?",
    a: "24/7 technical support, regular updates, security patches, performance monitoring, and ongoing maintenance."
  },
  {
    q: "Can you work within our budget?",
    a: "We offer flexible solutions for startups to enterprises. Contact us to discuss a package that fits your budget and requirements."
  }
];

const QAAccordionClean = () => {
  const [open, setOpen] = useState(null);
  const panelsRef = useRef([]);
  const chevronsRef = useRef([]);
  const qRefs = useRef([]);
  const backgroundRef = useRef();
  const headerRef = useRef();

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

  // Header animation
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // FAQ items animation
  useEffect(() => {
    qRefs.current.forEach((el, i) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            delay: 0.1 * i,
            duration: 0.5,
            ease: "power2.out"
          }
        );
    });
  }, []);

  // Accordion animations
  useEffect(() => {
    faqs.forEach((faq, i) => {
      const panel = panelsRef.current[i];
      const chevron = chevronsRef.current[i];
      if (!panel) return;

      if (open === i) {
        gsap.to(panel, {
          height: "auto",
          opacity: 1,
          paddingTop: "12px",
          paddingBottom: "16px",
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(chevron, {
          rotate: 180,
          color: "#8b5cf6",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          paddingTop: "0px",
          paddingBottom: "0px",
          duration: 0.3,
          ease: "power2.in"
        });
        gsap.to(chevron, {
          rotate: 0,
          color: "#60a5fa",
          duration: 0.25,
          ease: "power2.in"
        });
      }
    });
  }, [open]);

  return (
    <section className="w-full flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 600px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.1) 0%, 
            rgba(94, 58, 197, 0.06) 30%, 
            rgba(44, 102, 255, 0.04) 60%, 
            transparent 75%), 
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      <div className="max-w-3xl w-full flex flex-col items-center relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <span className="inline-block bg-violet-900/30 px-3 py-1 text-xs rounded-full text-violet-200 font-semibold tracking-wide mb-4 backdrop-blur-sm border border-violet-700/30">
            FAQ
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked <span className="text-violet-300">Questions</span>
          </h1>
          <p className="text-blue-200/80 text-sm sm:text-base max-w-lg mx-auto">
            Quick answers about our software development services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              ref={el => (qRefs.current[i] = el)}
              className={`
                rounded-xl border backdrop-blur-lg
                shadow-md transition-all duration-300 overflow-hidden cursor-pointer
                hover:scale-[1.01] hover:shadow-lg
                ${open === i 
                  ? 'border-violet-500/50 shadow-violet-500/15 bg-gradient-to-br from-violet-900/15 to-blue-900/10' 
                  : 'border-blue-700/30 shadow-blue-500/10 bg-gradient-to-br from-gray-900/30 to-blue-950/15 hover:border-blue-600/50'
                }
              `}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none group"
                aria-expanded={open === i}
              >
                <span className={`
                  text-sm sm:text-base font-semibold select-none transition-colors flex-1 pr-4 leading-snug
                  ${open === i ? 'text-violet-50' : 'text-blue-50 group-hover:text-white'}
                `}>
                  {faq.q}
                </span>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                  ${open === i 
                    ? 'bg-violet-600/20 border border-violet-500/40' 
                    : 'bg-blue-600/20 border border-blue-500/30 group-hover:bg-blue-500/25'
                  }
                `}>
                  <svg
                    ref={el => (chevronsRef.current[i] = el)}
                    className="w-4 h-4 text-blue-300 transform transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              <div
                ref={el => (panelsRef.current[i] = el)}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
              >
                <div className={`
                  px-5 text-sm leading-relaxed
                  ${open === i ? 'text-violet-100/85' : 'text-blue-100/85'}
                `}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <Link href={'contact'} className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-full hover:from-violet-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-md text-sm">
            More Questions? Contact Us
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-5 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-5 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default QAAccordionClean;

//last backup

// 'use client';
// import React, { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";

// const faqs = [
//   {
//     q: "How can AI automation help my business?",
//     a: "AI automation improves efficiency, reduces errors, and frees up your team for higher-value tasks."
//   },
//   {
//     q: "Is AI automation difficult to integrate?",
//     a: "Integration is seamless, with support every step of the way. Minimal IT resources required."
//   },
//   {
//     q: "What industries can benefit from it?",
//     a: "E-commerce, healthcare, finance, logistics, and more—wherever routine work can be automated."
//   },
//   {
//     q: "Do I need technical knowledge?",
//     a: "No! Our platform is user-friendly. Our team handles setup and ongoing support."
//   },
//   {
//     q: "How long does it take to see results?",
//     a: "Most businesses start seeing improvements in efficiency and accuracy within weeks of implementation."
//   },
//   {
//     q: "Is my business data secure?",
//     a: "Yes. We use enterprise-grade encryption and comply with industry security standards to protect your data."
//   },
//   {
//     q: "Can the system scale with my business?",
//     a: "Absolutely. Our AI solutions are designed to grow with your business, adapting to increased workloads and complexity."
//   },
//   {
//     q: "Will automation replace my employees?",
//     a: "No. It’s meant to assist your team by handling repetitive tasks, allowing them to focus on more strategic work."
//   },
//   {
//     q: "How is customer support handled?",
//     a: "Our dedicated support team is available 24/7 to help with any questions or technical issues."
//   },
//   {
//     q: "Can I customize the automation workflows?",
//     a: "Yes. We offer flexible automation solutions that can be tailored to fit your specific business processes."
//   }
// ];

// const QAAccordionClean = () => {
//   const [open, setOpen] = useState(null);
//   const panelsRef = useRef([]);
//   const chevronsRef = useRef([]);
//   const qRefs = useRef([]);

//   useEffect(() => {
//     qRefs.current.forEach((el, i) => {
//       if (el)
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 22 },
//           {
//             opacity: 1,
//             y: 0,
//             delay: 0.12 * i,
//             duration: 0.45,
//             ease: "power2.out"
//           }
//         );
//     });
//   }, []);

//   useEffect(() => {
//     faqs.forEach((faq, i) => {
//       const panel = panelsRef.current[i];
//       const chevron = chevronsRef.current[i];
//       if (!panel) return;
//       if (open === i) {
//         gsap.to(panel, {
//           height: panel.scrollHeight,
//           opacity: 1,
//           pointerEvents: "auto",
//           duration: 0.55,
//           ease: "power2.out"
//         });
//         gsap.to(chevron, {
//           rotate: 180,
//           duration: 0.4,
//           ease: "power2.out"
//         });
//       } else {
//         gsap.to(panel, {
//           height: 0,
//           opacity: 0,
//           pointerEvents: "none",
//           duration: 0.5,
//           ease: "power2.in"
//         });
//         gsap.to(chevron, {
//           rotate: 0,
//           duration: 0.35,
//           ease: "power2.in"
//         });
//       }
//     });
//   }, [open]);

//   return (
//       <section className="w-full min-h-screen flex flex-col items-center pt-16 px-2 pb-16 bg-black">
//       <div className="max-w-4xl w-full flex flex-col items-center">
//         <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
//           Frequently Asked Questions
//         </h1>
//         <p className="text-blue-200 text-base mb-6 text-center">
//           Quick answers to your AI automation questions.
//         </p>
//         {/* Accordion */}
//         <div className="w-full flex flex-col gap-4">
//           {faqs.map((faq, i) => (
//             <div
//               key={faq.q}
//               className={`
//                 rounded-2xl border border-blue-800/40
//                 backdrop-blur-xl
//                 shadow-[0_8px_32px_rgba(16,44,235,0.12)]
//                 transition-all duration-300
//                 overflow-hidden group
//                 hover:border-blue-600/60 hover:shadow-blue-700/40
//                 bg-transparent
//               `}
//             >
//               <button
//                 onClick={() => setOpen(open === i ? null : i)}
//                 className={`
//                   w-full flex justify-between items-center px-6 py-4
//                   text-left focus:outline-none
//                   transition-all duration-200
//                   bg-transparent
//                 `}
//                 aria-expanded={open === i}
//                 aria-controls={`faq-panel-${i}`}
//                 tabIndex={0}
//               >
//                 <span
//                   className="text-white text-base font-semibold select-none transition-colors flex-1 pr-6"
//                   style={{ width: "200%" }}
//                 >
//                   {faq.q}
//                 </span>
//                 <svg
//                   className={`
//                     w-5 h-5 ml-2 text-blue-300 transform transition-transform duration-400
//                     ${open === i ? "rotate-180" : ""}
//                   `}
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path d="M6 9l6 6 6-6" />
//                 </svg>
//               </button>
//               <div
//                 id={`faq-panel-${i}`}
//                 className={`
//                   transition-all duration-400
//                   px-6 text-[15px] text-blue-100/90
//                   ${open === i ? "max-h-40 opacity-100 py-2 pointer-events-auto" : "max-h-0 opacity-0 py-0 pointer-events-none"}
//                   overflow-hidden
//                   will-change-[max-height,opacity]
//                 `}
//                 aria-hidden={open !== i}
//               >
//                 <div>{faq.a}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           className="mt-10 px-7 py-2.5 rounded-full text-sm font-semibold
//             bg-gradient-to-r from-blue-900 via-blue-700 to-blue-800 text-white
//             shadow-md border border-blue-700/40 transition-transform duration-150
//             focus:outline-none hover:scale-105 hover:shadow-lg"
//           aria-label="Contact us for more"
//         >
//           More FAQs
//         </button>
//       </div>
//     </section>

//   );
// };

// export default QAAccordionClean;

