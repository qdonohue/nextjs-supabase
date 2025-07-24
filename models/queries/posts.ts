import { createClient } from '@/lib/supabase/server';
import type { Post, PostInsert, PostUpdate } from '@/models/types/database';

// Standard result type for consistent error handling
type QueryResult<T> = {
  data: T | null;
  error: string | null;
};

/**
 * Get all posts
 */
export async function getAllPosts(): Promise<QueryResult<Post[]>> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data || [], error: null };
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: string): Promise<QueryResult<Post>> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Create a new post
 */
export async function createPost(post: PostInsert): Promise<QueryResult<Post>> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Update an existing post
 */
export async function updatePost(id: string, updates: PostUpdate): Promise<QueryResult<Post>> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<QueryResult<boolean>> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: true, error: null };
}