# CLAUDE.md - Guidelines for Agentic Coding

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build

## Environment Setup
- Create `.env` file with GitHub token for blog admin functionality
- See `GITHUB_SETUP_GUIDE.md` for detailed instructions

## Style Guidelines
- **Imports**: Group imports by React, external libs, internal components, constants
- **Components**: Use JSX with functional components and named exports
- **State**: Prefer useState/useEffect hooks for component state
- **Formatting**: CSS-in-JS for component styling
- **Props**: Use prop-types for component properties validation
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Colors**: Use CSS variables from root (--primary-color, --secondary-color, etc.)
- **Media Queries**: Mobile first with breakpoints at 768px and 1024px
- **Images**: Always use OptimizedImage component with width, height and alt text
- **Accessibility**: Maintain WCAG 2.1 AA compliance, use semantic HTML
- **Error Handling**: Use try/catch for async operations
- **Animation**: Keep subtle with 300ms transitions

*Generate components consistent with existing navigation patterns and responsive design principles.*