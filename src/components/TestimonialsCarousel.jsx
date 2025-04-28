import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import OptimizedImage from './OptimizedImage';

const testimonials = [
  {
    id: 1,
    name: 'Tara Miller',
    text: 'If you want to level up your pickleball game quickly, Laurie is the man! He is a excellent coach who gives you diversity in training, he challenges you to go to the next level while still being very encouraging.',
    rating: 5,
    image: '/ home/TaraGold.jpg'
  },
  {
    id: 2,
    name: 'Liam Miller',
    text: 'Since training with Laurie, I have gotten so much better, fast. In the Last Tournament I played I won Two Golds Medals',
    rating: 5,
    image: '/ home/LiamGold.jpg'
  },
  {
    id: 3,
    name: 'JP Miles',
    text: 'Laurie is an awesome guy all round and so passionate about Pickleball, its infectious. His energy and positivity make him an amazing partner to play with and I have improved so much since training with him.',
    rating: 5,
    image: '/testimonials/JPLaurie.jpg'
  },
  {
    id: 4,
    name: 'Lisa DiPaoli',
    text: 'Working with Laurie transformed my pickleball game! He quickly spotted habits to tweak and gave me the confidence to level up. Patient, encouraging, and full of great tips!',
    rating: 5,
    image: '/testimonials/LisaLaurie1.jpg'
  },
  {
    id: 5,
    name: 'Lisle Head',
    text: 'Laurie is a total game-changer! In just three lessons, his clear and focused coaching—plus the use of video feedback—has helped me break bad habits, understand my game better, and level up faster than I ever expected.',
    rating: 5,
    image: '/testimonials/LisleLaurie1.jpg'
  }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

function TestimonialsCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonialIndex = Math.abs(page % testimonials.length);

  const paginate = (newDirection) => {
    if (!isAnimating) {
      setPage([page + newDirection, newDirection]);
    }
  };

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      paginate(1);
    } else if (isRightSwipe) {
      paginate(-1);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px 0 60px',
      overflow: 'visible',
      minHeight: isMobile ? '550px' : '500px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div 
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '40px'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            style={{
              position: 'absolute',
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center',
              padding: '0 50px'
            }}
          >
            <div style={{
              backgroundColor: 'var(--neutral-color)',
              borderRadius: '15px',
              padding: isMobile ? '30px 35px 40px' : '40px 40px 50px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{
                width: isMobile ? '150px' : '250px',
                height: isMobile ? '150px' : '250px',
                margin: '0 auto 25px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid var(--primary-color)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}>
                <OptimizedImage
                  src={testimonials[testimonialIndex].image}
                  alt={testimonials[testimonialIndex].name}
                  width={250}
                  height={250}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                fontSize: isMobile ? '1rem' : '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "{testimonials[testimonialIndex].text}"
              </div>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                color: 'var(--primary-color)',
                marginBottom: '5px'
              }}>
                {testimonials[testimonialIndex].name}
              </div>
              <div style={{
                color: 'var(--text-color)',
                opacity: 0.8,
                fontSize: '1rem'
              }}>
                {testimonials[testimonialIndex].role}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--primary-color)',
          border: 'none',
          borderRadius: '50%',
          width: isMobile ? '30px' : '40px',
          height: isMobile ? '30px' : '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--neutral-color)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
          zIndex: 20,
          fontSize: '18px',
          fontWeight: 'bold'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
        aria-label="Previous testimonial"
      >
        ←
      </button>
      <button
        onClick={() => paginate(1)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--primary-color)',
          border: 'none',
          borderRadius: '50%',
          width: isMobile ? '30px' : '40px',
          height: isMobile ? '30px' : '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--neutral-color)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
          zIndex: 20,
          fontSize: '18px',
          fontWeight: 'bold'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
        aria-label="Next testimonial"
      >
        →
      </button>

      {/* Dots Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        position: 'absolute',
        bottom: '20px',
        left: '0',
        right: '0',
        zIndex: 30
      }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > testimonialIndex ? 1 : -1])}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === testimonialIndex ? 'var(--primary-color)' : 'var(--text-color)',
              opacity: index === testimonialIndex ? 1 : 0.3,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialsCarousel; 