/**
 * Tests for posts model functions
 */

import { getAllPosts, getPostById, createPost } from '@/models/queries/posts';
import type { PostInsert } from '@/models/types/database';

// Mock the Supabase client
jest.mock('@/lib/supabase/server');

describe('Posts Model', () => {
  describe('getAllPosts', () => {
    it('should return posts array on success', async () => {
      const mockPosts = [
        {
          id: '1',
          title: 'Test Post',
          content: 'Test content',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }
      ];

      // Mock successful response
      const mockSupabase = require('@/lib/supabase/server').createClient();
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: mockPosts,
            error: null,
          }),
        }),
      });

      const result = await getAllPosts();

      expect(result.data).toEqual(mockPosts);
      expect(result.error).toBeNull();
    });

    it('should return error on database failure', async () => {
      const mockError = { message: 'Database connection failed' };

      const mockSupabase = require('@/lib/supabase/server').createClient();
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: null,
            error: mockError,
          }),
        }),
      });

      const result = await getAllPosts();

      expect(result.data).toBeNull();
      expect(result.error).toBe('Database connection failed');
    });
  });

  describe('createPost', () => {
    it('should create a post successfully', async () => {
      const newPost: PostInsert = {
        title: 'New Test Post',
        content: 'New test content',
      };

      const createdPost = {
        id: '123',
        title: 'New Test Post',
        content: 'New test content',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const mockSupabase = require('@/lib/supabase/server').createClient();
      mockSupabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: createdPost,
              error: null,
            }),
          }),
        }),
      });

      const result = await createPost(newPost);

      expect(result.data).toEqual(createdPost);
      expect(result.error).toBeNull();
    });
  });
});