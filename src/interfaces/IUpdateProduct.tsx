export interface IUpdateProduct {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  images?: string[];
}
