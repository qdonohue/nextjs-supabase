# Models Directory

This directory contains all Supabase-related database types, schemas, and query functions.

## Structure

```
/models/
├── types/          # Generated TypeScript types from Supabase
├── queries/        # Database query functions
└── CLAUDE.md       # This documentation file
```

## Types Directory (`/types/`)

- **Generated types**: Use Supabase CLI to generate TypeScript types
- **Custom types**: Additional TypeScript interfaces for complex data structures
- **Enums**: Database enums and application-specific constants

### Type Generation
Generate TypeScript types from your Supabase schema:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > models/types/database.ts
```

For now, there's a sample `posts` table type structure in place that you can replace with your actual generated types.

## Queries Directory (`/queries/`)

Organize database operations by feature or table:

```
/queries/
├── auth.ts         # Authentication-related queries
├── users.ts        # User management operations
├── profiles.ts     # User profile operations
└── index.ts        # Export all queries
```

## Best Practices

### Type Safety
- Always use generated Supabase types
- Create proper TypeScript interfaces for complex queries
- Handle null/undefined values appropriately

### Query Organization
- Group related queries in the same file
- Use descriptive function names (e.g., `getUserProfile`, `updateUserSettings`)
- Always include proper error handling
- Use server-side client for database operations

### Error Handling
```typescript
type QueryResult<T> = {
  data: T | null;
  error: string | null;
};
```

### Example Query Function
```typescript
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/models/types/database';

export async function getUserProfile(userId: string): Promise<QueryResult<Profile>> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
```

## Security Considerations

- Always validate user permissions before database operations
- Use Row Level Security (RLS) policies in Supabase
- Never trust client-side data without server-side validation
- Sanitize inputs to prevent injection attacks