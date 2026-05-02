import type { CartItemType } from "@/app/types/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/zustands/cart";
import { Package, Trash2 } from "lucide-react";
import Image from "next/image";
import CartItemQuantityAdjustment from "./CartItemQuantityAdjustment";
import Link from "next/link";

type CartItemCardProps = {
  item: CartItemType;
};

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { removeItemFromCart } = useCartStore();

  const isAtMaxStock = (item?.quantity || 0) >= (item?.product?.quantity || 0);

  const handleRemoveItem = (productId: number) => {
    removeItemFromCart(productId);
  };

  return (
    <div>
      <Card key={item.id} className="rounded-2xl overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl bg-black/25 overflow-hidden">
              {item.product?.images && item.product.images.length > 0 ? (
                <Image
                  src={`/images/${item.product.images[0]?.url}`}
                  alt={item.product?.name || "Product"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link
                    href={`/products/${item.product?.id}`}
                    className="text-lg md:text-xl font-bold transition"
                  >
                    {item.product?.name}
                  </Link>
                  <p className="text-gray-400 text-sm">
                    {item.product?.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-500/25"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col gap-1">
                  <p className="text-emerald-500 font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.product?.onSale && item.product?.discountPercentage && (
                    <p className="text-gray-500 text-xs line-through">
                      ${item.product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                <CartItemQuantityAdjustment
                  item={item}
                  isAtMaxStock={isAtMaxStock}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartItemCard;
