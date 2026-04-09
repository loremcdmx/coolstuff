import productsData from "./products.json";

export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  image: string;
  trending: boolean;
  trendScore: number;
  amazonUrl: string;
  country: "mx" | "us" | "both";
  badges: string[];
};

export const categories = [
  "All",
  "Tech",
  "Home",
  "Fashion",
  "Beauty",
  "Sports",
  "Gaming",
  "Books",
  "Kitchen",
  "Pets",
];

export const products: Product[] = productsData as Product[];
