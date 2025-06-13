# Vertical/Portrait Images in Blog Posts

## Location of Vertical Image List

The list of vertical/portrait images is located in:
**`src/pages/BlogDetail.jsx`** around lines 27-32

## How It Works

The `isPortraitImage` check determines if an image should be displayed at a smaller width:
- Portrait images: 50% width on desktop, 70% on mobile
- Landscape images: 80% width on both desktop and mobile

## Current Vertical Images List

```javascript
const isPortraitImage = props.src && (
  props.src.includes('/blog5/') || // New blog images
  props.src.includes('/blog7/ShaunaLaurie3.jpg') || // Blog 7 portrait image
  props.src.includes('/blog3/LaurieCoachingHero1.jpg') || // Other known portrait images
  props.src.includes('/blog8/LauriePiOldTourney.jpg') || // Blog 8 portrait image
  props.src.includes('/blog9/KenLaurie.jpg') // Blog 9 portrait image
);
```

## How to Add New Vertical Images

When adding a new blog with vertical/portrait images:

1. Add the new blog to `src/data/blogs.json`
2. Update the `isPortraitImage` check in `src/pages/BlogDetail.jsx` to include the new image path
3. Make sure to include a comment indicating which blog the image belongs to

## Why This Is Needed

Portrait images need to be displayed at smaller widths to prevent them from taking up too much vertical space and disrupting the reading experience. The automatic detection ensures proper layout without manual intervention for each blog post. 