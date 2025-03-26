# Style Guide

## Color Palette

```css
:root {
  --primary-color: #C72958;    /* Dark Pink/Red - Used for headings, buttons */
  --secondary-color: #2898C1;  /* Deep Blue - Used for backgrounds, accents */
  --accent-color: #F1E730;     /* Warm Yellow - Used sparingly */
  --neutral-color: #F8F8FF;    /* Off-White - Used for backgrounds, text on dark */
  --text-color: #333;         /* Charcoal Gray - Used for general text */
}
```

## Typography

### Fonts
- **Headings**: 'Bebas Neue', sans-serif
  - Use with `letter-spacing: 0.05em`
  - Apply to all major section headings
- **Body**: 'Montserrat', sans-serif
  - Use for all body text and general content

### Text Styles
- Headings should use the primary color (#C72958)
- Body text should use the text color (#333)
- Links should use the secondary color (#2898C1)

## UI Components

### Buttons
```css
.button {
  border-radius: 30px;
  padding: 12px 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
```

### Cards
```css
.card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 20px;
  margin: 10px;
}
```

### Forms
- Input fields should have 8px border radius
- Use light gray borders (#E5E5E5)
- Add focus states with secondary color
- Include proper spacing between form elements (16px minimum)

## Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) {
  /* Mobile styles */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Grid System
- Use CSS Grid for layout structure
- Implement 12-column grid on desktop
- Switch to single column on mobile
- Maintain consistent gutters (16px minimum)

## Images

### Guidelines
- Implement lazy loading
- Provide alt text for accessibility
- Maximum dimensions:
  - Hero images: 1920x1080px
  - Card images: 800x600px
  - Thumbnails: 400x300px

## Accessibility

### Requirements
- Maintain WCAG 2.1 AA compliance
- Use semantic HTML elements
- Ensure proper color contrast
- Include focus states for interactive elements
- Provide alt text for images
- Use ARIA labels where necessary

## Animation

### Guidelines
- Keep animations subtle and purposeful
- Use transition duration of 300ms
- Implement reduced motion media query
- Standard easing: cubic-bezier(0.4, 0, 0.2, 1)

## Icons

### Usage
- Use SVG icons when possible
- Maintain consistent sizing
- Provide hover states for interactive icons
- Include ARIA labels for accessibility 