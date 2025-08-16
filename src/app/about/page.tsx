"use client"
import React, { useEffect } from 'react'
import Header from '../component/Header';
import gsap from "gsap";
import Ownportfolio from '../component/ownportfolio';
import StaffingAgencyMixedGlass from '../sample1/page';
import WhyChooseUsSection from '../component/feature';
import Footer from '../component/Fotter';
import JoinNow from '../component/joinnow';
import SimpleBannerSection from '../component/annimatedBannerSection';

const page = () => {
  useEffect(() => {
    gsap.from(".badge-row", { y: -40, opacity: 0, duration: 1, delay: 0.2 });
    gsap.from("h1", { y: 40, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(".extra", { scale: 2, opacity: 0, duration: 1, delay: 0.8, ease: "back.out(1.7)" });
    gsap.from(".desc", { y: 30, opacity: 0, duration: 1, delay: 1.1 });
    gsap.from(".cta-btn", { scale: 0.8, opacity: 0, duration: 0.8, delay: 1.4 });
  }, []);

  return (
    <>
    <Header/>
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
        Check Out Some <br />
        <span className="extra text-6xl sm:text-7xl font-bold text-blue-400 tracking-tight">Extra–Ordinary</span> Work.
      </h1>
      <p className="desc text-blue-200 mb-8 text-lg max-w-xl">
        From startups to established brands, we create<br />
        tailored solutions that drive success and make a real impact.
      </p>
      <button className="cta-btn bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-md py-3 px-8 shadow-lg hover:scale-105 transition">
        Build Your Product
      </button>
    </div> */}
   <SimpleBannerSection
  title="Who We Are ??"
  description="Full-cycle software development—from concept to launch. We craft scalable, modern, and user-friendly applications tailored to your business goals."
/>

   
   <StaffingAgencyMixedGlass/>
   <WhyChooseUsSection />
   <Ownportfolio/>
   <Footer/>
 
    </>
  );
}

export default page