# Mobile Video Background Optimization Guide

## Introduction

This document captures the learnings and solutions we've discovered while optimizing the `VideoBackground` component for mobile devices. The primary challenge was eliminating black bars around videos when displayed on mobile devices, especially with vertical (9:16) video content.

## The Problem

When displaying background videos on mobile devices, several issues can arise:

1. **Black bars**: Videos (especially 9:16 vertical videos) may display with black bars on the sides
2. **Scaling issues**: Videos may not properly fill the entire viewport
3. **Aspect ratio challenges**: Different devices have different aspect ratios, making it difficult to create a one-size-fits-all solution

## Effective Solutions

After testing multiple approaches, we found that a combination of techniques works best:

### 1. CSS Transform Scale Approach

The most effective solution was to use CSS `transform: scale()` to slightly enlarge the video:

```css
.mobile-container iframe {
  position: absolute;
  width: 100vw !important; 
  height: 100vh !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.15) !important;
  transform-origin: center center;
  border: none;
}

/* Increase scale for portrait orientation */
@media (orientation: portrait) {
  .mobile-container iframe {
    transform: translate(-50%, -50%) scale(1.2) !important;
  }
}
```

### 2. Use Both CSS and Inline Styles

For maximum reliability, apply styles in both the CSS file and directly as inline styles:

```jsx
<iframe 
  className={isLoaded ? 'loaded' : ''}
  src={videoUrl}
  title="Background Video"
  frameBorder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowFullScreen
  onLoad={() => setIsLoaded(true)}
  style={isMobile && mobileVideoId ? {
    position: 'absolute',
    width: '110%', 
    height: '110%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  } : {}}
/>
```

### 3. Vimeo Player Parameters

Optimize Vimeo player parameters to help with display quality and behavior:

```javascript
// Base URL parameters
const baseParams = "background=1&autoplay=1&loop=1&byline=0&title=0&muted=1";

// More specific parameters for mobile
const qualityParams = isMobile && mobileVideoId 
  ? "&quality=1080p&transparent=0&dnt=1&portrait=0&autopause=0&controls=0&responsive=1" 
  : "&quality=1080p";

const timeParam = activeStartTime ? `#t=${activeStartTime}s` : '';

// Construct Vimeo video URL with parameters
const videoUrl = `https://player.vimeo.com/video/${activeVideoId}?${baseParams}${qualityParams}${timeParam}`;
```

Key parameters for mobile:
- `quality=1080p`: Forces high quality
- `transparent=0`: Prevents transparent background
- `portrait=0`: Disables portrait mode display
- `autopause=0`: Prevents automatic pausing
- `controls=0`: Hides all controls
- `responsive=1`: Enables responsive mode

## Best Practices

1. **Create separate mobile-specific videos**:
   - Use 9:16 aspect ratio for mobile devices
   - Create content that looks good in vertical format
   - Ensure important content is centered

2. **Implement responsive detection**:
   ```javascript
   const checkMobile = () => {
     setIsMobile(window.innerWidth <= 768);
   };
   
   // Listen for resize events
   window.addEventListener('resize', checkMobile);
   ```

3. **Use conditional rendering based on device**:
   ```jsx
   <div className={`video-container ${isMobile && mobileVideoId ? 'mobile-container' : 'desktop-container'}`}>
     {/* Video iframe here */}
   </div>
   ```

4. **Handle iOS Safari separately**:
   ```javascript
   const checkIOS = () => {
     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
     const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
     setIsIOS(isIOSDevice);
   };
   ```

5. **Fix iOS 100vh issue**:
   ```javascript
   const setVhVariable = () => {
     const vh = window.innerHeight * 0.01;
     document.documentElement.style.setProperty('--vh', `${vh}px`);
   };
   ```

6. **Use overflow: hidden on containers**:
   Ensure parent containers have `overflow: hidden` to prevent scrollbars when scaling videos.

## Implementation Checklist

When implementing mobile-optimized video backgrounds:

- [ ] Create mobile-specific videos in 9:16 aspect ratio
- [ ] Upload videos to Vimeo and note their IDs
- [ ] Add mobileVideoId prop to VideoBackground component
- [ ] Ensure CSS includes the scaling transform approach
- [ ] Add inline styles as a backup
- [ ] Include all necessary Vimeo player parameters
- [ ] Test on multiple mobile devices and orientations

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Black bars on sides | Increase scale transform (1.15-1.2 works well) |
| Video appears zoomed too much | Reduce scale transform or use object-fit: contain |
| Video doesn't fill entire screen | Use 100vw/100vh with transform scale |
| Video doesn't load | Check Vimeo settings and autoplay parameters |
| Different appearance on iOS | Add iOS-specific CSS rules |

## Conclusion

By combining proper video creation (9:16 for mobile), CSS scaling techniques, and optimized Vimeo parameters, we can create a responsive video background experience that works well across devices. The most important factor is using the scale transform to slightly enlarge the video just enough to eliminate black bars without excessive cropping of content. 