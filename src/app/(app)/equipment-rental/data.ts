// @ts-nocheck

export interface Equipment {
  id: number;
  name: string;
  owner: string;
  avatar: string;
  rate: string;
  location: string;
}

export const equipment: Equipment[] = [
  {
    id: 1,
    name: "Mahindra Tractor 575 DI",
    owner: "Suresh Patil",
    avatar: "https://picsum.photos/40/40?random=11",
    rate: "₹1200/hour",
    location: "Kolhapur, Maharashtra"
  },
  {
    id: 2,
    name: "John Deere Rotavator",
    owner: "Priya Singh",
    avatar: "https://picsum.photos/40/40?random=12",
    rate: "₹800/hour",
    location: "Ludhiana, Punjab"
  },
  {
    id: 3,
    name: "Crop Sprayer (16L)",
    owner: "Amit Reddy",
    avatar: "https://picsum.photos/40/40?random=13",
    rate: "₹300/day",
    location: "Guntur, Andhra Pradesh"
  },
    {
    id: 4,
    name: "Paddy Thresher Machine",
    owner: "Lakshmi Murthy",
    avatar: "https://picsum.photos/40/40?random=14",
    rate: "₹1500/hour",
    location: "Thanjavur, Tamil Nadu"
  },
];
