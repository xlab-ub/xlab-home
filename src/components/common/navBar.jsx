import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/navBar.css";

const NavBar = (props) => {
    const { active } = props;
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially on component mount

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/hide navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setNavbarVisible(false);
            } else {
                // Scrolling up
                setNavbarVisible(true);
            }

            // Add scrolled class for style changes
            setIsScrolled(currentScrollY > 50);
            
            setLastScrollY(currentScrollY);
        };

        // Set up scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Clean up function
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Close mobile menu when clicking on a link
    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <React.Fragment>
            <div className="nav-container">
                <nav className={`navbar ${navbarVisible ? '' : 'hidden'} ${isScrolled ? 'scrolled' : ''}`}>
                    <div className={isOpen ? "nav-background open" : "nav-background"}>
                        {/* Modern Brand Section */}
                        <Link to="/xlab-home/" className="nav-brand" onClick={handleLinkClick}>
                            XLab
                        </Link>

                        {/* Minimalist Mobile Menu Toggle */}
                        <button 
                            className={`menu-toggle ${isOpen ? 'open' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            <span></span>
                        </button>

                        {/* Clean Navigation List */}
                        <ul className="nav-list" style={{ display: window.innerWidth >= 768 || isOpen ? "flex" : "none" }}>
                            <li className={active === "home" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/" onClick={handleLinkClick}>Home</Link>
                            </li>
                            <li className={active === "bio" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/bio" onClick={handleLinkClick}>About</Link>
                            </li>
                            <li className={active === "research" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/research" onClick={handleLinkClick}>Research</Link>
                            </li>
                            <li className={active === "publications" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/publications" onClick={handleLinkClick}>Publications</Link>
                            </li>
                            <li className={active === "opensource" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/opensource" onClick={handleLinkClick}>Opensource</Link>
                            </li>
                            <li className={active === "team" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/team" onClick={handleLinkClick}>Team</Link>
                            </li>
                            <li className={active === "events" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/events" onClick={handleLinkClick}>Events</Link>
                            </li>
                            <li className={active === "blog" ? "nav-item active" : "nav-item"}>
                                <Link to="/xlab-home/blog" onClick={handleLinkClick}>Blog</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </React.Fragment>
    );
};

export default NavBar;

