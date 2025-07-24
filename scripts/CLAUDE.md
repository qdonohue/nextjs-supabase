# Scripts Directory

This directory contains database scripts and local utilities for development, deployment, and maintenance tasks.

## Organization Principles

- **Executable scripts**: All scripts should be runnable from the command line
- **Well documented**: Include clear comments and usage instructions
- **Safe operations**: Include confirmation prompts for destructive actions
- **TypeScript preferred**: Use TypeScript with ts-node for type safety

## Directory Structure

```
/scripts/
├── db/             # Database-related scripts
├── seed/           # Database seeding scripts
├── migration/      # Custom migration helpers
├── utils/          # General utility scripts
└── CLAUDE.md       # This documentation file
```

## Script Categories

### Database Scripts (`/db/`)
- Schema management
- Data migration utilities
- Database backup and restore
- Performance analysis queries

### Seeding Scripts (`/seed/`)
- Development data seeding
- Test data generation
- User account creation
- Sample content population

### Migration Scripts (`/migration/`)
- Data transformation scripts
- Schema change helpers
- Rollback utilities

### Utility Scripts (`/utils/`)
- Environment setup
- Code generation
- Build and deployment helpers
- Cleanup and maintenance tasks

## Best Practices

### Script Structure
```typescript
#!/usr/bin/env npx ts-node

import { createClient } from '@/lib/supabase/server';
import { confirm } from '@inquirer/prompts';

/**
 * Script description: What this script does
 * Usage: npx ts-node scripts/example-script.ts
 */

async function main() {
  console.log('🚀 Starting script: Example Script');
  
  // Add confirmation for destructive operations
  const confirmed = await confirm({ 
    message: 'Are you sure you want to proceed?' 
  });
  
  if (!confirmed) {
    console.log('❌ Operation cancelled');
    process.exit(0);
  }

  try {
    // Script logic here
    await performOperation();
    console.log('✅ Script completed successfully');
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

async function performOperation() {
  // Implementation
}

// Only run if called directly
if (require.main === module) {
  main();
}
```

### Environment Setup
```typescript
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}
```

## Example Scripts

### Database Seeding Script
```typescript
#!/usr/bin/env npx ts-node

import { createClient } from '@/lib/supabase/server';

interface SeedUser {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

const seedUsers: SeedUser[] = [
  { email: 'admin@example.com', name: 'Admin User', role: 'admin' },
  { email: 'user@example.com', name: 'Test User', role: 'user' },
];

async function seedDatabase() {
  console.log('🌱 Seeding database...');
  const supabase = createClient();

  for (const user of seedUsers) {
    // Create user logic
    console.log(`📝 Creating user: ${user.email}`);
    // Implementation here
  }

  console.log('✅ Database seeding completed');
}

if (require.main === module) {
  seedDatabase();
}
```

### Backup Script
```typescript
#!/usr/bin/env npx ts-node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

async function backupDatabase() {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `backup-${timestamp}.sql`;
  
  console.log(`📦 Creating database backup: ${filename}`);
  
  try {
    // Using Supabase CLI for backup
    const backup = execSync('supabase db dump', { encoding: 'utf8' });
    writeFileSync(`./backups/${filename}`, backup);
    
    console.log('✅ Backup created successfully');
  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  backupDatabase();
}
```

## Running Scripts

### Prerequisites
Install required dependencies:
```bash
npm install -D ts-node @types/node @inquirer/prompts
```

### Execution
```bash
# Run TypeScript scripts directly
npx ts-node scripts/db/seed.ts

# Or make executable and run
chmod +x scripts/db/seed.ts
./scripts/db/seed.ts
```

## Security Considerations

- Never commit sensitive data or credentials
- Use environment variables for configuration
- Include confirmation prompts for destructive operations
- Validate inputs and handle errors gracefully
- Log operations for audit purposes

## Dependencies

Common packages for scripts:
- `@inquirer/prompts` - Interactive CLI prompts
- `commander` - Command-line argument parsing
- `chalk` - Colored terminal output
- `ora` - Loading spinners
- `dotenv` - Environment variable loading