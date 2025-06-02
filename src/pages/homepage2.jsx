import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import HeroSection from '../components/sections/HeroSection';
import ResearchFieldsSection from '../components/sections/ResearchFieldsSection';
import AnnouncementsSection from '../components/sections/AnnouncementsSection';
import './homepage2.css';

gsap.registerPlugin(ScrollTrigger);

const Homepage2 = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Hide body overflow to prevent double scrollbars
    document.body.style.overflow = 'hidden';

    // Force immediate visibility of all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
    });

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
    });

    // RAF for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    // Multiple refresh attempts to ensure everything works
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
      console.log('ScrollTrigger refreshed');
    };

    // Immediate refresh
    refreshScrollTrigger();
    
    // Delayed refresh
    setTimeout(refreshScrollTrigger, 100);
    setTimeout(refreshScrollTrigger, 500);
    setTimeout(refreshScrollTrigger, 1000);

    // Handle window events that might affect layout
    const handleResize = () => {
      setTimeout(refreshScrollTrigger, 100);
    };

    const handleLoad = () => {
      setTimeout(refreshScrollTrigger, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);

    // Clean up
    return () => {
      // Restore body overflow when component unmounts
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="homepage-container">
      <HeroSection />
      <ResearchFieldsSection />
      <AnnouncementsSection />
    </div>
  );
};

export default Homepage2;