"use client";

import ProductSmallCard from "@/app/components/product/ProductSmallCard";
import { ProductType } from "@/app/types/product";
import { useShopStore } from "@/zustands/shopStore";

const Page = () => {
  const { cart } = useShopStore();

  return (
    <div>
      <div>
        {cart && cart.items.length > 0 ? (
          cart.items.map((item: ProductType, index: number) => (
            <ProductSmallCard key={index} product={item}></ProductSmallCard>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold">Cart</h1>
            <p className="mt-4 text-gray-500">Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
