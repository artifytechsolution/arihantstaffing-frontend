"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const socialIcons = [
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
  { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
];

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const backgroundRef = useRef();
  const cardRef = useRef();
  const leftSectionRef = useRef();
  const formFieldsRef = useRef([]);

  // Background cursor shade effect - KEEPING THIS
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

  // REMOVED: Card hover effect

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        leftSectionRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.3 }
      );

      gsap.fromTo(
        formFieldsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    setTimeout(() => {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setIsSubmitting(false);
          setTimeout(() => setSubmitStatus(null), 5000);
        },
      });
    }, 1500);
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative overflow-hidden">
      {/* Background cursor shade effect */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 1000px at var(--bg-x, 50%) var(--bg-y, 50%), 
            rgba(139, 69, 193, 0.15) 0%, 
            rgba(94, 58, 197, 0.10) 25%, 
            rgba(44, 102, 255, 0.08) 50%, 
            transparent 70%), 
            radial-gradient(circle at 25% 25%, rgba(139, 69, 193, 0.08), transparent 70%),
            radial-gradient(circle at 75% 75%, rgba(44, 102, 255, 0.06), transparent 70%),
            linear-gradient(135deg, #0a1e4d 0%, #000000 100%)
          `,
          transition: "background 0.2s ease-out",
          zIndex: -1,
        }}
      />

      {/* Enhanced Glass Effect Styles - REMOVED CARD MOUSE EFFECT */}
      <style>{`
        .glass-contact-card {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: saturate(200%) blur(30px);
          -webkit-backdrop-filter: saturate(200%) blur(30px);
          border: 2px solid rgba(139, 69, 193, 0.3);
          border-radius: 2rem;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(139, 69, 193, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-contact-card:hover {
          transform: translateY(-8px);
          border-color: rgba(139, 69, 193, 0.5);
          box-shadow: 
            0 40px 100px rgba(0, 0, 0, 0.4),
            0 0 120px rgba(139, 69, 193, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .glass-left-section {
          background: linear-gradient(
            135deg, 
            rgba(0, 0, 0, 0.3) 0%, 
            rgba(139, 69, 193, 0.1) 50%,
            rgba(44, 102, 255, 0.05) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-right-section {
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(139, 69, 193, 0.05) 50%,
            rgba(44, 102, 255, 0.03) 100%
          );
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
        }
        
        .glass-input {
          background: rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(139, 69, 193, 0.3);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          color: white;
          border-radius: 12px;
          padding: 14px 16px;
          transition: all 0.3s ease;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .glass-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(139, 69, 193, 0.6);
          box-shadow: 
            0 0 0 3px rgba(139, 69, 193, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 8px 32px rgba(139, 69, 193, 0.2);
          transform: translateY(-2px);
        }
        
        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .glass-button {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.8), rgba(44, 102, 255, 0.8));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(139, 69, 193, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: linear-gradient(135deg, rgba(139, 69, 193, 0.9), rgba(44, 102, 255, 0.9));
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 12px 40px rgba(139, 69, 193, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .glass-social-icon {
          background: rgba(139, 69, 193, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .glass-social-icon:hover {
          background: rgba(139, 69, 193, 0.4);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 25px rgba(139, 69, 193, 0.3);
        }
        
        .glass-notification {
          background: rgba(34, 197, 94, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
          animation: slideInGlass 0.5s ease-out;
        }
        
        @keyframes slideInGlass {
          from { 
            transform: translateX(100%) scale(0.8); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
        }
        
        .glass-badge {
          background: rgba(139, 69, 193, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 4px 15px rgba(139, 69, 193, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="glass-badge inline-block px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-full text-white font-semibold tracking-wider mb-4 sm:mb-6">
            📞 Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Let's Build Something <span className="text-violet-300 font-extrabold">Amazing Together</span>
          </h2>
          <p className="text-blue-200/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Share your vision with us and let's create innovative solutions.
          </p>
        </div>

        {/* Glass Contact Card - NO MOUSE EFFECT */}
        <div
          ref={cardRef}
          className="glass-contact-card overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Section */}
            <div
              ref={leftSectionRef}
              className="glass-left-section p-8 sm:p-12 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                  Let's Elevate <br />
                  Your Digital <br />
                  <span className="text-violet-300">Presence</span>
                </h3>
                
                <p className="text-blue-200/90 mb-8 text-base sm:text-lg leading-relaxed">
                  Transform your ideas into reality with our expert development team. We're here to help you succeed.
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-blue-200">
                    <span className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center text-sm backdrop-blur-sm">📧</span>
                    <span className="text-sm sm:text-base">artifytechsolutioncontact@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200">
                    <span className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center text-sm backdrop-blur-sm">📞</span>
                    <span className="text-sm sm:text-base">+91 8154830172</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200">
                    <span className="w-8 h-8 bg-violet-600/20 rounded-full flex items-center justify-center text-sm backdrop-blur-sm">📍</span>
                    <span className="text-sm sm:text-base">Available Worldwide</span>
                  </div>
                </div>
              </div>

           
            </div>

            {/* Right Section - Form */}
            <div className="glass-right-section p-8 sm:p-12 relative">
              {/* Success Notification */}
              {submitStatus && (
                <div className="glass-notification absolute top-4 right-4 px-4 py-3 rounded-lg text-white font-semibold z-20">
                  ✅ Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div ref={el => (formFieldsRef.current[0] = el)}>
                  <label className="block text-blue-200 text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`glass-input w-full ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div ref={el => (formFieldsRef.current[1] = el)}>
                  <label className="block text-blue-200 text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`glass-input w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div ref={el => (formFieldsRef.current[2] = el)}>
                  <label className="block text-blue-200 text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="glass-input w-full"
                  />
                </div>

                {/* Subject Field */}
                <div ref={el => (formFieldsRef.current[3] = el)}>
                  <label className="block text-blue-200 text-sm font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Discussion"
                    className={`glass-input w-full ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message Field */}
                <div ref={el => (formFieldsRef.current[4] = el)}>
                  <label className="block text-blue-200 text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className={`glass-input w-full resize-none ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  ref={el => (formFieldsRef.current[5] = el)}
                  className={`glass-button w-full text-white font-bold py-4 px-6 rounded-xl text-base sm:text-lg ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-56 sm:w-80 lg:w-96 h-56 sm:h-80 lg:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ContactCard;

//last backup

// "use client"
// import React, { useState, useEffect } from 'react';
// import { gsap } from 'gsap';

// const socialIcons = [
//   { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
//   { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
//   { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
//   { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://facebook.com' },
// ];

// const ContactCard = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   useEffect(() => {
//     // GSAP Animations
//     gsap.from('.contact-card', {
//       opacity: 0,
//       y: 100,
//       duration: 1,
//       ease: 'power3.out',
//     });
//     gsap.from('.left-section > div', {
//       opacity: 0,
//       x: -50,
//       duration: 0.8,
//       stagger: 0.2,
//       ease: 'power2.out',
//       delay: 0.3,
//     });
//     gsap.from('.form-field', {
//       opacity: 0,
//       x: 50,
//       duration: 0.8,
//       stagger: 0.2,
//       ease: 'power2.out',
//       delay: 0.5,
//     });
//     gsap.from('.submit-button', {
//       opacity: 0,
//       scale: 0.8,
//       duration: 0.8,
//       ease: 'elastic.out(1, 0.5)',
//       delay: 1,
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate form submission
//     setTimeout(() => {
//       gsap.to('.contact-card', {
//         scale: 0.95,
//         duration: 0.2,
//         yoyo: true,
//         repeat: 1,
//         ease: 'power2.inOut',
//         onComplete: () => {
//           setSubmitStatus('success');
//           setFormData({ name: '', email: '', message: '' });
//           setIsSubmitting(false);
//           setTimeout(() => setSubmitStatus(null), 3000);
//         },
//       });
//     }, 1000);
//   };

//   return (
//     <div className='flex justify-center py-[100px]'>
//     <div className="contact-card bg-gradient-to-br from-black to-blue-900 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative mx-4">
//       {/* Left Section */}
//       <div className="left-section flex-1 py-12 px-12 flex flex-col justify-between bg-black/80">
//         <div>
//           <button className="bg-blue-950 text-blue-200 px-6 py-2 rounded-full text-sm font-medium mb-8 hover:bg-blue-800 transition-colors duration-300">
//             Contact Us
//           </button>
//           <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
//             Let's Elevate <br /> Your Social <br /> Media
//           </h1>
//           <p className="text-blue-200 mb-12 max-w-sm">
//             Let’s boost your brand’s social media reach today!
//           </p>
//         </div>
//         <div>
//           <span className="text-sm font-medium text-white">Follow Us:</span>
//           <div className="flex gap-5 mt-4">
//             {socialIcons.map((item) => (
//               <a
//                 href={item.url}
//                 aria-label={item.name}
//                 key={item.name}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`${item.icon} text-xl cursor-pointer transition-colors duration-200 text-blue-300 hover:text-blue-100`}
//               >
//                 <i className={item.icon}></i>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Form */}
//       <div className="flex-1 bg-blue-950/90 p-12 flex flex-col gap-6 min-w-[340px] relative">
//         {submitStatus === 'success' && (
//           <div className="form-field absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg">
//             Form submitted successfully!
//           </div>
//         )}
//         <div className="form-field">
//           <label className="text-blue-200 text-[1rem] font-semibold flex flex-col gap-2">
//             Name
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Jane Smith"
//               required
//               className="p-3 text-white bg-blue-900/50 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
//             />
//           </label>
//         </div>
//         <div className="form-field">
//           <label className="text-blue-200 text-[1rem] font-semibold flex flex-col gap-2">
//             Email
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="jane@framer.com"
//               required
//               className="p-3 text-white bg-blue-900/50 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
//             />
//           </label>
//         </div>
//         <div className="form-field">
//           <label className="text-blue-200 text-[1rem] font-semibold flex flex-col gap-2">
//             Message
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleInputChange}
//               placeholder="Your message here..."
//               rows={4}
//               required
//               className="p-3 text-white bg-blue-900/50 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none resize-none transition-all duration-300"
//             />
//           </label>
//         </div>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className={`submit-button mt-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold rounded-full py-3 text-[1.1rem] ${
//             isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {isSubmitting ? 'Submitting...' : 'Contact Us Now!'}
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ContactCard;
