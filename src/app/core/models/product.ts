export type Category = {
  id: string;
  label: string;
  value: string;
};

export type Gender = {
  id: string;
  label: string;
  name?: string;
  value: string;
};

export type Model = {
  id: string;
  category_id: string;
  label: string;
  name?: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  gender: Gender;
  model: Model;
  category: Category;
  price: number;
  sizes: string[];
  images: string[];
};

export type OrderStatus = 'pending' | 'delivered' | 'canceled' | 'in_proccess';

export type ProductOrder = {
  productId: string;
  userId: string;
  dateCreated: string;
  status: OrderStatus;
  selectedSize: string;
  product?: Product;
};
