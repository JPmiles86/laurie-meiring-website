# Mobile Video Optimization Guide

## Overview

This guide explains how to use the mobile-specific video optimization feature for the Costa Rica Pickleball website. This feature allows you to display different Vimeo videos on mobile devices versus desktop, which is particularly useful for background videos and video players.

## Why Use Mobile-Specific Videos

Standard landscape (16:9) videos often don't display well on mobile devices:
- Empty space on the sides
- Important content may be out of frame
- Poor visual experience for mobile users

By using mobile-specific vertical (9:16) videos, you can:
- Fill the entire mobile screen
- Frame the content appropriately for vertical viewing
- Create a more immersive experience on mobile devices

## Components With Mobile Video Support

The following components have been updated to support mobile-specific videos:

1. **VideoBackground**: Used for fullscreen video backgrounds
2. **VideoPlayer**: Used for embedded video players

## How to Use Mobile-Specific Videos

### Step 1: Create Mobile-Optimized Videos

1. Create vertical (9:16 aspect ratio) versions of your videos
2. Focus on the main action/subject in the center of the frame
3. Upload both versions to Vimeo
4. Note the Vimeo ID for each video

### Step 2: Implement in VideoBackground Component

```jsx
<VideoBackground
  videoId="1234567890"        // Desktop video ID (required)
  mobileVideoId="0987654321"  // Mobile video ID (optional)
  startTime={0}               // Desktop start time in seconds
  mobileStartTime={5}         // Mobile start time in seconds (optional)
  endTime={30}                // End time in seconds
  height="90vh"               // Height of container
  overlayColor="rgba(0, 0, 0, 0.5)"
  type="section"
>
  {/* Your content here */}
</VideoBackground>
```

### Step 3: Implement in VideoPlayer Component

```jsx
<VideoPlayer
  videoId="1234567890"        // Desktop video ID (required)
  mobileVideoId="0987654321"  // Mobile video ID (optional)
  title="My Video"            // Video title
  description="Video description"
/>
```

## Props Reference

### VideoBackground Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| videoId | string | Yes | Vimeo ID for desktop video |
| mobileVideoId | string | No | Vimeo ID for mobile video |
| startTime | number | No | Start time for desktop video (in seconds) |
| mobileStartTime | number | No | Start time for mobile video (in seconds) |
| endTime | number | No | End time for videos (in seconds) |
| height | string | No | Height of container (default: '100vh') |
| overlayColor | string | No | Color of overlay (default: 'rgba(0, 0, 0, 0.4)') |
| children | node | No | Content to display over video |
| type | string | No | Type of background ('section' or 'hero') |

### VideoPlayer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| videoId | string | Yes | Vimeo ID for desktop video |
| mobileVideoId | string | No | Vimeo ID for mobile video |
| title | string | No | Video title |
| description | string | No | Video description |

## Technical Implementation Details

- Mobile detection uses a screen width threshold of 768px
- Mobile videos use a 9:16 aspect ratio (vertical)
- Desktop videos use a 16:9 aspect ratio (landscape)
- The component automatically selects the correct video based on screen size
- The component will fallback to the desktop video if no mobile video is provided
- Window resize events are properly handled to switch videos when orientation changes

## Future Enhancements

Planned improvements for this feature:
- Preloading optimization for faster video switching
- Support for YouTube videos
- Automatic quality adjustment based on connection speed 