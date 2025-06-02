import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import INFO from '../../data/user';

const HeroSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const logoRef = useRef();
  const photoRef = useRef();
  const backgroundShapeRef = useRef();
  const ctaButtonRef = useRef();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const logo = logoRef.current;
    const photo = photoRef.current;
    const backgroundShape = backgroundShapeRef.current;
    const ctaButton = ctaButtonRef.current;

    // Keep content visible by default (no blank sections)
    gsap.set([title, description, logo, photo, backgroundShape, ctaButton], {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      visibility: 'visible'
    });

    // Set initial animation states (subtle so content stays visible)
    gsap.set(logo, { opacity: 0.3, scale: 0.9 });
    gsap.set(title, { opacity: 0.3, y: 30 });
    gsap.set(description, { opacity: 0.3, y: 20 });
    gsap.set(ctaButton, { opacity: 0.3, y: 20 });
    gsap.set(photo, { opacity: 0.3, scale: 1.05, rotation: -3 });
    gsap.set(backgroundShape, { opacity: 0, scale: 0.7, rotation: 180 });

    // Use Intersection Observer for reliable viewport detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when 20% of element is visible
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          console.log('Hero section intersecting - triggering animation');
          hasAnimated.current = true;
          
          // Create and play animation with standardized timing
          const tl = gsap.timeline({ delay: 0.3 });
          
          tl.to(backgroundShape, {
            opacity: 0.1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out'
          })
          .to(photo, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.2)'
          }, '-=0.8')
          .to(logo, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
          }, '-=0.6')
          .to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          }, '-=0.6')
          .to(description, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.6')
          .to(ctaButton, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.2)'
          }, '-=0.4');
        }
      });
    }, observerOptions);

    // Start observing the section (Hero section should animate immediately)
    if (section) {
      // For hero section, trigger animation immediately
      setTimeout(() => {
        hasAnimated.current = true;
        
        // Create and play animation with standardized timing
        const tl = gsap.timeline({ delay: 0.3 });
        
        tl.to(backgroundShape, {
          opacity: 0.1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out'
        })
        .to(photo, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.2)'
        }, '-=0.8')
        .to(logo, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.6')
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.6')
        .to(description, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .to(ctaButton, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.2)'
        }, '-=0.4');
      }, 500);
    }

    return () => {
      // Clean up observer
      if (observer && section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section hero-section">
      <div ref={backgroundShapeRef} className="hero-background-shape"></div>
      
      <div className="hero-content">
        <div className="hero-left">
          <div ref={logoRef} className="hero-logo">
            {INFO.main.title}
          </div>
          <h1 ref={titleRef}>{INFO.homepage.title}</h1>
          <div ref={descriptionRef} className="hero-description">
            {INFO.homepage.description}
          </div>
          <div ref={ctaButtonRef} className="hero-cta">
            <button className="cta-button primary">Explore Research</button>
            <button className="cta-button secondary">Join Our Team</button>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="photo-container">
            <img 
              ref={photoRef}
              src={`${process.env.PUBLIC_URL}/Jinjun.jpg`}
              alt="Dr. Jinjun Xiong" 
              className="professor-photo"
              onError={(e) => {
                console.log('Image failed to load, trying alternative path');
                e.target.src = './Jinjun.jpg';
              }}
            />
            <div className="photo-decoration"></div>
          </div>
        </div>
      </div>
      
      <div className="hero-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
    </section>
  );
};

export default HeroSection; 