# Tests Directory

This directory contains all test files for the application, organized by test type and functionality.

## Directory Structure

```
/tests/
├── __mocks__/          # Mock implementations
├── utils/             # Utility function tests
├── models/            # Database query tests
├── api/               # API route tests
├── fixtures/          # Test data and fixtures
├── helpers/           # Test helper functions
├── setup.ts           # Test environment setup
└── CLAUDE.md          # This documentation file
```

## Testing Stack

### Core Testing Libraries
- **Jest**: Test runner and assertion library
- **ts-jest**: TypeScript support for Jest

### Additional Tools
- **MSW (Mock Service Worker)**: API mocking for integration tests
- **@supabase/testing-helpers**: Supabase test utilities

## Test Commands

Add these scripts to `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
```javascript
const config = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,ts}',
    '<rootDir>/**/__tests__/**/*.{js,ts}',
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!next.config.ts',
    '!tailwind.config.ts',
    '!postcss.config.mjs',
  ],
  preset: 'ts-jest',
};

module.exports = config;
```

### Test Setup (`tests/setup.ts`)
```typescript
// Mock Supabase clients for testing
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  })),
}));

jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  })),
}));
```

## Test Patterns

### Utility Function Testing
```typescript
// tests/utils/formatDate.test.ts
import { formatDate } from '@/utils/date';

describe('formatDate', () => {
  it('formats valid date string correctly', () => {
    const result = formatDate('2024-01-15T10:30:00Z', 'short');
    expect(result).toBe('1/15/2024');
  });

  it('handles invalid date input', () => {
    const result = formatDate('invalid-date', 'short');
    expect(result).toBe('Invalid date');
  });

  it('supports relative format', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const result = formatDate(yesterday.toISOString(), 'relative');
    expect(result).toContain('yesterday');
  });
});
```

### API Route Testing
```typescript
// tests/api/auth.test.ts
import { GET, POST } from '@/app/api/auth/route';
import { NextRequest } from 'next/server';

describe('/api/auth', () => {
  it('returns user session for GET request', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth');
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('user');
  });

  it('handles login POST request', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

### Database Query Testing
```typescript
// tests/models/user.test.ts
import { getUserProfile } from '@/models/queries/user';
import { createClient } from '@/lib/supabase/server';

// Mock Supabase client
jest.mock('@/lib/supabase/server');

describe('getUserProfile', () => {
  it('returns user profile successfully', async () => {
    const mockClient = {
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => ({
              data: { id: '1', name: 'Test User' },
              error: null,
            })),
          })),
        })),
      })),
    };

    (createClient as jest.Mock).mockReturnValue(mockClient);

    const result = await getUserProfile('1');
    
    expect(result.data).toEqual({ id: '1', name: 'Test User' });
    expect(result.error).toBeNull();
  });
});
```

## Test Fixtures

Create reusable test data:
```typescript
// tests/fixtures/users.ts
import type { UserProfile } from '@/types';

export const mockUser: UserProfile = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

export const mockAdmin: UserProfile = {
  ...mockUser,
  id: '456e7890-e89b-12d3-a456-426614174001',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
};
```

## Best Practices

### Test Organization
- Keep tests close to the code they test
- Use descriptive test names that explain behavior
- Group related tests with `describe` blocks
- One assertion per test when possible

### Mocking
- Mock external dependencies (APIs, databases)
- Use MSW for API mocking in integration tests
- Mock only what you need, not everything
- Keep mocks simple and predictable

### Coverage Goals
- Aim for 80%+ code coverage for utilities and business logic
- Test edge cases and error conditions
- Don't sacrifice quality for coverage percentage

## Running Tests

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test Button.test.tsx

# Run tests matching pattern
npm run test -- --testNamePattern="auth"
```