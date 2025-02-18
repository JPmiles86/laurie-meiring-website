import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';
import { Link } from 'react-router-dom';

function ChefPage() {
  const culinaryServices = [
    {
      title: 'Private Dining',
      price: 'From $150 per person',
      description: 'Intimate dining experiences in your space',
      features: [
        'Customized multi-course menu',
        'Wine pairing options',
        'Dietary accommodations',
        'Full service setup and cleanup',
        'Special occasion planning'
      ]
    },
    {
      title: 'Group Events',
      price: 'From $85 per person',
      description: 'Perfect for gatherings and celebrations',
      features: [
        'Flexible menu options',
        'Buffet or plated service',
        'Event coordination',
        'Staff service available',
        'Local ingredient sourcing'
      ]
    },
    {
      title: 'Cooking Classes',
      price: 'From $95 per person',
      description: 'Learn to create local and international dishes',
      features: [
        'Hands-on instruction',
        'Recipe collection',
        'Ingredient education',
        'Wine and cocktail pairing',
        'Take-home tips and tricks'
      ]
    }
  ];

  const cuisineStyles = [
    'Farm-to-Table Costa Rican',
    'Fresh Seafood Specialties',
    'International Fusion',
    'Plant-Based Options',
    'Special Dietary Menus'
  ];

  return (
    <PageTransition>
      <div className="chef-page">
        <VideoBackground
          videoId="DQkNw1wckEk"
          startTime={8}
          endTime={38}
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
              Private Chef Services
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              maxWidth: '800px', 
              margin: '20px auto',
              color: 'var(--neutral-color)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              Experience exceptional dining with personalized culinary creations in Jaco, Costa Rica
            </p>
          </div>
        </VideoBackground>

        <section className="chef-intro" style={{ 
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div className="chef-content">
              <h2>Your Personal Culinary Journey</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                With years of culinary expertise and a passion for creating memorable dining experiences, 
                I bring restaurant-quality cuisine directly to you. Each menu is thoughtfully crafted 
                using fresh, local ingredients and tailored to your preferences.
              </p>
              <div className="cuisine-styles" style={{ marginTop: '30px' }}>
                <h3>Cuisine Specialties</h3>
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '15px'
                }}>
                  {cuisineStyles.map((style, index) => (
                    <span key={index} style={{
                      padding: '8px 15px',
                      backgroundColor: 'var(--neutral-color)',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      border: '2px solid var(--secondary-color)'
                    }}>
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="chef-image">
              <OptimizedImage
                src={IMAGES.FOOD.CHEF}
                alt="Chef Laurie Meiring"
                width={600}
                height={400}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </section>

        <section className="food-gallery" style={{
          padding: '80px 20px',
          backgroundColor: 'var(--neutral-color)',
          borderTop: '2px dashed var(--secondary-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Culinary Creations</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              <div className="food-image" style={{ position: 'relative' }}>
                <OptimizedImage
                  src={IMAGES.FOOD.TACOS}
                  alt="Gourmet Tacos"
                  width={400}
                  height={267}
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  Fresh Local Ingredients
                </div>
              </div>
              {/* More food images will be added as they become available */}
            </div>
          </div>
        </section>

        <section className="services-pricing" style={{
          padding: '80px 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Culinary Services</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {culinaryServices.map((service, index) => (
                <div key={index} className="service-card" style={{
                  padding: '40px 30px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--neutral-color)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>{service.title}</h3>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    color: 'var(--text-color)',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}>{service.price}</div>
                  <p style={{ 
                    color: 'var(--text-color)',
                    marginBottom: '20px',
                    opacity: 0.8
                  }}>{service.description}</p>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '20px 0'
                  }}>
                    {service.features.map((feature, idx) => (
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
                    marginTop: '20px'
                  }}>
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-cta" style={{
          padding: '80px 20px',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--neutral-color)' }}>Ready to Plan Your Culinary Experience?</h2>
            <p style={{ fontSize: '1.1rem', margin: '20px 0' }}>
              Let's create a memorable dining experience tailored to your preferences and dietary needs.
            </p>
            <Link to="/contact" className="button" style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color)',
              display: 'inline-block',
              marginTop: '20px'
            }}>
              Schedule a Consultation
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default ChefPage;