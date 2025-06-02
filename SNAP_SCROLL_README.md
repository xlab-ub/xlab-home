# Snap Scroll Homepage

This implementation provides a smooth snap-scrolling homepage with GSAP animations and Lenis smooth scrolling.

## Features

- **CSS Scroll Snap**: Each section snaps perfectly into view when scrolling
- **Lenis Smooth Scrolling**: Buttery smooth scrolling experience that works seamlessly with scroll-snap
- **GSAP Animations**: Elements animate in when sections come into view using ScrollTrigger
- **Responsive Design**: Mobile-friendly and responsive across all screen sizes
- **Modular Components**: Clean separation of sections into individual components

## Sections

### 1. Hero Section
- Welcome message with animated title and subtitle
- Animated rocket emoji placeholder for hero image
- Fade-in and slide-up animations

### 2. Research Fields Section
- Grid layout of research field cards
- Staggered card animations
- Hover effects for enhanced interactivity

### 3. Announcements Section
- Latest announcements with dates and descriptions
- Slide-in animations from the left
- Clean, modern card design

## Technologies Used

- **React**: Component-based UI
- **GSAP + ScrollTrigger**: Advanced animations
- **Lenis**: Smooth scrolling library
- **CSS Scroll Snap**: Native browser snap scrolling
- **CSS Grid & Flexbox**: Modern responsive layouts

## File Structure

```
src/
├── pages/
│   ├── homepage2.jsx          # Main homepage component
│   └── homepage2.css          # Styles for the homepage
└── components/
    └── sections/
        ├── HeroSection.jsx           # Hero section with animations
        ├── ResearchFieldsSection.jsx # Research fields cards
        └── AnnouncementsSection.jsx  # Announcements feed
```

## Usage

1. Navigate to `/xlab-home2/` to view the snap scroll homepage
2. Scroll vertically to see sections snap into place
3. Each section will animate its content when it comes into view
4. Works on desktop and mobile devices

## Customization

### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Import and add it to `homepage2.jsx`
3. Add corresponding CSS classes in `homepage2.css`

### Modifying Animations
- Edit the GSAP timelines in each section component
- Adjust `ScrollTrigger` settings for different trigger points
- Modify animation durations and easings as needed

### Styling
- Update the gradient backgrounds in `homepage2.css`
- Modify typography using the existing Google Fonts (Roboto, Heebo)
- Adjust responsive breakpoints in the media queries

## Dependencies

All required dependencies are already installed:
- `gsap`: ^3.13.0
- `@studio-freight/lenis`: ^1.0.42
- `@gsap/react`: ^2.1.2

## Performance Notes

- Lenis is optimized for smooth scrolling performance
- GSAP animations use hardware acceleration
- ScrollTrigger efficiently manages animation lifecycle
- CSS scroll-snap provides native browser optimization 