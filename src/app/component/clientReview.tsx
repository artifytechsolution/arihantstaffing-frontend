"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const testimonials = [
  {
    text: "Artify Tech transformed our business with incredible AI solutions. Their expertise in automation truly exceeded all our expectations!",
    name: "Dean Watson",
    title: "Managing Director : Farmland",
    img: "👨‍💼"  // Man in business suit
  },
  {
    text: "The team provided game-changing insights that helped us optimize processes and scale operations faster than we imagined.",
    name: "Emily Zhang", 
    title: "CEO : Futuresync",
    img: "👩‍💼"  // Woman in business suit
  },
  {
    text: "Their AI tools revolutionized how we work, saving countless hours and driving our productivity to new heights.",
    name: "James Carter",
    title: "Marketing Director : Innolystic", 
    img: "👨‍💻"  // Man technologist
  },
  {
    text: "Working with Artify Tech has been seamless. Their solutions are both innovative and highly effective for our needs.",
    name: "Liam Walker",
    title: "Product Manager : Brightpath",
    img: "👨‍🔬"  // Man scientist
  },
  {
    text: "Thanks to their expertise, we've achieved incredible growth by automating tasks and improving accuracy across all departments.",
    name: "Miguel Torres",
    title: "IT Consultant : Alphaedge", 
    img: "👨‍🎓"  // Man student/graduate
  },
  {
    text: "The development team delivered outstanding results, improving our efficiency beyond what we thought was possible!",
    name: "Priya Sharma",
    title: "Founder : NexGen",
    img: "👩‍🚀"  // Woman astronaut
  }
];

const ClientReview = () => {
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

  // Card entrance animations
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

  // Individual card spotlight radial effect
  useEffect(() => {
    const listeners = [];
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--card-x", `${x}px`);
        card.style.setProperty("--card-y", `${y}px`);
      };
      const onLeave = () => {
        card.style.setProperty("--card-x", "-200px");
        card.style.setProperty("--card-y", "-200px");
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      listeners.push({ card, onMove, onLeave });
    });
    return () => {
      listeners.forEach(({ card, onMove, onLeave }) => {
        if (card) {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
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

      {/* Card spotlight styles */}
      <style>{`
        .testimonial-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .testimonial-card::before {
          content: "";
          pointer-events: none;
          position: absolute;
          left: var(--card-x, -200px);
          top: var(--card-y, -200px);
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(139,69,193,0.2) 0%, rgba(44,102,255,0.12) 50%, rgba(0,0,0,0) 80%);
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
          z-index: 1;
          border-radius: 1.5rem;
        }
        .testimonial-card:hover::before {
          opacity: 1;
        }
        .testimonial-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 70px rgba(139, 69, 193, 0.25);
          border-color: rgba(139, 69, 193, 0.5);
        }
        .emoji-avatar {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.3), rgba(44, 102, 255, 0.2));
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          border: 2px solid rgba(139, 69, 193, 0.3);
        }
        .testimonial-card:hover .emoji-avatar {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.4), rgba(44, 102, 255, 0.3));
          transform: scale(1.1) rotate(5deg);
          border-color: rgba(139, 69, 193, 0.5);
        }
      `}</style>

      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12 sm:mb-16 relative z-10">
        <span className="inline-block bg-violet-900/30 px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-full text-violet-200 font-semibold tracking-wider mb-4 sm:mb-6 backdrop-blur-sm border border-violet-700/30">
          Client Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Trusted by <span className="text-violet-300 font-extrabold">Satisfied Clients</span>
        </h2>
        <p className="text-blue-200/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Discover how we've driven growth and innovation for businesses across various industries.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative z-10">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            ref={el => (cardsRef.current[idx] = el)}
            className="testimonial-card border rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer shadow-lg min-h-[280px] sm:min-h-[320px]"
            style={{
              background: "linear-gradient(125deg, rgba(10,20,36,0.65) 15%, rgba(25,38,66,0.45) 50%, rgba(45,28,82,0.35) 84%, rgba(44,102,255,0.25) 100%)",
              border: "1.5px solid rgba(44,122,255,0.2)",
            }}
          >
            {/* Content with proper z-index */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Testimonial Text */}
              <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                "{item.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                {/* Human Face Emoji Avatar */}
                <div className="emoji-avatar w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl sm:text-2xl filter drop-shadow-lg" role="img" aria-label={item.name}>
                    {item.img}
                  </span>
                </div>

                {/* Name and Title */}
                <div className="flex-1">
                  <div className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-sm">
                    {item.name}
                  </div>
                  <div className="text-blue-200/80 text-xs sm:text-sm mt-1">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ClientReview;


//last backup

// "use client";
// import React, { useRef, useEffect } from "react";
// import { gsap } from "gsap";

// const testimonials = [
//   {
//     text: "Radison transformed our workflow with incredible AI solutions. Their expertise truly exceeded all expectations!",
//     name: "Dean Watson",
//     title: "Managing Director : Farmland",
//     img: "/images/dean.jpg"
//   },
//   {
//     text: "Radison provided game-changing insights that helped us optimize processes and scale operations fast.",
//     name: "Emily Zhang",
//     title: "CEO : Futuresync",
//     img: "/images/emily.jpg"
//   },
//   {
//     text: "Radison’s AI tools revolutionized how we work, saving time and driving our productivity forward.",
//     name: "James Carter",
//     title: "Marketing Director : Innolystic",
//     img: "/images/james.jpg"
//   },
//   {
//     text: "Working with Radison has been seamless. Their solutions are both innovative and highly effective.",
//     name: "Liam Walker",
//     title: "Product Manager : Brightpath",
//     img: "/images/liam.jpg"
//   },
//   {
//     text: "Thanks to Radison, we’ve achieved incredible growth by automating tasks and improving accuracy.",
//     name: "Miguel Torres",
//     title: "IT Consultant : Alphaedge",
//     img: "/images/miguel.jpg"
//   },
//   {
//     text: "The team at Radison delivered outstanding results, improving our efficiency beyond what we imagined!",
//     name: "Priya Sharma",
//     title: "Founder : NexGen",
//     img: "/images/priya.jpg"
//   }
// ];

// const ClientReview = () => {
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

//   // Spotlight radial effect on hover
//   useEffect(() => {
//     const listeners = [];
//     cardsRef.current.forEach((card, idx) => {
//       if (!card) return;
//       const onMove = (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         card.style.setProperty("--x", `${x}px`);
//         card.style.setProperty("--y", `${y}px`);
//       };
//       const onLeave = () => {
//         card.style.setProperty("--x", `-200px`);
//         card.style.setProperty("--y", `-200px`);
//       };
//       card.addEventListener("mousemove", onMove);
//       card.addEventListener("mouseleave", onLeave);
//       listeners.push({ card, onMove, onLeave });
//     });
//     return () => {
//       listeners.forEach(({ card, onMove, onLeave }) => {
//         if (card) {
//           card.removeEventListener("mousemove", onMove);
//           card.removeEventListener("mouseleave", onLeave);
//         }
//       });
//     };
//   }, []);

//   return (
//     <section className="w-full bg-black py-20 px-2 flex flex-col items-center">
//       <style>{`
//         .testi-spotlight-card {
//           position: relative;
//           overflow: hidden;
//           border: 1px solid #233c6c;
//           background-image: linear-gradient(135deg, #10121a 30%, #142448 100%);
//           transition: box-shadow 0.27s, background-image 0.30s, border-color 0.27s;
//         }
//         .testi-spotlight-card::before {
//           content: "";
//           pointer-events: none;
//           position: absolute;
//           left: var(--x, -200px);
//           top: var(--y, -200px);
//           width: 220px;
//           height: 220px;
//           background: radial-gradient(circle, rgba(57,144,255,0.13) 0%, rgba(0,0,0,0) 80%);
//           opacity: 0;
//           transform: translate(-50%, -50%);
//           transition: opacity 0.23s;
//           z-index: 2;
//         }
//         .testi-spotlight-card:hover::before {
//           opacity: 1;
//         }
//         /* Remove background/border color change on hover for pure radial effect */
//       `}</style>
//       <button className="bg-blue-900 text-blue-100 rounded-lg py-1.5 px-6 mb-5 pointer-events-none">
//         Testimonials
//       </button>
//       <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-center">
//         Trusted by satisfied clients
//       </h2>
//       <p className="mb-10 text-blue-100 text-center max-w-xl">
//         Discover how we’ve driven growth and innovation.
//       </p>
//       <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {testimonials.map((item, idx) => (
//           <div
//             key={idx}
//             ref={el => (cardsRef.current[idx] = el)}
//             className={`
//               testi-spotlight-card rounded-2xl p-8 flex flex-col justify-between min-h-[260px]
//               transition-all duration-300 cursor-pointer
//             `}
//           >
//             <p className="text-blue-100 text-base mb-5 relative z-10 leading-relaxed">
//               "{item.text}"
//             </p>
//             <div className="flex items-center gap-4 mt-auto relative z-10">
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-12 h-12 rounded-md object-cover border border-blue-600 bg-blue-950"
//                 style={{ flexShrink: 0 }}
//               />
//               <div>
//                 <div className="font-semibold text-white">{item.name}</div>
//                 <div className="text-blue-200 text-sm">{item.title}</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ClientReview;

