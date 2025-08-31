// @ts-nocheck
'use server';

import { posts } from './data';
import { revalidatePath } from 'next/cache';

export interface Post {
  id: number;
  author: string;
  avatar: string;
  handle: string;
  time: string;
  content: string;
  category: string;
  image?: string;
  likes: number;
  comments: number;
}

export async function getPosts(): Promise<Post[]> {
  // In a real app, you'd fetch this from a database.
  return Promise.resolve(posts);
}

export async function addPost(post: Omit<Post, 'id' | 'likes' | 'comments' | 'time' | 'author' | 'avatar' | 'handle'>) {
  const newPost: Post = {
    id: posts.length + 1,
    author: "Rakesh Sharma", // In a real app, this would be the logged-in user
    avatar: "https://picsum.photos/40/40?random=0",
    handle: "rakesh_sharma",
    time: "Just now",
    likes: 0,
    comments: 0,
    ...post,
  };
  posts.unshift(newPost);
  // Revalidate the community page to show the new post
  revalidatePath('/community');
  return Promise.resolve(newPost);
}
