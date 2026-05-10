import type { Product } from "./product";

export interface user {
  id: number;
  name: string;
  email: string;
}

export interface loginResponse {
  user: user;
  wishlist: Product[];
}
