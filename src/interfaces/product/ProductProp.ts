import { CategoryProp } from "./CategoryProp";

export interface ProductProp {
  id: number;
  title: string;
  description: string;
  price: number;
  category: CategoryProp;
  images: string[];
}
