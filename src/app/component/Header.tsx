/* eslint-disable react/display-name */
// components/Header.js
import React from 'react';

const Header = React.forwardRef(({ className = "" }, ref) => (
  <header
    ref={ref}
    className={`sticky top-0 bg-transparent z-30 flex justify-between items-center px-6 md:px-14 py-6 text-white backdrop-blur-md ${className}`}
    style={{ transition: 'background 0.3s' }}
  >
    <div className="text-3xl font-extrabold tracking-wide text-violet-200 drop-shadow-sm">
      YourAgency
    </div>
    <nav className="hidden md:flex gap-8 text-base font-medium text-blue-100">
      <a href="http://localhost:3000/" className="hover:text-violet-100 hover:underline transition">Home</a>
       <a href="/services" className="hover:text-violet-100 hover:underline transition">Services</a>
      <a href="/portfolio" className="hover:text-violet-100 hover:underline transition">Portfolio</a>
      <a href="/about" className="hover:text-violet-100 hover:underline transition">About</a>
      <a href="/contact" className="hover:text-violet-100 hover:underline transition">Contact</a>
    </nav>
    <div className="flex items-center gap-4">
      <div className="text-sm md:text-base text-blue-300 hidden md:block font-mono drop-shadow">
       
      </div>
      <a
        href="#appointment"
        className="px-4 py-2 ml-2 rounded-full text-base font-semibold bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#1e40af] text-white shadow-md transition hover:from-[#6d28d9] hover:to-[#272390]"
      >
        Appointment Now
      </a>
    </div>
  </header>
));

export default Header;
