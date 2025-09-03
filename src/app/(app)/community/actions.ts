// @ts-nocheck
'use server';

import { revalidatePath } from 'next/cache';
import { getProfile } from '../profile/actions';
import { type Post } from './data';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function getPosts(): Promise<Post[]> {
  const postsCollection = collection(db, 'posts');
  const q = query(postsCollection, orderBy('createdAt', 'desc'));
  const postsSnapshot = await getDocs(q);
  
  const posts: Post[] = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
      }
  });

  return posts;
}

export async function addPost({ content, category }: { content: string, category: string }) {
  const profile = await getProfile();
  
  if (!profile || !profile.name) {
    throw new Error("User profile not found or name is missing.");
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

  const postsCollection = collection(db, 'posts');
  const docRef = await addDoc(postsCollection, newPost);
  
  revalidatePath('/community');

  return {
    ...newPost,
    id: docRef.id,
    createdAt: new Date(), // Return a date object for the client
  };
}
