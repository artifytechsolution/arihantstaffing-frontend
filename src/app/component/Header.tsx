/* eslint-disable react/display-name */
// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/mainlogo.png";
import Link from "next/link";

const Header = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = "" }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on window resize
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

    const navLinks = [
      { href: "/home", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ];

    return (
      <>
        <header
          ref={ref}
          className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/5 backdrop-blur-xl border-b border-violet-400/20"
              : "bg-transparent backdrop-blur-md"
          } ${className}`}
          style={{
            background: isScrolled
              ? "rgba(255, 255, 255, 0.02)"
              : "transparent",
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
          }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20 md:pl-20">
              {/* Logo */}
              <div className="flex-shrink-0 relative w-32 h-12">
                <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                  height={200}
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm lg:text-base font-medium text-blue-100 hover:text-violet-200 transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                ))}
              </nav>

              {/* Desktop CTA Button */}
              <div className="hidden md:flex items-center">
                <Link
                  href="/contact"
                  className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm lg:text-base font-semibold bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#1e40af] text-white shadow-lg transition-all duration-300 hover:from-[#6d28d9] hover:to-[#272390] hover:scale-105 hover:shadow-xl backdrop-blur-sm"
                >
                  Book Now
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-violet-200 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 backdrop-blur-sm"
                  aria-expanded="false"
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    className={`h-6 w-6 transition-transform duration-200 ${
                      isMobileMenuOpen ? "rotate-45" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
            style={{
              background: "rgba(0, 0, 0, 0.3)",
            }}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] border-l border-violet-400/20 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "saturate(200%) blur(30px)",
            WebkitBackdropFilter: "saturate(200%) blur(30px)",
            boxShadow: "-10px 0 50px rgba(139, 69, 193, 0.2)",
          }}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-violet-400/20">
              <div className="text-xl font-bold text-violet-200">Menu</div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg text-violet-200 hover:text-white hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
                aria-label="Close mobile menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block text-lg font-medium text-blue-100 hover:text-violet-200 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-violet-400/30"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile CTA Button */}
            <div className="p-6 border-t border-violet-400/20">
              <a
                href="#appointment"
                onClick={closeMobileMenu}
                className="block w-full px-6 py-3 text-center rounded-full text-base font-semibold bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#1e40af] text-white shadow-lg transition-all duration-300 hover:from-[#6d28d9] hover:to-[#272390] hover:scale-105 backdrop-blur-sm"
              >
                Book Appointment
              </a>
            </div>

            {/* Mobile Contact Info */}
            <div className="p-6 border-t border-violet-400/10">
              <div
                className="text-center p-4 rounded-xl"
                style={{
                  background: "rgba(139, 69, 193, 0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <p className="text-sm text-blue-300 mb-2 font-semibold">
                  Get In Touch
                </p>
                <p className="text-xs text-blue-200 mb-1">hello@youragency.com</p>
                <p className="text-xs text-blue-200">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Header;


//last backup


// /* eslint-disable react/display-name */
// // components/Header.js
// import React from 'react';

// const Header = React.forwardRef(({ className = "" }, ref) => (
//   <header
//     ref={ref}
//     className={`sticky top-0 bg-transparent z-30 flex justify-between items-center px-6 md:px-14 py-6 text-white backdrop-blur-md ${className}`}
//     style={{ transition: 'background 0.3s' }}
//   >
//     <div className="text-3xl font-extrabold tracking-wide text-violet-200 drop-shadow-sm">
//       YourAgency
//     </div>
//     <nav className="hidden md:flex gap-8 text-base font-medium text-blue-100">
//       <a href="/home" className="hover:text-violet-100 hover:underline transition">Home</a>
//        <a href="/services" className="hover:text-violet-100 hover:underline transition">Services</a>
//       <a href="/portfolio" className="hover:text-violet-100 hover:underline transition">Portfolio</a>
//       <a href="/about" className="hover:text-violet-100 hover:underline transition">About</a>
//       <a href="/contact" className="hover:text-violet-100 hover:underline transition">Contact</a>
//     </nav>
//     <div className="flex items-center gap-4">
//       <div className="text-sm md:text-base text-blue-300 hidden md:block font-mono drop-shadow">
       
//       </div>
//       <a
//         href="#appointment"
//         className="px-4 py-2 ml-2 rounded-full text-base font-semibold bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#1e40af] text-white shadow-md transition hover:from-[#6d28d9] hover:to-[#272390]"
//       >
//         Appointment Now
//       </a>
//     </div>
//   </header>
// ));

// export default Header;
