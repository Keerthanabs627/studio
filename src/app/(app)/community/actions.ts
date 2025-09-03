// @ts-nocheck
'use server';

import { posts, type Post } from './data';
import { revalidatePath } from 'next/cache';

export type { Post };

export async function getPosts(): Promise<Post[]> {
  // In a real app, you'd fetch this from a database.
  return Promise.resolve(posts);
}

export async function addPost(item: Omit<Post, 'id' | 'author' | 'handle' | 'avatar' | 'timestamp' | 'likes' | 'comments'>): Promise<Post> {
  const newPost: Post = {
    id: posts.length + 1,
    author: "Guest User",
    handle: "@guest",
    avatar: "https://picsum.photos/48/48?random=0",
    timestamp: "Just now",
    likes: 0,
    comments: 0,
    ...item,
  };
  posts.unshift(newPost);
  revalidatePath('/community');
  return Promise.resolve(newPost);
}