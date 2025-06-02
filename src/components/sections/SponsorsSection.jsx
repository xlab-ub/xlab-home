import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import INFO from '../../data/user';

const SponsorsSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const logosContainerRef = useRef();
  const logoRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const logosContainer = logosContainerRef.current;
    const logos = logoRefs.current.filter(Boolean);

    // Keep content visible by default (no blank sections)
    gsap.set([title, logosContainer, ...logos], { 
      opacity: 1, 
      y: 0,
      scale: 1,
      visibility: 'visible'
    });

    // Set initial animation states (subtle so content stays visible)
    gsap.set(title, { opacity: 0.3, y: 30 });
    gsap.set(logosContainer, { opacity: 0.3, y: 20 });
    gsap.set(logos, { opacity: 0.3, scale: 0.8, y: 20 });

    // Use Intersection Observer for reliable viewport detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when 20% of element is visible
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          console.log('Sponsors section intersecting - triggering animation');
          hasAnimated.current = true;
          
          // Create and play animation
          const tl = gsap.timeline();
          
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          })
          .to(logosContainer, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.6')
          .to(logos, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            stagger: 0.2
          }, '-=0.4');
        }
      });
    }, observerOptions);

    // Start observing the section
    if (section) {
      observer.observe(section);
    }

    // Add hover animations for logos
    logos.forEach(logo => {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      // Clean up observer
      if (observer && section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !logoRefs.current.includes(el)) {
      logoRefs.current.push(el);
    }
  };

  const sponsors = [
    {
      name: 'IBM',
      logo: 'IBM.png',
      alt: 'IBM'
    },
    {
      name: 'NSF',
      logo: 'NSF.png',
      alt: 'National Science Foundation'
    },
    {
      name: 'University at Buffalo',
      logo: 'UB.png',
      alt: 'University at Buffalo'
    }
  ];

  return (
    <section ref={sectionRef} className="section sponsors-section">
      <div className="sponsors-content">
        <h2 ref={titleRef}>{INFO.homepage.subtitle4}</h2>
        <div ref={logosContainerRef} className="sponsors-logos-container">
          <div className="sponsors-logos">
            {sponsors.map((sponsor, index) => (
              <div key={index} ref={addToRefs} className="sponsor-logo">
                <img 
                  src={`${process.env.PUBLIC_URL}/${sponsor.logo}`}
                  alt={sponsor.alt}
                  onError={(e) => {
                    console.log(`Sponsor logo failed to load: ${sponsor.logo}`);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sponsors-description">
          <p>XLab is proudly supported by leading institutions and organizations in advancing AI research and innovation.</p>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection; 