import blogData from '../data/blogs.json';

// Predefined categories
export const CATEGORIES = [
  'Pickleball',
  'Travel',
  'Costa Rica',
  'Training Tips',
  'Tournament Updates',
  'Local Events'
];

// Get all visible posts (published or scheduled & due)
export function getVisiblePosts() {
  return [...blogData.posts].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

// Get posts by category
export const getPostsByCategory = (category) => {
  const posts = getVisiblePosts();
  return posts.filter(post => post.categories?.includes(category));
};

// Get posts by tag
export const getPostsByTag = (tag) => {
  const posts = getVisiblePosts();
  return posts.filter(post => post.tags?.includes(tag));
};

// Get all unique tags from posts
export const getAllTags = () => {
  const posts = getAllPosts();
  const tags = new Set();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

// Get all posts for admin
export const getAllPosts = () => {
  return blogData.posts;
};

// Get a single post by slug
export function getPostBySlug(slug) {
  return blogData.posts.find(post => post.slug === slug);
}

// Save or update a post
export const savePost = async (postData) => {
  try {
    const posts = getAllPosts();
    const existingPostIndex = posts.findIndex(post => post.id === postData.id);
    
    // Ensure categories and tags are arrays
    const processedData = {
      ...postData,
      categories: postData.categories || [],
      tags: postData.tags || []
    };
    
    if (existingPostIndex >= 0) {
      // Update existing post
      posts[existingPostIndex] = processedData;
    } else {
      // Add new post
      posts.unshift(processedData);
    }

    localStorage.setItem('blog_posts', JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Error saving post:', error);
    return false;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const posts = getAllPosts();
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

// Create URL-friendly slug from title
export const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Handle image upload
export const handleImageUpload = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // For now, we'll store images in localStorage
      // In production, you'd want to use a proper storage service
      const imageKey = `blog_image_${Date.now()}`;
      try {
        localStorage.setItem(imageKey, reader.result);
        resolve({
          url: reader.result,
          key: imageKey
        });
      } catch (error) {
        reject(new Error('Failed to store image. File might be too large.'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Convert HTML to Markdown (for backward compatibility)
export const htmlToMarkdown = (html) => {
  // Simple conversion for now
  return html
    .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '## $1\n\n')
    .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
    .replace(/<img.*?src="(.*?)".*?>/g, '![]($1)')
    .replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => {
      return p1.replace(/<li>(.*?)<\/li>/g, '- $1\n');
    })
    .replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => {
      let counter = 1;
      return p1.replace(/<li>(.*?)<\/li>/g, () => `${counter++}. $1\n`);
    })
    .replace(/&nbsp;/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
};

// Schedule multiple posts
export const scheduleMultiplePosts = (posts, startDate, frequency = 'weekly') => {
  const scheduledPosts = posts.map((post, index) => {
    const publishDate = new Date(startDate);
    
    // Add weeks based on index
    publishDate.setDate(publishDate.getDate() + (index * 7));
    
    // Set specific time (e.g., 10 AM)
    publishDate.setHours(10, 0, 0, 0);

    return {
      id: Date.now() + index,
      ...post,
      publishDate: publishDate.toISOString(),
      status: 'scheduled',
      slug: createSlug(post.title)
    };
  });

  return scheduledPosts;
};

// Save posts to JSON file
export const savePosts = async (posts) => {
  const updatedData = { ...blogData, posts: [...blogData.posts, ...posts] };
  const filePath = path.join(process.cwd(), 'src/data/blogs.json');
  
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(updatedData, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving posts:', error);
    return false;
  }
};

export function getAdjacentPosts(currentPost) {
  if (!currentPost) return { prev: null, next: null };

  const sortedPosts = [...blogData.posts].sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
  const currentIndex = sortedPosts.findIndex(post => post.id === currentPost.id);

  return {
    prev: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    next: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  };
} 