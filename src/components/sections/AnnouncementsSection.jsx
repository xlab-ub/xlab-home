import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import INFO from '../../data/user';

const AnnouncementsSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const scrollContainerRef = useRef();
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const items = itemsRef.current.filter(Boolean);
    const scrollContainer = scrollContainerRef.current;

    // Set initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set(scrollContainer, { opacity: 0, y: 30 });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none none',
        markers: false
      }
    });

    // Add animations to timeline
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
    }, '-=0.5')
    .to(items, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1
    }, '-=0.3');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
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
            {INFO.news.map((newsItem, index) => (
              <div key={index} ref={addToRefs} className="news-card-horizontal">
                <div className="news-date">{newsItem.date}</div>
                <p className="news-description">{newsItem.description}</p>
                <a href={newsItem.link} className="news-link" target="_blank" rel="noopener noreferrer">
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll horizontally to see more news →</span>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection; 