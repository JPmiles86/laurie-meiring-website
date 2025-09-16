# Blog Management Overhaul Task

## Assignment Date: 2025-09-16
## Priority: HIGH
## Agent: Blog Management Specialist

## Major Restructure Required

### 1. Change Blog Management Flow
**Current Flow**:
- Click "Blog Management" → Goes directly to editor
- Must click "Edit Existing Posts" to see list

**Required Flow**:
- Click "Blog Management" → Show list of all blog posts FIRST
- List should have:
  - Blog title
  - Published/Draft status
  - Publish date
  - View count
  - Action buttons: Edit, Quick Edit, Delete, Preview

### 2. Blog List Page Features
**Create new page**: `/admin/blog` should show list, not editor

**Features Required**:
1. **Table/Card View** of all blog posts
2. **Quick Edit** - Modal for:
   - Title change
   - Slug change
   - Status (Published/Draft)
   - Publish date
3. **Delete with Confirmation**:
   - Modal: "Are you sure you want to delete this blog post?"
   - Two-step confirmation
4. **Preview** - Open blog in new tab
5. **"+ New Blog Post" Button** - Takes to editor

### 3. Featured Image Overhaul
**Current**: Text input for "Featured Image URL"
**Required**:
- Google Cloud Storage upload button
- Show thumbnail of current featured image
- **Smart Selection**: If blog content has images, show them as options for featured image
- "Choose from content images" dropdown/modal

### 4. Extract Images from Blog Content
**New Feature**: Parse blog content to find all images
**Implementation**:
- Scan content for image URLs (both markdown and HTML)
- Display thumbnails of content images
- Allow one-click selection as featured image
- Show "No images in content" if none found

### 5. Fix Editor Navigation
**Current Issue**: `/admin/blog` goes to editor
**Required Structure**:
- `/admin/blog` - List of all posts
- `/admin/blog/new` - New post editor
- `/admin/blog/edit/:id` - Edit existing post

## Files to Create/Modify
1. Create `/src/pages/BlogListAdmin.jsx` - New list view
2. Modify `/src/pages/AdminPage.jsx` - Rename to BlogEditor.jsx
3. Update `/src/App.jsx` - Fix routing
4. Modify `/src/components/BlogEditor.jsx` - Add GCS upload and image extraction

## Implementation Steps
1. Create BlogListAdmin component with table/card view
2. Add Quick Edit modal functionality
3. Implement delete with confirmation
4. Add featured image GCS upload
5. Extract images from content functionality
6. Update routing structure
7. Test all CRUD operations

## Progress Tracking
- [ ] BlogListAdmin component created
- [ ] Quick Edit modal working
- [ ] Delete confirmation implemented
- [ ] Preview functionality added
- [ ] Featured image GCS upload
- [ ] Content image extraction
- [ ] Image selection from content
- [ ] Routing restructured
- [ ] All navigation tested

## Testing Requirements
1. List shows all blog posts
2. Quick Edit saves changes
3. Delete requires confirmation
4. Featured image uploads to GCS
5. Can select featured image from content
6. New post creation works
7. Edit existing post works
8. Preview opens correct blog

## Output Required
Create `BLOG_OVERHAUL_RESULTS.md` documenting:
1. New components created
2. Files modified
3. Routing changes
4. Testing results
5. Any issues or limitations