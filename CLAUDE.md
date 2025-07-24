# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 + Supabase application for building full-stack web applications with authentication. It uses the App Router, shadcn/ui components, and cookie-based authentication via Supabase SSR.

## Architecture & Code Organization

### Directory Structure
```
/app/                 # Next.js App Router pages and layouts
/components/          # Shared, reusable React components (see components/CLAUDE.md)
/lib/                 # Core utilities and Supabase clients
/models/              # Supabase database types, schemas, and queries (see models/CLAUDE.md)
/scripts/             # Database scripts and local utilities (see scripts/CLAUDE.md)
/tests/               # Test files and configurations (see tests/CLAUDE.md)
/types/               # Shared TypeScript interfaces and types (see types/CLAUDE.md)
/utils/               # Pure utility functions (see utils/CLAUDE.md)
```

### Naming
Use PascalCase for component file names.
Use snake_case for api files.

### Supabase Integration
- **Dual client setup**: Browser client (`lib/supabase/client.ts`) and server client (`lib/supabase/server.ts`)
- **Cookie-based auth**: Uses `@supabase/ssr` for session management across client/server
- **Middleware protection**: `middleware.ts` handles route protection and session refresh
- **Database models**: All Supabase types and queries should be organized in `/models/`

### Authentication System
- Complete auth flow in `/app/auth/` directory
- Protected routes under `/app/protected/`
- Session available in Client Components, Server Components, Route Handlers, Server Actions, and Middleware
- Always use server-side session validation for protected operations

### UI Framework
- **shadcn/ui**: New York style, RSC enabled, CSS variables for theming
- **Path aliases**: `@/components`, `@/lib`, `@/models`, `@/types`, `@/utils`, `@/scripts`, `@/tests` configured in `tsconfig.json`
- **Theme system**: Dark/light mode via `next-themes`
- **Shared components**: Place reusable components in `/components/` with proper documentation

## Best Practices

### Component Organization
- Place shared/reusable components in `/components/`
- Keep page-specific components in the relevant `/app/` directory
- Use TypeScript interfaces for all component props
- Follow shadcn/ui patterns for consistency

### Database & Models
- All Supabase types should be generated and stored in `/models/types/`
- Database queries and mutations go in `/models/queries/`
- Use proper TypeScript typing for all database operations
- Always handle errors appropriately in database operations
- Sample `posts` model is provided as a reference - replace with your actual tables
- Use the test script `npx ts-node scripts/test-supabase.ts` to verify connection

### Types & Utilities
- Shared TypeScript types go in `/types/` for application-wide interfaces
- Pure utility functions go in `/utils/`
- Database scripts and local tooling go in `/scripts/`
- Make scripts executable and well-documented
- Use TypeScript for all scripts when possible

### Testing
- All tests go in `/tests/` directory organized by functionality
- Use Jest for unit testing, React Testing Library for components
- Write tests for utilities, components, and database queries
- Maintain good test coverage for critical business logic

### Key Patterns
- Server Components by default, Client Components when needed
- TypeScript throughout with strict configuration
- Tailwind CSS with CSS variables for consistent theming
- Radix UI primitives for accessibility
- Proper error boundaries and loading states

### Development Testing Page
- **Test Page**: `/app/test/` contains a development-only page for testing server functionality
- **Usage**: Use the `/test` page to trigger various actions and functionality for debugging
- **Guidelines**: When implementing features that could benefit from testing/debugging UI, proactively add buttons or forms to the test page and document what they demonstrate
- **Environment**: Page only renders in development environment (`NODE_ENV !== 'development'`)

## Important Files

### Configuration
- `components.json` - shadcn/ui configuration (New York style)
- `middleware.ts` - Session management and route protection
- `lib/supabase/` - Supabase client configurations
- `tsconfig.json` - Path aliases and TypeScript config
- `tests/setup.ts` - Jest test environment configuration
- `.git/hooks/post-commit` - Auto-runs linter with fix after commits

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
SUPABASE_PROJECT_ID=your-project-id  # For type generation (extract from SUPABASE_URL)
```

## Development Workflow

### Local Database Development (Recommended)
**Avoid remote Supabase dashboard updates!** Use local development for schema changes:

1. **Setup local Supabase**:
   ```bash
   npx supabase init
   npx supabase start
   ```

2. **Create migrations locally**:
   ```bash
   npx supabase migration new create_posts_table
   # Edit the generated SQL file in supabase/migrations/
   ```

3. **Apply migrations locally**:
   ```bash
   npx supabase db reset  # Reset and apply all migrations
   ```

4. **Generate types after schema changes**:
   ```bash
   npm run types:generate
   ```

5. **Deploy to production**:
   ```bash
   npx supabase db push  # Push migrations to remote
   ```

### Type Generation
- Run `npm run types:generate` after any schema changes
- Types are automatically generated from your local database schema
- Never manually edit generated types in `/models/types/database.ts`

## Folder-Specific Guidelines

Each major directory contains a `CLAUDE.md` file with specific guidance:
- `/components/CLAUDE.md` - Component creation and organization patterns
- `/models/CLAUDE.md` - Database types, queries, and Supabase integration
- `/types/CLAUDE.md` - Shared TypeScript interfaces and type definitions
- `/utils/CLAUDE.md` - Utility function patterns and organization
- `/scripts/CLAUDE.md` - Database scripts and local tooling
- `/tests/CLAUDE.md` - Testing setup, patterns, and best practices