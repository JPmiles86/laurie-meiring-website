import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import VideoBackground from '../components/VideoBackground';
import PageTransition from '../components/PageTransition';
import { IMAGES } from '../constants/images';
import { Link } from 'react-router-dom';

function PickleballPage() {
  const pricingPlans = [
    {
      title: 'Single Session',
      price: '$75',
      duration: '90 minutes',
      features: [
        'One-on-one coaching',
        'Skill assessment',
        'Personalized tips',
        'Video analysis',
        'Equipment recommendations'
      ]
    },
    {
      title: 'Weekly Package',
      price: '$280',
      duration: '4 sessions',
      features: [
        'Four 90-minute sessions',
        'Progress tracking',
        'Detailed feedback',
        'Strategy development',
        'Tournament preparation'
      ],
      featured: true
    },
    {
      title: 'Tour Package',
      price: 'From $599',
      duration: '3 days',
      features: [
        'Daily coaching sessions',
        'Surfing experience',
        'Local adventures',
        'Equipment provided',
        'Transportation included'
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="pickleball-page">
        <VideoBackground
          videoId="S1zJYUjbXg8"
          startTime={0}
          endTime={30}
          height="80vh"
          overlayColor="rgba(0, 0, 0, 0.4)"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <h1 style={{ 
              color: 'var(--neutral-color)',
              fontSize: '3.5rem',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Pickleball in Paradise
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              maxWidth: '800px', 
              margin: '20px auto',
              color: 'var(--neutral-color)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              Level up your game with professional coaching in the beautiful setting of Jaco, Costa Rica
            </p>
          </div>
        </VideoBackground>

        <section className="achievements" style={{ 
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Championship Experience</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div className="medal-gallery" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              <OptimizedImage
                src={IMAGES.PICKLEBALL.MEDAL_1}
                alt="Championship Medal"
                width={280}
                height={280}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'rotate(-2deg)'
                }}
              />
              <OptimizedImage
                src={IMAGES.PICKLEBALL.MEDAL_2}
                alt="Tournament Victory"
                width={280}
                height={280}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'rotate(2deg)'
                }}
              />
            </div>
            <div className="achievement-content">
              <h3>Professional Coaching</h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                With tournament experience and a passion for teaching, I bring competitive insights 
                and proven strategies to help players of all levels improve their game.
              </p>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: '20px 0'
              }}>
                {['Certified Coach', 'Tournament Champion', 'Strategy Expert', 'Technical Analysis'].map((item, index) => (
                  <li key={index} style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ color: 'var(--secondary-color)', fontSize: '1.2rem' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pricing" style={{
          padding: '80px 20px',
          backgroundColor: 'var(--neutral-color)',
          borderTop: '2px dashed var(--secondary-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Training Packages</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              alignItems: 'stretch'
            }}>
              {pricingPlans.map((plan, index) => (
                <div key={index} className="pricing-card" style={{
                  padding: '40px 30px',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: plan.featured ? '2px solid var(--secondary-color)' : 'none',
                  transform: plan.featured ? 'scale(1.05)' : 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>{plan.title}</h3>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    color: 'var(--text-color)',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>{plan.price}</div>
                  <div style={{ 
                    color: 'var(--text-color)',
                    marginBottom: '20px',
                    opacity: 0.8
                  }}>{plan.duration}</div>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '20px 0'
                  }}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={{
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ color: 'var(--secondary-color)' }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="button" style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '20px',
                    backgroundColor: plan.featured ? 'var(--secondary-color)' : 'var(--primary-color)',
                    color: plan.featured ? 'var(--text-color)' : 'var(--neutral-color)'
                  }}>
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="adventure-tours" style={{
          padding: '80px 20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div className="tour-content">
                <h2>Combine Sport & Adventure</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                  Make your pickleball training unforgettable by combining it with surfing and local adventures. 
                  Experience the best of Jaco while improving your game.
                </p>
                <ul style={{ 
                  listStyle: 'none',
                  padding: 0,
                  margin: '20px 0'
                }}>
                  {[
                    'Professional pickleball coaching',
                    'Surfing lessons for all levels',
                    'Local cuisine experience',
                    'Beautiful beach locations',
                    'Transportation included'
                  ].map((feature, index) => (
                    <li key={index} style={{
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ color: 'var(--secondary-color)', fontSize: '1.2rem' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="button" style={{
                  display: 'inline-block',
                  marginTop: '20px'
                }}>
                  Plan Your Adventure
                </Link>
              </div>
              <div className="tour-image">
                <OptimizedImage
                  src={IMAGES.LOCATIONS.SURF}
                  alt="Surfing in Jaco"
                  width={600}
                  height={400}
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default PickleballPage;