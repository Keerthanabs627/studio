// @ts-nocheck
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';

export interface Post {
  id: string;
  author: string;
  avatar: string;
  handle: string;
  time: string;
  content: string;
  category: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: any;
}

export async function getPosts(): Promise<Post[]> {
  const postsCollection = collection(db, 'posts');
  const q = query(postsCollection, orderBy('createdAt', 'desc'));
  const postSnapshot = await getDocs(q);
  const postsList = postSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamp to a readable string or Date object
          time: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : "some time ago",
      } as Post
  });
  return postsList;
}

export async function addPost({ content, category }: { content: string, category: string }) {
  const profile = await getProfile();
  
  if (!profile) {
    throw new Error("User profile not found.");
  }
  
  const newPost = {
    author: profile.name,
    avatar: "https://picsum.photos/40/40?random=0",
    handle: `@${profile.name.toLowerCase().replace(/\s/g, '_')}`,
    likes: 0,
    comments: 0,
    createdAt: serverTimestamp(),
    content,
    category,
  };

  await addDoc(collection(db, "posts"), newPost);
  
  revalidatePath('/community');
}
