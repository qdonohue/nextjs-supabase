# Next.js + Supabase Template

A full-stack Next.js 15 application with Supabase authentication, shadcn/ui components, and local development support.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Environment variables configured (see `.env.local.example`)

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start local Supabase:**
   ```bash
   npm run db:init
   # or manually: npx supabase start
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - **App:** http://localhost:3000
   - **Supabase Studio:** http://localhost:54323 (database management)
   - **Inbucket:** http://localhost:54324 (email testing interface)

### Local Development Features

**Supabase Studio (http://localhost:54323):**
- Database schema browser and editor
- Table data viewer and editor
- SQL query runner
- Auth user management
- Storage bucket management

**Inbucket Email Testing (http://localhost:54324):**
- Captures all emails sent by your app locally
- View signup confirmations, password resets, etc.
- No real emails sent during development
- Test with any email address (even fake ones like `test@example.com`)

**Test Page (/test):**
- Development-only debugging interface
- Start/stop Supabase controls
- Test server actions and functionality

### Package Scripts

- `npm run dev` - Start development server
- `npm run db:init` - Start local Supabase
- `npm run db:stop` - Stop local Supabase
- `npm run db:reset` - Reset local database
- `npm run types:generate` - Generate TypeScript types from database
- `npm run build` - Build for production
- `npm run test` - Run tests

## Project Structure

See `CLAUDE.md` for detailed architecture and development guidelines.
