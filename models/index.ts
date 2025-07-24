// Export all database types
export type { Database, Post, PostInsert, PostUpdate } from './types/database';

// Export all query functions
export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from './queries/posts';