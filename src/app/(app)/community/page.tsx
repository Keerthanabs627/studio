
// @ts-nocheck
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThumbsUp, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/locales/client";

interface Post {
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

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Ravi Kumar",
    avatar: "https://picsum.photos/40/40?random=1",
    handle: "ravifarms",
    time: "2h ago",
    category: "Equipments",
    content: "Looking to buy a second-hand tractor in the Belagavi region. Any leads would be appreciated!",
    image: "https://picsum.photos/600/400?random=10",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: "Anjali Desai",
    avatar: "https://picsum.photos/40/40?random=2",
    handle: "anjali_gardens",
    time: "5h ago",
    category: "Crop",
    content: "What's the best organic pesticide for tomato plants? Seeing some aphid infestation on my crop.",
    likes: 25,
    comments: 8,
  },
];

const allPosts: Post[] = [...initialPosts];


export default function CommunityPage() {
  const t = useI18n();
  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [category, setCategory] = useState("Crop");
  
  const categories = ["Crop", "Labor", "Equipments", "Feedback", "Q&A"];

  const handlePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: allPosts.length + 1,
      author: "Rakesh Sharma",
      avatar: "https://picsum.photos/40/40?random=0",
      handle: "rakesh_sharma",
      time: t.community.just_now,
      content: newPostContent,
      category: category,
      likes: 0,
      comments: 0,
    };

    allPosts.unshift(newPost);
    setPosts([...allPosts]); 
    setNewPostContent("");
  };


  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.community.title}</h1>
        <p className="text-muted-foreground">{t.community.description}</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://picsum.photos/40/40?random=0" alt="Your avatar" data-ai-hint="person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-4">
                <RadioGroup value={category} onValueChange={setCategory} className="flex flex-wrap gap-4">
                    {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <RadioGroupItem value={cat} id={`cat-${cat}`} />
                            <Label htmlFor={`cat-${cat}`}>{t.community.categories?.[cat.toLowerCase() as keyof typeof t.community.categories] || cat}</Label>
                        </div>
                    ))}
                </RadioGroup>
              <Textarea
                placeholder={t.community.post_placeholder}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handlePost} disabled={!newPostContent.trim()}>{t.community.post_button}</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
              <Avatar>
                <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person" />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">@{post.handle} · {post.time}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                <span className="font-semibold">[{t.community.categories?.[post.category.toLowerCase() as keyof typeof t.community.categories] || post.category}]</span> {post.content}
                </p>
              {post.image && (
                <div className="rounded-lg overflow-hidden border">
                  <Image src={post.image} alt="Post image" width={600} height={400} className="w-full h-auto object-cover" data-ai-hint="tractor agriculture" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes} {t.community.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments} {t.community.comments}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    