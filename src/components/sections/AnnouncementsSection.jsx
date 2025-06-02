import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import INFO from '../../data/user';

const AnnouncementsSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const scrollContainerRef = useRef();
  const itemsRef = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const items = itemsRef.current.filter(Boolean);
    const scrollContainer = scrollContainerRef.current;

    // Keep content visible by default (no blank sections)
    gsap.set([title, scrollContainer, ...items], { 
      opacity: 1, 
      y: 0,
      x: 0,
      visibility: 'visible'
    });

    // Set initial animation states (subtle so content stays visible)
    gsap.set(title, { opacity: 0.3, y: 30 });
    gsap.set(scrollContainer, { opacity: 0.3, y: 20 });
    gsap.set(items, { opacity: 0.3, x: -30 });

    // Use Intersection Observer for reliable viewport detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when 20% of element is visible
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          console.log('Announcements section intersecting - triggering animation');
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
          .to(items, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'back.out(1.2)',
            stagger: 0.15
          }, '-=0.4');
        }
      });
    }, observerOptions);

    // Start observing the section
    if (section) {
      observer.observe(section);
    }

    // Add hover animations for cards
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
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
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="section announcements-section">
      <div className="announcements-content">
        <h2 ref={titleRef}>{INFO.homepage.subtitle2}</h2>
        <div ref={scrollContainerRef} className="horizontal-scroll-container">
          <div className="news-cards-horizontal">
            {INFO.news && INFO.news.length > 0 ? (
              INFO.news.map((newsItem, index) => (
                <div key={index} ref={addToRefs} className="news-card-horizontal">
                  <div className="news-date">{newsItem.date}</div>
                  <p className="news-description">{newsItem.description}</p>
                  <a href={newsItem.link} className="news-link" target="_blank" rel="noopener noreferrer">
                    Read More →
                  </a>
                </div>
              ))
            ) : (
              <div style={{ color: 'white', padding: '2rem' }}>
                No news data found
              </div>
            )}
          </div>
        </div>
        <div className="scroll-indicator">
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection; 