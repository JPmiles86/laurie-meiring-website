import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getAdjacentPosts } from '../utils/blogUtils';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

function BlogPost({ isMobile }) {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [adjacentPosts, setAdjacentPosts] = useState({ prev: null, next: null });

  useEffect(() => {
    const currentPost = getPostBySlug(slug);
    setPost(currentPost);
    setAdjacentPosts(getAdjacentPosts(currentPost));
  }, [slug]);

  if (!post) return null;

  // Custom components for ReactMarkdown
  const components = {
    h1: ({node, ...props}) => <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem', marginTop: '2rem' }} {...props} />,
    h2: ({node, ...props}) => <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', marginTop: '2rem' }} {...props} />,
    h3: ({node, ...props}) => <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', marginTop: '1.5rem' }} {...props} />,
    h4: ({node, ...props}) => <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', marginTop: '1.5rem' }} {...props} />,
    img: ({node, ...props}) => {
      // Check if this is a portrait image from blog5 (or other portrait images we know of)
      const isPortraitImage = props.src && (
        props.src.includes('/blog5/') || // New blog images
        props.src.includes('/blog7/ShaunaLaurie3.jpg') || // Blog 7 portrait image
        props.src.includes('/blog3/LaurieCoachingHero1.jpg') || // Other known portrait images
        props.src.includes('/blog8/LauriePiOldTourney.jpg') // Blog 8 portrait image
      );
      
      return (
        <div style={{ 
          width: isPortraitImage ? (isMobile ? '70%' : '50%') : '80%', 
          margin: '2rem auto', 
          textAlign: 'center'
        }}>
          <img 
            {...props} 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              objectFit: 'cover',
              objectPosition: 'top center'
            }} 
          />
        </div>
      );
    }
  };

  // Determine which CTA to show based on the blog post
  const getCTA = () => {
    if (post.slug === 'from-player-to-coach') {
      return {
        title: "Ready to Start Your Training?",
        description: "Schedule your coaching sessions and take your game to the next level.",
        primaryButton: {
          text: "Schedule Training",
          link: "/training"
        },
        secondaryButton: {
          text: "Get in Touch",
          link: "/contact"
        }
      };
    }
    
    return {
      title: "Want to Learn More?",
      description: "Get in touch to discuss training options or book a tour in Costa Rica.",
      primaryButton: {
        text: "Contact Me",
        link: "/contact"
      },
      secondaryButton: {
        text: "View Training Options",
        link: "/training"
      }
    };
  };

  const cta = getCTA();

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="blog-post"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: isMobile ? '15px' : '20px',
        marginTop: '40px'
      }}
    >
      {/* Back to Blog List Button */}
      <Link
        to="/blog"
        style={{
          position: 'fixed',
          bottom: isMobile ? '30px' : '100px',
          left: '20px',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)',
          padding: isMobile ? '8px 16px' : '10px 20px',
          borderRadius: '25px',
          textDecoration: 'none',
          zIndex: 1000,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          fontSize: isMobile ? '0.9rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← All Blog Posts
      </Link>

      <h1 style={{
        fontSize: isMobile ? '2.2rem' : '2.8rem',
        marginBottom: '20px',
        color: 'var(--primary-color)',
        lineHeight: 1.2
      }}>
        {post.title}
      </h1>
      
      <div style={{
        fontSize: '1rem',
        color: 'var(--text-color)',
        opacity: 0.8,
        marginBottom: '30px'
      }}>
        {new Date(post.publishDate).toLocaleDateString()} by {post.author}
      </div>

      <div className="blog-content" style={{
        fontSize: isMobile ? '1.1rem' : '1.2rem',
        lineHeight: 1.6,
        color: 'var(--text-color)'
      }}>
        <ReactMarkdown components={components}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Call to Action Section */}
      <div style={{
        marginTop: '40px',
        padding: '30px',
        backgroundColor: 'var(--secondary-color)',
        borderRadius: '12px',
        color: 'var(--neutral-color)',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '15px',
          marginTop: 0,
          color: 'var(--neutral-color)'
        }}>
          {cta.title}
        </h3>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '20px',
          color: 'var(--neutral-color)'
        }}>
          {cta.description}
        </p>
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to={cta.primaryButton.link}
            style={{
              backgroundColor: 'var(--neutral-color)',
              color: 'var(--primary-color)',
              padding: '12px 25px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}
          >
            {cta.primaryButton.text}
          </Link>
          <Link
            to={cta.secondaryButton.link}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--neutral-color)',
              padding: '12px 25px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}
          >
            {cta.secondaryButton.text}
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px',
        padding: '20px 0',
        borderTop: '1px solid var(--border-color)'
      }}>
        {adjacentPosts.prev && (
          <Link
            to={`/blog/${adjacentPosts.prev.slug}`}
            style={{
              textDecoration: 'none',
              color: 'var(--text-color)',
              flex: '1',
              textAlign: 'left'
            }}
          >
            <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '5px' }}>
              Previous Post
            </div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>{adjacentPosts.prev.title}</div>
          </Link>
        )}
        {adjacentPosts.next && (
          <Link
            to={`/blog/${adjacentPosts.next.slug}`}
            style={{
              textDecoration: 'none',
              color: 'var(--text-color)',
              flex: '1',
              textAlign: 'right',
              marginLeft: adjacentPosts.prev ? '20px' : '0'
            }}
          >
            <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '5px' }}>
              Next Post
            </div>
            <div style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>{adjacentPosts.next.title}</div>
          </Link>
        )}
      </nav>
    </motion.article>
  );
}

export default BlogPost; 