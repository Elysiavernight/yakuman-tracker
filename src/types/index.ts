export interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
  pronouns: string;
  avatar: string;
  createdAt: string;
  demo: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  types: string[];
  hand: string[];
  description: string;
  gameLink: string;
  image: string;
  platform: string;
  createdAt: string;
}

export interface Stats {
  total: number;
  players: number;
  unique: number;
  doubles: number;
  types: { id: string; count: number }[];
  leaders: { user: User; count: number }[];
}

export interface Yakuman {
  id: string;
  name: string;
  english: string;
  japanese: string;
  multiplier: number;
}

export interface Catalog {
  yakumans: Yakuman[];
  tileIds: string[];
}
