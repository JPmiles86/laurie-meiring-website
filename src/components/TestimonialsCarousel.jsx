import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const testimonials = [
  {
    id: 1,
    name: 'Tara Miller',
    text: 'If you want to level up your pickleball game quickly, Laurie is the man! He is a excellent coach who gives you diversity in training, he challenges you to go to the next level while still being very encouraging.',
    rating: 5
  },
  {
    id: 2,
    name: 'Liam Miller',
    text: 'Since training with Laurie, I have gotten so much better, fast. In the Last Tournament I played I won Two Golds',
    rating: 5
  },
  {
    id: 3,
    name: 'JP Miles',
    text: 'Laurie is just a fucking awesome guy all round and so passionate about Pickleball, its infectious. His energy and authenticity make every interaction memorable',
    rating: 5
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

  const testimonialIndex = Math.abs(page % testimonials.length);

  const paginate = (newDirection) => {
    if (!isAnimating) {
      setPage([page + newDirection, newDirection]);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
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
              padding: '20px'
            }}
          >
            <div style={{
              backgroundColor: 'var(--neutral-color)',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "{testimonials[testimonialIndex].text}"
              </div>
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1.5rem',
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
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--primary-color)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--neutral-color)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease'
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
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--primary-color)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--neutral-color)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease'
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
        marginTop: '20px'
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