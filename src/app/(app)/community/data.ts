// @ts-nocheck

export interface Post {
    id: number;
    author: string;
    handle: string;
    avatar: string;
    timestamp: string;
    content: string;
    category: 'crop' | 'labor' | 'equipments' | 'feedback' | 'q&a';
    likes: number;
    comments: number;
}

export const posts: Post[] = [
    {
        id: 1,
        author: "Sunita Devi",
        handle: "@sunitad",
        avatar: "https://picsum.photos/48/48?random=1",
        timestamp: "5 hours ago",
        content: "Looking for 2 workers for weeding in my sugarcane field in Belagavi. Good daily wage offered.",
        category: "labor",
        likes: 5,
        comments: 1,
    },
    {
        id: 2,
        author: "Vijay Kumar",
        handle: "@vijayk",
        avatar: "https://picsum.photos/48/48?random=2",
        timestamp: "1 day ago",
        content: "My tomato plants are showing yellow leaves. What could be the issue? I've attached a photo to my Crop Doctor submission but would like general advice too.",
        category: "crop",
        likes: 12,
        comments: 4,
    },
    {
        id: 3,
        author: "Ramesh Patel",
        handle: "@rameshp",
        avatar: "https://picsum.photos/48/48?random=3",
        timestamp: "2 days ago",
        content: "The new market price tracker is very helpful! Can you add a feature to see historical price charts?",
        category: "feedback",
        likes: 22,
        comments: 6,
    },
    {
        id: 4,
        author: "Anjali Rao",
        handle: "@anjali",
        avatar: "https://picsum.photos/48/48?random=4",
        timestamp: "3 days ago",
        content: "Does anyone have a tractor for rent near Hubli? Looking to use it for 2 days next week for ploughing.",
        category: "equipments",
        likes: 8,
        comments: 2,
    },
];