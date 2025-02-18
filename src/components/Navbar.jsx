import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Show navbar immediately when scrolling up, hide when scrolling down
      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav style={{ 
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      backgroundColor: 'var(--neutral-color)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transform: `translateY(${visible ? '0' : '-100%'})`,
      transition: 'transform 0.3s ease',
      boxShadow: visible ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          textDecoration: 'none',
          flexShrink: 0
        }}>
          <div style={{ width: '75px', height: '75px', flexShrink: 0 }}>
            <OptimizedImage
              src={IMAGES.PROFILE.AI_GENERATED}
              alt="Laurie Meiring"
              width={75}
              height={75}
              loading="eager"
              style={{
                borderRadius: '50%',
                border: '2px solid var(--secondary-color)'
              }}
            />
          </div>
          <span style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.5rem', 
            color: 'var(--text-color)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.5px'
          }}>
            LAURIE MEIRING
          </span>
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
            <Link to="/pickleball" style={{
              textDecoration: 'none',
              color: 'var(--text-color)',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>
              PICKLEBALL
            </Link>
          </li>
          <li>
            <Link to="/chef" style={{
              textDecoration: 'none',
              color: 'var(--text-color)',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>
              CHEF SERVICES
            </Link>
          </li>
          <li>
            <Link to="/marketing" style={{
              textDecoration: 'none',
              color: 'var(--text-color)',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>
              MARKETING
            </Link>
          </li>
          <li>
            <Link to="/about" style={{
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
            <Link to="/contact" style={{
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
          }
          .nav-links li {
            width: 100%;
            text-align: center;
          }
          .nav-links .contact-button {
            width: fit-content;
            margin: 10px auto;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;