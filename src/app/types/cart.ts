import { ProductType } from './product';


export type PaymentMethod ={
    id: number;
    name: string;
}

export type OfferType  = {
    id: number;
    name: string;
    discount: number;
}

export type CartType = {
    id: string;
    subTotal: number;
    total: number;
    discountPercent: number;
    discountFee: number;
    deliveryFee: number;
    offers: OfferType[];
    taxIncluded: boolean;
    taxPercentage: number;
    taxFee: number;
    paymentMethodId: PaymentMethod;
    items: ProductType[]
};