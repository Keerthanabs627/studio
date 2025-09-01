
// @ts-nocheck
"use client";

import { useState, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ThumbsUp, MessageSquare, Loader2, Tag } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/locales/client";
import { getPosts, addPost, type Post } from "./actions";
import { getProfile, type Profile } from "../profile/actions";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function CommunityPage() {
  const t = useI18n();
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [category, setCategory] = useState("Crop");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const categories = ["Crop", "Labor", "Equipments", "Feedback", "Q&A"];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedPosts, fetchedProfile] = await Promise.all([
          getPosts(),
          getProfile()
        ]);
        setPosts(fetchedPosts);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
            variant: 'destructive',
            title: "Failed to load data",
            description: "Could not load community posts or profile.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toast]);


  const handlePost = () => {
    if (!newPostContent.trim() || !profile) return;

    startTransition(async () => {
        try {
            await addPost({
                content: newPostContent,
                category: category,
            });
            setNewPostContent("");
            // Re-fetch to confirm from server state, ensuring we have the latest list
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
             toast({
                title: "Post Successful",
                description: "Your post has been added to the community hub.",
            });
        } catch (error) {
            console.error("Error posting:", error);
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
              <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-4">
                <RadioGroup value={category} onValueChange={setCategory} className="flex flex-wrap gap-4">
                    {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <RadioGroupItem value={cat} id={`cat-${cat}`} />
                            <Label htmlFor={`cat-${cat}`}>{t.community.categories?.[cat.toLowerCase().replace('&', 'and') as keyof typeof t.community.categories] || cat}</Label>
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
                <p className="text-sm text-muted-foreground">{post.handle} · {post.time}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline">{post.category}</Badge>
              </div>
              {post.image && (
                <div className="rounded-lg overflow-hidden border mt-4">
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
