export type Category = {
  id: string;
  label: string;
  value: string;
};

export type Gender = {
  id: string;
  label: string;
  value: string;
};

export type Model = {
  id: string;
  category_id: string;
  label: string;
  value: string;
};

export type AddProduct = {
  name: string;
  gender: string;
  model: string;
  category: string;
  price: number;
  images: string[];
};
