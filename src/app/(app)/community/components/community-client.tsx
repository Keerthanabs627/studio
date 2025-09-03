// @ts-nocheck
"use client";

import { useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageSquare, Loader2, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/locales/client';
import { addPost, type Post } from '../actions';


export function CommunityClient({ initialPosts }: { initialPosts: Post[] }) {
  const t = useI18n();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Form state
  const [newPostContent, setNewPostContent] = useState('');
  const [category, setCategory] = useState('q&a');

  const handlePost = () => {
    if (!newPostContent.trim()) {
        toast({
            variant: 'destructive',
            title: "Post cannot be empty.",
        });
      return;
    }

    startTransition(async () => {
      try {
        const newPost = await addPost({
          content: newPostContent,
          category: category,
        });
        setPosts(prev => [newPost, ...prev]);
        setNewPostContent('');
        setCategory('q&a');
        toast({
          title: "Post submitted!",
          description: "Your post is now live in the community hub.",
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: "Failed to post",
          description: "Could not submit your post. Please try again.",
        });
      }
    });
  };

  const categories = ['crop', 'labor', 'equipments', 'feedback', 'q&a'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.community.title}</h1>
        <p className="text-muted-foreground">{t.community.description}</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
             <Avatar className="hidden sm:block">
                <AvatarFallback>G</AvatarFallback>
             </Avatar>
            <div className="w-full space-y-4">
              <Textarea
                placeholder={t.community.post_placeholder}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                disabled={isPending}
                rows={3}
              />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <RadioGroup defaultValue="q&a" className="flex flex-wrap gap-4" onValueChange={setCategory} value={category}>
                    {categories.map((cat) => (
                         <div key={cat} className="flex items-center space-x-2">
                            <RadioGroupItem value={cat} id={`cat-${cat}`} />
                            <Label htmlFor={`cat-${cat}`} className="capitalize">{t.community.categories[cat as keyof typeof t.community.categories]}</Label>
                        </div>
                    ))}
                </RadioGroup>
                <Button onClick={handlePost} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t.community.post_button}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person" />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold">{post.author}</span>
                    <span className="text-muted-foreground">{post.handle} · {post.timestamp}</span>
                  </div>
                  <p className="mt-2 text-foreground/90 whitespace-pre-wrap">{post.content}</p>
                   <div className="flex items-center justify-between mt-4">
                        <Badge variant="secondary" className="capitalize">
                            <Tag className="mr-1 h-3 w-3" />
                            {t.community.categories[post.category as keyof typeof t.community.categories]}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                {post.likes} {t.community.likes}
                            </Button>
                             <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {post.comments} {t.community.comments}
                            </Button>
                        </div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
