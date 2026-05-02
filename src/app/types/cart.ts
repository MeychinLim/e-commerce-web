import { ProductType } from './product';

export type PaymentMethod = {
  id: number;
  name: string;
};

export type OfferType = {
  id: number;
  name: string;
  discount: number;
};

export type CartItemType = {
  id?: number;
  cartId?: number;
  productId: number;
  product: ProductType;
  quantity: number;
  price: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
};

export type CartType = {
  id: number;
  customerId: number;
  merchantId: number;
  subTotal: number;
  total: number;
  discountPercent: number;
  discountFee: number;
  deliveryFee: number;
  offers: OfferType[];
  taxIncluded: boolean;
  taxPercentage: number;
  taxFee: number;
  paymentMethodId?: PaymentMethod;
  items: CartItemType[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
};