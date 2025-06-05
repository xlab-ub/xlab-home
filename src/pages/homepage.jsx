import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Lenis from '@studio-freight/lenis';
import NavBar from '../components/common/navBar';
import HeroSection from '../components/sections/HeroSection';
import ResearchFieldsSection from '../components/sections/ResearchFieldsSection';
import AnnouncementsSection from '../components/sections/AnnouncementsSection';
import SponsorsSection from '../components/sections/SponsorsSection';
import './styles/homepage.css';

const Homepage = () => {
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

    // Initialize Lenis smooth scrolling with optimized settings
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2,
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

    gsap.ticker.lagSmoothing(0);

    // Handle window events that might affect layout
    const handleResize = () => {
      console.log('Window resized - sections refreshed');
    };

    const handleLoad = () => {
      console.log('Window loaded - sections ready');
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
    };
  }, []);

  return (
    <>
      {/* Experimental Navbar - positioned above content */}
      <NavBar active="home" />
      
      {/* Homepage Content Container */}
      <div ref={containerRef} className="homepage-container">
        <HeroSection />
        <ResearchFieldsSection />
        <AnnouncementsSection />
        <SponsorsSection />
      </div>
    </>
  );
};

export default Homepage;