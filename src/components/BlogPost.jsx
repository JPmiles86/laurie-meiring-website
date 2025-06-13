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

  // Process content to handle custom image syntax
  const processedContent = post.content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)(?:\{([^}]+)\})?/g,
    (match, alt, src, attrs) => {
      if (!attrs) return match; // Return unchanged if no attributes
      
      let size = 'large';
      let align = 'center';
      
      const sizeMatch = attrs.match(/size=([^\s]+)/);
      const alignMatch = attrs.match(/align=([^\s]+)/);
      if (sizeMatch) size = sizeMatch[1];
      if (alignMatch) align = alignMatch[1];
      
      // Convert to HTML-like syntax that ReactMarkdown can process
      return `<customimg src="${src}" alt="${alt}" size="${size}" align="${align}" />`;
    }
  );

  // Custom components for ReactMarkdown
  const components = {
    h1: ({node, ...props}) => <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }} {...props} />,
    h2: ({node, ...props}) => <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }} {...props} />,
    h3: ({node, ...props}) => <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }} {...props} />,
    h4: ({node, ...props}) => <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }} {...props} />,
    img: ({node, ...props}) => (
      <div style={{ 
        width: '100%', 
        margin: '2rem auto', 
        textAlign: 'center'
      }}>
        <img 
          {...props} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }} 
        />
      </div>
    ),
    customimg: ({src, alt, size = 'large', align = 'center'}) => {
      const sizeStyles = {
        small: { maxWidth: '50%' },
        medium: { maxWidth: '75%' },
        large: { maxWidth: '100%' }
      };
      
      const alignStyles = {
        left: { 
          float: 'left', 
          margin: '1rem 1rem 1rem 0',
          clear: 'left'
        },
        center: { 
          margin: '2rem auto',
          display: 'block',
          float: 'none',
          clear: 'both'
        },
        right: { 
          float: 'right', 
          margin: '1rem 0 1rem 1rem',
          clear: 'right'
        }
      };
      
      return (
        <img
          src={src}
          alt={alt}
          className={`ql-image-${size} ql-image-align-${align}`}
          style={{
            ...sizeStyles[size],
            ...alignStyles[align],
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        />
      );
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="blog-post"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: isMobile ? '15px' : '20px'
      }}
    >
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
        <ReactMarkdown 
          components={components}
          allowedElements={['h1', 'h2', 'h3', 'h4', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'customimg', 'code', 'pre']}
          allowElement={(element) => {
            // Allow customimg elements
            if (element.tagName === 'customimg') return true;
            return true;
          }}
        >
          {processedContent}
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
          marginBottom: '15px' 
        }}>
          Ready to Improve Your Game?
        </h3>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '20px' 
        }}>
          Schedule your coaching sessions or get in touch to learn more about our training programs.
        </p>
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/contact"
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
            Get in Touch
          </Link>
          <Link
            to="/training"
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
            Schedule Training
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
              color: 'var(--primary-color)',
              fontSize: '1.1rem'
            }}
          >
            ← {adjacentPosts.prev.title}
          </Link>
        )}
        {adjacentPosts.next && (
          <Link
            to={`/blog/${adjacentPosts.next.slug}`}
            style={{
              textDecoration: 'none',
              color: 'var(--primary-color)',
              fontSize: '1.1rem',
              marginLeft: 'auto'
            }}
          >
            {adjacentPosts.next.title} →
          </Link>
        )}
      </nav>
    </motion.article>
  );
}

export default BlogPost; 