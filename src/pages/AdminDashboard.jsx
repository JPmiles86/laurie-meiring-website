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
    testimonialsCount: 0,
    clubsCount: 0,
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
        const testimonialsResponse = await fetch('/api/testimonials', {
          headers: {
            'X-Session-Auth': sessionStorage.getItem('blogAdminAuth') || ''
          }
        });
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
        const clubsResponse = await fetch('/api/clubs', {
          headers: {
            'X-Session-Auth': sessionStorage.getItem('blogAdminAuth') || ''
          }
        });
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

  const AdminCard = ({ title, description, icon, color, onClick, count }) => (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: `2px solid ${color}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {count !== undefined && (
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: color,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          {count}
        </div>
      )}

      <div style={{
        fontSize: '3.5rem',
        marginBottom: '20px',
        color,
        lineHeight: 1
      }}>
        {icon}
      </div>

      <h3 style={{
        fontSize: '1.6rem',
        fontWeight: 'bold',
        color: 'var(--text-color)',
        margin: '0 0 12px 0'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '1rem',
        color: 'var(--text-color)',
        opacity: 0.7,
        lineHeight: 1.5,
        flexGrow: 1
      }}>
        {description}
      </p>

      <div style={{
        marginTop: '20px',
        color,
        fontSize: '0.9rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
      }}>
        Manage →
      </div>
    </motion.div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '40px 20px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            color: 'var(--primary-color)',
            margin: 0
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-color)',
            opacity: 0.7,
            marginTop: '8px'
          }}>
            Manage your website content
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--primary-color)',
            border: '2px solid var(--primary-color)',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'var(--primary-color)';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'var(--primary-color)';
          }}
        >
          Logout
        </button>
      </div>

      {/* Admin Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <AdminCard
          title="Blog Management"
          description="Create, edit, and manage your blog posts. Write new content and update existing articles."
          icon="📝"
          color="#3498db"
          onClick={() => navigate('/admin/blog')}
          count={stats.blogCount}
        />

        <AdminCard
          title="Testimonials"
          description="Manage client testimonials and reviews. Add, edit, or remove feedback from your clients."
          icon="⭐"
          color="#27ae60"
          onClick={() => navigate('/admin/testimonials')}
          count={stats.testimonialsCount}
        />

        <AdminCard
          title="Clubs Directory"
          description="Manage pickleball clubs listings. Update club information, locations, and contact details."
          icon="🏓"
          color="#e74c3c"
          onClick={() => navigate('/admin/clubs')}
          count={stats.clubsCount}
        />
      </div>

      {/* Quick Actions */}
      <div style={{
        maxWidth: '1200px',
        margin: '60px auto 0',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          color: 'var(--text-color)',
          marginBottom: '20px'
        }}>
          Quick Actions
        </h2>

        <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/admin/blog')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            + New Blog Post
          </button>

          <button
            onClick={() => navigate('/admin/testimonials')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            + Add Testimonial
          </button>

          <button
            onClick={() => navigate('/admin/clubs')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            + Add Club
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;