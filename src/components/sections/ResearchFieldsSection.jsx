import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import INFO from '../../data/user';

const ResearchFieldsSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const scrollContainerRef = useRef();
  const cardsRef = useRef([]);
  const progressBarRef = useRef();
  const progressTextRef = useRef();
  const hasAnimated = useRef(false);
  const scrollHijacking = useRef(false);
  const cardScrollProgress = useRef(0);
  const totalCards = useRef(0);
  const lastScrollDirection = useRef('down');

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const scrollContainer = scrollContainerRef.current;
    const progressBar = progressBarRef.current;
    const progressText = progressTextRef.current;

    totalCards.current = cards.length;

    // Keep content visible by default (no blank sections)
    gsap.set([title, scrollContainer, ...cards, progressBar, progressText], { 
      opacity: 1, 
      y: 0,
      x: 0,
      visibility: 'visible'
    });

    // Set initial animation states (subtle so content stays visible)
    gsap.set(title, { opacity: 0.3, y: 30 });
    gsap.set(scrollContainer, { opacity: 0.3, y: 20 });
    gsap.set(cards, { opacity: 0.3, y: 20 });
    gsap.set(progressBar, { opacity: 0, scaleX: 0 });
    gsap.set(progressText, { opacity: 0 });

    // Use Intersection Observer for reliable viewport detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          console.log('Research section intersecting - triggering animation');
          hasAnimated.current = true;
          
          // Create and play initial animation
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
            stagger: 0.15
          }, '-=0.4')
          .to(progressBar, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          }, '-=0.2')
          .to(progressText, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          }, '-=0.3');

          // Enable scroll hijacking after initial animation
          setTimeout(() => {
            scrollHijacking.current = true;
            console.log('Scroll hijacking enabled for research section');
          }, 2000);
        } else if (entry.isIntersecting && hasAnimated.current) {
          // Re-entering section after initial animation - re-enable hijacking
          setTimeout(() => {
            if (!scrollHijacking.current) {
              scrollHijacking.current = true;
              console.log('Re-enabling scroll hijacking for research section');
            }
          }, 500);
        }
      });
    }, observerOptions);

    // Scroll hijacking logic
    const handleWheel = (e) => {
      if (!scrollHijacking.current) return;

      const sectionRect = section.getBoundingClientRect();
      const isInSection = sectionRect.top <= 100 && sectionRect.bottom >= window.innerHeight - 100;

      if (isInSection) {
        e.preventDefault();
        
        const delta = e.deltaY;
        const scrollSpeed = 0.003;
        const newProgress = Math.max(0, Math.min(1, cardScrollProgress.current + (delta * scrollSpeed)));
        
        // Track scroll direction for visual feedback
        lastScrollDirection.current = delta > 0 ? 'down' : 'up';
        
        if (newProgress !== cardScrollProgress.current) {
          cardScrollProgress.current = newProgress;
          updateCardPositions();
          updateProgress();
        }

        // Handle section exit for scroll down (forward)
        if (cardScrollProgress.current >= 1 && delta > 0) {
          scrollHijacking.current = false;
          console.log('Exiting research section - scrolling to next section');
          setTimeout(() => {
            // Scroll to next section
            const nextSection = section.nextElementSibling;
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        }
        
        // Handle section exit for scroll up (backward)
        if (cardScrollProgress.current <= 0 && delta < 0) {
          scrollHijacking.current = false;
          console.log('Exiting research section - scrolling to previous section');
          setTimeout(() => {
            // Scroll to previous section
            const prevSection = section.previousElementSibling;
            if (prevSection) {
              prevSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        }
      }
    };

    const updateCardPositions = () => {
      const maxTranslate = (totalCards.current - 1) * 380; // Card width + gap
      const translateX = -cardScrollProgress.current * maxTranslate;
      
      gsap.to(scrollContainer.querySelector('.research-cards-horizontal'), {
        x: translateX,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Add individual card animations based on progress with enhanced effects
      cards.forEach((card, index) => {
        const cardProgress = Math.max(0, Math.min(1, (cardScrollProgress.current * totalCards.current) - index));
        const scale = 1 + (cardProgress * 0.1);
        const brightness = 0.8 + (cardProgress * 0.3);
        
        // Enhanced focus effects - highlight the current active card
        const isActiveCard = Math.floor(cardScrollProgress.current * totalCards.current) === index;
        const activeScale = isActiveCard ? 1.05 : scale;
        const activeBrightness = isActiveCard ? 1.1 : brightness;
        
        gsap.to(card, {
          scale: activeScale,
          filter: `brightness(${activeBrightness})`,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Add subtle glow effect for active card
        if (isActiveCard) {
          gsap.to(card, {
            boxShadow: '0 20px 60px rgba(30, 86, 160, 0.4), 0 0 30px rgba(255, 255, 255, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(card, {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    };

    const updateProgress = () => {
      // Update progress bar with smooth animation
      gsap.to(progressBar, {
        scaleX: cardScrollProgress.current,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Update progress text with current card info
      const currentCard = Math.floor(cardScrollProgress.current * totalCards.current) + 1;
      const clampedCard = Math.min(currentCard, totalCards.current);
      const displayCard = cardScrollProgress.current === 0 ? 1 : clampedCard;
      
      if (progressText) {
        progressText.textContent = `${displayCard} / ${totalCards.current}`;
        
        // Add subtle highlight animation when card changes
        gsap.fromTo(progressText, 
          { scale: 1 },
          { scale: 1.1, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
        );
      }
    };

    // Start observing the section
    if (section) {
      observer.observe(section);
    }

    // Add wheel event listener for scroll hijacking
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Add hover animations for cards
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!scrollHijacking.current) return;
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        if (!scrollHijacking.current) return;
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      // Clean up observer and event listeners
      if (observer && section) {
        observer.unobserve(section);
      }
      window.removeEventListener('wheel', handleWheel);
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
        
        {/* Progress Indicator */}
        <div className="scroll-progress-container">
          <div className="scroll-progress-bar">
            <div ref={progressBarRef} className="scroll-progress-fill"></div>
          </div>
          <div ref={progressTextRef} className="scroll-progress-text">1 / {INFO.projects?.length || 6}</div>
        </div>
        
        <div ref={scrollContainerRef} className="horizontal-scroll-container hijacked">
          <div className="research-cards-horizontal hijacked">
            {INFO.projects && INFO.projects.length > 0 ? (
              INFO.projects.map((project, index) => (
                <div key={index} ref={addToRefs} className="research-card-horizontal hijacked">
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
        
        {/* Scroll Instructions */}
        <div className="scroll-instructions">
          <p>Scroll up ↑ or down ↓ to navigate research areas</p>
        </div>
      </div>
    </section>
  );
};

export default ResearchFieldsSection; 