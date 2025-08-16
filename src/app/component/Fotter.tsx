'use client';
import Image from "next/image";
import React from "react";
import logo from "../../../public/mainlogo.png";

const Footer = () => (
  <footer className="w-full relative z-20 overflow-hidden border-t border-violet-500/20" style={{
    background: `
      radial-gradient(circle 800px at 25% 25%, 
      rgba(139, 69, 193, 0.12) 0%, 
      rgba(94, 58, 197, 0.08) 30%, 
      rgba(44, 102, 255, 0.05) 60%, 
      transparent 75%), 
      radial-gradient(circle at 25% 25%, #0a1e4d 10%, #000000 90%)
    `
  }}>
    {/* Glassy, blurred overlay */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl pointer-events-none z-0" />

    <div className="relative z-10 max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Brand & Newsletter */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3 select-none">
            <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                  height={200}
                  priority
                  style={{ objectFit: "contain" }}
                />
          </div>
          
          <p className="text-sm sm:text-base text-blue-200/90 leading-relaxed max-w-md">
            Transforming ideas into powerful digital solutions. We craft innovative software that drives business growth and success.
          </p>
          
          <div className="mt-2">
            <h3 className="font-semibold text-white mb-3 text-base">Stay Updated</h3>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-blue-300/70 rounded-lg border border-violet-500/30 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all text-sm"
                autoComplete="email"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-blue-300/70 mt-2">
              Get updates on our latest projects and tech insights
            </p>
          </div>
        </div>

        {/* Right: Link Columns */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Services</h3>
            <ul className="flex flex-col gap-3">
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/services/web-development">Web Development</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/services/mobile-apps">Mobile Apps</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/services/ai-solutions">AI Solutions</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/services/cloud">Cloud Services</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/services/consulting">IT Consulting</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h3>
            <ul className="flex flex-col gap-3">
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/">Home</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/about">About Us</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/portfolio">Portfolio</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/careers">Careers</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Resources</h3>
            <ul className="flex flex-col gap-3">
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/blog">Blog</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/case-studies">Case Studies</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/documentation">Documentation</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/support">Support</a></li>
              <li><a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm" href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Connect</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm flex items-center gap-2" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <span>🐦</span> Twitter
                </a>
              </li>
              <li>
                <a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm flex items-center gap-2" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <span>💼</span> LinkedIn
                </a>
              </li>
              <li>
                <a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm flex items-center gap-2" href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <span>🐙</span> GitHub
                </a>
              </li>
              <li>
                <a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm flex items-center gap-2" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <span>📷</span> Instagram
                </a>
              </li>
              <li>
                <a className="text-blue-200/80 hover:text-violet-300 transition-colors text-sm flex items-center gap-2" href="mailto:artifytechsolutioncontact@gmail.com">
                  <span>📧</span> Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-8 border-t border-violet-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-blue-300/80">
            <span>© 2025 Artify Tech Solution. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-violet-300 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-violet-300 transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="text-xs text-blue-300/80 text-center md:text-right">
            <p>Crafted with ❤️ by <span className="text-violet-300 font-semibold">keval Khetani</span></p>
            <p className="mt-1">📍 Available Worldwide | 📞 +91 8154830172</p>
          </div>
        </div>
      </div>
    </div>

    {/* Decorative Background Elements */}
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl"></div>
    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
  </footer>
);

export default Footer;


//last backup

// 'use client';
// import React from "react";

// const Footer = () => (
//   <footer className="w-full bg-black relative z-20 overflow-hidden border-t border-[#1a1a22]">
//     {/* Glassy, blurred overlay */}
//     <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none z-0" />

//     <div className="relative z-10 max-w-7xl mx-auto py-12 px-6 md:px-14 flex flex-col md:flex-row md:gap-16 gap-10">
//       {/* Left: Brand & Newsletter */}
//       <div className="flex-1 flex flex-col gap-4">
//         <div className="flex items-center gap-3 select-none">
//           <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-tr from-violet-900 to-indigo-900 text-violet-100 font-bold text-2xl shadow-inner">X</div>
//           <span className="text-2xl font-extrabold text-white tracking-wide">XTRACT</span>
//         </div>
//         <p className="text-sm text-zinc-400 mb-1 max-w-xs">
//           Xtract – Automate Smarter, Optimize Faster, and Grow Stronger.
//         </p>
//         <div className="mt-2">
//           <span className="font-semibold text-white/90 text-sm">Join our newsletter</span>
//           <form className="mt-2 flex items-center rounded-lg overflow-hidden bg-zinc-800/70 border border-zinc-700 max-w-xs">
//             <input
//               type="email"
//               placeholder="name@email.com"
//               className="px-3 py-2 flex-1 bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none"
//               autoComplete="email"
//             />
//             <button
//               type="submit"
//               className="px-4 py-2 bg-violet-600 hover:bg-violet-700 font-semibold text-sm text-white transition border-l border-violet-800"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//         <small className="mt-2 text-zinc-500 text-xs opacity-80">Logo by flaticon</small>
//       </div>

//       {/* Right: Link Columns */}
//       <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 gap-7 min-w-[250px]">
//         <div>
//           <span className="block font-semibold text-white mb-1 tracking-wide">Links</span>
//           <ul className="flex flex-col gap-1.5">
//             <li><a className="hover:text-violet-400 transition" href="#">Services</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Process</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Case Studies</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Benefits</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Pricing</a></li>
//           </ul>
//         </div>
//         <div>
//           <span className="block font-semibold text-white mb-1 tracking-wide">Pages</span>
//           <ul className="flex flex-col gap-1.5">
//             <li><a className="hover:text-violet-400 transition" href="#">Home</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">About</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Blog</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Contact</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">404</a></li>
//           </ul>
//         </div>
//         <div>
//           <span className="block font-semibold text-white mb-1 tracking-wide">Socials</span>
//           <ul className="flex flex-col gap-1.5">
//             <li><a className="hover:text-violet-400 transition" href="#">Instagram</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Facebook</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">LinkedIn</a></li>
//             <li><a className="hover:text-violet-400 transition" href="#">Twitter</a></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//     {/* Bottom bar */}
//     <div className="relative border-t border-zinc-800 text-xs text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-3 py-6 px-6 md:px-14 max-w-7xl mx-auto">
//       <span>Logo by flaticon</span>
//       <span>
//         Visioned and Crafted by <span className="text-white font-semibold">Kanishk Dubey</span>
//       </span>
//       <span>© All rights reserved</span>
//     </div>
//   </footer>
// );

// export default Footer;

