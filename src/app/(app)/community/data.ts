// @ts-nocheck
import type { Post } from './actions';

// This is a temporary in-memory "database" for the prototype.
// In a real application, this would be a database like Firestore.
export const posts: Post[] = [
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
