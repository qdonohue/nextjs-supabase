# Utils Directory

This directory contains pure utility functions that don't depend on external services or application state.

## Organization Principles

- **Pure functions**: No side effects, same input always produces same output
- **Single responsibility**: Each utility should have one clear purpose
- **Framework agnostic**: Should work independently of Next.js/React
- **Well tested**: All utilities should have corresponding tests

## File Structure

Organize utilities by category - e.g:

```
/utils/
├── string.ts       # String manipulation utilities
├── date.ts         # Date/time formatting and calculations
├── validation.ts   # Input validation functions
├── formatting.ts   # Data formatting utilities
├── constants.ts    # Application constants
└── index.ts        # Export all utilities
```

## Best Practices

### Function Design
- Use descriptive names that explain what the function does
- Include JSDoc comments for complex functions
- Handle edge cases gracefully
- Return consistent data types

### Example Utility Function
```typescript
/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string
 * @param format - Format type ('short' | 'long' | 'relative')
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string, 
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString();
    case 'long':
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'relative':
      return getRelativeTime(date);
    default:
      return date.toLocaleDateString();
  }
}
```

### Validation Utilities
```typescript
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

## What NOT to Include

- Database queries (belongs in `/models/queries/`)
- Component logic (belongs in `/components/`)
- API calls or external service interactions
- React hooks or component-specific utilities
- Configuration or environment-dependent code

## Testing

Each utility function should have corresponding tests. Consider edge cases:
- Empty inputs
- Invalid inputs
- Boundary conditions
- Type safety