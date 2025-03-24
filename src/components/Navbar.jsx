import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isPastThreshold = currentScrollY > 200;

      if (isPastThreshold && isScrollingUp) {
        setIsScrolled(true);
      } else if (!isPastThreshold) {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavContent = () => (
    <div className="container">
      <Link to="/" onClick={closeMenu} className="logo-link">
        <div className="logo-container">
          <OptimizedImage
            src={IMAGES.LOGO.TEXT}
            alt="Your Pickleball Guide Costa Rica"
            width={150}
            height={75}
            loading="eager"
            className="logo-image"
          />
        </div>
      </Link>

      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>HOME</Link></li>
        <li><Link to="/training" onClick={closeMenu}>PICKLEBALL TRAINING</Link></li>
        <li><Link to="/tours" onClick={closeMenu}>TOURS</Link></li>
        <li><Link to="/blog" onClick={closeMenu}>BLOG</Link></li>
        <li><Link to="/about" onClick={closeMenu}>ABOUT</Link></li>
        <li><Link to="/contact" onClick={closeMenu} className="contact-button">Contact</Link></li>
      </ul>
    </div>
  );

  return (
    <>
      {/* Original header */}
      <header className="original-header">
        <NavContent />
      </header>

      {/* Fixed header */}
      <header className={`fixed-header ${isScrolled ? 'visible' : ''}`}>
        <NavContent />
      </header>

      <style>{`
        .original-header {
          width: 100%;
          background-color: var(--neutral-color);
          position: relative;
          z-index: 1;
        }

        .fixed-header {
          width: 100%;
          background-color: var(--neutral-color);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .fixed-header.visible {
          transform: translateY(0);
        }

        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-container {
          width: 150px;
          height: 75px;
          flex-shrink: 0;
        }

        .logo-image {
          border-radius: 0;
          object-fit: contain;
          object-position: center;
          background-color: transparent;
        }

        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-color);
        }

        .contact-button {
          padding: 8px 16px;
          background-color: var(--primary-color);
          color: var(--neutral-color) !important;
          border-radius: 20px;
        }

        @media (max-width: 865px) {
          .mobile-menu-button {
            display: block;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
          }

          .mobile-menu-button span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: var(--text-color);
            transition: 0.3s;
          }

          .nav-links {
            display: none;
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: var(--neutral-color);
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            flex-direction: column;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links li {
            width: 100%;
            text-align: center;
            margin-bottom: 15px;
          }

          .nav-links li:last-child {
            margin-bottom: 0;
          }

          .nav-links .contact-button {
            width: fit-content;
            margin: 10px auto;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;