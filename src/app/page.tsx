'use client';
import React, { useRef, useEffect, useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

// Your business sections/components
import StaffingAgencyBlack from './sample1/page';
import WhyChooseUsSection from './component/feature';
import QAAccordionCleanExample from './component/QA';
import Footer from './component/Fotter';
import Header from './component/Header';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  return (
    <h1>this is a simple exmaple</h1>
  );
};

export default HomePage;
