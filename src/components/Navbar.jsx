import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;

      // Show navbar when scrolling up or at the top, hide when scrolling down
      setVisible(isScrollingUp || isAtTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to handle navigation and close menu
  const handleNavigation = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ 
          type: 'spring', 
          stiffness: 100, 
          damping: 20,
          mass: 1
        }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'var(--neutral-color)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="container" style={{ 
          maxWidth: '100%', 
          margin: '0 auto', 
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Link to="/" onClick={closeMenu} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            textDecoration: 'none',
            flexShrink: 0
          }}>
            <div style={{ width: '75px', height: '75px', flexShrink: 0 }}>
              <OptimizedImage
                src={IMAGES.LOGO.ROUND}
                alt="Your Pickleball Guide Costa Rica"
                width={75}
                height={75}
                loading="eager"
                style={{
                  borderRadius: '50%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  border: '2px solid var(--secondary-color)',
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: 'block',
              width: '25px',
              height: '2px',
              background: 'var(--text-color)',
              marginBottom: '5px',
              transition: '0.3s'
            }}></span>
            <span style={{
              display: 'block',
              width: '25px',
              height: '2px',
              background: 'var(--text-color)',
              marginBottom: '5px',
              transition: '0.3s'
            }}></span>
            <span style={{
              display: 'block',
              width: '25px',
              height: '2px',
              background: 'var(--text-color)',
              transition: '0.3s'
            }}></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            display: 'flex', 
            gap: '40px',
            alignItems: 'center'
          }}>
            <li>
              <Link to="/" onClick={closeMenu} style={{
                textDecoration: 'none',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/training" onClick={closeMenu} style={{
                textDecoration: 'none',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}>
                PICKLEBALL TRAINING
              </Link>
            </li>
            <li>
              <Link to="/tours" onClick={closeMenu} style={{
                textDecoration: 'none',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}>
                TOURS
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeMenu} style={{
                textDecoration: 'none',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}>
                BLOG
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu} style={{
                textDecoration: 'none',
                color: 'var(--text-color)',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu} style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                padding: '10px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                textTransform: 'uppercase'
              }}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .mobile-menu-button {
              display: block !important;
            }
            .nav-links {
              display: none !important;
              width: 100%;
              position: absolute;
              top: 100%;
              left: 0;
              background-color: var(--neutral-color);
              padding: 20px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              z-index: 1000;
            }
            .nav-links.open {
              display: flex !important;
              flex-direction: column;
              padding: 20px 20px 30px 20px !important;
            }
            .nav-links li {
              width: 100%;
              text-align: center;
              margin-bottom: 15px;
            }
            .nav-links li:last-child {
              margin-bottom: 0;
              padding-bottom: 10px;
            }
            .nav-links .contact-button {
              width: fit-content;
              margin: 10px auto;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}

export default Navbar;