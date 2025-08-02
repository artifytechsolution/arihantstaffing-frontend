'use client';
import React from "react";

const StylishBlackFooter = () => (
  <footer className="w-full bg-black relative z-20 overflow-hidden border-t border-[#1a1a22]">
    {/* Glassy, blurred overlay */}
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none z-0" />

    <div className="relative z-10 max-w-7xl mx-auto py-12 px-6 md:px-14 flex flex-col md:flex-row md:gap-16 gap-10">
      {/* Left: Brand & Newsletter */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-tr from-violet-900 to-indigo-900 text-violet-100 font-bold text-2xl shadow-inner">X</div>
          <span className="text-2xl font-extrabold text-white tracking-wide">XTRACT</span>
        </div>
        <p className="text-sm text-zinc-400 mb-1 max-w-xs">
          Xtract – Automate Smarter, Optimize Faster, and Grow Stronger.
        </p>
        <div className="mt-2">
          <span className="font-semibold text-white/90 text-sm">Join our newsletter</span>
          <form className="mt-2 flex items-center rounded-lg overflow-hidden bg-zinc-800/70 border border-zinc-700 max-w-xs">
            <input
              type="email"
              placeholder="name@email.com"
              className="px-3 py-2 flex-1 bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none"
              autoComplete="email"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 font-semibold text-sm text-white transition border-l border-violet-800"
            >
              Subscribe
            </button>
          </form>
        </div>
        <small className="mt-2 text-zinc-500 text-xs opacity-80">Logo by flaticon</small>
      </div>

      {/* Right: Link Columns */}
      <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 gap-7 min-w-[250px]">
        <div>
          <span className="block font-semibold text-white mb-1 tracking-wide">Links</span>
          <ul className="flex flex-col gap-1.5">
            <li><a className="hover:text-violet-400 transition" href="#">Services</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Process</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Case Studies</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Benefits</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Pricing</a></li>
          </ul>
        </div>
        <div>
          <span className="block font-semibold text-white mb-1 tracking-wide">Pages</span>
          <ul className="flex flex-col gap-1.5">
            <li><a className="hover:text-violet-400 transition" href="#">Home</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">About</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Blog</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Contact</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">404</a></li>
          </ul>
        </div>
        <div>
          <span className="block font-semibold text-white mb-1 tracking-wide">Socials</span>
          <ul className="flex flex-col gap-1.5">
            <li><a className="hover:text-violet-400 transition" href="#">Instagram</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Facebook</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">LinkedIn</a></li>
            <li><a className="hover:text-violet-400 transition" href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
    </div>
    {/* Bottom bar */}
    <div className="relative border-t border-zinc-800 text-xs text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-3 py-6 px-6 md:px-14 max-w-7xl mx-auto">
      <span>Logo by flaticon</span>
      <span>
        Visioned and Crafted by <span className="text-white font-semibold">Kanishk Dubey</span>
      </span>
      <span>© All rights reserved</span>
    </div>
  </footer>
);

export default StylishBlackFooter;
