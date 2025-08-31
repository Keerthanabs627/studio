// @ts-nocheck
"use client";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThumbsUp, MessageSquare, Loader2 } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/locales/client";
import { getPosts, addPost, type Post } from "./actions";
import { useToast } from "@/hooks/use-toast";


export default function CommunityPage() {
  const t = useI18n();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [category, setCategory] = useState("Crop");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const categories = ["Crop", "Labor", "Equipments", "Feedback", "Q&A"];

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);


  const handlePost = () => {
    if (!newPostContent.trim()) return;

    startTransition(async () => {
        try {
            const newPost = await addPost({
                content: newPostContent,
                category: category,
            });
            setPosts(prevPosts => [newPost, ...prevPosts]);
            setNewPostContent("");
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Failed to post",
                description: "Could not save your post. Please try again.",
            })
        }
    });
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
                            <Label htmlFor={`cat-${cat}`}>{t.community.categories?.[cat.toLowerCase().replace('&', '') as keyof typeof t.community.categories] || cat}</Label>
                        </div>
                    ))}
                </RadioGroup>
              <Textarea
                placeholder={t.community.post_placeholder}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                disabled={isPending}
              />
              <div className="flex justify-end">
                <Button onClick={handlePost} disabled={isPending || !newPostContent.trim()}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t.community.post_button}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
            <div className="flex justify-center items-center p-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
              <Avatar>
                <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person" />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">@{post.handle} · {post.time === 'Just now' ? t.community.just_now : post.time}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                <span className="font-semibold">[{t.community.categories?.[post.category.toLowerCase().replace('&', '') as keyof typeof t.community.categories] || post.category}]</span> {post.content}
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
