# AGENTS.md - Developer Guidelines for habitstreak

## Build/Test Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test -- path/to/test.spec.ts` - Run single test file
- `npm run typecheck` - Check TypeScript types

## Code Style Guidelines
- Use TypeScript for all new code
- Import order: external libraries → internal modules → relative imports
- Use named exports over default exports
- Prefer `const` assertions and strict typing
- Use camelCase for variables/functions, PascalCase for components/classes
- Error handling: Use custom Error classes with descriptive messages
- File naming: kebab-case for files, PascalCase for React components
- Always include return types for functions
- Use JSDoc comments for public APIs
- Prefer composition over inheritance
- Use async/await over Promise.then()
- Keep functions small and focused (max 20 lines)