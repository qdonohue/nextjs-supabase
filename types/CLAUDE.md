# Types Directory

This directory contains shared TypeScript type definitions, interfaces, and enums used throughout the application.

## Organization Principles

- **Shared types only**: Types used in multiple places across the application
- **Well-documented**: Include JSDoc comments for complex types
- **Logical grouping**: Organize types by domain or functionality
- **No implementation**: Pure TypeScript declarations only

## Directory Structure

```
/types/
├── api.ts          # API request/response types
├── auth.ts         # Authentication-related types
├── components.ts   # Shared component prop types
├── database.ts     # Custom database types (beyond Supabase generated)
├── forms.ts        # Form validation and data types
├── ui.ts           # UI-specific types (themes, variants, etc.)
├── utils.ts        # Utility function types
└── index.ts        # Export all types
```

## Best Practices

### Type Organization
- Group related types in the same file
- Use descriptive names that explain the type's purpose
- Prefer interfaces over types for object shapes
- Use unions and enums for constrained values

### Documentation
```typescript
/**
 * Represents a user's profile information
 * Used across user management components and pages
 */
export interface UserProfile {
  /** Unique identifier from Supabase auth */
  id: string;
  /** User's display name */
  name: string;
  /** Primary email address */
  email: string;
  /** Profile image URL (optional) */
  avatar_url?: string;
  /** User role for permissions */
  role: UserRole;
  /** Account creation timestamp */
  created_at: string;
  /** Last profile update timestamp */
  updated_at: string;
}

/**
 * Available user roles in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}
```

### Generic Types
```typescript
/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  message?: string;
}

/**
 * Pagination metadata for list responses
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated list response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  error: string | null;
}
```

### Form Types
```typescript
/**
 * Form field validation state
 */
export interface FieldState {
  value: string;
  error?: string;
  touched: boolean;
}

/**
 * Generic form state management
 */
export interface FormState<T extends Record<string, any>> {
  fields: {
    [K in keyof T]: FieldState;
  };
  isSubmitting: boolean;
  isValid: boolean;
}
```

### Component Types
```typescript
/**
 * Standard component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common component variants
 */
export type ComponentVariant = 'default' | 'outline' | 'ghost' | 'destructive';

/**
 * Base props for styled components
 */
export interface BaseComponentProps {
  className?: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
}
```

## What NOT to Include

- **Supabase generated types**: These belong in `/models/types/`
- **Component-specific types**: Keep these in the component files
- **One-off types**: Types used in only one place
- **Implementation logic**: This directory is for type definitions only

## Usage Examples

### Import Types
```typescript
// Import specific types
import type { UserProfile, ApiResponse } from '@/types';

// Import from specific file
import type { LoginFormData } from '@/types/forms';

// Use in component
interface UserCardProps {
  user: UserProfile;
  onEdit: (id: string) => void;
}
```

### Type Extensions
```typescript
// Extend base types for specific use cases
interface CreateUserRequest extends Omit<UserProfile, 'id' | 'created_at' | 'updated_at'> {
  password: string;
}

// Partial updates
type UpdateUserRequest = Partial<Pick<UserProfile, 'name' | 'avatar_url'>>;
```

## Relationship with Other Directories

- **`/models/types/`**: Supabase-generated database types
- **`/types/`**: Application-wide shared types (this directory)
- **Component files**: Component-specific prop interfaces
- **`/utils/`**: Utility function parameter/return types

## Index File Pattern
```typescript
// types/index.ts
export type { UserProfile, UserRole } from './auth';
export type { ApiResponse, PaginatedResponse } from './api';
export type { BaseComponentProps, ComponentSize } from './components';
export type { FormState, FieldState } from './forms';
```