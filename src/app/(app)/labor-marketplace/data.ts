// @ts-nocheck
export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  rate: string;
  contact: string;
  posterName: string;
  avatar: string;
  createdAt: any;
}

export const jobs: Job[] = [
    {
      id: "1",
      title: "Wheat Harvesting",
      description: "Need 5 experienced laborers for harvesting wheat. Work for 1 week.",
      location: "Sangli, Maharashtra",
      rate: "₹600/day",
      contact: "9876543210",
      posterName: "Ramesh Pawar",
      avatar: "https://picsum.photos/40/40?random=1",
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      id: "2",
      title: "Paddy Planting",
      description: "Looking for 10 workers for paddy planting season. Accommodation provided.",
      location: "East Godavari, Andhra Pradesh",
      rate: "₹550/day + food",
      contact: "9123456789",
      posterName: "Lakshmi Reddy",
      avatar: "https://picsum.photos/40/40?random=2",
      createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
      id: "3",
      title: "Tractor Operator",
      description: "Need a skilled tractor driver for ploughing and tilling. Must have own license.",
      location: "Ludhiana, Punjab",
      rate: "₹800/day",
      contact: "9988776655",
      posterName: "Gurpreet Singh",
      avatar: "https://picsum.photos/40/40?random=3",
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
];
