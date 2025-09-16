import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllPosts } from '../utils/blogUtils';

function AdminDashboard() {
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('blogAdminAuth') === 'authenticated';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
  }, [navigate]);
  const [stats, setStats] = useState({
    blogCount: 0,
    testimonialsCount: 0, // Placeholder for future implementation
    clubsCount: 0, // Placeholder for future implementation
    totalViews: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get blog posts count
      const allPosts = getAllPosts();
      const publishedPosts = allPosts.filter(post => post.status === 'published');
      const totalViews = allPosts.reduce((sum, post) => sum + (post.views || 0), 0);

      // Get testimonials count
      let testimonialsCount = 0;
      try {
        const testimonialsResponse = await fetch('/api/testimonials');
        const testimonialsData = await testimonialsResponse.json();
        if (testimonialsData.success) {
          testimonialsCount = testimonialsData.testimonials.length;
        }
      } catch (error) {
        console.error('Error fetching testimonials count:', error);
      }

      // Get clubs count
      let clubsCount = 0;
      try {
        const clubsResponse = await fetch('/api/clubs?tenant=laurie-personal');
        const clubsData = await clubsResponse.json();
        if (clubsData.success) {
          clubsCount = clubsData.clubs.length;
        }
      } catch (error) {
        console.error('Error fetching clubs count:', error);
      }

      setStats({
        blogCount: publishedPosts.length,
        testimonialsCount,
        clubsCount,
        totalViews
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('blogAdminAuth');
    navigate('/');
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: `3px solid ${color}`,
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: color,
        margin: '0 0 12px 0'
      }}>
        {value}
      </h3>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--text-color)',
        margin: 0,
        fontWeight: '600'
      }}>
        {title}
      </p>
    </motion.div>
  );

  const NavCard = ({ title, description, icon, color, onClick, isComingSoon = false }) => (
    <motion.div
      whileHover={{ scale: isComingSoon ? 1 : 1.05 }}
      whileTap={{ scale: isComingSoon ? 1 : 0.95 }}
      onClick={isComingSoon ? undefined : onClick}
      style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: `2px solid ${color}`,
        textAlign: 'center',
        cursor: isComingSoon ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isComingSoon ? 0.6 : 1,
        position: 'relative'
      }}
    >
      {isComingSoon && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#ffc107',
          color: '#333',
          padding: '4px 8px',
          borderRadius: '8px',
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}>
          COMING SOON
        </div>
      )}
      <div style={{ fontSize: '4rem', marginBottom: '16px', color }}>{icon}</div>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--text-color)',
        margin: '0 0 12px 0'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '1rem',
        color: '#666',
        margin: 0,
        lineHeight: '1.5'
      }}>
        {description}
      </p>
    </motion.div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background-color)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'var(--primary-color)',
              margin: '0 0 8px 0'
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-color)',
              margin: 0
            }}>
              Welcome back! Manage your website content from here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--secondary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '2rem',
          color: 'var(--primary-color)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Quick Statistics
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <StatCard
            title="Blog Posts"
            value={stats.blogCount}
            icon="📝"
            color="var(--primary-color)"
            onClick={() => navigate('/admin/blog')}
          />
          <StatCard
            title="Testimonials"
            value={stats.testimonialsCount}
            icon="💬"
            color="#28a745"
            onClick={() => navigate('/admin/testimonials')}
          />
          <StatCard
            title="Featured Clubs"
            value={stats.clubsCount}
            icon="🏟️"
            color="#e74c3c"
            onClick={() => navigate('/admin/clubs')}
          />
          <StatCard
            title="Total Views"
            value={stats.totalViews}
            icon="👁️"
            color="#9b59b6"
          />
        </div>
      </div>

      {/* Admin Navigation */}
      <div>
        <h2 style={{
          fontSize: '2rem',
          color: 'var(--primary-color)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Admin Sections
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <NavCard
            title="Blog Management"
            description="Create, edit, and manage blog posts. Access the full blog editor with AI assistance."
            icon="📝"
            color="var(--primary-color)"
            onClick={() => navigate('/admin/blog')}
          />
          <NavCard
            title="Testimonials"
            description="Manage client testimonials and reviews to showcase on the website."
            icon="💬"
            color="#28a745"
            onClick={() => navigate('/admin/testimonials')}
          />
          <NavCard
            title="Clubs Management"
            description="Manage featured clubs, club information, and partnerships."
            icon="🏟️"
            color="#e74c3c"
            onClick={() => navigate('/admin/clubs')}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;