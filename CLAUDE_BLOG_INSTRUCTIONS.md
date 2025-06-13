# Blog Management Instructions for Future LLMs

## Overview
This codebase manages blogs using a JSON-based system stored in `/src/data/blogs.json`. Blogs are displayed using React components with markdown rendering.

## How Blogs Work

### 1. Blog Storage Structure
Blogs are stored in `/src/data/blogs.json` with the following structure:
```json
{
  "id": "unique_id",
  "title": "Blog Title",
  "content": "Markdown content here",
  "publishDate": "2025-06-06T10:00:00Z",
  "status": "published",
  "author": "Laurie Meiring",
  "slug": "url-friendly-slug",
  "featuredImage": "/path/to/featured/image.jpg",
  "categories": ["Pickleball", "Costa Rica", "Personal Journey"],
  "tags": ["pickleball journey", "tournaments", "coaching"]
}
```

### 2. Image Handling

#### Vertical Image Detection
The system automatically detects and properly sizes vertical/portrait images. In `/src/pages/BlogDetail.jsx`, the following images are recognized as portrait:
- Images in `/blog5/` directory
- `/blog7/ShaunaLaurie3.jpg`
- `/blog3/LaurieCoachingHero1.jpg`
- `/blog8/LauriePiOldTourney.jpg`

Portrait images are displayed at 50% width on desktop and 70% on mobile, while landscape images are 80% width.

#### Image Storage Location
- Place all blog images in `/public/blog{number}/` directory
- Use descriptive filenames (e.g., `TeamImageNormal.jpg`, `ShaunaLaurie1.jpg`)
- Reference images in markdown as `/blog{number}/filename.jpg`

### 3. Client Markdown Format
The client typically sends markdown files with:
- Standard markdown headers (`#`, `##`, etc.)
- Bold text using `**text**`
- Image placeholders like `![][image1]` with Google Drive links
- Lists and paragraphs

## Step-by-Step Instructions for Adding a New Blog

### 1. Prepare the Content
1. Receive the markdown file from the client
2. Create a new blog ID (increment from the last one)
3. Generate a URL-friendly slug from the title

### 2. Process Images
1. Download images from the provided Google Drive links
2. Create a new directory: `/public/blog{id}/`
3. Save images with descriptive names
4. Replace image placeholders in markdown with proper markdown image syntax: `![Alt text](/blog{id}/imagename.jpg)`

### 3. Identify Vertical Images
Check if any images are portrait/vertical orientation. If yes, add their paths to the `isPortraitImage` check in `/src/pages/BlogDetail.jsx`:
```javascript
const isPortraitImage = props.src && (
  props.src.includes('/blog5/') ||
  props.src.includes('/blog{id}/verticalimage.jpg') || // Add new portrait images here
  // ... other portrait images
);
```

### 4. Create Blog Entry
Add the new blog to `/src/data/blogs.json`:
```json
{
  "id": "{new_id}",
  "title": "{Blog Title}",
  "content": "{Processed markdown content}",
  "publishDate": "{Current date in ISO format}",
  "status": "published",
  "author": "Laurie Meiring",
  "slug": "{url-friendly-slug}",
  "featuredImage": "/blog{id}/main-image.jpg",
  "categories": ["Select appropriate categories"],
  "tags": ["relevant", "tags", "here"]
}
```

### 5. Categories and Tags
Common categories:
- Pickleball
- Costa Rica
- Personal Journey
- Tournaments
- Training Tips
- Coaching
- Relationships
- Youth Players
- Inspiration

### 6. Testing
1. Run `npm run dev` to test locally
2. Check that the blog appears in the blog list
3. Verify images load correctly (especially vertical ones)
4. Test navigation between blog posts

### 7. Deployment
1. Commit changes to git
2. Push to GitHub
3. Vercel will automatically deploy

## Client Self-Management Options

### Current Limitations
- No database (static JSON files)
- Manual deployment required
- No built-in authentication system

### Possible Solutions for Client Management

#### Option 1: Headless CMS (Recommended)
- Use a service like Contentful, Strapi, or Sanity
- Client gets a user-friendly interface
- API integration with current React setup
- No database management needed

#### Option 2: GitHub-based CMS
- Use Netlify CMS or Forestry
- Edits through web interface
- Commits directly to GitHub
- Automatic deployment via Vercel

#### Option 3: Custom Admin Panel with Serverless Functions
- Build admin interface with authentication
- Use Vercel serverless functions
- Store data in cloud service (e.g., Supabase)
- More complex but fully customized

#### Option 4: Static Site Generator with Admin
- Convert to Gatsby or Next.js
- Use built-in CMS solutions
- Better for SEO and performance

### Implementation Considerations
- **Authentication**: Need secure login system
- **Image Upload**: Cloud storage service (Cloudinary, AWS S3)
- **Preview**: Live preview before publishing
- **Version Control**: Track changes and rollbacks
- **Cost**: Most solutions have free tiers but may incur costs

## Common Tasks

### Updating an Existing Blog
1. Find the blog by ID in `blogs.json`
2. Update the content field
3. Update publishDate if needed
4. Commit and push changes

### Scheduling Future Posts
Set `publishDate` to a future date - the blog will automatically appear when that date arrives.

### Managing Images
- Always optimize images before uploading
- Use .jpg for photos, .png for graphics
- Keep file sizes under 500KB when possible
- Use descriptive alt text for accessibility