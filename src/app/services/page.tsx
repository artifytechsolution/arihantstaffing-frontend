"use client";
import React, { useEffect, useRef } from "react";
import Header from '../component/Header';
import gsap from "gsap";
import ClientReview from "../component/clientReview";
import Footer from "../component/Fotter";
import SimpleBannerSection from "../component/annimatedBannerSection";

// ---- Services Data ----
const SERVICES = [
  {
    icon: "💻",
    title: "Custom Software Development",
    description: (
      <>
        <b>Full-stack engineering</b> for web and mobile.<br />
        We build cloud-ready platforms, mobile apps, and product integrations—from initial architecture to launch and ongoing support.<br />
        <span className="text-blue-400">Tech expertise:</span> React, Node.js, Python, AWS, Next.js, and more.
      </>
    ),
  },
  {
    icon: "🎨",
    title: "UI/UX Design & Prototyping",
    description: (
      <>
        <b>Human-centered design</b> at every touchpoint.<br />
        Engaging wireframes, clickable prototypes, and beautiful final interfaces ensure your users connect instantly.<br />
        <span className="text-blue-400">Includes:</span> Design sprints, user flows, rapid Figma/Sketch prototyping.
      </>
    ),
  },
  {
    icon: "🤖",
    title: "Automation & AI Integration",
    description: (
      <>
        <b>Automate & accelerate</b> your business.<br />
        We streamline manual workflows and embed AI or ML models—boosting productivity and unlocking new opportunities.<br />
        <span className="text-blue-400">Examples:</span> AI chatbots, document bots, integrated APIs.
      </>
    ),
  },
  {
    icon: "🛒",
    title: "E-Commerce Solutions",
    description: (
      <>
        <b>Scalable storefronts & secure transactions.</b><br />
        Build your business on Shopify, WooCommerce, Stripe, or custom—catalogs, payments, and growth analytics included.
      </>
    ),
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps Consulting",
    description: (
      <>
        <b>Deploy, monitor, scale.</b><br />
        Expert cloud automation (AWS, Azure, GCP) and DevOps best practices: CI/CD, cost optimization, logging, and uptime.
      </>
    ),
  },
  {
    icon: "🚀",
    title: "Brand & Product Strategy",
    description: (
      <>
        <b>Position for growth.</b><br />
        Discovery sessions, digital branding, go-to-market—and clear success metrics for every launch or pivot.
      </>
    ),
  },
];

// ---- Service Cards Section ----
function ServicesSection() {
  const cardsRef = useRef([]);
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
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  // Cards entrance animation
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  // Card cursor radial effect
  useEffect(() => {
    const handleMove = (idx, e) => {
      const card = cardsRef.current[idx];
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    // Attach listeners
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMove(idx, e));
        card.addEventListener("mouseleave", () => {
          card.style.setProperty("--mouse-x", `-999px`);
          card.style.setProperty("--mouse-y", `-999px`);
        });
      }
    });

    // Cleanup
    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.onmousemove = null;
          card.onmouseleave = null;
        }
      });
    };
  }, []);

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 900px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.12) 0%, 
            rgba(94, 58, 197, 0.08) 30%, 
            rgba(44, 102, 255, 0.05) 60%, 
            transparent 75%), 
            radial-gradient(circle at 25% 25%, rgba(139, 69, 193, 0.08), transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(44, 102, 255, 0.06), transparent 70%),
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      {/* Enhanced card styles */}
      <style>{`
        .service-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .service-card::before {
          content: "";
          position: absolute;
          left: var(--mouse-x, -999px);
          top: var(--mouse-y, -999px);
          width: 280px;
          height: 280px;
          pointer-events: none;
          background: radial-gradient(circle, rgba(139,69,193,0.2) 0%, rgba(44,102,255,0.12) 50%, rgba(0,0,0,0) 80%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 70px rgba(139, 69, 193, 0.25);
          border-color: rgba(139, 69, 193, 0.5);
        }
        .icon-container {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.2), rgba(44, 102, 255, 0.15));
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .service-card:hover .icon-container {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.3), rgba(44, 102, 255, 0.25));
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>

      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12 sm:mb-16 relative z-10">
        <span className="inline-block bg-violet-900/30 px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-full text-violet-200 font-semibold tracking-wider mb-4 sm:mb-6 backdrop-blur-sm border border-violet-700/30">
          OUR SERVICES
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Solutions We are <span className="text-violet-300 font-extrabold">Deliver</span>
        </h2>
        <p className="text-blue-200/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Comprehensive technology solutions designed to accelerate your business growth and digital transformation.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative z-10">
        {SERVICES.map((svc, idx) => (
          <div
            key={svc.title}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="service-card border rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-start cursor-pointer shadow-lg min-h-[280px] sm:min-h-[320px] lg:min-h-[340px]"
            style={{
              background: "linear-gradient(125deg, rgba(10,20,36,0.65) 15%, rgba(25,38,66,0.45) 50%, rgba(45,28,82,0.35) 84%, rgba(44,102,255,0.25) 100%)",
              border: "1.5px solid rgba(44,122,255,0.2)",
            }}
          >
            {/* Content container with proper z-index */}
            <div className="relative z-10 w-full flex flex-col h-full">
              {/* Enhanced Icon Container */}
              <div className="icon-container w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border border-violet-700/30 shadow-lg">
                <span className="text-2xl sm:text-3xl lg:text-4xl filter drop-shadow-lg">
                  {svc.icon}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                {svc.title}
              </h4>

              {/* Description */}
              <div className="text-blue-200/90 leading-relaxed text-sm sm:text-base flex-grow">
                {svc.description}
              </div>

              {/* CTA Button */}
              <button className="mt-4 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-full hover:from-violet-500 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base border border-white/10 self-start">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}


// ---- Main Page with Banner and Service Cards ----
const Page = () => {
  useEffect(() => {
    gsap.from(".badge-row", { y: -40, opacity: 0, duration: 1, delay: 0.2 });
    gsap.from("h1", { y: 40, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(".extra", { scale: 2, opacity: 0, duration: 1, delay: 0.8, ease: "back.out(1.7)" });
    gsap.from(".desc", { y: 30, opacity: 0, duration: 1, delay: 1.1 });
    gsap.from(".cta-btn", { scale: 0.8, opacity: 0, duration: 0.8, delay: 1.4 });
  }, []);

  return (
    <>
      <Header />
      {/* ---- Banner Section ---- */}
      {/* <div
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{
          background: 'radial-gradient(circle at 25% 25%, #000108, #000439, #000a83, #010fcc, #0110fc)'
        }}
      >
        <div className="badge-row flex items-center gap-3 mb-8">
          <span className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-bold">
            2025
          </span>
          <button className="bg-blue-950/70 backdrop-blur-md text-neutral-100 rounded-md px-4 py-1 text-sm font-medium">
            Explore Our Portfolio
          </button>
        </div>
        <h1 className="text-5xl sm:text-6xl font-semibold mb-5 leading-tight">
          We are working on this page <br />
          <span className="extra text-6xl sm:text-7xl font-bold text-blue-400 tracking-tight"></span> coming soon.
        </h1>
        <p className="desc text-blue-200 mb-8 text-lg max-w-xl">
          We are working on this page<br />
          This page is coming soon.....
        </p>
        <button className="cta-btn bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-md py-3 px-8 shadow-lg hover:scale-105 transition">
          Build Your Product
        </button>
      </div> */}
       <SimpleBannerSection
      title="INTRODUCES OUR SERVICES"
      description="We provide end-to-end software development solutions — from idea to deployment. 
      Our expert team builds scalable, modern, and user-friendly applications tailored to your business needs."
    />

      {/* ---- Services Section ---- */}
      <ServicesSection />
      <ClientReview />
      <Footer/>
    </>
  );
};

export default Page;


// "use client";
// import React, { useEffect, useRef } from "react";
// import Header from '../component/Header';
// import gsap from "gsap";
// import ClientReview from "../component/clientReview";
// import Footer from "../component/Fotter";

// // ---- Services Data ----
// const SERVICES = [
//   {
//     icon: "💻",
//     title: "Custom Software Development",
//     description: (
//       <>
//         <b>Full-stack engineering</b> for web and mobile.<br />
//         We build cloud-ready platforms, mobile apps, and product integrations—from initial architecture to launch and ongoing support.<br />
//         <span className="text-blue-400">Tech expertise:</span> React, Node.js, Python, AWS, Next.js, and more.
//       </>
//     ),
//   },
//   {
//     icon: "🎨",
//     title: "UI/UX Design & Prototyping",
//     description: (
//       <>
//         <b>Human-centered design</b> at every touchpoint.<br />
//         Engaging wireframes, clickable prototypes, and beautiful final interfaces ensure your users connect instantly.<br />
//         <span className="text-blue-400">Includes:</span> Design sprints, user flows, rapid Figma/Sketch prototyping.
//       </>
//     ),
//   },
//   {
//     icon: "🤖",
//     title: "Automation & AI Integration",
//     description: (
//       <>
//         <b>Automate & accelerate</b> your business.<br />
//         We streamline manual workflows and embed AI or ML models—boosting productivity and unlocking new opportunities.<br />
//         <span className="text-blue-400">Examples:</span> AI chatbots, document bots, integrated APIs.
//       </>
//     ),
//   },
//   {
//     icon: "🛒",
//     title: "E-Commerce Solutions",
//     description: (
//       <>
//         <b>Scalable storefronts & secure transactions.</b><br />
//         Build your business on Shopify, WooCommerce, Stripe, or custom—catalogs, payments, and growth analytics included.
//       </>
//     ),
//   },
//   {
//     icon: "☁️",
//     title: "Cloud & DevOps Consulting",
//     description: (
//       <>
//         <b>Deploy, monitor, scale.</b><br />
//         Expert cloud automation (AWS, Azure, GCP) and DevOps best practices: CI/CD, cost optimization, logging, and uptime.
//       </>
//     ),
//   },
//   {
//     icon: "🚀",
//     title: "Brand & Product Strategy",
//     description: (
//       <>
//         <b>Position for growth.</b><br />
//         Discovery sessions, digital branding, go-to-market—and clear success metrics for every launch or pivot.
//       </>
//     ),
//   },
// ];

// // ---- Service Cards Section ----
// function ServicesSection() {
//   const cardsRef = useRef([]);

//   useEffect(() => {
//     gsap.from(cardsRef.current, {
//       opacity: 0,
//       y: 60,
//       duration: 1,
//       stagger: 0.15,
//       ease: "power3.out",
//       delay: 0.2,
//     });
//   }, []);

//   // For the cursor radial effect
//   useEffect(() => {
//     const handleMove = (idx, e) => {
//       const card = cardsRef.current[idx];
//       if (!card) return;
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       card.style.setProperty("--mouse-x", `${x}px`);
//       card.style.setProperty("--mouse-y", `${y}px`);
//     };

//     // Attach listeners
//     cardsRef.current.forEach((card, idx) => {
//       if (card) {
//         card.addEventListener("mousemove", (e) => handleMove(idx, e));
//         card.addEventListener("mouseleave", () => {
//           card.style.setProperty("--mouse-x", `-999px`);
//           card.style.setProperty("--mouse-y", `-999px`);
//         });
//       }
//     });
//     // Cleanup
//     return () => {
//       cardsRef.current.forEach((card) => {
//         if (card) {
//           card.onmousemove = null;
//           card.onmouseleave = null;
//         }
//       });
//     };
//   }, []);

//   return (
//     <section className="w-full bg-black py-20 px-2 flex flex-col items-center">
//       {/* Inline style for cards */}
//       <style>{`
//         .hover-gradient-card {
//           position: relative;
//           overflow: hidden;
//           transition: background 0.3s, border 0.3s;
//           background-image: linear-gradient(135deg, #10121a 30%, #142448 100%);
//           border: 1px solid #233c6c;
//         }
//         .hover-gradient-card::before {
//           content: "";
//           position: absolute;
//           left: var(--mouse-x, -999px);
//           top: var(--mouse-y, -999px);
//           width: 240px;
//           height: 240px;
//           pointer-events: none;
//           background: radial-gradient(circle, rgba(57,144,255,0.17) 0%, rgba(0,0,0,0) 80%);
//           transform: translate(-50%, -50%);
//           opacity: 0;
//           transition: opacity 0.3s;
//           z-index: 1;
//         }
//         .hover-gradient-card:hover::before {
//           opacity: 1;
//         }
//         /* REMOVED:
//         .hover-gradient-card:hover {
//           background-image: linear-gradient(135deg, #0c2e52 10%, #233c6c 100%);
//           border-color: #379afc;
//         }
//         */
//       `}</style>
//       <h2 className="text-blue-400 tracking-widest font-semibold text-lg mb-2">SERVICES</h2>
//       <h3 className="text-white text-3xl font-bold mb-10">Solutions We Offer</h3>
//       <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {SERVICES.map((svc, idx) => (
//           <div
//             key={svc.title}
//             ref={(el) => (cardsRef.current[idx] = el)}
//             className={`
//               hover-gradient-card border rounded-2xl p-8 flex flex-col items-start
//               transition-all duration-300
//               cursor-pointer
//               min-h-[270px]
//               z-0
//             `}
//           >
//             <span className="text-4xl mb-4">{svc.icon}</span>
//             <h4 className="text-xl font-bold text-blue-200 mb-3">{svc.title}</h4>
//             <div className="text-blue-300 leading-relaxed text-[1rem]">{svc.description}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ---- Main Page with Banner and Service Cards ----
// const Page = () => {
//   useEffect(() => {
//     gsap.from(".badge-row", { y: -40, opacity: 0, duration: 1, delay: 0.2 });
//     gsap.from("h1", { y: 40, opacity: 0, duration: 1, delay: 0.5 });
//     gsap.from(".extra", { scale: 2, opacity: 0, duration: 1, delay: 0.8, ease: "back.out(1.7)" });
//     gsap.from(".desc", { y: 30, opacity: 0, duration: 1, delay: 1.1 });
//     gsap.from(".cta-btn", { scale: 0.8, opacity: 0, duration: 0.8, delay: 1.4 });
//   }, []);

//   return (
//     <>
//       <Header />
//       {/* ---- Banner Section ---- */}
//       <div
//         className="relative min-h-screen flex flex-col items-center justify-center text-center"
//         style={{
//           background: 'radial-gradient(circle at 25% 25%, #000108, #000439, #000a83, #010fcc, #0110fc)'
//         }}
//       >
//         <div className="badge-row flex items-center gap-3 mb-8">
//           <span className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-bold">
//             2025
//           </span>
//           <button className="bg-blue-950/70 backdrop-blur-md text-neutral-100 rounded-md px-4 py-1 text-sm font-medium">
//             Explore Our Portfolio
//           </button>
//         </div>
//         <h1 className="text-5xl sm:text-6xl font-semibold mb-5 leading-tight">
//           We are working on this page <br />
//           <span className="extra text-6xl sm:text-7xl font-bold text-blue-400 tracking-tight"></span> coming soon.
//         </h1>
//         <p className="desc text-blue-200 mb-8 text-lg max-w-xl">
//           We are working on this page<br />
//           This page is coming soon.....
//         </p>
//         <button className="cta-btn bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-md py-3 px-8 shadow-lg hover:scale-105 transition">
//           Build Your Product
//         </button>
//       </div>

//       {/* ---- Services Section ---- */}
//       <ServicesSection />
//       <ClientReview />
//       <Footer/>
//     </>
//   );
// };

// export default Page;



//last backup

// "use client";
// import React, { useEffect, useRef } from "react";
// import Header from '../component/Header';
// import gsap from "gsap";
// import ClientReview from "../component/clientReview";
// import Footer from "../component/Fotter";

// // ---- Services Data ----
// const SERVICES = [
//   {
//     icon: "💻",
//     title: "Custom Software Development",
//     description: (
//       <>
//         <b>Full-stack engineering</b> for web and mobile.<br />
//         We build cloud-ready platforms, mobile apps, and product integrations—from initial architecture to launch and ongoing support.<br />
//         <span className="text-blue-400">Tech expertise:</span> React, Node.js, Python, AWS, Next.js, and more.
//       </>
//     ),
//   },
//   {
//     icon: "🎨",
//     title: "UI/UX Design & Prototyping",
//     description: (
//       <>
//         <b>Human-centered design</b> at every touchpoint.<br />
//         Engaging wireframes, clickable prototypes, and beautiful final interfaces ensure your users connect instantly.<br />
//         <span className="text-blue-400">Includes:</span> Design sprints, user flows, rapid Figma/Sketch prototyping.
//       </>
//     ),
//   },
//   {
//     icon: "🤖",
//     title: "Automation & AI Integration",
//     description: (
//       <>
//         <b>Automate & accelerate</b> your business.<br />
//         We streamline manual workflows and embed AI or ML models—boosting productivity and unlocking new opportunities.<br />
//         <span className="text-blue-400">Examples:</span> AI chatbots, document bots, integrated APIs.
//       </>
//     ),
//   },
//   {
//     icon: "🛒",
//     title: "E-Commerce Solutions",
//     description: (
//       <>
//         <b>Scalable storefronts & secure transactions.</b><br />
//         Build your business on Shopify, WooCommerce, Stripe, or custom—catalogs, payments, and growth analytics included.
//       </>
//     ),
//   },
//   {
//     icon: "☁️",
//     title: "Cloud & DevOps Consulting",
//     description: (
//       <>
//         <b>Deploy, monitor, scale.</b><br />
//         Expert cloud automation (AWS, Azure, GCP) and DevOps best practices: CI/CD, cost optimization, logging, and uptime.
//       </>
//     ),
//   },
//   {
//     icon: "🚀",
//     title: "Brand & Product Strategy",
//     description: (
//       <>
//         <b>Position for growth.</b><br />
//         Discovery sessions, digital branding, go-to-market—and clear success metrics for every launch or pivot.
//       </>
//     ),
//   },
// ];

// // ---- Service Cards Section ----
// function ServicesSection() {
//   const cardsRef = useRef([]);

//   useEffect(() => {
//     gsap.from(cardsRef.current, {
//       opacity: 0,
//       y: 60,
//       duration: 1,
//       stagger: 0.15,
//       ease: "power3.out",
//       delay: 0.2,
//     });
//   }, []);

//   // For the cursor radial effect
//   useEffect(() => {
//     const handleMove = (idx, e) => {
//       const card = cardsRef.current[idx];
//       if (!card) return;
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       card.style.setProperty("--mouse-x", `${x}px`);
//       card.style.setProperty("--mouse-y", `${y}px`);
//     };

//     // Attach listeners
//     cardsRef.current.forEach((card, idx) => {
//       if (card) {
//         card.addEventListener("mousemove", (e) => handleMove(idx, e));
//         card.addEventListener("mouseleave", () => {
//           card.style.setProperty("--mouse-x", `-999px`);
//           card.style.setProperty("--mouse-y", `-999px`);
//         });
//       }
//     });
//     // Cleanup
//     return () => {
//       cardsRef.current.forEach((card) => {
//         if (card) {
//           card.onmousemove = null;
//           card.onmouseleave = null;
//         }
//       });
//     };
//   }, []);

//   return (
//     <section className="w-full bg-black py-20 px-2 flex flex-col items-center">
//       {/* Inline style for cards */}
//       <style>{`
//         .hover-gradient-card {
//           position: relative;
//           overflow: hidden;
//           transition: background 0.3s, border 0.3s;
//           background-image: linear-gradient(135deg, #10121a 30%, #142448 100%);
//           border: 1px solid #233c6c;
//         }
//         .hover-gradient-card::before {
//           content: "";
//           position: absolute;
//           left: var(--mouse-x, -999px);
//           top: var(--mouse-y, -999px);
//           width: 240px;
//           height: 240px;
//           pointer-events: none;
//           background: radial-gradient(circle, rgba(57,144,255,0.17) 0%, rgba(0,0,0,0) 80%);
//           transform: translate(-50%, -50%);
//           opacity: 0;
//           transition: opacity 0.3s;
//           z-index: 1;
//         }
//         .hover-gradient-card:hover::before {
//           opacity: 1;
//         }
//         /* REMOVED:
//         .hover-gradient-card:hover {
//           background-image: linear-gradient(135deg, #0c2e52 10%, #233c6c 100%);
//           border-color: #379afc;
//         }
//         */
//       `}</style>
//       <h2 className="text-blue-400 tracking-widest font-semibold text-lg mb-2">SERVICES</h2>
//       <h3 className="text-white text-3xl font-bold mb-10">Solutions We Offer</h3>
//       <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {SERVICES.map((svc, idx) => (
//           <div
//             key={svc.title}
//             ref={(el) => (cardsRef.current[idx] = el)}
//             className={`
//               hover-gradient-card border rounded-2xl p-8 flex flex-col items-start
//               transition-all duration-300
//               cursor-pointer
//               min-h-[270px]
//               z-0
//             `}
//           >
//             <span className="text-4xl mb-4">{svc.icon}</span>
//             <h4 className="text-xl font-bold text-blue-200 mb-3">{svc.title}</h4>
//             <div className="text-blue-300 leading-relaxed text-[1rem]">{svc.description}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ---- Main Page with Banner and Service Cards ----
// const Page = () => {
//   useEffect(() => {
//     gsap.from(".badge-row", { y: -40, opacity: 0, duration: 1, delay: 0.2 });
//     gsap.from("h1", { y: 40, opacity: 0, duration: 1, delay: 0.5 });
//     gsap.from(".extra", { scale: 2, opacity: 0, duration: 1, delay: 0.8, ease: "back.out(1.7)" });
//     gsap.from(".desc", { y: 30, opacity: 0, duration: 1, delay: 1.1 });
//     gsap.from(".cta-btn", { scale: 0.8, opacity: 0, duration: 0.8, delay: 1.4 });
//   }, []);

//   return (
//     <>
//       <Header />
//       {/* ---- Banner Section ---- */}
//       <div
//         className="relative min-h-screen flex flex-col items-center justify-center text-center"
//         style={{
//           background: 'radial-gradient(circle at 25% 25%, #000108, #000439, #000a83, #010fcc, #0110fc)'
//         }}
//       >
//         <div className="badge-row flex items-center gap-3 mb-8">
//           <span className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-bold">
//             2025
//           </span>
//           <button className="bg-blue-950/70 backdrop-blur-md text-neutral-100 rounded-md px-4 py-1 text-sm font-medium">
//             Explore Our Portfolio
//           </button>
//         </div>
//         <h1 className="text-5xl sm:text-6xl font-semibold mb-5 leading-tight">
//           We are working on this page <br />
//           <span className="extra text-6xl sm:text-7xl font-bold text-blue-400 tracking-tight"></span> coming soon.
//         </h1>
//         <p className="desc text-blue-200 mb-8 text-lg max-w-xl">
//           We are working on this page<br />
//           This page is coming soon.....
//         </p>
//         <button className="cta-btn bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-md py-3 px-8 shadow-lg hover:scale-105 transition">
//           Build Your Product
//         </button>
//       </div>

//       {/* ---- Services Section ---- */}
//       <ServicesSection />
//       <ClientReview />
//       <Footer/>
//     </>
//   );
// };

// export default Page;
