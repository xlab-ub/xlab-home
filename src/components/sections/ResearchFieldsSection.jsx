import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import INFO from '../../data/user';

const ResearchFieldsSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const scrollContainerRef = useRef();
  const cardsRef = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const scrollContainer = scrollContainerRef.current;

    // Keep content visible by default (no blank sections)
    gsap.set([title, scrollContainer, ...cards], { 
      opacity: 1, 
      y: 0,
      visibility: 'visible'
    });

    // Set initial animation states (subtle so content stays visible)
    gsap.set(title, { opacity: 0.3, y: 30 });
    gsap.set(scrollContainer, { opacity: 0.3, y: 20 });
    gsap.set(cards, { opacity: 0.3, y: 20 });

    // Use Intersection Observer for reliable viewport detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when 20% of element is visible
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          console.log('Research section intersecting - triggering animation');
          hasAnimated.current = true;
          
          // Create and play animation
          const tl = gsap.timeline();
          
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          })
          .to(scrollContainer, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.6')
          .to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.2)',
            stagger: 0.1
          }, '-=0.4');
        }
      });
    }, observerOptions);

    // Start observing the section
    if (section) {
      observer.observe(section);
    }

    // Add hover animations for cards
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
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
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Map project titles to appropriate emoji icons
  const getProjectIcon = (title) => {
    const iconMap = {
      'AI Algorithms': '🧠',
      'AI Solutions': '💡',
      'AI Systems': '⚡',
      'AI Accelerators': '🚀',
      'AI Security': '🔒',
      'AI Development Tools': '🛠️'
    };
    return iconMap[title] || '🔬';
  };

  return (
    <section ref={sectionRef} className="section research-section">
      <div className="research-content">
        <h2 ref={titleRef}>{INFO.homepage.subtitle1}</h2>
        <div ref={scrollContainerRef} className="horizontal-scroll-container">
          <div className="research-cards-horizontal">
            {INFO.projects && INFO.projects.length > 0 ? (
              INFO.projects.map((project, index) => (
                <div key={index} ref={addToRefs} className="research-card-horizontal">
                  <div className="card-header">
                    <div className="card-icon">
                      <span>{getProjectIcon(project.title)}</span>
                    </div>
                    <div className="card-number">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="card-footer">
                    <a href={project.link} className="card-link">
                      {project.linkText} →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: 'white', padding: '2rem' }}>
                No projects data found
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchFieldsSection; 