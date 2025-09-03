
// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';
import { posts as initialPosts, type Post } from './data';

let posts: Post[] = [...initialPosts];

export async function getPosts(): Promise<Post[]> {
  // In a real app, this would be a database call.
  // For this prototype, we're using a simple in-memory array.
  return Promise.resolve(posts.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
}

export async function addPost({ content, category }: { content: string, category: string }) {
  const profile = await getProfile();
  
  if (!profile) {
    throw new Error("User profile not found.");
  }
  
  const newPost: Post = {
    id: new Date().toISOString(),
    author: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    handle: `@${profile.name.toLowerCase().replace(/\s/g, '_')}`,
    likes: 0,
    comments: 0,
    createdAt: new Date(),
    content,
    category,
  };

  posts.unshift(newPost);
  
  revalidatePath('/community');
  return Promise.resolve(newPost);
}
