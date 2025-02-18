import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import { IMAGES } from '../constants/images';

function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-hero" style={{ padding: '40px 0', textAlign: 'center' }}>
        <div className="profile-image-container" style={{ marginBottom: '30px' }}>
          <div style={{ width: '150px', height: '150px', margin: '0 auto' }}>
            <OptimizedImage
              src={IMAGES.PROFILE.AI_GENERATED}
              alt="Laurie Meiring AI Profile"
              className="profile-image"
              width={150}
              height={150}
              style={{
                borderRadius: '50%',
                border: '4px solid var(--secondary-color)'
              }}
            />
          </div>
        </div>
        <h1>About Laurie Meiring</h1>
        <p className="subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
          Digital Strategist | Content Creator | Designer | Creative | Digital Nerd | Making AI Work | MBA | Former Hotel & Restaurant Lifer | AI Specialist
        </p>
      </section>

      <section className="about-content" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="bio-section" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px', 
          alignItems: 'start' 
        }}>
          <div className="bio-text">
            <h2>My Journey</h2>
            <p>Based in the vibrant coastal town of Jaco, Costa Rica, I bring a unique blend of expertise in digital strategy, culinary arts, and sports coaching. My journey has taken me from the hospitality industry to becoming a multi-faceted entrepreneur.</p>
            <p>With an MBA and a deep understanding of AI technology, I help businesses navigate the digital landscape while pursuing my passions for pickleball coaching and culinary excellence.</p>
          </div>
          <div className="natural-image" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <OptimizedImage
              src={IMAGES.PROFILE.NATURAL}
              alt="Laurie Meiring"
              className="casual-profile"
              width={400}
              height={400}
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
        </div>

        <div className="services-overview" style={{ marginTop: '60px' }}>
          <h2>What I Do</h2>
          <div className="services-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px', 
            marginTop: '30px' 
          }}>
            <div className="service-card">
              <h3>Digital Strategy</h3>
              <p>Leveraging AI and creative solutions to help businesses thrive in the digital age.</p>
            </div>
            <div className="service-card">
              <h3>Pickleball Coaching</h3>
              <p>Passionate about helping players improve their game in the beautiful setting of Jaco.</p>
            </div>
            <div className="service-card">
              <h3>Private Chef</h3>
              <p>Creating unforgettable culinary experiences with a focus on local ingredients and global flavors.</p>
            </div>
          </div>
        </div>

        <div className="location-highlight" style={{ marginTop: '60px', position: 'relative' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <OptimizedImage
              src={IMAGES.LOCATIONS.JACO}
              alt="Jaco, Costa Rica"
              className="location-image"
              width={800}
              height={400}
              style={{
                borderRadius: '12px',
                marginTop: '20px'
              }}
            />
          </div>
          <div className="location-text" style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>Life in Jaco</h2>
            <p>Join me in this paradise where digital innovation meets outdoor adventure and culinary excellence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;