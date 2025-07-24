// Mock Supabase clients for testing - only if they exist
try {
  require.resolve('@/lib/supabase/client');
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
} catch (e) {
  // Module doesn't exist, skip mocking
}

try {
  require.resolve('@/lib/supabase/server');
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
} catch (e) {
  // Module doesn't exist, skip mocking
}