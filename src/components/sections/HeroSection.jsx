import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import INFO from '../../data/user';

const HeroSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const logoRef = useRef();
  const photoRef = useRef();
  const backgroundShapeRef = useRef();
  const ctaButtonRef = useRef();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const logo = logoRef.current;
    const photo = photoRef.current;
    const backgroundShape = backgroundShapeRef.current;
    const ctaButton = ctaButtonRef.current;

    // Set initial states
    gsap.set([title, description, ctaButton], {
      opacity: 0,
      y: 50
    });

    gsap.set(logo, {
      opacity: 0,
      scale: 0.8
    });

    gsap.set(photo, {
      opacity: 0,
      scale: 1.1,
      rotation: -5
    });

    gsap.set(backgroundShape, {
      opacity: 0,
      scale: 0.5,
      rotation: 180
    });

    // Create animation timeline
    const tl = gsap.timeline({
      delay: 0.3
    });

    // Add animations to timeline
    tl.to(backgroundShape, {
      opacity: 0.1,
      scale: 1,
      rotation: 0,
      duration: 1.5,
      ease: 'power2.out'
    })
    .to(photo, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'back.out(1.2)'
    }, '-=1')
    .to(logo, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.5)'
    }, '-=0.8')
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .to(description, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .to(ctaButton, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
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