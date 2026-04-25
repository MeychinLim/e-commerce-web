export type ImageType = {
  id: number;
  url: string;
};

export type SizeType = {
  label: string;
  total: number;
  sold: number;
  inStock: number;
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  images: ImageType[];
  description: string;
  sizes: SizeType[];
  size: string;
  quantity: number;
  sold: number;
  rating: number;
  review: number;
  colors: string[];
  availableColors: string[];
  limitedColors: string[];
  discount: number;
  category: string;
  favorite: boolean;
  onSale: boolean;
  discountPercentage: number;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
};
